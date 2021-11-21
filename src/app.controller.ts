import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getRoot() {
    return this.appService.getRoot();
  }

  // // GET /404
  // error() {
  //   return {
  //   "code": 404,
  //   "message": "not found"
  //   }
  // }
}
