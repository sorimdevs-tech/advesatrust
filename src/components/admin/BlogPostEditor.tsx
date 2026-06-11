import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { Upload, Eye, EyeOff, Trash2, CreditCard as Edit } from 'lucide-react';
import { getErrorMessage } from '../../lib/errors';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  featured_image_url: string | null;
  is_published: boolean;
  publish_date: string | null;
  created_at: string;
}

export default function BlogPostEditor() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [featuredImageUrl, setFeaturedImageUrl] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setPosts(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setMessage('');

    try {
      if (editingId) {
        const { error } = await supabase
          .from('blog_posts')
          .update({
            title,
            content,
            excerpt: excerpt || null,
            featured_image_url: featuredImageUrl || null,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingId);

        if (error) throw error;
        setMessage('Blog post updated successfully!');
      } else {
        const { error } = await supabase.from('blog_posts').insert({
          title,
          content,
          excerpt: excerpt || null,
          featured_image_url: featuredImageUrl || null,
          author_id: user.id,
        });

        if (error) throw error;
        setMessage('Blog post created successfully!');
      }

      resetForm();
      fetchPosts();
    } catch (error: unknown) {
      setMessage(getErrorMessage(error, 'Failed to save blog post'));
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setContent('');
    setExcerpt('');
    setFeaturedImageUrl('');
  };

  const editPost = (post: BlogPost) => {
    setEditingId(post.id);
    setTitle(post.title);
    setContent(post.content);
    setExcerpt(post.excerpt || '');
    setFeaturedImageUrl(post.featured_image_url || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('blog_posts')
      .update({
        is_published: !currentStatus,
        publish_date: !currentStatus ? new Date().toISOString() : null,
      })
      .eq('id', id);

    if (!error) {
      fetchPosts();
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    const { error } = await supabase.from('blog_posts').delete().eq('id', id);

    if (!error) {
      fetchPosts();
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">
            {editingId ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h3>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Post Title
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#68B581] focus:border-transparent"
            placeholder="Enter post title..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Excerpt (Optional)
          </label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#68B581] focus:border-transparent"
            placeholder="Brief summary of the post..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <textarea
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#68B581] focus:border-transparent"
            placeholder="Write your blog post content..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Featured Image URL (Optional)
          </label>
          <input
            type="text"
            value={featuredImageUrl}
            onChange={(e) => setFeaturedImageUrl(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#68B581] focus:border-transparent"
            placeholder="/image.jpg or https://example.com/image.jpg"
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
          {loading ? 'Saving...' : editingId ? 'Update Post' : 'Create Post'}
        </button>
      </form>

      <div className="border-t pt-8">
        <h3 className="text-xl font-bold mb-4">Blog Posts ({posts.length})</h3>
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-lg">{post.title}</h4>
                  {post.excerpt && <p className="text-sm text-gray-600 mt-1">{post.excerpt}</p>}
                  <p className="text-xs text-gray-500 mt-2">
                    Created: {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => editPost(post)}
                  className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm"
                >
                  <Edit className="h-3 w-3" />
                  Edit
                </button>
                <button
                  onClick={() => togglePublish(post.id, post.is_published)}
                  className={`flex items-center gap-1 px-3 py-1 rounded text-sm ${
                    post.is_published
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {post.is_published ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                  {post.is_published ? 'Published' : 'Draft'}
                </button>
                <button
                  onClick={() => deletePost(post.id)}
                  className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded text-sm"
                >
                  <Trash2 className="h-3 w-3" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
