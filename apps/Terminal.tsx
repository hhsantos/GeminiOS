
import React, { useState, useRef, useEffect } from 'react';

const Terminal: React.FC = () => {
  const [history, setHistory] = useState<{ cmd: string, output: string }[]>([
    { cmd: '', output: 'GeminiOS Terminal [Version 1.0.2452]\n(c) 2024 Gemini Corporation. All rights reserved.\n\nType "help" to see available commands.' }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    let output = '';

    switch (cmd) {
      case 'help':
        output = 'Available commands:\n- help: Show this help message\n- cls: Clear screen\n- ver: Show version\n- echo [text]: Repeat text\n- date: Show current date\n- whoami: Show current user';
        break;
      case 'cls':
        setHistory([]);
        setInput('');
        return;
      case 'ver':
        output = 'GeminiOS v1.0.2452 Kernel x64-based';
        break;
      case 'date':
        output = new Date().toLocaleString();
        break;
      case 'whoami':
        output = 'gemini_user';
        break;
      default:
        if (cmd.startsWith('echo ')) {
          output = cmd.substring(5);
        } else {
          output = `'${cmd}' is not recognized as an internal or external command.`;
        }
    }

    setHistory(prev => [...prev, { cmd: input, output }]);
    setInput('');
  };

  return (
    <div className="h-full bg-black text-green-500 font-mono text-xs p-4 overflow-y-auto selection:bg-green-500 selection:text-black">
      {history.map((item, i) => (
        <div key={i} className="mb-2">
          {item.cmd && <div className="flex gap-2"><span>C:\Users\gemini&gt;</span><span>{item.cmd}</span></div>}
          <div className="whitespace-pre-wrap mt-1">{item.output}</div>
        </div>
      ))}
      <form onSubmit={handleCommand} className="flex gap-2">
        <span>C:\Users\gemini&gt;</span>
        <input 
          autoFocus
          className="bg-transparent border-none outline-none flex-1 text-green-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
      <div ref={bottomRef} />
    </div>
  );
};

export default Terminal;
