export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-dark-800">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/photo3.JPG"
          alt="Children at Advesa Trust"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900/95 via-dark-800/85 to-dark-800/70" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-brand-600/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-h-[85vh] flex items-center">
          <div className="max-w-3xl py-20 md:py-32 animate-fade-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-white/10">
              <svg className="w-4 h-4 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Serving Since 2008
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-[1.1] text-white">
              Empowering Children
              <span className="block text-brand-600 mt-2">Through Education</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-xl">
              Supporting children from economically backward families with quality education,
              skills development, and community engagement since 2008.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollTo('donate')}
                className="inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-brand-600/30 active:scale-[0.98]"
              >
                Donate Now
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <button
                onClick={() => scrollTo('about')}
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all border border-white/20 active:scale-[0.98]"
              >
                Learn More
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 md:gap-10 mt-14 pt-8 border-t border-white/10">
              {[
                { value: '17+', label: 'Years of Service' },
                { value: '705+', label: 'Children Reached' },
                { value: '3,224+', label: 'Books in Library' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <span className="text-2xl md:text-3xl font-bold text-brand-600">{stat.value}</span>
                  <div className="w-px h-8 bg-white/10 last:hidden" />
                  <span className="text-sm text-gray-400">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}