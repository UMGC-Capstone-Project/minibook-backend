import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { PlatformStatus } from './constants/platform-status.consts';

@Injectable()
export class AppService {
  getRoot() {
    return {
      "status": PlatformStatus.ONLINE,
      "date": moment().format()
      }
  }

}
