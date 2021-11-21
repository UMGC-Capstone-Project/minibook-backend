import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { PlatformStatus } from './constants/platform-status.consts';

@Injectable()
export class AppService {
  getRoot() {
    return {
      status: PlatformStatus.ONLINE,
      timestamp: new Date().toISOString(),
    }
  }

}
