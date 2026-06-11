export default function Vision() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission Row */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="section-label">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Our Mission
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark-700 mb-5">Supporting Educational Excellence</h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              Our mission is to support children's educational needs through community engagement and partnerships with
              local organizations. We believe that access to quality education is the key to empowering individuals and
              communities to create a better future.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Education', 'Community', 'Empowerment', 'Growth'].map((t) => (
                <span key={t} className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-xs font-medium">{t}</span>
              ))}
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3] group">
            <img src="/DSC00045.JPG" alt="Library" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-700/30 to-transparent" />
          </div>
        </div>

        {/* Vision Row */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mt-20">
          <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3] group order-2 lg:order-1">
            <img src="/DSC00040.JPG" alt="Children learning" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-700/30 to-transparent" />
          </div>
          <div className="order-1 lg:order-2">
            <span className="section-label">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Our Vision
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark-700 mb-5">A Brighter Future for All</h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              Our vision is a world where all children have access to quality education and opportunities to succeed.
              We strive to make this vision a reality by working with local communities and organizations to provide
              educational support and resources.
            </p>
            <button onClick={() => document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' })} className="btn-primary">
              Support Our Vision
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}