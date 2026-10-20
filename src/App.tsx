/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProductSliderSection } from './components/ProductSliderSection';
import { RealtimeSampleStatusSection } from './components/RealtimeSampleStatusSection';
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
import { AdminDashboard } from './components/AdminDashboard';
import { AdminLoginModal } from './components/AdminLoginModal';
import { CompanyAboutPage } from './components/CompanyAboutPage';
import { ProductsPage } from './components/ProductsPage';
import { SampleBoardPage } from './components/SampleBoardPage';
import { QuoteBoardPage } from './components/QuoteBoardPage';
import { Toast } from './components/Toast';
import { Sparkles, ArrowUp } from 'lucide-react';

const MainContent: React.FC = () => {
  const { 
    state, 
    activePage, 
    setActivePage,
    isAdminOpen, 
    setIsAdminOpen, 
    isAdminLoggedIn
  } = useApp();
  const { theme } = state;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#2A2020]">
      {/* Global Header */}
      <Header />

      {/* Main Sections or Dedicated Subpages */}
      <main className="flex-1">
        {activePage === 'about' && <CompanyAboutPage />}
        {activePage === 'products' && <ProductsPage />}
        {activePage === 'sample-board' && <SampleBoardPage initialViewMode="list" />}
        {activePage === 'sample-board-write' && <SampleBoardPage initialViewMode="write" />}
        {activePage === 'quote-board' && <QuoteBoardPage initialViewMode="list" />}
        {activePage === 'quote-board-write' && <QuoteBoardPage initialViewMode="write" />}
        
        {/* Home Page Flow */}
        {(activePage === 'home' || !activePage) && (
          <>
            {theme.sectionsVisible.hero && <HeroSection />}
            {theme.sectionsVisible.productSlider && <ProductSliderSection />}
            
            {/* Realtime Sample Status Section inserted between Product Slider & Action Banners */}
            <RealtimeSampleStatusSection />

            {theme.sectionsVisible.actionBanners && <ActionBannersSection />}
            {theme.sectionsVisible.productCategories && <ProductCategoriesSection />}
            {theme.sectionsVisible.products && <ProductSection />}
            {theme.sectionsVisible.features && <StorySection />}
            {theme.sectionsVisible.process && <ManufacturingProcess />}
            {theme.sectionsVisible.reviews && <PartnersAndReviews />}
            {theme.sectionsVisible.posts && <BlogNoticeSection />}
            {theme.sectionsVisible.inquiry && <SampleInquirySection />}
          </>
        )}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <ProductDetailModal />
      <PostDetailModal />

      {/* Admin Auth Modal or Dashboard (Accessible ONLY via Footer Button) */}
      {isAdminOpen && (
        isAdminLoggedIn ? (
          <AdminDashboard />
        ) : (
          <AdminLoginModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
        )
      )}

      <Toast />

      {/* Floating Scroll to Top & Quick Sample CTA (Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        <button
          onClick={() => {
            setActivePage('sample-board-write');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
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
