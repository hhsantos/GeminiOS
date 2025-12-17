
import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  HardDrive, 
  DesktopIcon, 
  File, 
  Search,
  FolderOpen,
  Star,
  Clock,
  Layout
} from 'lucide-react';

const FileExplorer: React.FC = () => {
  const [path, setPath] = useState(['This PC', 'Documents']);
  const files = [
    { name: 'GeminiOS_Presentation.pdf', type: 'pdf', size: '2.4 MB' },
    { name: 'System_Config.log', type: 'log', size: '12 KB' },
    { name: 'Project_Assets', type: 'folder', size: '-' },
    { name: 'My_Notes.txt', type: 'text', size: '4 KB' },
    { name: 'Vacation_Photos', type: 'folder', size: '-' },
  ];

  return (
    <div className="flex h-full bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200">
      {/* Sidebar */}
      <aside className="w-48 border-r border-zinc-200 dark:border-zinc-800 p-2 text-xs space-y-4">
        <div>
          <h3 className="px-2 mb-2 font-semibold text-zinc-500 uppercase tracking-wider">Favorites</h3>
          <ul className="space-y-1">
            <li className="flex items-center gap-2 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md cursor-pointer">
              <Star size={14} className="text-yellow-500" /> Quick Access
            </li>
            <li className="flex items-center gap-2 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md cursor-pointer">
              <Clock size={14} className="text-blue-500" /> Recent
            </li>
          </ul>
        </div>
        <div>
          <h3 className="px-2 mb-2 font-semibold text-zinc-500 uppercase tracking-wider">Storage</h3>
          <ul className="space-y-1">
            <li className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-md cursor-pointer">
              <HardDrive size={14} /> Local Disk (C:)
            </li>
            <li className="flex items-center gap-2 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md cursor-pointer opacity-50">
              <HardDrive size={14} /> External Drive (D:)
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-10 border-b border-zinc-200 dark:border-zinc-800 flex items-center px-4 gap-4">
          <div className="flex gap-2">
            <ChevronLeft size={18} className="text-zinc-400 cursor-pointer" />
            <ChevronRight size={18} className="text-zinc-400 cursor-pointer" />
          </div>
          <div className="flex-1 h-7 bg-zinc-100 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700 flex items-center px-2 text-xs gap-2">
            {path.map((p, i) => (
              <React.Fragment key={p}>
                <span className="hover:underline cursor-pointer">{p}</span>
                {i < path.length - 1 && <ChevronRight size={12} className="text-zinc-400" />}
              </React.Fragment>
            ))}
          </div>
          <div className="w-48 h-7 bg-zinc-100 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700 flex items-center px-2">
            <Search size={14} className="text-zinc-400 mr-2" />
            <input type="text" placeholder="Search" className="bg-transparent border-none outline-none text-xs w-full" />
          </div>
        </div>

        {/* File Grid */}
        <div className="flex-1 p-6 grid grid-cols-4 content-start gap-6 overflow-y-auto">
          {files.map((file) => (
            <div key={file.name} className="flex flex-col items-center gap-2 p-4 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl cursor-pointer transition-colors text-center group">
              <div className="relative">
                {file.type === 'folder' ? (
                  <FolderOpen size={48} className="text-yellow-500 fill-yellow-500/20" />
                ) : (
                  <File size={48} className="text-blue-400" />
                )}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity" />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-medium block truncate max-w-[120px]">{file.name}</span>
                <span className="text-[10px] text-zinc-500 block">{file.size}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Status Bar */}
        <div className="h-6 border-t border-zinc-200 dark:border-zinc-800 flex items-center px-4 text-[10px] text-zinc-500 gap-4">
          <span>{files.length} items</span>
          <span>1 item selected</span>
        </div>
      </div>
    </div>
  );
};

export default FileExplorer;
