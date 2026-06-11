import { ArrowRight } from 'lucide-react';

const cards = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Our Mission',
    desc: 'Empowering children through education and creating opportunities for a brighter future.',
    action: 'Learn More',
    section: 'about',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Get Involved',
    desc: 'Join our community of volunteers and make a meaningful difference in children\'s lives.',
    action: 'Join Us',
    section: 'contact',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Support Us',
    desc: 'Your generous donation helps us provide quality education and resources to children in need.',
    action: 'Donate Now',
    section: 'donate',
    highlight: true,
  },
];

export default function Mission() {
  return (
    <section className="py-16 md:py-24 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Get Involved
          </span>
          <h2 className="section-title">How You Can Help</h2>
          <p className="section-subtitle">
            Every contribution, big or small, helps us create a better future for children in need.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card) => (
            <button
              key={card.title}
              onClick={() => document.getElementById(card.section)?.scrollIntoView({ behavior: 'smooth' })}
              className={`group relative text-left p-8 md:p-10 rounded-2xl transition-all duration-300 card-hover ${
                card.highlight
                  ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20'
                  : 'bg-white shadow-sm border border-gray-100'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 ${
                card.highlight ? 'bg-white/20 text-white' : 'bg-brand-50 text-brand-600'
              }`}>
                {card.icon}
              </div>
              <h3 className={`text-xl font-bold mb-3 ${card.highlight ? 'text-white' : 'text-dark-700'}`}>
                {card.title}
              </h3>
              <p className={`leading-relaxed mb-6 text-sm ${card.highlight ? 'text-white/80' : 'text-gray-500'}`}>
                {card.desc}
              </p>
              <span className={`inline-flex items-center gap-2 text-sm font-semibold transition-all group-hover:gap-3 ${
                card.highlight ? 'text-white' : 'text-brand-600'
              }`}>
                {card.action}
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}