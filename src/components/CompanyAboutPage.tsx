import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  Award, 
  Truck, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Copy, 
  ExternalLink,
  Clock,
  ArrowRight
} from 'lucide-react';

export const CompanyAboutPage: React.FC = () => {
  const { state, companyAboutTab, setCompanyAboutTab, setActivePage } = useApp();
  const { content } = state;

  const tabs = [
    { id: 'intro', label: '회사소개 & CEO 인사말', icon: Building2 },
    { id: 'system', label: '생산 & 물류시스템', icon: Truck },
    { id: 'permits', label: '인허가사항', icon: Award },
    { id: 'location', label: '오시는 길', icon: MapPin },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('주소가 클립보드에 복사되었습니다: ' + text);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-[#2A2020] animate-in fade-in duration-200">
      {/* Top Hero Banner with Glass Architecture Background (Image 6 style) */}
      <section className="relative h-[280px] sm:h-[340px] flex items-center justify-center overflow-hidden bg-slate-900">
        <img
          src={content.aboutBannerImage || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80"}
          alt="푸드홈 본사 전경"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F1616] via-[#2A2020]/75 to-transparent" />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#872D35]/80 text-white text-xs font-bold mb-3 backdrop-blur-xs border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>FOOD HOME CORPORATE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight drop-shadow-md">
            {content.aboutTitle || 'FOOD HOME 회사소개'}
          </h1>
          <p className="mt-3 text-sm sm:text-lg text-stone-200 font-medium max-w-2xl mx-auto drop-shadow-sm">
            {content.aboutDescription || '우리 가족이 먹을 수 있는 안전한 푸드를 제공하는 푸드홈 입니다.'}
          </p>
        </div>
      </section>

      {/* Breadcrumb & Navigation Sub-Tabs Bar */}
      <div className="sticky top-[78px] z-30 bg-white border-b border-stone-200 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = companyAboutTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCompanyAboutTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all border-b-2 cursor-pointer ${
                    isActive
                      ? 'border-[#872D35] text-[#872D35] bg-stone-50/70'
                      : 'border-transparent text-stone-500 hover:text-stone-900 hover:border-stone-300'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#872D35]' : 'text-stone-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs text-stone-400">
            <span 
              onClick={() => setActivePage('home')}
              className="hover:text-stone-700 cursor-pointer"
            >
              홈
            </span>
            <span>›</span>
            <span className="font-bold text-stone-700">회사소개</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

        {/* TAB 1: 회사소개 & CEO 인사말 */}
        {companyAboutTab === 'intro' && (
          <div className="space-y-12 animate-in fade-in duration-200">
            {/* CEO Greeting Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg border border-stone-200">
                    <img
                      src={content.ceoImageUrl || "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80"}
                      alt="푸드홈 김치 장인 정신"
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                      <p className="text-xs font-bold text-amber-300">{content.ceoSubtitle || 'SINCE 1996 · 30년의 고집'}</p>
                      <p className="text-lg font-black">"{content.ceoHighlight || '안전하고 정직한 김치만 만듭니다'}"</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-block px-3 py-1 rounded bg-[#872D35]/10 text-[#872D35] text-xs font-bold">
                    CEO 인사말
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-stone-900 leading-snug whitespace-pre-line">
                    {content.ceoTitle || '우리 가족이 먹는다는 마음으로,\n끝까지 아삭하고 정직한 맛을 지켜갑니다.'}
                  </h2>
                  <div className="space-y-3 text-stone-600 text-sm sm:text-base leading-relaxed">
                    {content.ceoGreeting ? (
                      content.ceoGreeting.split('\n\n').map((paragraph, pIdx) => (
                        <p key={pIdx} className={pIdx === content.ceoGreeting!.split('\n\n').length - 1 ? "font-semibold text-stone-800" : ""}>
                          {paragraph.split('\n').map((line, lIdx) => (
                            <React.Fragment key={lIdx}>
                              {line}
                              {lIdx < paragraph.split('\n').length - 1 && <br />}
                            </React.Fragment>
                          ))}
                        </p>
                      ))
                    ) : (
                      <>
                        <p>안녕하십니까, 주식회사 푸드홈 대표이사 김진성입니다.</p>
                        <p>푸드홈은 지난 30년간 전국 480여 개 외식 프랜차이즈 및 유명 보쌈·족발 맛집의 든든한 식자재 파트너로 성장해 왔습니다.</p>
                        <p>외식업 대표님들의 가장 큰 고충인 ‘시간 경과에 따른 물 생김’과 ‘계절별 무의 편차’를 해결하기 위해, 푸드홈은 독자적인 특허 수분제어 절임 공법을 개발하여 언제나 꼬들꼬들하고 청량한 김치를 균일하게 공급하고 있습니다.</p>
                        <p className="font-semibold text-stone-800">원가와 타협하지 않는 100% 국산 농산물 계약재배와 청결한 위생 관리로, 대표님의 매장이 손님들에게 언제나 찬사를 받을 수 있도록 최고의 파트너가 되겠습니다.</p>
                      </>
                    )}
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-stone-500">{content.companyName || '주식회사 푸드홈'} {content.ceoRole || '대표이사'}</p>
                      <p className="text-base font-black text-stone-900">{content.ceoName || '김진성'}</p>
                    </div>
                    {content.ceoSignatureImage ? (
                      <img src={content.ceoSignatureImage} alt="서명" className="h-10 object-contain" />
                    ) : (
                      <div className="text-right">
                        <span className="text-xs text-stone-400 font-serif italic">FOOD HOME Co., Ltd.</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Corporate Overview Details Table */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm">
              <h3 className="text-xl font-black text-stone-900 mb-6 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#872D35]" />
                <span>기업 개요</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                <div className="flex border-b border-stone-100 pb-3">
                  <span className="w-32 font-bold text-stone-500">회사명</span>
                  <span className="font-extrabold text-stone-900">{content.companyName}</span>
                </div>
                <div className="flex border-b border-stone-100 pb-3">
                  <span className="w-32 font-bold text-stone-500">대표이사</span>
                  <span className="font-bold text-stone-800">{content.ceoName}</span>
                </div>
                <div className="flex border-b border-stone-100 pb-3">
                  <span className="w-32 font-bold text-stone-500">설립연도</span>
                  <span className="font-bold text-stone-800">1996년 4월 (업력 30년)</span>
                </div>
                <div className="flex border-b border-stone-100 pb-3">
                  <span className="w-32 font-bold text-stone-500">사업자등록번호</span>
                  <span className="font-mono font-bold text-stone-800">{content.businessNumber}</span>
                </div>
                <div className="flex border-b border-stone-100 pb-3">
                  <span className="w-32 font-bold text-stone-500">통신판매업신고</span>
                  <span className="font-bold text-stone-800">{content.mailOrderNumber}</span>
                </div>
                <div className="flex border-b border-stone-100 pb-3">
                  <span className="w-32 font-bold text-stone-500">영업등록번호</span>
                  <span className="font-bold text-stone-800">{content.haccpNumber}</span>
                </div>
                <div className="flex border-b border-stone-100 pb-3 md:col-span-2">
                  <span className="w-32 font-bold text-stone-500 shrink-0">본사 및 제조공장</span>
                  <span className="font-medium text-stone-800">{content.factoryAddress}</span>
                </div>
                <div className="flex pb-3 md:col-span-2">
                  <span className="w-32 font-bold text-stone-500 shrink-0">주요 생산 품목</span>
                  <span className="font-bold text-[#872D35]">
                    명품 보쌈무김치 (업소용 5kg/10kg), 비법 보쌈김칫속, 굴보쌈 양념, 맞춤형 OEM/PB 절임류
                  </span>
                </div>
              </div>
            </div>

            {/* 4 Core Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  title: '100% 국산 농산물',
                  desc: '강원도 고랭지무, 제주 월동무, 영양 태양초 고춧가루, 신안 천일염 계약재배',
                  icon: ShieldCheck
                },
                {
                  title: '특허 수분제어 공법',
                  desc: '시간이 지나도 물이 흥건해지지 않고 아삭하고 꼬들꼬들한 특유의 식감 장시간 유지',
                  icon: Sparkles
                },
                {
                  title: '스마트 청결 라인',
                  desc: '3단 버블 세척, 에어샤워, 금속 검출기 등 위생적이고 엄격한 품질 관리 공정',
                  icon: CheckCircle2
                },
                {
                  title: '전국 냉장 직배송',
                  desc: '당일 생산 당일 출고, 전국 외식 매장 주방까지 익일 오전 신선 콜드체인 공급',
                  icon: Truck
                }
              ].map((val, i) => {
                const Icon = val.icon;
                return (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs hover:border-[#872D35]/40 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-[#872D35]/10 text-[#872D35] flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-extrabold text-base text-stone-900 mb-1">{val.title}</h4>
                    <p className="text-xs text-stone-600 leading-relaxed">{val.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: 생산 & 물류시스템 */}
        {companyAboutTab === 'system' && (
          <div className="space-y-10 animate-in fade-in duration-200">
            {/* Manufacturing Flow */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm">
              <div className="max-w-2xl mb-8">
                <span className="text-xs font-bold text-[#872D35] uppercase tracking-wider">PRODUCTION SYSTEM</span>
                <h3 className="text-2xl font-black text-stone-900 mt-1">
                  {content.systemTitle || '스마트 자동화 생산 공정 프로세스'}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  {content.systemDescription || '산지 직송부터 매장 주방 도착까지, 푸드홈만의 6단계 안심 품질 관리 시스템을 운영합니다.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(content.systemSteps && content.systemSteps.length > 0 ? content.systemSteps : [
                  {
                    step: 'STEP 01',
                    title: '계약재배 산지 원료 입고',
                    desc: '강원도 평창 고랭지무(여름) 및 제주 서귀포 청정 월동무(겨울) 산지에서 당일 수확된 최상급 원무만을 선별 입고합니다.',
                    img: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=600&q=80'
                  },
                  {
                    step: 'STEP 02',
                    title: '3단 마이크로 버블 세척',
                    desc: '고압 미세 기포 발생 장치를 통해 잔류 농약과 흙, 미세 이물질을 3단계에 걸쳐 완벽하게 세척 정단합니다.',
                    img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'
                  },
                  {
                    step: 'STEP 03',
                    title: '특허 수분제어 절임 공정',
                    desc: '신안 천일염의 정확한 염도 비율과 푸드홈 특허 공법을 적용하여, 시간이 흘러도 물러짐 없는 꼬들꼬들함을 완성합니다.',
                    img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'
                  },
                  {
                    step: 'STEP 04',
                    title: '황금 배합비 비법 버무림',
                    desc: '30년 전통 엿기름과 청결 태양초 고춧가루로 저온 숙성된 특제 양념을 매일 새벽 황금 비율로 균일하게 버무립니다.',
                    img: 'https://images.unsplash.com/photo-1583032015879-67990c74900a?auto=format&fit=crop&w=600&q=80'
                  },
                  {
                    step: 'STEP 05',
                    title: '금속검출기 & 정밀 검수',
                    desc: '포장 직전 고감도 금속 검출기와 중량 체크기를 전량 통과시켜 단 0.1%의 규격 미달 및 이물 유입도 철저히 차단합니다.',
                    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80'
                  },
                  {
                    step: 'STEP 06',
                    title: '냉장 콜드체인 익일 직배송',
                    desc: '0~5℃ 정온 유지 전용 특장차량으로 발송되어 주문 다음 날 전국 매장 주방까지 가장 신선한 상태로 직배송됩니다.',
                    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80'
                  }
                ]).map((item, idx) => (
                  <div key={idx} className="rounded-2xl border border-stone-200 overflow-hidden bg-stone-50/50 hover:shadow-md transition-shadow">
                    <div className="h-40 overflow-hidden relative">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-mono font-bold">
                        {item.step}
                      </span>
                    </div>
                    <div className="p-4">
                      <h4 className="font-extrabold text-stone-900 text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-stone-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cold-chain Logistics Banner */}
            <div className="bg-[#2A2020] rounded-3xl p-6 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <span className="text-xs font-bold text-[#E8B4B8]">COLD-CHAIN NETWORK</span>
                <h3 className="text-2xl font-black">
                  전국 480개 외식 매장 매일 아침 직배송
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  생산 즉시 충북 진천 물류허브에서 출발하여 전국 주요 광역 거점을 통해 익일 오전까지 냉장 신선 상태를 그대로 유지하며 배송됩니다.
                </p>
              </div>
              <button
                onClick={() => setActivePage('sample-board-write')}
                className="shrink-0 px-6 py-3.5 rounded-xl bg-[#872D35] hover:bg-[#9E2A2B] text-white font-extrabold text-sm shadow-lg flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
              >
                <span>무료 샘플 1kg 받아보기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: 인허가사항 */}
        {companyAboutTab === 'permits' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm">
              <div className="max-w-2xl mb-8">
                <span className="text-xs font-bold text-[#872D35] uppercase tracking-wider">LEGAL & CERTIFICATIONS</span>
                <h3 className="text-2xl font-black text-stone-900 mt-1">
                  {content.permitsTitle || '공식 영업등록 및 품질 안전 인허가'}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  {content.permitsDescription || '식품위생법 및 관련 법령에 따른 엄격한 정식 인허가를 필하여 안심하고 납품받으실 수 있습니다.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {(content.permitsList && content.permitsList.length > 0 ? content.permitsList : [
                  {
                    title: '식품제조가공업 영업등록',
                    issuer: '충청북도 진천군청',
                    number: '제 2021-04-9218호',
                    desc: '식품위생법 제37조에 따른 정식 식품가공 및 반찬류 제조 시설 적합 인가',
                    status: '정상 등록 유지'
                  },
                  {
                    title: '사업자등록증',
                    issuer: '국세청 (동청주세무서)',
                    number: '312-81-94821',
                    desc: '주식회사 푸드홈 정식 법인 사업자등록 (업태: 제조업 / 종목: 김치 및 절임식품)',
                    status: '법인 정식 인가'
                  },
                  {
                    title: '통신판매업 신고증',
                    issuer: '진천군 일자리경제과',
                    number: '제 2023-충북진천-0145호',
                    desc: '전자상거래 등에서의 소비자보호에 관한 법률에 따른 통신판매 정식 신고',
                    status: '정식 신고 완료'
                  },
                  {
                    title: '자가품질위탁시험 성적서',
                    issuer: '공인 식품위생검사기관',
                    number: '정기 분기별 시험 전항목 적합',
                    desc: '대장균군, 타르색소, 납, 카드뮴, 보존료 일체 불검출 규격 적합 판정',
                    status: '적합 판정'
                  },
                  {
                    title: '생산물 배상책임보험 (PL보험)',
                    issuer: '현대해상화재보험',
                    number: '보상한도 1억원 가입',
                    desc: '푸드홈에서 생산·공급한 식품으로 인한 사고 발생 시 전액 배상 보장',
                    status: '가입 유지 중'
                  },
                  {
                    title: '원산지 증명 및 계약재배 협약서',
                    issuer: '농협 및 산지 영농조합',
                    number: '강원도 평창 / 제주 서귀포',
                    desc: '100% 국산 농산물 원료 수급 증명 및 잔류농약 불검출 검사 확인서',
                    status: '계약 체결 완료'
                  }
                ]).map((cert, idx) => (
                  <div key={idx} className="p-5 rounded-2xl border border-stone-200 bg-stone-50/60 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                          {cert.status}
                        </span>
                        <span className="text-[11px] text-stone-400 font-medium">{cert.issuer}</span>
                      </div>
                      <h4 className="font-extrabold text-stone-900 text-sm mb-1">{cert.title}</h4>
                      <p className="font-mono text-xs text-[#872D35] font-bold mb-2">{cert.number}</p>
                      <p className="text-xs text-stone-600 leading-relaxed">{cert.desc}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-stone-500 font-semibold">
                      <span>증빙 서류 요청 가능</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: 오시는 길 */}
        {companyAboutTab === 'location' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Manufacturing Center / Main Headquarters Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs font-bold text-[#872D35] uppercase tracking-wider">MANUFACTURING & HEADQUARTERS</span>
                  <h3 className="text-2xl font-black text-stone-900 mt-1">
                    {content.locationTitle || '충북 진천 제1·2 식품가공공장 및 제조물류센터'}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 mt-1">
                    {content.locationDescription || '푸드홈의 전 제품이 청결한 안심 위생 라인에서 제조·출하되는 중심 거점입니다.'}
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(content.factoryAddress)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 hover:bg-stone-50 cursor-pointer shadow-2xs"
                >
                  <Copy className="w-3.5 h-3.5 text-[#872D35]" />
                  <span>주소 복사</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 text-sm">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#872D35] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-black text-stone-900">{content.factoryAddress}</p>
                        <p className="text-xs text-stone-500 mt-0.5">
                          {content.locationGuide || '충청북도 진천군 덕산읍 신척산단로 128 (신척일반산업단지 내 식품전용블록)'}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-stone-200 text-xs text-stone-600">
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-stone-400" />
                        <span className="font-bold text-stone-900">대표전화: {content.phone}</span>
                      </div>
                      {content.fax && (
                        <div className="flex items-center gap-1.5">
                          <span>팩스: {content.fax}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        <span>운영시간: {content.csHours}</span>
                      </div>
                    </div>

                    {(content.transitInfo || content.parkingInfo) && (
                      <div className="pt-3 border-t border-stone-200 text-xs space-y-1">
                        {content.transitInfo && (
                          <p className="text-stone-600">
                            <span className="font-bold text-stone-800">교통 안내: </span>
                            {content.transitInfo}
                          </p>
                        )}
                        {content.parkingInfo && (
                          <p className="text-stone-600">
                            <span className="font-bold text-stone-800">주차 안내: </span>
                            {content.parkingInfo}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <a
                      href={`https://map.naver.com/v5/search/${encodeURIComponent(content.factoryAddress)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-[#03C75A] text-white text-xs font-bold hover:opacity-90 inline-flex items-center gap-1.5 shadow-2xs"
                    >
                      <span>네이버 지도에서 보기</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={`https://map.kakao.com/link/search/${encodeURIComponent(content.factoryAddress)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-[#FEE500] text-[#191919] text-xs font-bold hover:opacity-90 inline-flex items-center gap-1.5 shadow-2xs"
                    >
                      <span>카카오맵에서 보기</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5 h-64 rounded-2xl overflow-hidden border border-stone-200 shadow-inner relative">
                  <img
                    src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800&q=80"
                    alt="진천 제조공장 전경"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-stone-900/40 flex items-center justify-center p-4 text-center">
                    <div className="bg-white/95 px-5 py-3 rounded-2xl shadow-xl border border-stone-200">
                      <p className="font-black text-sm text-stone-900">{content.companyName || '주식회사 푸드홈'}</p>
                      <p className="text-xs text-stone-600 mt-0.5">{content.factoryAddress}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Quick Action Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-stone-100 border border-stone-200 text-center">
          <h4 className="font-black text-lg text-stone-900 mb-2">
            직접 맛을 보시고 결정하세요. 1kg 무료 샘플팩 신청 접수 중
          </h4>
          <p className="text-xs sm:text-sm text-stone-600 mb-5">
            사업자등록증을 보유하신 모든 외식업 대표님께 푸드홈 시그니처 보쌈무김치를 무료로 발송해 드립니다.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setActivePage('sample-board-write')}
              className="px-6 py-3 rounded-xl bg-[#872D35] hover:bg-[#9E2A2B] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              무료 샘플 신청글 쓰기
            </button>
            <button
              onClick={() => setActivePage('products')}
              className="px-6 py-3 rounded-xl bg-white border border-stone-300 text-stone-800 font-bold text-xs sm:text-sm hover:bg-stone-50 transition-all cursor-pointer"
            >
              전체 제품 라인업 보기
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
