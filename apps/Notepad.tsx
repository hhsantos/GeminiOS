
import React, { useState } from 'react';

const Notepad: React.FC = () => {
  const [content, setContent] = useState('Welcome to GeminiOS Notepad!\n\nThis is a simple text editor for your daily thoughts.\nYou can write whatever you like here.\n\nCreated with ❤️ for GeminiOS.');

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-900">
      <div className="flex items-center gap-4 px-3 py-1 text-[11px] border-b border-zinc-100 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">
        <span className="hover:bg-zinc-100 dark:hover:bg-zinc-800 px-2 py-1 cursor-pointer rounded">File</span>
        <span className="hover:bg-zinc-100 dark:hover:bg-zinc-800 px-2 py-1 cursor-pointer rounded">Edit</span>
        <span className="hover:bg-zinc-100 dark:hover:bg-zinc-800 px-2 py-1 cursor-pointer rounded">Format</span>
        <span className="hover:bg-zinc-100 dark:hover:bg-zinc-800 px-2 py-1 cursor-pointer rounded">View</span>
        <span className="hover:bg-zinc-100 dark:hover:bg-zinc-800 px-2 py-1 cursor-pointer rounded">Help</span>
      </div>
      <textarea 
        className="flex-1 p-4 bg-transparent border-none outline-none resize-none font-mono text-sm leading-relaxed dark:text-zinc-300"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        spellCheck={false}
      />
    </div>
  );
};

export default Notepad;
