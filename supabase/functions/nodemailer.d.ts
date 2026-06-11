// Type declarations for nodemailer used via npm: specifier in Supabase Edge Functions
// This enables VS Code IntelliSense for the `npm:nodemailer@6.9.10` import.

declare module 'npm:nodemailer@6.9.10' {
  interface TransportOptions {
    host?: string;
    port?: number;
    secure?: boolean;
    auth?: {
      user: string;
      pass: string;
    };
    tls?: {
      rejectUnauthorized?: boolean;
    };
    [key: string]: unknown;
  }

  interface SentMessageInfo {
    messageId: string;
    accepted: string[];
    rejected: string[];
    pending: string[];
    response: string;
    envelope: {
      from: string;
      to: string[];
    };
  }

  interface SendMailOptions {
    from?: string;
    to?: string;
    cc?: string | string[];
    bcc?: string | string[];
    subject?: string;
    text?: string;
    html?: string;
    replyTo?: string;
    attachments?: Array<{
      filename?: string;
      content?: string | Buffer;
      path?: string;
      contentType?: string;
    }>;
  }

  interface Transporter {
    sendMail(mailOptions: SendMailOptions): Promise<SentMessageInfo>;
    close(): void;
    verify(): Promise<boolean>;
  }

  interface CreateTransportOptions {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
    tls?: {
      rejectUnauthorized?: boolean;
    };
  }

  export function createTransport(options: CreateTransportOptions | TransportOptions | string): Transporter;
  export function createTransport(
    host: string,
    options?: TransportOptions
  ): Transporter;

  const nodemailer: {
    createTransport(options: CreateTransportOptions | TransportOptions | string): Transporter;
    createTransport(host: string, options?: TransportOptions): Transporter;
  };

  export default nodemailer;
}
