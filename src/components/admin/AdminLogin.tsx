import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Lock } from 'lucide-react';
import { getErrorMessage } from '../../lib/errors';

export default function AdminLogin() {
  const [email, setEmail] = useState('advesatrust@hotmail.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  useEffect(() => {
    setError('');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err, 'Failed to sign in');
      if (errorMessage.includes('Invalid login credentials')) {
        setError('Invalid email or password');
      } else if (errorMessage.includes('Email not confirmed')) {
        setError('Please confirm your email address');
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <div className="bg-[#68B581] p-3 rounded-full">
            <Lock className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-8">Admin Login</h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#68B581] focus:border-transparent"
              placeholder="admin@advesatrust.org"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#68B581] focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#68B581] hover:bg-[#5ca571] text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
