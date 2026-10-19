import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Truck, 
  FileSpreadsheet, 
  CheckCircle2, 
  TrendingUp, 
  Utensils 
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { state, setIsSampleModalOpen, setIsAdminOpen } = useApp();
  const { content, theme } = state;

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-white pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-100">
      {/* Subtle Background Glows (clean white with crisp light blue highlights) */}
      <div 
        className="absolute -top-32 right-0 w-[550px] h-[550px] rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ backgroundColor: theme.primaryColor }}
      />
      <div 
        className="absolute -bottom-32 left-0 w-[450px] h-[450px] rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ backgroundColor: theme.accentColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Subtitle Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-200 bg-blue-50/80 text-blue-700 text-xs sm:text-sm font-bold shadow-2xs">
              <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: theme.primaryColor }} />
              <span>{content.heroSubtitle}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.2]">
              {content.heroTitle} <br />
              <span 
                className="inline-block relative text-transparent bg-clip-text"
                style={{ 
                  backgroundImage: `linear-gradient(135deg, ${theme.primaryColor} 0%, ${theme.accentColor} 100%)` 
                }}
              >
                {content.heroHighlight}
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              {content.heroDescription}
            </p>

            {/* Feature Badges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 pb-2">
              {content.heroBadges.map((badge, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 border border-slate-100 text-xs sm:text-sm font-semibold text-slate-700"
                >
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{badge}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => setIsSampleModalOpen(true)}
                className="px-6 py-3.5 rounded-xl font-bold text-white text-sm sm:text-base shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
                style={{ backgroundColor: theme.primaryColor }}
              >
                <Sparkles className="w-4 h-4" />
                <span>사업자 무료 샘플 1kg 신청</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollTo('inquiry-section')}
                className="px-5 py-3.5 rounded-xl font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 hover:border-slate-400 text-sm sm:text-base shadow-2xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4 text-slate-600" />
                <span>대량 납품 단가표 문의</span>
              </button>

              <button
                onClick={() => scrollTo('product-section')}
                className="px-4 py-3.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
              >
                전체 제품 둘러보기 →
              </button>
            </div>

            {/* Guarantee Note */}
            <p className="text-xs text-slate-600 flex items-center gap-1.5 pt-1">
              <Truck className="w-3.5 h-3.5 text-blue-600" />
              <span>전국 일반음식점 및 프랜차이즈 본사 무료 샘플 100% 당일 발송 지원</span>
            </p>
          </div>

          {/* Right Visual Image Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative ring */}
              <div 
                className="absolute -inset-2 rounded-3xl opacity-20 blur-xl"
                style={{ backgroundColor: theme.primaryColor }}
              />

              {/* Main Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-4/3 sm:aspect-square lg:aspect-4/3 group">
                <img
                  src={content.heroImageUrl}
                  alt={content.brandName + ' 명품 보쌈무김치'}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />
                
                {/* Gradient shadow on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-4 left-4 right-4 text-white p-3 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-blue-300 block">FOODHOME SIGNATURE</span>
                      <h4 className="font-extrabold text-sm sm:text-base">아삭달콤 명품 보쌈무김치</h4>
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-blue-600 text-white">
                      식자재 1위
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Stat Badge 1 (Top Left) */}
              <div className="absolute -top-4 -left-4 sm:-top-5 sm:-left-5 bg-white rounded-xl p-3 shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce [animation-duration:4s]">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  <Utensils className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-slate-600 block">전국 외식 파트너</span>
                  <span className="text-sm sm:text-base font-extrabold text-slate-900">480+ 매장 공급</span>
                </div>
              </div>

              {/* Floating Stat Badge 2 (Bottom Right) */}
              <div className="absolute -bottom-5 -right-3 sm:-bottom-6 sm:-right-4 bg-white rounded-xl p-3 shadow-xl border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500 text-white flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-slate-600 block">물 생김 0% 방지</span>
                  <span className="text-sm sm:text-base font-extrabold text-slate-900">특허 수분제어 공법</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Stats Row */}
        {theme.sectionsVisible.stats && (
          <div className="mt-16 sm:mt-20 pt-10 border-t border-slate-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {content.stats.map((stat, i) => (
                <div key={i} className="text-center sm:text-left border-l-0 sm:border-l-2 border-slate-200 sm:pl-5">
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                    {stat.label}
                  </span>
                  <div className="flex items-baseline justify-center sm:justify-start gap-1 my-1">
                    <span 
                      className="text-3xl sm:text-4xl font-black tracking-tight"
                      style={{ color: theme.primaryColor }}
                    >
                      {stat.value}
                    </span>
                    <span className="text-base font-bold text-slate-700">
                      {stat.unit}
                    </span>
                  </div>
                  <span className="text-xs text-slate-600">
                    {stat.sublabel}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
