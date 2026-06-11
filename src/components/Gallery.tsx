import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';

interface Photo {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category: string;
}

const defaultPhotos: Photo[] = [
  { id: 'd1', title: 'Children at library activities', description: null, image_url: '/DSC00040.JPG', category: 'activities' },
  { id: 'd2', title: 'Library reading session', description: null, image_url: '/DSC00045.JPG', category: 'activities' },
  { id: 'd3', title: 'Annual day celebration', description: null, image_url: '/photo3.JPG', category: 'events' },
];

export default function Gallery() {
  const [dbPhotos, setDbPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [lightbox, setLightbox] = useState<Photo | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await supabase.from('gallery_photos').select('*').eq('is_published', true).order('created_at', { ascending: false });
      if (data) setDbPhotos(data);
      setLoading(false);
    })();
  }, []);

  const all = [...dbPhotos, ...defaultPhotos];
  const cats = ['all', ...Array.from(new Set(all.map((p) => p.category)))];
  const filtered = category === 'all' ? all : all.filter((p) => p.category === category);
  const idx = filtered.findIndex((p) => p.id === lightbox?.id);

  const prev = useCallback(() => setLightbox(filtered[(idx - 1 + filtered.length) % filtered.length]), [idx, filtered]);
  const next = useCallback(() => setLightbox(filtered[(idx + 1) % filtered.length]), [idx, filtered]);

  return (
    <section id="gallery" className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Gallery
          </span>
          <h2 className="section-title">Our Gallery</h2>
          <p className="section-subtitle">A glimpse into our library activities, workshops, and events with the children we serve.</p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                category === c
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-brand-600 border-t-transparent" />
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <button key={p.id} onClick={() => setLightbox(p)} className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 aspect-[4/3]">
                <img src={p.image_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-800/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-white font-semibold">{p.title}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-lg">No photos available yet</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 text-white/80 hover:text-white transition z-10">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 text-white/80 hover:text-brand-600 transition z-10">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 text-white/80 hover:text-brand-600 transition z-10">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="max-w-5xl max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.image_url} alt={lightbox.title} className="w-full h-full object-contain rounded-2xl" />
            <p className="text-white text-center mt-4 font-medium">{lightbox.title}</p>
          </div>
        </div>
      )}
    </section>
  );
}