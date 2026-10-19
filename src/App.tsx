/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProductSliderSection } from './components/ProductSliderSection';
import { ActionBannersSection } from './components/ActionBannersSection';
import { ProductCategoriesSection } from './components/ProductCategoriesSection';
import { ProductSection } from './components/ProductSection';
import { StorySection } from './components/StorySection';
import { ManufacturingProcess } from './components/ManufacturingProcess';
import { PartnersAndReviews } from './components/PartnersAndReviews';
import { BlogNoticeSection } from './components/BlogNoticeSection';
import { SampleInquirySection } from './components/SampleInquirySection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { PostDetailModal } from './components/PostDetailModal';
import { SampleModal } from './components/SampleModal';
import { WholesaleModal } from './components/WholesaleModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Toast } from './components/Toast';
import { Settings, Sparkles, ArrowUp } from 'lucide-react';

const MainContent: React.FC = () => {
  const { state, setIsAdminOpen, setIsSampleModalOpen } = useApp();
  const { theme } = state;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pendingInquiriesCount = state.inquiries.filter(i => i.status === '접수대기').length;

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#2A2020]">
      {/* Global Header */}
      <Header />

      {/* Main Sections: Layout follows Modern Korean Food Brand with bossamstory reference elements */}
      <main className="flex-1">
        {theme.sectionsVisible.hero && <HeroSection />}
        {theme.sectionsVisible.productSlider && <ProductSliderSection />}
        {theme.sectionsVisible.actionBanners && <ActionBannersSection />}
        {theme.sectionsVisible.productCategories && <ProductCategoriesSection />}
        {theme.sectionsVisible.products && <ProductSection />}
        {theme.sectionsVisible.features && <StorySection />}
        {theme.sectionsVisible.process && <ManufacturingProcess />}
        {theme.sectionsVisible.reviews && <PartnersAndReviews />}
        {theme.sectionsVisible.posts && <BlogNoticeSection />}
        {theme.sectionsVisible.inquiry && <SampleInquirySection />}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <ProductDetailModal />
      <PostDetailModal />
      <SampleModal />
      <WholesaleModal />
      <AdminDashboard />
      <Toast />

      {/* Floating Bottom Action Bar (Admin) */}
      <div className="fixed bottom-5 left-5 z-40 flex items-center gap-2">
        <button
          onClick={() => setIsAdminOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#2A2020]/95 hover:bg-[#2A2020] text-white text-xs font-bold shadow-xl border border-stone-700/80 backdrop-blur-md transition-all hover:scale-105 cursor-pointer group"
          title="웹사이트 관리자 대시보드 열기"
        >
          <div className="w-5 h-5 rounded-full bg-[#872D35] flex items-center justify-center text-white">
            <Settings className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform" />
          </div>
          <span>관리자 모드</span>
          {pendingInquiriesCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-[#B64346] text-white text-[10px] font-extrabold animate-pulse">
              {pendingInquiriesCount}
            </span>
          )}
        </button>
      </div>

      {/* Floating Scroll to Top & Quick Sample CTA (Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        <button
          onClick={() => setIsSampleModalOpen(true)}
          className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-xs font-extrabold shadow-xl hover:opacity-95 transition-all hover:scale-105 cursor-pointer"
          style={{ backgroundColor: state.theme.primaryColor || '#872D35' }}
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>무료 샘플 1kg 신청</span>
        </button>

        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-white border border-[#E8E2DC] text-[#332525] hover:text-[#872D35] hover:bg-stone-50 flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer"
          aria-label="맨 위로 가기"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
