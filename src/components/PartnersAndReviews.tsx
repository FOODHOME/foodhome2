import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Star, 
  Quote, 
  Building, 
  MapPin, 
  BadgeCheck, 
  Store, 
  ThumbsUp 
} from 'lucide-react';

export const PartnersAndReviews: React.FC = () => {
  const { state } = useApp();

  const partnerBrands = [
    '한양왕족발', '도담보쌈 본점', '원조 장충동할매족발', '제주흑돈명가', 
    '인생수육국밥', '삼산회관 협력점', '정통 굴보쌈마을', '황금돼지정육식당'
  ];

  return (
    <section id="review-section" className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span 
            className="text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-blue-100/70 text-blue-700"
          >
            PARTNER STORIES & TRUST
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            전국 480여 개 외식 매장이 푸드홈을 신뢰하는 이유
          </h2>
          <p className="text-base text-slate-600 font-normal">
            까다로운 손님들의 입맛을 사로잡고 주방 인건비와 재료 손실을 획기적으로 줄인 실제 사장님들의 생생한 후기입니다.
          </p>
        </div>

        {/* Partner Brands Running Ticker */}
        <div className="mb-14 p-5 rounded-2xl bg-slate-50 border border-slate-100">
          <div className="text-center text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">
            전국 대표 족발·보쌈 프랜차이즈 및 맛집 공급 파트너
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4">
            {partnerBrands.map((brand, idx) => (
              <div 
                key={idx}
                className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 shadow-2xs flex items-center gap-1.5"
              >
                <Store className="w-3.5 h-3.5 text-blue-600" />
                <span>{brand}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {state.reviews.map((rev) => (
            <div 
              key={rev.id}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow relative flex flex-col justify-between"
            >
              <div>
                {/* Header row with rating & location */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{rev.location}</span>
                  </div>
                </div>

                {/* Comment */}
                <div className="relative mb-6">
                  <Quote className="w-8 h-8 text-blue-100 absolute -top-3 -left-2 -z-0" />
                  <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-medium relative z-10 pl-2">
                    "{rev.comment}"
                  </p>
                </div>
              </div>

              {/* Author & Verification */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    {rev.clientName}
                    {rev.verifiedPartner && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700">
                        <BadgeCheck className="w-3 h-3 text-blue-600" />
                        공식 납품처
                      </span>
                    )}
                  </h4>
                  <span className="text-xs text-slate-500">
                    {rev.businessType}
                  </span>
                </div>

                <span className="text-xs text-slate-400">
                  {rev.date}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Review Bottom Banner */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-5 py-3 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs sm:text-sm font-bold">
            <ThumbsUp className="w-4 h-4 text-blue-600" />
            <span>납품 매장 점주님 98.8%가 "김치 변경 후 고객 만족도와 재방문율이 눈에 띄게 상승했다"고 응답했습니다.</span>
          </div>
        </div>

      </div>
    </section>
  );
};
