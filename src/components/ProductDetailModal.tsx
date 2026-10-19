import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Thermometer, 
  Layers, 
  Check, 
  ArrowRight,
  Phone
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { 
    selectedProductForDetail, 
    setSelectedProductForDetail, 
    setIsSampleModalOpen,
    state 
  } = useApp();

  if (!selectedProductForDetail) return null;

  const product = selectedProductForDetail;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700">
              {product.category}
            </span>
            <span className="text-xs text-slate-500 font-medium">제품 상세 원재료 및 규격 안내</span>
          </div>
          <button
            onClick={() => setSelectedProductForDetail(null)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Top Hero Media & Name */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            <div className="sm:col-span-5 rounded-xl overflow-hidden aspect-square bg-slate-100 border border-slate-200">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="sm:col-span-7 space-y-2">
              <span className="text-xs font-bold text-blue-600 block">
                {product.tag}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {product.name}
              </h3>
              <p className="text-sm font-medium text-slate-600">
                {product.subtitle}
              </p>
              
              <div className="pt-2 text-xs text-emerald-700 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>식약처 HACCP 인증 시설 제조 / 무방부제·무화학색소</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm text-slate-700 leading-relaxed">
            {product.description}
          </div>

          {/* Specifications Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden text-xs sm:text-sm">
            <div className="grid grid-cols-3 p-3 bg-slate-50 border-b border-slate-200 font-bold text-slate-700">
              <span>규격 항목</span>
              <span className="col-span-2">상세 내역</span>
            </div>
            <div className="grid grid-cols-3 p-3 border-b border-slate-100 text-slate-600">
              <span className="font-semibold text-slate-800 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                포장 중량
              </span>
              <span className="col-span-2 font-medium">{product.weight}</span>
            </div>
            <div className="grid grid-cols-3 p-3 border-b border-slate-100 text-slate-600">
              <span className="font-semibold text-slate-800 flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5 text-blue-600" />
                보관 방법
              </span>
              <span className="col-span-2">{product.storage}</span>
            </div>
            <div className="grid grid-cols-3 p-3 border-b border-slate-100 text-slate-600">
              <span className="font-semibold text-slate-800 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                유통 기한
              </span>
              <span className="col-span-2">{product.shelfLife}</span>
            </div>
            <div className="grid grid-cols-3 p-3 text-slate-600">
              <span className="font-semibold text-slate-800">원재료 및 함량</span>
              <span className="col-span-2 leading-relaxed">{product.ingredients}</span>
            </div>
          </div>

          {/* Bulk Price Guidance */}
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-blue-900">외식업 B2B 사업자 납품 단가 안내</h4>
              <p className="text-xs text-blue-800 mt-1 leading-relaxed">
                {product.bulkPriceGuide}. 정기 발주 수량 및 배송 지역에 따라 단가표가 상이하므로 실시간 샘플 신청 또는 유선 상담(1588-7241)을 통해 최적의 단가를 확인해 보세요.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t border-slate-100 p-4 sm:px-6 flex flex-wrap items-center justify-between gap-3">
          <a
            href={`tel:${state.content.phone}`}
            className="text-xs font-bold text-slate-700 hover:text-blue-600 flex items-center gap-1.5"
          >
            <Phone className="w-4 h-4 text-blue-600" />
            <span>유선 견적문의: {state.content.phone}</span>
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedProductForDetail(null)}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              닫기
            </button>
            <button
              onClick={() => {
                setSelectedProductForDetail(null);
                setIsSampleModalOpen(true);
              }}
              className="px-5 py-2 text-xs sm:text-sm font-bold text-white rounded-lg shadow-sm hover:opacity-95 transition-opacity flex items-center gap-1.5 cursor-pointer"
              style={{ backgroundColor: state.theme.primaryColor }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>이 제품 무료 샘플 신청하기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
