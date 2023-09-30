import { EmailVar, MailModuleOptions } from './mail.interfaces';
export declare class MailService {
    private readonly options;
    constructor(options: MailModuleOptions);
    sendEmail(subject: string, emailVars: EmailVar[]): Promise<boolean>;
    sendVerificationEmail(email: string, code: string): void;
}
