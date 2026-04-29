// src/components/Sidebar.tsx
import ThemeToggle from './ThemeToggle';

export default function Sidebar() {
  return (
    <aside className="bg-[#373B53] relative z-50 flex lg:flex-col justify-between items-center w-full h-[72px] lg:h-screen lg:w-[103px] lg:rounded-r-3xl transition-all flex-shrink-0">
        
      
      {/* Logo Block */}
      <div className="bg-violet-600 h-full w-[72px] lg:w-full lg:h-[103px] rounded-r-2xl lg:rounded-br-2xl flex items-center justify-center relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-violet-500 rounded-tl-2xl"></div>
        <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white rounded-full relative z-10"></div>
      </div>

      {/* Bottom/Right section with Theme Toggle & Avatar */}
      <div className="flex lg:flex-col items-center gap-6 pr-6 lg:pr-0 lg:pb-6 h-full lg:h-auto">
        <ThemeToggle />
        
        {/* Divider */}
        <div className="w-[1px] h-full lg:w-[103px] lg:h-[1px] bg-[#494E6E]"></div>
        
        {/* Avatar */}
        <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gray-300 overflow-hidden border-2 border-transparent hover:border-violet-500 cursor-pointer transition-colors">
            <img src="https://i.pravatar.cc/150?img=11" alt="User Avatar" className="w-full h-full object-cover" />
        </div>
      </div>
      
    </aside>
  );
}