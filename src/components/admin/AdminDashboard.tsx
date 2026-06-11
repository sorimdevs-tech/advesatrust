import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, Image, FileText, BookOpen } from 'lucide-react';
import PhotoUpload from './PhotoUpload';
import MagazineUpload from './MagazineUpload';
import BlogPostEditor from './BlogPostEditor';

type Tab = 'photos' | 'magazines' | 'blog';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('photos');
  const { user, signOut } = useAuth();

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'photos', label: 'Gallery Photos', icon: <Image className="h-5 w-5" /> },
    { id: 'magazines', label: 'Magazines', icon: <BookOpen className="h-5 w-5" /> },
    { id: 'blog', label: 'Blog Posts', icon: <FileText className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Logged in as: {user?.email}</p>
            </div>
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium text-sm transition ${
                    activeTab === tab.id
                      ? 'border-[#68B581] text-[#68B581]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'photos' && <PhotoUpload />}
            {activeTab === 'magazines' && <MagazineUpload />}
            {activeTab === 'blog' && <BlogPostEditor />}
          </div>
        </div>
      </div>
    </div>
  );
}
