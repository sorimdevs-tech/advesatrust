import { useState } from 'react';
import { getErrorMessage } from '../lib/errors';
import { submitContactEnquiry } from '../lib/websiteMail';

export default function Contact() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSent(false);
    setError('');

    try {
      await submitContactEnquiry(form);
      setSent(true);
      setForm({ firstName: '', lastName: '', email: '', message: '' });
      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      setError(getErrorMessage(err, 'Sorry, we could not send your message right now. Please try again.'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Get in Touch
          </span>
          <h2 className="section-title">Contact Us</h2>
          <p className="section-subtitle">Have a question or want to get involved? We'd love to hear from you.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-6">
            <div className="card p-8">
              <h3 className="text-lg font-bold text-dark-700 mb-6">Our Information</h3>
              <div className="space-y-5">
                {[
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    ),
                    title: 'Address',
                    body: 'Flat 5, Block 2, Third Floor, Pace Prana Apartment, Padikuppam Road, Chennai 600040',
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    ),
                    title: 'Phone',
                    body: '+91 9962258091 / +91 9176228387',
                    href: 'tel:+919962258091',
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    ),
                    title: 'Email',
                    body: 'advesatrust@hotmail.com',
                    href: 'mailto:advesatrust@hotmail.com',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center shrink-0">
                      <span className="text-brand-600">{item.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-dark-700 text-sm">{item.title}</h4>
                      {item.href ? (
                        <a href={item.href} className="text-gray-500 text-sm hover:text-brand-600 transition">{item.body}</a>
                      ) : (
                        <p className="text-gray-500 text-sm">{item.body}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-brand-600 to-brand-500 rounded-2xl p-8 text-white">
              <h3 className="text-lg font-bold mb-2">Library Hours</h3>
              <p className="text-white/80 text-sm mb-1">Monday – Friday</p>
              <p className="text-2xl font-bold">5:00 – 7:00 PM</p>
              <p className="text-white/60 text-xs mt-2">Alphonsa Children's Library, Mathur</p>
            </div>
          </div>

          {/* Form */}
          <div className="card p-8">
            <h3 className="text-lg font-bold text-dark-700 mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1.5">First Name *</label>
                  <input type="text" required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-600/30 focus:border-brand-600 outline-none transition text-sm" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1.5">Last Name</label>
                  <input type="text" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-600/30 focus:border-brand-600 outline-none transition text-sm" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">Email *</label>
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-600/30 focus:border-brand-600 outline-none transition text-sm" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">Message</label>
                <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-600/30 focus:border-brand-600 outline-none transition text-sm resize-none" placeholder="Tell us how you'd like to help..." />
              </div>
              <button type="submit" disabled={submitting} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
              {sent && (
                <div className="bg-brand-50 text-brand-600 rounded-xl px-4 py-3 text-sm text-center">
                  Thank you! We emailed you a confirmation and will get back to you shortly.
                </div>
              )}
              {error && (
                <div className="bg-red-50 text-red-600 rounded-xl px-4 py-3 text-sm text-center border border-red-100">
                  {error}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
