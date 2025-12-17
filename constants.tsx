
import React from 'react';
import { 
  Bot, 
  Folder, 
  FileText, 
  Terminal, 
  Settings, 
  Calculator,
  Search,
  LayoutGrid,
  Wifi,
  Volume2,
  Battery
} from 'lucide-react';
import { DesktopIcon } from './types';

export const DESKTOP_ICONS: DesktopIcon[] = [
  { id: 'gemini', label: 'Gemini AI', icon: <Bot size={32} className="text-blue-400" /> },
  { id: 'explorer', label: 'File Explorer', icon: <Folder size={32} className="text-yellow-400" /> },
  { id: 'notepad', label: 'Notepad', icon: <FileText size={32} className="text-blue-200" /> },
  { id: 'terminal', label: 'Terminal', icon: <Terminal size={32} className="text-green-400" /> },
  { id: 'calc', label: 'Calculator', icon: <Calculator size={32} className="text-orange-400" /> },
  { id: 'settings', label: 'Settings', icon: <Settings size={32} className="text-gray-400" /> },
];

export const WALLPAPERS = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2564',
  'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?auto=format&fit=crop&q=80&w=2070',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2070',
];
