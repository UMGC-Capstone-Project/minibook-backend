import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { PlatformStatus } from './common/enums/platform-status.enum';

@Injectable()
export class AppService {
  getRoot() {
    return {
      status: PlatformStatus.ONLINE,
      timestamp: new Date().toISOString(),
    };
  }
}
