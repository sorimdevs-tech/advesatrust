export default function About() {
  return (
    <section id="about" className="py-16 md:py-24 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Our Story
          </span>
          <h2 className="section-title">About Advesa Trust</h2>
          <p className="section-subtitle">
            Serving children from economically backward families since 2008
          </p>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-gray-50 rounded-2xl p-8 md:p-10 space-y-5 text-gray-600 leading-relaxed">
              <p className="text-base md:text-lg">
                <strong className="text-brand-600">"Advesa Charitable Trust"</strong> was established in October 2008 with a motto to serve children from economically
                backward families through books and knowledge-based activities. A free children's library started by Dr. C.
                Shanthi before the trust establishment was included as the main project.
              </p>

              <div className="bg-white border-l-4 border-brand-600 rounded-r-xl p-5 shadow-sm">
                <p className="font-semibold text-dark-700">
                  The children's library is called <span className="text-brand-600">'Alphonsa Children's Library'</span>, named after the Saint belonging to the FCC
                  trust of Jeevodaya at Mathur where the library is located.
                </p>
              </div>

              <p>
                The hall utilized for the library functioned as Alphonsa Kindergarten school for many years. Jeevodaya has allowed us to use the hall free of cost all
                these years. Functioning hours are <strong className="text-dark-700">5 to 7 PM, Monday to Friday</strong>.
              </p>

              <p>
                <strong className="text-brand-600">Sushama Teacher</strong> is the Librarian who guides the children and maintains the library with great effort and sincerity.
              </p>
            </div>
          </div>

          {/* Sidebar Cards */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-brand-600 rounded-2xl p-8 text-white">
              <svg className="w-10 h-10 mb-4 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-bold mb-2">Our Motto</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                To serve children from economically backward families through books and knowledge-based activities.
              </p>
            </div>
            <div className="bg-dark-700 rounded-2xl p-8 text-white">
              <svg className="w-10 h-10 mb-4 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h3 className="text-lg font-bold mb-2">Our Reach</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Over 700 children impacted through our library, scholarships, and educational programs since our founding.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}