// src/components/Drawer.tsx
import { useEffect } from 'react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Drawer({ isOpen, onClose, children }: DrawerProps) {
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <div className={`fixed inset-0 z-40 ${isOpen ? 'visible' : 'invisible'}`}>
      
      {/* 1. The Dark Clickable Background Overlay */}
      <div 
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      
      {/* 2. The Sliding Drawer  */}
      <div 
        className={`absolute top-[72px] lg:top-0 left-0 h-[calc(100vh-72px)] lg:h-screen w-full md:w-[80%] lg:w-[716px] bg-white dark:bg-[#141625] transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0 shadow-[100px_0_100px_rgba(0,0,0,0.2)]' : '-translate-x-full'}`}
      >
        <div className="h-full overflow-y-auto px-4 py-8 md:p-14 lg:pl-[103px]">
            {children}
        </div>
      </div>
      
    </div>
  );
}