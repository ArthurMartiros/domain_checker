import { Dependencies, Injectable } from "@nestjs/common";
import { getRepositoryToken, InjectRepository } from "@nestjs/typeorm";
import { Domain } from "src/entities/domain.entity";
import { IDomain } from "src/interfaces/domain.interface";
import { Repository } from 'typeorm';

@Injectable()
@Dependencies(getRepositoryToken(Domain))
export class DomainModel {
    @InjectRepository(Domain)
    protected readonly entity: Repository<Domain>;

    findAll(): Promise<Domain[]> {
        return this.entity.find();
    }
    
    findOne(id: string): Promise<Domain> {
        return this.entity.findOne(id);
    }

    findByName(name: string): Promise<Domain> {
        return this.entity.findOne({
            where: {
                name
            }
        });
    }

    upsert(data: IDomain) : Promise<any>{
        return this.entity.createQueryBuilder()
        .insert()
        .into(Domain)
        .values(data)
        .onConflict(`("name") DO UPDATE SET 
            "expiry" = :expiry,
            "lastDetected" = :lastDetected,
            "possyblyAvailable" = :possyblyAvailable,
            "addresses" = :addresses,
            "nsname" = :nsname,
            "hostmaster" = :hostmaster,
            "serial" = :serial,
            "refresh" = :refresh
        `)
        .setParameter("expiry", data.expiry || null)
        .setParameter("lastDetected", data.lastDetected || null)
        .setParameter("possyblyAvailable", data.possyblyAvailable || false)
        .setParameter("addresses", data.addresses || [])
        .setParameter("nsname", data.nsname || null)
        .setParameter("hostmaster", data.hostmaster || null)
        .setParameter("serial", data.serial || null) 
        .setParameter("refresh", data.refresh || null)
        .setParameter("retry", data.retry || null)
        .setParameter("minttl", data.minttl || null)
        .execute();
    }
}