import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  async sendActivationEmail(
    email: string,
    activationLink: string,
  ): Promise<void> {
    // Placeholder implementation - log to console
    // In production, integrate with SendGrid, AWS SES, or Nodemailer
    this.logger.log(`Activation email for ${email}: ${activationLink}`);

    // Simulate async email sending
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}
