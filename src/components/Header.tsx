import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FoodhomeLogo } from './FoodhomeLogo';
import { 
  Phone, 
  Settings, 
  Sparkles, 
  Menu, 
  X, 
  ChevronDown, 
  ExternalLink,
  ShieldCheck,
  Clock,
  Store
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    state, 
    setIsAdminOpen, 
    setIsSampleModalOpen, 
    setIsWholesaleModalOpen,
    setActivePage,
    activePage
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const pendingInquiriesCount = state.inquiries.filter(i => i.status === '접수대기').length;

  const navigateTo = (page: string, sectionId?: string) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    setActiveDropdown(null);

    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          const offset = 90;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = el.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navMenus = (state.content.navMenus && state.content.navMenus.length > 0)
    ? state.content.navMenus.filter(m => m.visible !== false)
    : [
        {
          id: 'about',
          name: '회사소개',
          visible: true,
          actionType: 'scroll' as const,
          target: 'footer-section',
          submenus: [
            { id: 'sub-about-1', label: '브랜드 스토리', actionType: 'scroll' as const, target: 'footer-section' },
            { id: 'sub-about-2', label: '전통과 철학', actionType: 'scroll' as const, target: 'footer-section' },
            { id: 'sub-about-3', label: '본사 및 공장 위치', actionType: 'scroll' as const, target: 'footer-section' }
          ]
        },
        {
          id: 'products',
          name: '제품소개',
          visible: true,
          actionType: 'scroll' as const,
          target: 'product-slider-section',
          submenus: [
            { id: 'sub-prod-1', label: '명품 보쌈무김치', actionType: 'scroll' as const, target: 'product-slider-section' },
            { id: 'sub-prod-2', label: '비법 보쌈김칫속', actionType: 'scroll' as const, target: 'product-slider-section' },
            { id: 'sub-prod-3', label: '업소용 대용량 (10kg)', actionType: 'scroll' as const, target: 'product-slider-section' },
            { id: 'sub-prod-4', label: '소포장 & 밀키트 (500g)', actionType: 'scroll' as const, target: 'product-slider-section' }
          ]
        },
        {
          id: 'facility',
          name: '제조공정',
          visible: true,
          actionType: 'wholesale' as const,
          target: '',
          submenus: [
            { id: 'sub-fac-1', label: 'HACCP 위생 인증 시설', actionType: 'wholesale' as const, target: '' },
            { id: 'sub-fac-2', label: '특허 수분제어 절임공법', actionType: 'scroll' as const, target: 'product-slider-section' },
            { id: 'sub-fac-3', label: '콜드체인 익일 직배송', actionType: 'scroll' as const, target: 'action-banners-section' }
          ]
        },
        {
          id: 'wholesale',
          name: '납품안내',
          visible: true,
          actionType: 'wholesale' as const,
          target: '',
          submenus: [
            { id: 'sub-who-1', label: 'B2B 대량공급 절차 안내', actionType: 'scroll' as const, target: 'action-banners-section' },
            { id: 'sub-who-2', label: '프랜차이즈 맞춤 OEM/PB', actionType: 'wholesale' as const, target: '' },
            { id: 'sub-who-3', label: '사업자 1kg 무료 샘플팩', actionType: 'sample' as const, target: '' }
          ]
        },
        {
          id: 'cs',
          name: '고객센터',
          visible: true,
          actionType: 'sample' as const,
          target: '',
          submenus: [
            { id: 'sub-cs-1', label: '사업자 무료 샘플 신청', actionType: 'sample' as const, target: '' },
            { id: 'sub-cs-2', label: '1:1 대량 납품·견적 상담', actionType: 'wholesale' as const, target: '' },
            { id: 'sub-cs-3', label: '고객센터 유선 전화연결', actionType: 'scroll' as const, target: 'footer-section' }
          ]
        }
      ];

  const handleMenuAction = (actionType?: string, target?: string, fallbackTarget?: string) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);

    if (actionType === 'sample') {
      setIsSampleModalOpen(true);
      return;
    }
    if (actionType === 'wholesale') {
      setIsWholesaleModalOpen(true);
      return;
    }
    if (actionType === 'url' && target) {
      if (target.startsWith('http')) {
        window.open(target, '_blank');
      } else {
        window.location.href = target;
      }
      return;
    }

    const finalTarget = target || fallbackTarget;
    if (finalTarget) {
      navigateTo('home', finalTarget);
    } else {
      navigateTo('home');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-[#EEEAE6] shadow-2xs">
      {/* Top Thin Information Bar */}
      <div className="bg-[#332525] text-[#D8CDC9] text-[11px] py-1.5 px-4 sm:px-8 border-b border-[#443333]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 font-semibold text-[#E8B4B8]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B64346]" />
              식약처 HACCP 인증 공식 제조원
            </span>
            <span className="hidden md:inline text-[#554343]">|</span>
            <span className="hidden md:inline text-[#C0B2AE]">
              전국 족발·보쌈 외식업소 매일 아침 콜드체인 직배송
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href={`tel:${state.content.phone}`}
              className="inline-flex items-center gap-1 font-bold text-white hover:text-[#E8B4B8] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#B64346]" />
              <span>고객상담: {state.content.phone}</span>
            </a>
            <span className="text-[#554343] hidden sm:inline">|</span>
            <span className="hidden sm:inline text-[#C0B2AE]">
              <Clock className="w-3 h-3 inline mr-1 text-[#872D35]" />
              {state.content.csHours}
            </span>
            <span className="text-[#554343] hidden lg:inline">|</span>
            <a 
              href={state.social.smartStoreUrl || 'https://smartstore.naver.com/foodhome/products/4266908131'}
              target="_blank" 
              rel="noreferrer"
              className="hidden lg:inline-flex items-center gap-1 text-[#E8B4B8] hover:text-white font-bold"
            >
              <Store className="w-3 h-3" />
              <span>공식 스마트스토어</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar (PC Height: 78px) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-[78px] flex items-center justify-between">
        
        {/* Left: Foodhome Logo */}
        <a 
          href="#"
          onClick={(e) => { e.preventDefault(); navigateTo('home'); }}
          className="cursor-pointer group py-2"
        >
          <FoodhomeLogo variant="dark" height={44} />
        </a>

        {/* Center: Horizontal Menus with Dropdown */}
        <nav className="hidden lg:flex items-center gap-8 h-full">
          {navMenus.map((item) => {
            const hasSubmenus = item.submenus && item.submenus.length > 0;
            return (
              <div 
                key={item.id}
                className="relative h-full flex items-center group cursor-pointer"
                onMouseEnter={() => setActiveDropdown(item.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => handleMenuAction(item.actionType, item.target, item.id === 'about' ? 'footer-section' : item.id === 'products' ? 'product-slider-section' : item.id === 'wholesale' ? 'action-banners-section' : undefined)}
                  className="text-sm font-bold text-[#332525] group-hover:text-[#872D35] flex items-center gap-1 transition-colors py-2"
                >
                  <span>{item.name}</span>
                  {hasSubmenus && (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#872D35] transition-transform group-hover:rotate-180" />
                  )}
                </button>

                {/* Hover Dropdown Submenu */}
                {hasSubmenus && activeDropdown === item.id && (
                  <div className="absolute top-[70px] left-1/2 -translate-x-1/2 w-48 bg-white rounded-xl shadow-xl border border-[#EEEAE6] py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    {item.submenus.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => handleMenuAction(sub.actionType, sub.target)}
                        className="w-full text-left px-4 py-2.5 text-xs font-semibold text-[#554343] hover:text-[#872D35] hover:bg-[#FAF8F5] transition-colors flex items-center justify-between group/sub"
                      >
                        <span>{sub.label}</span>
                        <span className="text-[10px] text-slate-300 group-hover/sub:text-[#872D35] font-sans">›</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5">
          {/* Admin Dashboard Trigger */}
          <button
            onClick={() => setIsAdminOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg border border-[#EEEAE6] bg-[#FAF8F5] text-[#554343] hover:bg-white hover:border-[#D3C9C4] transition-all cursor-pointer shadow-2xs"
            title="웹사이트 관리자 대시보드"
          >
            <Settings className="w-3.5 h-3.5 text-[#872D35]" />
            <span className="hidden sm:inline">관리자</span>
            {pendingInquiriesCount > 0 && (
              <span className="inline-flex items-center justify-center px-1.5 py-0.2 text-[10px] font-extrabold rounded-full bg-[#B64346] text-white animate-pulse">
                {pendingInquiriesCount}
              </span>
            )}
          </button>

          {/* Primary CTA: Free Sample Request */}
          <button
            onClick={() => setIsSampleModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-bold text-white rounded-xl shadow-sm hover:opacity-95 hover:shadow-md transition-all cursor-pointer"
            style={{ backgroundColor: state.theme.primaryColor || '#872D35' }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>무료 샘플 1kg 신청</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#332525] hover:bg-[#FAF8F5] lg:hidden cursor-pointer"
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EEEAE6] bg-white px-5 py-4 space-y-4 shadow-xl">
          {navMenus.map((item) => (
            <div key={item.id} className="border-b border-[#FAF8F5] pb-2">
              <button
                onClick={() => handleMenuAction(item.actionType, item.target, item.id === 'about' ? 'footer-section' : item.id === 'products' ? 'product-slider-section' : item.id === 'wholesale' ? 'action-banners-section' : undefined)}
                className="text-xs font-black text-[#872D35] uppercase tracking-wider block mb-1 hover:underline text-left cursor-pointer"
              >
                {item.name}
              </button>
              {item.submenus && item.submenus.length > 0 && (
                <div className="grid grid-cols-2 gap-1.5 pl-2">
                  {item.submenus.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => handleMenuAction(sub.actionType, sub.target)}
                      className="text-left py-1 text-xs text-[#554343] hover:text-[#872D35] font-medium cursor-pointer"
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); setIsSampleModalOpen(true); }}
              className="w-full py-2.5 rounded-lg text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
              style={{ backgroundColor: state.theme.primaryColor || '#872D35' }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>사업자 무료 샘플 1kg 신청</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); setIsWholesaleModalOpen(true); }}
              className="w-full py-2.5 rounded-lg border border-[#EEEAE6] bg-[#FAF8F5] text-[#332525] font-bold text-xs flex items-center justify-center gap-1.5"
            >
              <span>B2B 대량 납품 및 OEM 견적 문의</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
