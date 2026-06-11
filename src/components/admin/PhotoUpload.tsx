import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { Upload, Eye, EyeOff, Trash2 } from 'lucide-react';
import { getErrorMessage } from '../../lib/errors';

interface Photo {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category: string;
  is_published: boolean;
  created_at: string;
}

export default function PhotoUpload() {
  const { user } = useAuth();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('events');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    const { data, error } = await supabase
      .from('gallery_photos')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setPhotos(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setMessage('');

    try {
      const { error } = await supabase.from('gallery_photos').insert({
        title,
        description,
        image_url: imageUrl,
        category,
        uploaded_by: user.id,
      });

      if (error) throw error;

      setMessage('Photo uploaded successfully!');
      setTitle('');
      setDescription('');
      setImageUrl('');
      setCategory('events');
      fetchPhotos();
    } catch (error: unknown) {
      setMessage(getErrorMessage(error, 'Failed to upload photo'));
    } finally {
      setLoading(false);
    }
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('gallery_photos')
      .update({ is_published: !currentStatus })
      .eq('id', id);

    if (!error) {
      fetchPhotos();
    }
  };

  const deletePhoto = async (id: string) => {
    if (!confirm('Are you sure you want to delete this photo?')) return;

    const { error } = await supabase.from('gallery_photos').delete().eq('id', id);

    if (!error) {
      fetchPhotos();
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">How to Upload Photos</h3>
        <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
          <li>Upload your photo to the /public folder in your project</li>
          <li>Enter the filename below (e.g., /my-photo.jpg)</li>
          <li>Or use an external URL (https://example.com/photo.jpg)</li>
        </ol>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Photo Title
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#68B581] focus:border-transparent"
            placeholder="Annual Day Celebration 2024"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description (Optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#68B581] focus:border-transparent"
            placeholder="Description of the photo..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#68B581] focus:border-transparent"
          >
            <option value="events">Events</option>
            <option value="activities">Activities</option>
            <option value="education">Education</option>
            <option value="community">Community</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image URL or Path
          </label>
          <input
            type="text"
            required
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#68B581] focus:border-transparent"
            placeholder="/photo.jpg or https://example.com/photo.jpg"
          />
        </div>

        {message && (
          <div className={`px-4 py-3 rounded ${message.includes('success') ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#68B581] hover:bg-[#5ca571] text-white py-3 rounded-lg font-semibold transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Upload className="h-5 w-5" />
          {loading ? 'Uploading...' : 'Upload Photo'}
        </button>
      </form>

      <div className="border-t pt-8">
        <h3 className="text-xl font-bold mb-4">Uploaded Photos ({photos.length})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="bg-gray-50 rounded-lg p-4 flex gap-4">
              <img
                src={photo.image_url}
                alt={photo.title}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="font-semibold">{photo.title}</h4>
                <p className="text-sm text-gray-600">{photo.category}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => togglePublish(photo.id, photo.is_published)}
                    className={`flex items-center gap-1 px-3 py-1 rounded text-sm ${
                      photo.is_published
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {photo.is_published ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                    {photo.is_published ? 'Published' : 'Hidden'}
                  </button>
                  <button
                    onClick={() => deletePhoto(photo.id)}
                    className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded text-sm"
                  >
                    <Trash2 className="h-3 w-3" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
