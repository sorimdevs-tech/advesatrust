const teamMembers = [
  { name: 'Dr. C Shanthi', role: 'Founder', image: '/IMG-20250825-WA0012.jpg' },
  { name: 'Mr. R Subramanian', role: 'Managing Trustee', image: '/IMG-20250825-WA0013.jpg' },
  { name: 'Mrs. D Vinodhini', role: 'Co-Trustee', image: '/IMG-20250824-WA0010.jpg' },
  { name: 'Mrs. V Sushama', role: 'Librarian', image: '/IMG-20250824-WA0011.jpg' },
];

export default function Team() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="section-title">Our Team</h2>
          <p className="section-subtitle">
            Meet the dedicated individuals who work tirelessly to provide educational support and opportunities for children in need.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {teamMembers.map((m) => (
            <div key={m.name} className="group">
              <div className="relative rounded-2xl overflow-hidden mb-4 aspect-[3/4] shadow-sm group-hover:shadow-xl transition-all duration-300">
                <img src={m.image} alt={m.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-800/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white font-semibold">{m.name}</p>
                  <p className="text-white/70 text-sm">{m.role}</p>
                </div>
              </div>
              <div className="text-center sm:hidden">
                <h3 className="font-bold text-dark-700">{m.name}</h3>
                <p className="text-brand-600 text-sm font-medium">{m.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="relative bg-gradient-to-r from-brand-600 to-brand-500 rounded-2xl p-10 md:p-12 text-white overflow-hidden">
          <svg className="absolute top-4 right-4 w-20 h-20 text-white/10" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p className="text-lg md:text-xl leading-relaxed max-w-4xl mx-auto text-center relative z-10 font-medium">
            "We believe that every child deserves access to quality education and opportunities to succeed. By supporting
            Advesa Trust, you can help make this belief a reality and make a positive impact on the future of our community."
          </p>
        </div>
      </div>
    </section>
  );
}