import { assertSupabaseConfigured, supabase } from './supabase';

type WebsiteMailResponse = {
  ok?: boolean;
  message?: string;
};

export type ContactEnquiry = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

const invokeWebsiteMail = async (body: Record<string, unknown>) => {
  assertSupabaseConfigured();

  const { data, error } = await supabase.functions.invoke<WebsiteMailResponse>('website-mail', {
    body,
  });

  if (error) {
    const message = String(error.message || '');
    if (
      error.name === 'FunctionsFetchError' ||
      message.includes('Failed to fetch') ||
      message.includes('Load failed')
    ) {
      throw new Error('Email service is not deployed or CORS is blocked. Deploy the website-mail Supabase Edge Function, then try again.');
    }

    throw error;
  }

  if (!data?.ok) {
    throw new Error(data?.message || 'Unable to send email right now.');
  }

  return data;
};

export const submitContactEnquiry = (form: ContactEnquiry) =>
  invokeWebsiteMail({
    type: 'contact',
    firstName: form.firstName,
    lastName: form.lastName,
    email: form.email,
    message: form.message,
  });

export const submitNewsletterSubscription = (email: string) =>
  invokeWebsiteMail({
    type: 'subscribe',
    email,
  });
