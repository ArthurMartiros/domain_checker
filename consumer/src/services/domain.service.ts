import { HttpService, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as dns from 'dns';
import { Domain } from 'src/entities/domain.entity';
import { IDomain } from 'src/interfaces/domain.interface';
import { DomainModel } from 'src/models/domain.model';
import { Repository } from 'typeorm';

@Injectable()
export class DomainService extends DomainModel {
    @Inject()
    private readonly config: ConfigService;
    @Inject()
    private readonly http: HttpService;
    @InjectRepository(Domain)
    protected readonly entity: Repository<Domain>;

    private detectAddress(data: string): Promise<any> {
        return new Promise((accept) => {
            dns.resolve4(data, (err, res) => {
                if(err) accept([]);
                accept(res);
            })
        })
    }

    private detect(data: string): Promise<IDomain> {
       return new Promise((accept, reject) => {
        dns.resolveSoa(data, async (err, res) => {
            const lastDetected = Date.now();
            if (err) {
                accept({
                    name: data,
                    possyblyAvailable: true,
                    lastDetected
                });
            }
            const addresses = await this.detectAddress(data);
            accept({
                name: data,
                possyblyAvailable: false,
                addresses,
                lastDetected,
                ...res
            });
        })
       });
    }

    private isValid(data: string): boolean {
        if(!data) return false;
        return /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(data);
    }


    public async detectDomain(data: string) {
        try {
            if(!this.isValid(data)) return;
            const res = await this.detect(data);
            console.log(res);
            await this.upsert(res);
            return 'done';
        } catch(e) {
            console.log(e);
        }
    }
}
