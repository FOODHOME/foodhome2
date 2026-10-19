import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Phone, 
  Settings, 
  ShieldCheck, 
  Sparkles, 
  Menu, 
  X, 
  Package, 
  Truck, 
  ExternalLink 
} from 'lucide-react';

export const Header: React.FC = () => {
  const { state, setIsAdminOpen, setIsSampleModalOpen } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pendingInquiriesCount = state.inquiries.filter(i => i.status === '접수대기').length;

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-medium text-blue-400">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              식약처 HACCP 인증 공식 제조원
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-slate-300">
              전국 족발·보쌈 외식업소 매일 새벽 냉장 직배송
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href={`tel:${state.content.phone}`}
              className="inline-flex items-center gap-1.5 text-white font-semibold hover:text-blue-300 transition-colors"
            >
              <Phone className="w-3 h-3 text-blue-400" />
              <span>상담전화: {state.content.phone}</span>
            </a>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="hidden sm:inline text-slate-400">운영시간: {state.content.csHours}</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-3 group"
        >
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105"
            style={{ backgroundColor: state.theme.primaryColor }}
          >
            <span className="text-xl font-black tracking-tighter">푸</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-slate-900">
                {state.content.brandName}
              </span>
              <span 
                className="text-xs font-bold px-1.5 py-0.5 rounded tracking-wider text-white"
                style={{ backgroundColor: state.theme.primaryColor }}
              >
                {state.content.brandSubName}
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-500">
              보쌈무김치·김칫속 전문제조
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
          <button 
            onClick={() => scrollTo('story-section')}
            className="hover:text-blue-600 transition-colors cursor-pointer py-1"
          >
            브랜드 스토리
          </button>
          <button 
            onClick={() => scrollTo('product-section')}
            className="hover:text-blue-600 transition-colors cursor-pointer py-1 flex items-center gap-1"
          >
            제품 라인업
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-600">
              {state.products.length}
            </span>
          </button>
          <button 
            onClick={() => scrollTo('process-section')}
            className="hover:text-blue-600 transition-colors cursor-pointer py-1"
          >
            HACCP 위생공정
          </button>
          <button 
            onClick={() => scrollTo('review-section')}
            className="hover:text-blue-600 transition-colors cursor-pointer py-1"
          >
            납품사례 & 고객평
          </button>
          <button 
            onClick={() => scrollTo('post-section')}
            className="hover:text-blue-600 transition-colors cursor-pointer py-1"
          >
            소식 & 레시피
          </button>
          <button 
            onClick={() => scrollTo('inquiry-section')}
            className="hover:text-blue-600 transition-colors cursor-pointer py-1 text-blue-700 font-bold"
          >
            B2B 납품 견적
          </button>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2.5">
          {/* Admin Dashboard Trigger */}
          <button
            onClick={() => setIsAdminOpen(true)}
            className="relative flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-all cursor-pointer shadow-2xs"
            title="웹사이트 콘텐츠, 제품, 게시글, 디자인 설정 관리자"
          >
            <Settings className="w-3.5 h-3.5 text-slate-500 animate-[spin_10s_linear_infinite]" />
            <span className="hidden sm:inline">관리자 모드</span>
            <span className="sm:hidden">관리</span>
            {pendingInquiriesCount > 0 && (
              <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-extrabold rounded-full bg-red-500 text-white animate-pulse">
                {pendingInquiriesCount}
              </span>
            )}
          </button>

          {/* Quick Free Sample Request CTA */}
          <button
            onClick={() => setIsSampleModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-bold text-white rounded-lg shadow-sm hover:opacity-95 hover:shadow transition-all cursor-pointer"
            style={{ backgroundColor: state.theme.primaryColor }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>무료 샘플 1kg 신청</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden cursor-pointer"
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-5 py-4 space-y-3 shadow-lg">
          <div className="flex flex-col gap-2.5 text-sm font-semibold text-slate-800">
            <button 
              onClick={() => scrollTo('story-section')}
              className="text-left py-2 px-2 hover:bg-slate-50 rounded"
            >
              브랜드 스토리
            </button>
            <button 
              onClick={() => scrollTo('product-section')}
              className="text-left py-2 px-2 hover:bg-slate-50 rounded flex items-center justify-between"
            >
              <span>제품 라인업</span>
              <span className="text-xs bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full">
                {state.products.length}개 상품
              </span>
            </button>
            <button 
              onClick={() => scrollTo('process-section')}
              className="text-left py-2 px-2 hover:bg-slate-50 rounded"
            >
              HACCP 위생공정
            </button>
            <button 
              onClick={() => scrollTo('review-section')}
              className="text-left py-2 px-2 hover:bg-slate-50 rounded"
            >
              납품사례 & 고객평
            </button>
            <button 
              onClick={() => scrollTo('post-section')}
              className="text-left py-2 px-2 hover:bg-slate-50 rounded"
            >
              소식 & 레시피
            </button>
            <button 
              onClick={() => scrollTo('inquiry-section')}
              className="text-left py-2 px-2 bg-blue-50 text-blue-700 font-bold rounded"
            >
              B2B 대량납품 / 샘플 신청
            </button>
          </div>
          
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>고객상담 {state.content.phone}</span>
            <button 
              onClick={() => { setMobileMenuOpen(false); setIsAdminOpen(true); }}
              className="text-blue-600 font-bold flex items-center gap-1"
            >
              <Settings className="w-3.5 h-3.5" />
              관리자 대시보드 열기
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
