const stats = [
  { value: '3,224', label: 'Total Books', sub: 'In our library', icon: 'book' },
  { value: '705', label: 'Total Members', sub: 'Active children', icon: 'users' },
  { value: '200+', label: 'Scholarships', sub: 'Students supported', icon: 'star' },
  { value: '25+', label: 'Graduates', sub: 'Degree holders', icon: 'graduation' },
];

const iconMap: Record<string, React.ReactNode> = {
  book: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  users: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  star: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
  graduation: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path d="M12 14l9-5-9-5-9 5 9 5z" />
      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
    </svg>
  ),
};

export default function Impact() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Impact
          </span>
          <h2 className="section-title">Our Impact</h2>
          <p className="section-subtitle">Numbers that reflect our commitment to children's education and empowerment.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((s) => (
            <div key={s.label} className="card card-hover p-6">
              <div className="w-11 h-11 bg-brand-50 rounded-xl flex items-center justify-center mb-4">
                <span className="text-brand-600">{iconMap[s.icon]}</span>
              </div>
              <div className="text-3xl font-bold text-dark-700 mb-1">{s.value}</div>
              <div className="font-semibold text-dark-600 text-sm">{s.label}</div>
              <div className="text-gray-400 text-xs mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Demographics */}
        <div className="card p-8">
          <h3 className="text-lg font-bold text-dark-700 mb-6">Member Demographics</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { label: 'Girls', count: 378, pct: 52 },
              { label: 'Boys', count: 342, pct: 48 },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-dark-700">{item.label}</span>
                  <span className="text-sm text-gray-500">{item.count} children ({item.pct}%)</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${item.label === 'Girls' ? 'bg-emerald-500' : 'bg-blue-500'}`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-5 border-t border-gray-100 text-center">
            <p className="text-gray-500 text-sm">Total of <strong className="text-dark-700">720 children</strong> served through our programs</p>
          </div>
        </div>
      </div>
    </section>
  );
}