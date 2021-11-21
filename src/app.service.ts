import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { PlatformStatus } from './enums';

@Injectable()
export class AppService {
  getRoot() {
    return {
      status: PlatformStatus.ONLINE,
      timestamp: new Date().toISOString(),
    }
  }

}
