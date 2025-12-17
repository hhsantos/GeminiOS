
import React from 'react';
import { WALLPAPERS } from '../constants';
import { Monitor, Shield, User, Globe, Wifi, Bell } from 'lucide-react';

interface SettingsProps {
  onWallpaperChange: (url: string) => void;
  currentWallpaper: string;
}

const Settings: React.FC<SettingsProps> = ({ onWallpaperChange, currentWallpaper }) => {
  const sections = [
    { id: 'system', label: 'System', icon: <Monitor size={18} /> },
    { id: 'network', label: 'Network', icon: <Wifi size={18} /> },
    { id: 'personalize', label: 'Personalization', icon: <Monitor size={18} className="text-blue-500" /> },
    { id: 'accounts', label: 'Accounts', icon: <User size={18} /> },
    { id: 'time', label: 'Time & Language', icon: <Globe size={18} /> },
    { id: 'privacy', label: 'Privacy & Security', icon: <Shield size={18} /> },
  ];

  return (
    <div className="flex h-full bg-zinc-50 dark:bg-zinc-950">
      {/* Settings Navigation */}
      <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 p-4 space-y-1">
        <div className="flex items-center gap-3 px-3 py-4 mb-4">
          <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
            <img src="https://picsum.photos/seed/user/100" alt="Profile" />
          </div>
          <div>
            <div className="text-sm font-semibold dark:text-zinc-200">Gemini User</div>
            <div className="text-[10px] text-zinc-500">Local Account</div>
          </div>
        </div>
        {sections.map(section => (
          <button 
            key={section.id}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${section.id === 'personalize' ? 'bg-white dark:bg-zinc-900 shadow-sm' : 'hover:bg-zinc-200/50 dark:hover:bg-zinc-800'}`}
          >
            {section.icon}
            <span className="dark:text-zinc-200">{section.label}</span>
          </button>
        ))}
      </aside>

      {/* Settings Content */}
      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        <div>
          <h2 className="text-2xl font-bold dark:text-white mb-2">Personalization</h2>
          <p className="text-sm text-zinc-500">Change your desktop background and accent colors.</p>
        </div>

        <section className="space-y-4">
          <h3 className="text-sm font-semibold dark:text-zinc-200">Background</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-video rounded-xl overflow-hidden border-2 border-blue-500 relative">
              <img src={currentWallpaper} alt="Current" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <span className="text-[10px] bg-blue-500 text-white px-2 py-0.5 rounded">Preview</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {WALLPAPERS.map((url, i) => (
                <button 
                  key={i}
                  onClick={() => onWallpaperChange(url)}
                  className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${url === currentWallpaper ? 'border-blue-500 scale-95' : 'border-transparent hover:border-zinc-300'}`}
                >
                  <img src={url} alt={`Wallpaper ${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 divide-y divide-zinc-200 dark:divide-zinc-800">
           <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg"><Bell size={18} /></div>
              <div>
                <div className="text-sm font-medium dark:text-zinc-200">Notifications</div>
                <div className="text-xs text-zinc-500">Enable or disable system notifications</div>
              </div>
            </div>
            <div className="w-10 h-5 bg-blue-500 rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Settings;
