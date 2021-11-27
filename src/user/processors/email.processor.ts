import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('email')
export class EmailProcessor {
  private readonly logger = new Logger(EmailProcessor.name);

  @Process('send')
  handleSend(job: Job) {
    this.logger.debug('Start sending...');
    this.logger.debug(job.data);
    this.logger.debug('sent completed');
  }
}
