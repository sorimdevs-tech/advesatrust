import { useState } from 'react';
import {
  ArrowRight,
  ArrowUp,
  BookOpen,
  CheckCircle2,
  HeartHandshake,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { getErrorMessage } from '../lib/errors';
import { submitNewsletterSubscription } from '../lib/websiteMail';

const quickLinks = [
  { label: 'About Us', id: 'about' },
  { label: 'Our Team', id: 'team' },
  { label: 'Activities', id: 'activities' },
  { label: 'Gallery', id: 'gallery' },
  { label: 'Blog', id: 'blog' },
  { label: 'Contact', id: 'contact' },
];

const impactStats = [
  { value: '17+', label: 'Years serving' },
  { value: '705+', label: 'Children reached' },
  { value: '3,224+', label: 'Library books' },
];

const footerPhotos = [
  { src: '/DSC00040.JPG', alt: 'Children at library activities' },
  { src: '/DSC00045.JPG', alt: 'Library reading session' },
  { src: '/photo3.JPG', alt: 'Advesa Trust community gathering' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [subscriptionError, setSubscriptionError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribing(true);
    setSubscribed(false);
    setSubscriptionError('');

    try {
      await submitNewsletterSubscription(email);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    } catch (err) {
      setSubscriptionError(getErrorMessage(err, 'Sorry, subscription failed. Please try again.'));
    } finally {
      setSubscribing(false);
    }
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden bg-[#101820] text-white">
      <div className="h-1 bg-gradient-to-r from-brand-600 via-[#f1c84c] to-brand-500" />
      <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-8">
        <div className="mb-12 overflow-hidden rounded-lg border border-white/10 bg-white/[0.06] shadow-2xl shadow-black/20">
          <div className="grid lg:grid-cols-[1.25fr_0.75fr]">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-semibold text-brand-100">
                <HeartHandshake className="h-4 w-4 text-[#f1c84c]" />
                Bring Light to Life
              </div>

              <h2 className="mt-5 max-w-2xl text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                Helping children stay curious, confident, and connected to education.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                A group of social responsible professionals adjoin their hands to extend their support to children for educational needs.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {impactStats.map((stat) => (
                  <div key={stat.label} className="rounded-lg border border-white/10 bg-black/15 p-4">
                    <p className="text-2xl font-bold text-[#f1c84c]">{stat.value}</p>
                    <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => scrollTo('donate')}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-900/30 transition hover:bg-brand-500 active:scale-[0.98]"
                >
                  Support Education
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => scrollTo('contact')}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15 active:scale-[0.98]"
                >
                  Contact Us
                  <Mail className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid min-h-[280px] grid-cols-3 gap-1 bg-black/20 p-1 lg:min-h-full">
              {footerPhotos.map((photo, index) => (
                <div
                  key={photo.src}
                  className={`relative overflow-hidden ${index === 0 ? 'col-span-2 row-span-2' : ''}`}
                >
                  <img src={photo.src} alt={photo.alt} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
              <div className="flex min-h-56 items-center justify-center rounded-lg bg-gradient-to-br from-white via-white to-brand-50 p-5 shadow-xl shadow-black/20 ring-1 ring-white/20">
                <img
                  src="public\advlogo.jpg"
                  alt="Advesa Trust"
                  className="h-44 max-w-full rounded-md object-contain drop-shadow-sm"
                />
              </div>
            </div>

            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                <span className="leading-6 text-slate-300">Flat 5, Block 2, Pace Prana, Padikuppam Road, Chennai 600040</span>
              </div>
              <a href="mailto:advesatrust@hotmail.com" className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-3 text-slate-300 transition hover:border-brand-500/50 hover:text-white">
                <Mail className="h-4 w-4 shrink-0 text-brand-400" />
                advesatrust@hotmail.com
              </a>
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-3">
                <Phone className="h-4 w-4 shrink-0 text-brand-400" />
                <div className="text-slate-300">
                  <a href="tel:+919962258091" className="transition hover:text-white">+91 9962258091</a>
                  <span className="mx-1 text-slate-500">/</span>
                  <a href="tel:+919176228387" className="transition hover:text-white">+91 9176228387</a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">Explore</h3>
            <ul className="grid grid-cols-2 gap-2 sm:max-w-md lg:grid-cols-1">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="group flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
                  >
                    {link.label}
                    <ArrowRight className="h-3.5 w-3.5 text-slate-600 transition group-hover:translate-x-0.5 group-hover:text-brand-400" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-600/15 text-brand-300">
                  <Send className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">Stay Connected</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Subscribe to our newsletter and be the first to know about our events, activities, and impact stories.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Your email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="min-w-0 flex-1 rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30"
                />
                <button type="submit" disabled={subscribing} className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-dark-800 transition hover:bg-brand-50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70">
                  {subscribing ? 'Subscribing...' : 'Subscribe'}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              {subscribed && (
                <div className="mt-3 flex items-center gap-2 rounded-lg border border-brand-500/20 bg-brand-600/10 px-4 py-3 text-sm text-brand-100">
                  <CheckCircle2 className="h-4 w-4 text-brand-300" />
                  Thank you for subscribing!
                </div>
              )}

              {subscriptionError && (
                <div className="mt-3 rounded-lg border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                  {subscriptionError}
                </div>
              )}

              <div className="mt-6 grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-2">
                <span className="inline-flex items-center gap-2 rounded-lg bg-white/[0.06] px-3 py-2 text-xs text-slate-300">
                  <ShieldCheck className="h-4 w-4 text-[#f1c84c]" />
                  PAN: AACTA4113E
                </span>
                <span className="inline-flex items-center gap-2 rounded-lg bg-white/[0.06] px-3 py-2 text-xs text-slate-300">
                  <BookOpen className="h-4 w-4 text-[#f1c84c]" />
                  80G Registered
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-sm md:flex-row">
            <p className="text-slate-500">
              &copy; {new Date().getFullYear()} <span className="text-slate-300">Advesa Trust</span>. All rights reserved.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-300 transition hover:border-brand-500/50 hover:bg-brand-600 hover:text-white"
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
