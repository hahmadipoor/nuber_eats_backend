import got from 'got';
import * as FormData from 'form-data';
import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { EmailVar, MailModuleOptions } from './mail.interfaces';

@Injectable()
export class MailService {
  constructor(@Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions) {    
  }

  async sendEmail(subject: string,emailVars: EmailVar[]): Promise<boolean> {
    const form = new FormData();
    form.append('from',`Nico from Nuber Eats <mailgun@${this.options.domain}>`);
    form.append('to', `nico@nomadcoders.co`);
    form.append('subject', subject);
    emailVars.forEach(eVar => form.append(`v:${eVar.key}`, eVar.value));
    try {
      await got.post(
        `https://api.mailgun.net/v3/${this.options.domain}/messages`,
        {
          headers: {
            Authorization: `Basic ${Buffer.from(
              `api:${this.options.apiKey}`,
            ).toString('base64')}`,
          },
          body: form,
        },
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  sendVerificationEmail(email: string, code: string) {
    this.sendEmail('Verify Your Email', [
      { key: 'code', value: code },
      { key: 'username', value: email },
    ]);
  }
}
