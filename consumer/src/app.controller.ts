import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DomainService } from './services/domain.service';

@Controller()
export class AppController {
  @Inject()
  private readonly domain: DomainService;

  @MessagePattern('domainChecker')
  domainChecker(@Payload() data: any) {
    return this.domain.detectDomain(data);
  }

  @MessagePattern('allDomains')
  getAllDomains() {
    return this.domain.findAll();
  }

  @MessagePattern('getDomainByName')
  getDomainByName(@Payload() data: any) {
    return this.domain.findByName(data);
  }
}
