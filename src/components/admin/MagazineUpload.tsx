import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { Upload, Eye, EyeOff, Trash2, FileText } from 'lucide-react';
import { getErrorMessage } from '../../lib/errors';

interface Magazine {
  id: string;
  title: string;
  description: string | null;
  cover_image_url: string | null;
  pdf_url: string;
  issue_date: string | null;
  is_published: boolean;
  created_at: string;
}

export default function MagazineUpload() {
  const { user } = useAuth();
  const [magazines, setMagazines] = useState<Magazine[]>([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchMagazines();
  }, []);

  const fetchMagazines = async () => {
    const { data, error } = await supabase
      .from('magazines')
      .select('*')
      .order('issue_date', { ascending: false });

    if (!error && data) {
      setMagazines(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setMessage('');

    try {
      const { error } = await supabase.from('magazines').insert({
        title,
        description,
        cover_image_url: coverImageUrl || null,
        pdf_url: pdfUrl,
        issue_date: issueDate || null,
        uploaded_by: user.id,
      });

      if (error) throw error;

      setMessage('Magazine uploaded successfully!');
      setTitle('');
      setDescription('');
      setCoverImageUrl('');
      setPdfUrl('');
      setIssueDate('');
      fetchMagazines();
    } catch (error: unknown) {
      setMessage(getErrorMessage(error, 'Failed to upload magazine'));
    } finally {
      setLoading(false);
    }
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('magazines')
      .update({ is_published: !currentStatus })
      .eq('id', id);

    if (!error) {
      fetchMagazines();
    }
  };

  const deleteMagazine = async (id: string) => {
    if (!confirm('Are you sure you want to delete this magazine?')) return;

    const { error } = await supabase.from('magazines').delete().eq('id', id);

    if (!error) {
      fetchMagazines();
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">How to Upload Magazines</h3>
        <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
          <li>Upload your PDF and cover image to the /public folder</li>
          <li>Enter the filenames below (e.g., /magazine.pdf, /cover.jpg)</li>
          <li>Or use external URLs for hosted files</li>
        </ol>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Magazine Title
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#68B581] focus:border-transparent"
            placeholder="Annual Magazine 2024"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#68B581] focus:border-transparent"
            placeholder="Description of the magazine..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cover Image URL (Optional)
          </label>
          <input
            type="text"
            value={coverImageUrl}
            onChange={(e) => setCoverImageUrl(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#68B581] focus:border-transparent"
            placeholder="/cover.jpg or https://example.com/cover.jpg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PDF URL
          </label>
          <input
            type="text"
            required
            value={pdfUrl}
            onChange={(e) => setPdfUrl(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#68B581] focus:border-transparent"
            placeholder="/magazine.pdf or https://example.com/magazine.pdf"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Issue Date (Optional)
          </label>
          <input
            type="date"
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#68B581] focus:border-transparent"
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
          {loading ? 'Uploading...' : 'Upload Magazine'}
        </button>
      </form>

      <div className="border-t pt-8">
        <h3 className="text-xl font-bold mb-4">Uploaded Magazines ({magazines.length})</h3>
        <div className="space-y-4">
          {magazines.map((magazine) => (
            <div key={magazine.id} className="bg-gray-50 rounded-lg p-4 flex gap-4">
              {magazine.cover_image_url ? (
                <img
                  src={magazine.cover_image_url}
                  alt={magazine.title}
                  className="w-24 h-32 object-cover rounded"
                />
              ) : (
                <div className="w-24 h-32 bg-gray-200 rounded flex items-center justify-center">
                  <FileText className="h-8 w-8 text-gray-400" />
                </div>
              )}
              <div className="flex-1">
                <h4 className="font-semibold">{magazine.title}</h4>
                <p className="text-sm text-gray-600">{magazine.description}</p>
                {magazine.issue_date && (
                  <p className="text-sm text-gray-500 mt-1">
                    Issue Date: {new Date(magazine.issue_date).toLocaleDateString()}
                  </p>
                )}
                <div className="flex gap-2 mt-2">
                  <a
                    href={magazine.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm"
                  >
                    View PDF
                  </a>
                  <button
                    onClick={() => togglePublish(magazine.id, magazine.is_published)}
                    className={`flex items-center gap-1 px-3 py-1 rounded text-sm ${
                      magazine.is_published
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {magazine.is_published ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                    {magazine.is_published ? 'Published' : 'Hidden'}
                  </button>
                  <button
                    onClick={() => deleteMagazine(magazine.id)}
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
