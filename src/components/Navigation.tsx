import { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { label: 'About', section: 'about' },
  { label: 'Activities', section: 'activities' },
  { label: 'Gallery', section: 'gallery' },
  { label: 'Blog', section: 'blog' },
  { label: 'Contact', section: 'contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-sm'
          : 'bg-white shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group inline-flex h-14 w-14 items-center justify-center rounded-lg bg-white p-1 shadow-md shadow-gray-900/5 ring-1 ring-gray-200 transition-all hover:shadow-lg hover:ring-brand-600/40 md:h-16 md:w-16"
            aria-label="Advesa Trust home"
          >
            <img
              src="/94dee448-4fb1-42a8-ad8e-fe437361ac21.jpeg"
              alt="Advesa Trust"
              className="h-full w-full rounded-md object-contain"
            />
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.section}
                onClick={() => scrollTo(item.section)}
                className="px-4 py-2 text-sm font-medium text-dark-500 hover:text-brand-600 rounded-lg hover:bg-brand-50 transition-all"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('donate')}
              className="ml-3 btn-primary text-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Donate Now
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg className="w-6 h-6 text-dark-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-dark-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white border-t border-gray-100 px-4 py-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.section}
              onClick={() => scrollTo(item.section)}
              className="block w-full text-left px-4 py-2.5 text-dark-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition text-sm font-medium"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('donate')}
            className="w-full mt-2 bg-brand-600 hover:bg-brand-500 text-white px-4 py-2.5 rounded-lg font-semibold transition flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Donate Now
          </button>
        </div>
      </div>
    </nav>
  );
}
