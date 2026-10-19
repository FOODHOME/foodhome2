import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Search, 
  Waves, 
  Sparkles, 
  FlaskConical, 
  ScanLine, 
  Truck,
  CheckCircle2,
  FileCheck2
} from 'lucide-react';

export const ManufacturingProcess: React.FC = () => {
  const { state } = useApp();

  const steps = [
    {
      step: '01',
      title: '산지직송 무 엄선 및 검수',
      desc: '제주 월동무 및 강원 고랭지 계약재배 농가로부터 매일 새벽 입고된 무 중 상처가 없고 속이 꽉 찬 최상급 원물만 엄격히 선별합니다.',
      icon: <Search className="w-5 h-5 text-blue-600" />,
      highlight: '원물 당도 및 밀도 전수 검사'
    },
    {
      step: '02',
      title: '3단 마이크로 버블 세척',
      desc: '흙먼지와 잔류 이물질을 고압 초음파 마이크로 미세 버블 세척 라인을 통해 3단계로 완벽하게 세척하여 껍질째 위생적으로 가공합니다.',
      icon: <Waves className="w-5 h-5 text-blue-600" />,
      highlight: '잔류 농약 ZERO 무결점 세척'
    },
    {
      step: '03',
      title: '특허 수분제어 저온 절임',
      desc: '신안 3년산 천일염으로 무 속 수분을 특수 삼투압 원리로 제어하여 절인 뒤, 48시간 저온 숙성해 무름 현상을 원천 방지합니다.',
      icon: <Sparkles className="w-5 h-5 text-blue-600" />,
      highlight: '물 생김 방지 특허 공법 적용'
    },
    {
      step: '04',
      title: '30년 비법양념 황금 배합',
      desc: '영양 태양초 고춧가루, 광천 토굴 새우젓, 직접 달인 비법 멸치육수와 신선 과일 퓨레를 정량 배합하여 매일 신선하게 치댑니다.',
      icon: <FlaskConical className="w-5 h-5 text-blue-600" />,
      highlight: '화학 조미료/착색료 무첨가'
    },
    {
      step: '05',
      title: 'X-ray 이물질·금속 검출',
      desc: '포장 직전 최첨단 3D X-ray 투시 검사기와 초정밀 금속검출기를 거쳐 1mm 이하의 미세 이물질까지 100% 필터링합니다.',
      icon: <ScanLine className="w-5 h-5 text-blue-600" />,
      highlight: '식약처 HACCP 공정 규격 준수'
    },
    {
      step: '06',
      title: '2중 진공포장 & 콜드체인 출고',
      desc: '특수 질소충전 2중 필름으로 산소 접촉을 차단한 후 0~5℃ 저온 냉장차량을 통해 전국 각지 매장으로 익일 오전 직배송됩니다.',
      icon: <Truck className="w-5 h-5 text-blue-600" />,
      highlight: '전국 익일 냉장 안전 직배송'
    }
  ];

  return (
    <section id="process-section" className="py-20 bg-slate-50/60 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 text-blue-700 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>HACCP 1등급 클린 스마트 팩토리</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            한치의 타협도 없는 6단계 안심 위생 제조공정
          </h2>
          <p className="text-base text-slate-600 font-normal">
            푸드홈은 깨끗하고 투명한 공정에서 가장 정직하게 김치를 만듭니다. 식약처 기준을 뛰어넘는 엄격한 품질 관리로 사장님들의 신뢰를 얻고 있습니다.
          </p>
        </div>

        {/* 6 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {steps.map((st) => (
            <div 
              key={st.step}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all duration-300 relative group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    {st.icon}
                  </div>
                  <span className="text-2xl font-black text-slate-200 group-hover:text-blue-500/30 transition-colors">
                    {st.step}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                  {st.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {st.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-blue-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                <span>{st.highlight}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Facility Credentials Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <FileCheck2 className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">
                공식 식약처 식품안전관리인증(HACCP) 제 2021-04-9218호
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                자가품질검사 매월 1회 전 항목 정밀 검사 실시 / 영양성분 및 미생물(대장균군·타르색소) 적합 판정 완료
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
              ✓ 배상책임보험 1억원 가입
            </span>
            <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
              ✓ 정기 소독방역 완료
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
