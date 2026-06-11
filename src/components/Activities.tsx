const activities = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Annual Day',
    desc: 'Annual day conducted at our premises each year with various kinds of activities performed by our students.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    iconBg: 'bg-emerald-100',
    border: 'border-emerald-500',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Workshops',
    desc: 'Workshops includes craft works, origami, tree planting which includes social work and skill set.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    iconBg: 'bg-blue-100',
    border: 'border-blue-500',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: 'Chudar Magazine',
    desc: 'Our students magazine work created and published each year which gives them a great mileage.',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    iconBg: 'bg-purple-100',
    border: 'border-purple-500',
  },
];

export default function Activities() {
  return (
    <section id="activities" className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Programs
          </span>
          <h2 className="section-title">Our Activities</h2>
          <p className="section-subtitle">Engaging programs that nurture creativity, skills, and character development in children.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {activities.map((a) => (
            <div key={a.title} className="card card-hover p-8">
              <div className={`w-14 h-14 ${a.iconBg} rounded-2xl flex items-center justify-center mb-5`}>
                <span className={a.color}>{a.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-dark-700 mb-3">{a.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}