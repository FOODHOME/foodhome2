import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductItem } from '../types';
import { 
  Sparkles, 
  Eye, 
  Plus, 
  Check, 
  Layers, 
  Thermometer, 
  Star,
  Settings
} from 'lucide-react';

export const ProductSection: React.FC = () => {
  const { 
    state, 
    setSelectedProductForDetail, 
    setIsSampleModalOpen,
    setIsAdminOpen,
    setActiveAdminTab
  } = useApp();
  
  const [activeCategory, setActiveCategory] = useState<string>('전체보기');

  const categories = ['전체보기', '보쌈무김치', '김칫속/양념', '업소용 대용량', '소포장/밀키트'];

  const filteredProducts = activeCategory === '전체보기'
    ? state.products
    : state.products.filter(p => p.category === activeCategory);

  return (
    <section id="product-section" className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span 
              className="text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-blue-100/70 text-blue-700"
            >
              FOODHOME SIGNATURE PRODUCT LINEUP
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              외식업소 맞춤형 명품 보쌈김치 & 비법 김칫속
            </h2>
            <p className="text-base text-slate-600 font-normal">
              물 생김 없이 끝까지 아삭한 보쌈무부터 굴보쌈·수육의 풍미를 높이는 감칠맛 김칫속까지, 전국 480개 매장의 맛을 책임집니다.
            </p>
          </div>

          {/* Quick Admin Shortcut */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveAdminTab('products');
                setIsAdminOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors shadow-2xs"
            >
              <Settings className="w-3.5 h-3.5 text-blue-600" />
              <span>제품 편집 및 신규 등록</span>
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              style={{
                backgroundColor: activeCategory === cat ? state.theme.primaryColor : undefined
              }}
            >
              {cat}
              {cat === '전체보기' && ` (${state.products.length})`}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
            >
              <div>
                {/* Image & Badges */}
                <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent opacity-60" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {product.tag && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-600 text-white shadow-xs">
                        {product.tag}
                      </span>
                    )}
                    {product.isPopular && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-500 text-white shadow-xs flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-current" />
                        인기 납품
                      </span>
                    )}
                  </div>

                  {/* Category Pill */}
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[11px] font-semibold px-2 py-1 rounded bg-slate-900/70 text-white backdrop-blur-xs">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5 line-clamp-1">
                      {product.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Quick Specs */}
                  <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                    <div className="flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="font-medium truncate">{product.weight}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Thermometer className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="truncate">{product.storage}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-5 pt-0 grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => setSelectedProductForDetail(product)}
                  className="py-2.5 px-3 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  <span>스펙 상세</span>
                </button>

                <button
                  onClick={() => setIsSampleModalOpen(true)}
                  className="py-2.5 px-3 rounded-xl text-white text-xs font-bold shadow-2xs hover:opacity-95 transition-opacity flex items-center justify-center gap-1 cursor-pointer"
                  style={{ backgroundColor: state.theme.primaryColor }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>무료 샘플</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bulk Wholesale Banner */}
        <div className="mt-14 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold px-2.5 py-1 rounded bg-blue-500/30 text-blue-200 border border-blue-400/30 inline-block">
              프랜차이즈 및 대형 매장 특별 혜택
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              월 300kg 이상 정기 배송 시 파격 공급 단가 및 무료 전용 라벨링 지원
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
              브랜드의 레시피에 맞춘 맞춤형 매운맛/단맛 배합(OEM)과 전용 규격 포장이 가능합니다.
            </p>
          </div>

          <button
            onClick={() => {
              const el = document.getElementById('inquiry-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3.5 rounded-xl bg-white text-blue-900 font-extrabold text-xs sm:text-sm hover:bg-blue-50 transition-colors whitespace-nowrap shadow-md cursor-pointer"
          >
            대량 납품 / OEM 협의하기 →
          </button>
        </div>

      </div>
    </section>
  );
};
