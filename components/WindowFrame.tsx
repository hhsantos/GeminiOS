
import React, { useState, useRef, useEffect } from 'react';
import { X, Minus, Square, Maximize2 } from 'lucide-react';
import { AppId, WindowState } from '../types';

interface WindowFrameProps {
  window: WindowState;
  onClose: (id: AppId) => void;
  onMinimize: (id: AppId) => void;
  onMaximize: (id: AppId) => void;
  onFocus: (id: AppId) => void;
  children: React.ReactNode;
}

const WindowFrame: React.FC<WindowFrameProps> = ({ 
  // Fix: Renamed window prop to appWindow to prevent shadowing the global window object
  window: appWindow, 
  onClose, 
  onMinimize, 
  onMaximize, 
  onFocus,
  children 
}) => {
  const [position, setPosition] = useState({ x: 100 + (appWindow.zIndex * 20), y: 50 + (appWindow.zIndex * 20) });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    onFocus(appWindow.id);
    if (appWindow.isMaximized) return;
    setIsDragging(true);
    dragStartPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - dragStartPos.current.x,
        y: e.clientY - dragStartPos.current.y
      });
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      // Fix: Now refers to global browser window correctly since prop was renamed
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  if (appWindow.isMinimized) return null;

  const style: React.CSSProperties = appWindow.isMaximized 
    ? { top: 0, left: 0, width: '100%', height: 'calc(100% - 48px)', zIndex: appWindow.zIndex }
    : { top: position.y, left: position.x, width: '800px', height: '500px', zIndex: appWindow.zIndex };

  return (
    <div 
      className={`absolute flex flex-col bg-white/80 dark:bg-zinc-900/90 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl transition-all duration-200 ease-out overflow-hidden ${appWindow.isMaximized ? 'rounded-none' : 'rounded-xl'}`}
      style={style}
      onClick={() => onFocus(appWindow.id)}
    >
      {/* Title Bar */}
      <div 
        className="h-10 flex items-center justify-between px-3 cursor-default bg-transparent select-none"
        onMouseDown={handleMouseDown}
        onDoubleClick={() => onMaximize(appWindow.id)}
      >
        <div className="flex items-center gap-2">
          <div className="scale-75">{appWindow.icon}</div>
          <span className="text-xs font-medium text-zinc-700 dark:text-zinc-200">{appWindow.title}</span>
        </div>
        <div className="flex items-center">
          <button 
            onClick={(e) => { e.stopPropagation(); onMinimize(appWindow.id); }}
            className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-md text-zinc-600 dark:text-zinc-400"
          >
            <Minus size={14} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onMaximize(appWindow.id); }}
            className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-md text-zinc-600 dark:text-zinc-400"
          >
            {appWindow.isMaximized ? <Square size={12} /> : <Maximize2 size={12} />}
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(appWindow.id); }}
            className="p-2 hover:bg-red-500 hover:text-white rounded-md text-zinc-600 dark:text-zinc-400 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-white/40 dark:bg-zinc-950/40">
        {children}
      </div>
    </div>
  );
};

export default WindowFrame;
