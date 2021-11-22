import { Controller, Get, Post, UseGuards, Request, VERSION_NEUTRAL } from '@nestjs/common';
import { AppService } from './app.service';

@Controller({
  version: VERSION_NEUTRAL
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  index() {
    return this.appService.getRoot();
  }
}
