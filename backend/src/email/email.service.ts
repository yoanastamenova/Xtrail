import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
    });
  }

  async sendPasswordResetEmail(to: string, resetUrl: string) {
    const templatePath = path.join(
      process.cwd(),
      'src',
      'email',
      'reset-password.html',
    );
    let html = fs.readFileSync(templatePath, 'utf-8');
    html = html.replace(/{{resetUrl}}/g, resetUrl);

    await this.transporter.sendMail({
      from: this.configService.get<string>('SMTP_FROM'),
      to,
      subject: 'Reset your password - Xtrail',
      html,
    });
  }
}
