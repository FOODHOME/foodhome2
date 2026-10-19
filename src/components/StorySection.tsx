import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Truck, 
  Check, 
  Leaf, 
  Building2, 
  BadgePercent 
} from 'lucide-react';

export const StorySection: React.FC = () => {
  const { state } = useApp();
  const { content, theme } = state;

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-blue-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-blue-600" />;
      case 'Award':
        return <Award className="w-6 h-6 text-blue-600" />;
      case 'Truck':
        return <Truck className="w-6 h-6 text-blue-600" />;
      default:
        return <Sparkles className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <section id="story-section" className="py-20 bg-slate-50/70 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span 
            className="text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-blue-100/70 text-blue-700"
          >
            BRAND HERITAGE & QUALITY
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            {content.storyTitle}
          </h2>
          <p className="text-base text-slate-600 font-medium">
            {content.storySubtitle}
          </p>
        </div>

        {/* Story Intro Box with Imagery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200/80 mb-16">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2 text-sm font-bold text-blue-600">
              <Leaf className="w-4 h-4" />
              <span>30년 김치 명인의 고집스런 전통과 현대 위생과학의 만남</span>
            </div>
            
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
              {content.storyParagraph1}
            </p>
            
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {content.storyParagraph2}
            </p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">✓</span>
                제주 월동무 & 강원 고랭지무 계약재배
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">✓</span>
                경북 영양 100% 태양초 고춧가루 사용
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">✓</span>
                충남 광천 토굴 숙성 새우젓 비법 블렌딩
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">✓</span>
                전라남도 신안 3년 묵은 천일염 간수제거
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-xl overflow-hidden aspect-4/3 shadow-md border border-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80" 
                alt="푸드홈 신선 원재료 선별" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent flex items-end p-5">
                <div className="text-white">
                  <span className="text-xs font-bold text-blue-300">청결 산지 계약재배</span>
                  <p className="text-sm font-extrabold">매일 아침 가장 단단하고 수분감 좋은 신선무만 선별 입고</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Competency Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.coreValues.map((val, idx) => (
            <div 
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {renderIcon(val.icon)}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {val.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {val.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span>공정 원칙 0{idx + 1}</span>
                <span className="text-blue-600 font-bold group-hover:translate-x-1 transition-transform">
                  FOODHOME
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
