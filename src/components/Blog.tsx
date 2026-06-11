import { useEffect, useState } from 'react';
import { supabase, Event } from '../lib/supabase';

export default function Blog() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('is_published', true)
        .order('event_date', { ascending: true });
      if (!error && data) setEvents(data);
      setLoading(false);
    })();
  }, []);

  const formatDate = (s: string) =>
    new Date(s).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const typeLabel = (t: string) =>
    ({ workshop: 'Workshop', library_session: 'Library Session', community_event: 'Community Event' }[t] || t);

  const upcoming = events.filter((e) => new Date(e.event_date) >= new Date());
  const past = events.filter((e) => new Date(e.event_date) < new Date());

  return (
    <section id="blog" className="section-padding bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            Updates
          </span>
          <h2 className="section-title">Events & Updates</h2>
          <p className="section-subtitle">Stay informed about our upcoming programs, workshops, and community events.</p>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-brand-600 border-t-transparent" />
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-lg">No events scheduled yet</p>
            <p className="text-sm mt-1">Check back soon for upcoming programs and activities!</p>
          </div>
        ) : (
          <>
            {upcoming.length > 0 && (
              <div className="mb-14">
                <h3 className="text-xl font-bold text-dark-700 mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 bg-brand-600 rounded-full animate-pulse" />
                  Upcoming Events
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {upcoming.map((e) => (
                    <div key={e.id} className="card card-hover overflow-hidden">
                      {e.image_url && (
                        <div className="h-48 overflow-hidden">
                          <img src={e.image_url} alt={e.title} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                        </div>
                      )}
                      <div className="p-6">
                        <span className="inline-block bg-brand-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                          {typeLabel(e.event_type)}
                        </span>
                        <h4 className="text-lg font-bold text-dark-700 mb-2">{e.title}</h4>
                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{e.description}</p>
                        <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {formatDate(e.event_date)}
                          </span>
                          {e.location && (
                            <span className="flex items-center gap-1">
                              <svg className="w-3.5 h-3.5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {e.location}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {past.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-dark-700 mb-6">Past Events</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {past.map((e) => (
                    <div key={e.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden opacity-75 hover:opacity-100 transition">
                      {e.image_url && (
                        <div className="h-40 overflow-hidden">
                          <img src={e.image_url} alt={e.title} className="w-full h-full object-cover opacity-80" />
                        </div>
                      )}
                      <div className="p-5">
                        <span className="inline-block bg-gray-300 text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">
                          {typeLabel(e.event_type)}
                        </span>
                        <h4 className="text-base font-bold text-gray-600 mb-1">{e.title}</h4>
                        <p className="text-gray-400 text-sm line-clamp-2">{e.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}