
export type AppId = 'gemini' | 'explorer' | 'notepad' | 'terminal' | 'settings' | 'calc';

export interface WindowState {
  id: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  icon: React.ReactNode;
}

export interface DesktopIcon {
  id: AppId;
  label: string;
  icon: React.ReactNode;
}
