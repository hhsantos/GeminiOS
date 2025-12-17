
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  LayoutGrid, 
  Wifi, 
  Volume2, 
  Battery, 
  Clock,
  Power,
  User,
  Settings as SettingsIcon,
  ChevronRight,
  LogOut,
  Bot,
  Folder
} from 'lucide-react';
import { AppId, WindowState } from './types';
import { DESKTOP_ICONS, WALLPAPERS } from './constants';
import WindowFrame from './components/WindowFrame';
import GeminiAssistant from './apps/GeminiAssistant';
import FileExplorer from './apps/FileExplorer';
import Notepad from './apps/Notepad';
import Terminal from './apps/Terminal';
import Settings from './apps/Settings';

const App: React.FC = () => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [maxZ, setMaxZ] = useState(10);
  const [wallpaper, setWallpaper] = useState(WALLPAPERS[0]);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const openApp = (appId: AppId) => {
    const existing = windows.find(w => w.id === appId);
    if (existing) {
      focusWindow(appId);
      if (existing.isMinimized) {
        setWindows(prev => prev.map(w => w.id === appId ? { ...w, isMinimized: false } : w));
      }
    } else {
      const appInfo = DESKTOP_ICONS.find(i => i.id === appId);
      if (appInfo) {
        const newWindow: WindowState = {
          id: appId,
          title: appInfo.label,
          icon: appInfo.icon,
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          zIndex: maxZ + 1
        };
        setWindows(prev => [...prev, newWindow]);
        setMaxZ(prev => prev + 1);
      }
    }
    setIsStartMenuOpen(false);
  };

  const closeWindow = (id: AppId) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  };

  const minimizeWindow = (id: AppId) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
  };

  const maximizeWindow = (id: AppId) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
  };

  const focusWindow = (id: AppId) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: maxZ + 1 } : w));
    setMaxZ(prev => prev + 1);
  };

  const renderApp = (id: AppId) => {
    switch (id) {
      case 'gemini': return <GeminiAssistant />;
      case 'explorer': return <FileExplorer />;
      case 'notepad': return <Notepad />;
      case 'terminal': return <Terminal />;
      case 'settings': return <Settings currentWallpaper={wallpaper} onWallpaperChange={setWallpaper} />;
      case 'calc': return <div className="p-8 text-center text-zinc-500">Calculator module coming soon...</div>;
      default: return null;
    }
  };

  return (
    <div 
      className="h-screen w-screen overflow-hidden flex flex-col relative"
      style={{ backgroundImage: `url(${wallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Desktop Icons */}
      <div className="flex-1 p-4 grid grid-flow-col grid-rows-[repeat(auto-fill,100px)] gap-4 auto-cols-[100px]">
        {DESKTOP_ICONS.map((icon) => (
          <button 
            key={icon.id}
            onDoubleClick={() => openApp(icon.id)}
            className="flex flex-col items-center gap-2 p-2 hover:bg-white/10 rounded-lg group transition-all"
          >
            <div className="p-1 group-active:scale-95 transition-transform drop-shadow-lg">
              {icon.icon}
            </div>
            <span className="text-white text-[11px] font-medium text-center drop-shadow-md leading-tight">
              {icon.label}
            </span>
          </button>
        ))}
      </div>

      {/* Windows */}
      {windows.map((window) => (
        <WindowFrame 
          key={window.id}
          window={window}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onMaximize={maximizeWindow}
          onFocus={focusWindow}
        >
          {renderApp(window.id)}
        </WindowFrame>
      ))}

      {/* Start Menu Overlay */}
      {isStartMenuOpen && (
        <div 
          className="absolute inset-0 z-[100]" 
          onClick={() => setIsStartMenuOpen(false)}
        >
          <div 
            className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[640px] h-[720px] bg-zinc-900/85 backdrop-blur-3xl rounded-2xl border border-white/10 shadow-2xl p-8 flex flex-col animate-in slide-in-from-bottom-10 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Start Menu Search */}
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input 
                autoFocus
                type="text" 
                placeholder="Search for apps, settings, and documents" 
                className="w-full bg-black/40 border border-white/5 rounded-full py-3 pl-12 pr-4 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>

            {/* Pinned Apps */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-semibold text-zinc-200">Pinned</h3>
                <button className="text-[11px] bg-white/5 hover:bg-white/10 px-3 py-1 rounded text-zinc-400 transition-colors">All apps</button>
              </div>
              <div className="grid grid-cols-6 gap-y-8">
                {DESKTOP_ICONS.map(app => (
                  <button 
                    key={app.id} 
                    onClick={() => openApp(app.id)}
                    className="flex flex-col items-center gap-2 hover:bg-white/5 p-2 rounded-lg transition-colors group"
                  >
                    <div className="scale-75 group-hover:scale-90 transition-transform">
                      {app.icon}
                    </div>
                    <span className="text-[11px] text-zinc-300">{app.label}</span>
                  </button>
                ))}
              </div>

              <div className="mt-12">
                 <h3 className="text-sm font-semibold text-zinc-200 mb-6">Recommended</h3>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg cursor-pointer">
                      <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center text-blue-400">
                        {/* Fix: Corrected casing for Bot icon component */}
                        <Bot size={16} />
                      </div>
                      <div className="flex-1">
                        <div className="text-[11px] font-medium text-zinc-200">Welcome to GeminiOS</div>
                        <div className="text-[10px] text-zinc-500">2h ago</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg cursor-pointer">
                      <div className="w-8 h-8 rounded bg-yellow-500/20 flex items-center justify-center text-yellow-400">
                        {/* Fix: Corrected casing for Folder icon component */}
                        <Folder size={16} />
                      </div>
                      <div className="flex-1">
                        <div className="text-[11px] font-medium text-zinc-200">Work Projects</div>
                        <div className="text-[10px] text-zinc-500">Yesterday</div>
                      </div>
                    </div>
                 </div>
              </div>
            </div>

            {/* Profile Bar */}
            <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-zinc-700">
                  <img src="https://picsum.photos/seed/user/100" alt="User" />
                </div>
                <span className="text-[11px] font-medium text-zinc-200">Gemini User</span>
              </div>
              <button className="p-2 hover:bg-white/10 rounded-lg text-zinc-400 transition-colors">
                <Power size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Taskbar */}
      <footer className="h-12 bg-zinc-900/60 backdrop-blur-2xl border-t border-white/10 flex items-center px-3 z-[200]">
        <div className="flex-1 flex items-center gap-1">
           {/* Left section: Optional widgets */}
        </div>

        {/* Center section: Pinned/Active Apps */}
        <div className="flex items-center gap-1.5 absolute left-1/2 -translate-x-1/2">
          <button 
            onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
            className={`p-1.5 rounded transition-all active:scale-90 ${isStartMenuOpen ? 'bg-white/10' : 'hover:bg-white/10'}`}
          >
            <div className="w-6 h-6 bg-blue-500 rounded-sm flex items-center justify-center shadow-lg shadow-blue-500/30">
              <LayoutGrid size={14} className="text-white" />
            </div>
          </button>

          <div className="w-px h-6 bg-white/10 mx-1" />

          {DESKTOP_ICONS.slice(0, 4).map(app => {
            const isOpen = windows.some(w => w.id === app.id);
            const isFocused = windows.find(w => w.id === app.id)?.zIndex === maxZ;
            return (
              <button 
                key={app.id}
                onClick={() => openApp(app.id)}
                className={`p-1.5 rounded relative transition-all active:scale-90 group ${isFocused ? 'bg-white/10' : 'hover:bg-white/10'}`}
              >
                <div className="scale-75">{app.icon}</div>
                {isOpen && (
                  <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-[3px] bg-blue-400 rounded-full transition-all ${isFocused ? 'w-3 opacity-100' : 'opacity-60 group-hover:opacity-100'}`} />
                )}
              </button>
            );
          })}
        </div>

        {/* Right section: System Tray */}
        <div className="flex-1 flex items-center justify-end gap-1">
          <div className="flex items-center gap-2 px-2 py-1 hover:bg-white/10 rounded-md transition-colors cursor-pointer text-zinc-300">
            <Wifi size={14} />
            <Volume2 size={14} />
            <Battery size={14} />
          </div>
          <div className="flex flex-col items-end px-2 py-1 hover:bg-white/10 rounded-md transition-colors cursor-pointer text-zinc-200">
            <span className="text-[10px] font-medium">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span className="text-[10px]">
              {currentTime.toLocaleDateString([], { month: 'numeric', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <div className="w-1.5 h-6 border-l border-white/10 ml-1 hover:bg-white/5 transition-colors" />
        </div>
      </footer>
    </div>
  );
};

export default App;
