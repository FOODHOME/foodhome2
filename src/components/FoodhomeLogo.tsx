import React from 'react';
import { useApp } from '../context/AppContext';

interface FoodhomeLogoProps {
  variant?: 'dark' | 'light';
  className?: string;
  height?: number;
}

export const FoodhomeLogo: React.FC<FoodhomeLogoProps> = ({
  variant = 'dark',
  className = '',
  height = 42
}) => {
  const { state } = useApp();
  const customLogo = state.content.logoUrl;

  if (customLogo) {
    return (
      <img
        src={customLogo}
        alt="푸드홈 FOODHOME"
        style={{ height: `${height}px` }}
        className={`object-contain ${className}`}
      />
    );
  }

  // High-fidelity SVG logo rendered in-line or via vector file
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Icon Emblem */}
      <div 
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs relative overflow-hidden"
        style={{ backgroundColor: variant === 'light' ? '#B64346' : state.theme.primaryColor || '#872D35' }}
      >
        <span className="text-white font-black text-xl tracking-tighter">푸</span>
        <div className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#789A5B] border border-white/40" />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col text-left">
        <div className="flex items-baseline gap-1.5 leading-none">
          <span 
            className={`font-black text-xl sm:text-2xl tracking-tight ${
              variant === 'light' ? 'text-white' : 'text-[#332525]'
            }`}
          >
            {state.content.brandName || '푸드홈'}
          </span>
          <span 
            className="text-[10px] font-black tracking-widest px-1 py-0.2 rounded"
            style={{ 
              backgroundColor: variant === 'light' ? 'rgba(255,255,255,0.15)' : '#FAF8F5',
              color: variant === 'light' ? '#FAF8F5' : state.theme.primaryColor || '#872D35' 
            }}
          >
            {state.content.brandSubName || 'FOODHOME'}
          </span>
        </div>
        <span 
          className={`text-[10px] font-semibold mt-1 tracking-tight ${
            variant === 'light' ? 'text-slate-300' : 'text-[#7A6A6A]'
          }`}
        >
          보쌈무김치·김칫속 전문제조
        </span>
      </div>
    </div>
  );
};
