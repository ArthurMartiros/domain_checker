import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CsvParser, ParsedData } from 'nest-csv-parser'
import { Entity } from './models/entity.model';
import * as fs from 'fs';

@Injectable()
export class AppService {
  @Inject('MIC_CLIENT') 
  private readonly client: ClientProxy
  @Inject()
  private readonly parser: CsvParser;
 
  private send(channel: string, data?: any) {
    return this.client.send(channel, data? data: {}).toPromise();
  }
  protected async deal(data: ParsedData<Entity>) {
    const entities: Entity[] = data.list;
    for await (let e of entities) {
      console.log(e);
      if(e?.domain) {
        this.send('domainChecker', e.domain)
        .catch(err => {
          throw new InternalServerErrorException(err);
        });
      }
    }
  }
  public async upload(files) {
    try {
      for await (let file of files) {
        const stream = fs.createReadStream(file.path)
        const data: ParsedData<Entity> = await this.parser.parse(stream, Entity, null, null, { strict: true, separator: ';' });
        await this.deal(data);
      }
      return {succed: true};
    } catch(e) {
      throw new BadRequestException('Something Went Wrong');
    }
    
   
  }

  public async getAllDomains() {
    try {
      const data = await this.send('allDomains');
      return data;
    } catch(e) {
      console.log(e);
    }
  }

  public getDomainByName(name: string) {
    return this.send('getDomainByName', name)
  }

  public getFileNames() {
    return new Promise((accept, reject) => {
      fs.readdir(`${__dirname}/files`, function(err, filenames) {
        if (err) {
          console.log(err)
          return reject('Something went wrong');
        }
        console.log(filenames);
        return accept(filenames);
      });
    }) 
  }
}
