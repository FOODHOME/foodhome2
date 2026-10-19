import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { submitToFormspree } from '../utils/formspree';
import { 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Phone, 
  Mail, 
  Building2, 
  Truck, 
  FileSpreadsheet, 
  ShieldCheck,
  Loader2,
  Check
} from 'lucide-react';

export const SampleInquirySection: React.FC = () => {
  const { addInquiry, state, showToast } = useApp();

  const [formData, setFormData] = useState<{
    companyName: string;
    contactPerson: string;
    phone: string;
    email: string;
    businessType: string;
    requestType: '무료 샘플 요청' | '대량 납품 견적' | 'OEM/PB 제휴 문의';
    monthlyUsage: string;
    region: string;
    message: string;
  }>({
    companyName: '',
    contactPerson: '',
    phone: '',
    email: '',
    businessType: '보쌈·족발 전문점',
    requestType: '무료 샘플 요청',
    monthlyUsage: '월 100kg ~ 200kg',
    region: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.phone || !formData.contactPerson) {
      alert('상호명, 담당자 성명, 연락처는 필수 입력 항목입니다.');
      return;
    }

    setIsSubmitting(true);

    const endpoint = state.formspreeEndpoint || 'https://formspree.io/f/xoejykbn';
    
    // 1. Submit to Formspree
    const formspreeResult = await submitToFormspree(endpoint, {
      상호명_매장명: formData.companyName,
      대표자_담당자명: formData.contactPerson,
      연락처: formData.phone,
      이메일: formData.email || '미입력',
      업종형태: formData.businessType,
      신청유형: formData.requestType,
      월예상소진량: formData.monthlyUsage,
      배송지역_주소: formData.region || '미입력',
      상세요청사항: formData.message || '요청사항 없음',
      접수시각: new Date().toLocaleString('ko-KR'),
      _subject: `[푸드홈] B2B 문의 접수 - ${formData.companyName} (${formData.requestType})`,
      _replyto: formData.email || undefined
    });

    // 2. Register into local App state for Admin Dashboard
    addInquiry({
      companyName: formData.companyName,
      contactPerson: formData.contactPerson,
      phone: formData.phone,
      email: formData.email,
      businessType: formData.businessType,
      requestType: formData.requestType,
      monthlyUsage: formData.monthlyUsage,
      region: formData.region,
      message: formData.message
    });

    setIsSubmitting(false);
    setIsSubmitted(true);

    if (formspreeResult.success) {
      showToast('Formspree로 데이터가 성공적으로 전송되었습니다!');
    } else {
      showToast('로컬 접수 완료 (Formspree: ' + (formspreeResult.message || '전송 확인 요망') + ')');
    }
  };

  const handleReset = () => {
    setFormData({
      companyName: '',
      contactPerson: '',
      phone: '',
      email: '',
      businessType: '보쌈·족발 전문점',
      requestType: '무료 샘플 요청',
      monthlyUsage: '월 100kg ~ 200kg',
      region: '',
      message: ''
    });
    setIsSubmitted(false);
  };

  return (
    <section id="inquiry-section" className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Information Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 text-blue-700 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>B2B WHOLESALE & SAMPLE REQUEST</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-snug">
              외식업 사장님을 위한 <br />
              <span className="text-blue-600">무료 샘플 1kg</span> & 맞춤 견적 신청
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              식자재는 맛과 품질을 직접 경험해보셔야 결정하실 수 있습니다. 
              현재 운영 중이신 사업자 또는 창업 예정자분들께 푸드홈 시그니처 보쌈무김치 1kg 무료 샘플팩과 규격 단가표를 전액 무료로 배송해 드립니다.
            </p>

            {/* Benefit Bullets */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <Truck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">냉장 우체국 택배비 100% 무료 지원</h4>
                  <p className="text-xs text-slate-500">샘플 제품값은 물론 배송비까지 푸드홈이 전액 부담합니다.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <FileSpreadsheet className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">식자재 납품 단가표 및 제품 규격서 동봉</h4>
                  <p className="text-xs text-slate-500">대량 발주 시 할인율과 맞춤 배합(OEM) 가이드를 제공합니다.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">신청 후 24시간 이내 신선 생산 출고</h4>
                  <p className="text-xs text-slate-500">주문 즉시 버무려 갓 담근 신선한 상태로 배송됩니다.</p>
                </div>
              </div>
            </div>

            {/* Direct Phone Assistance */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500 block">빠른 유선 상담 & 급송 요청</span>
                <span className="text-lg font-black text-slate-900">{state.content.phone}</span>
              </div>
              <a
                href={`tel:${state.content.phone}`}
                className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>바로 통화하기</span>
              </a>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
              
              {isSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900">
                    B2B 무료 샘플 및 견적 문의가 성공적으로 접수되었습니다!
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    입력해주신 연락처({formData.phone})로 담당 영양사 및 B2B 영업팀장이 확인 후 샘플 발송 일정과 상세 단가표를 신속히 안내해 드리겠습니다.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={handleReset}
                      className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                      추가 문의 작성하기
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <h3 className="text-base font-bold text-slate-900">
                      신청서 작성 (소요 시간 1분)
                    </h3>
                    <span className="text-xs text-rose-500 font-medium">* 필수 항목</span>
                  </div>

                  {/* Request Type Radio Pills */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-2">
                      신청 유형 선택 <span className="text-rose-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {(['무료 샘플 요청', '대량 납품 견적', 'OEM/PB 제휴 문의'] as const).map((type) => (
                        <button
                          type="button"
                          key={type}
                          onClick={() => setFormData({ ...formData, requestType: type })}
                          className={`py-2 px-3 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                            formData.requestType === type
                              ? 'bg-blue-600 border-blue-600 text-white shadow-2xs'
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Company Name & Contact Person */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        상호명 / 매장명 <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="예: 맛있는보쌈 본점"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        담당자 / 대표자 성함 <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        placeholder="예: 홍길동 대표"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        휴대전화 / 연락처 <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="예: 010-1234-5678"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        이메일 주소 (견적서 수신용)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="예: owner@email.com"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Business Type & Monthly Usage */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        업종 형태
                      </label>
                      <select
                        value={formData.businessType}
                        onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="보쌈·족발 전문점">보쌈·족발 전문점</option>
                        <option value="삼겹살 / 정육식당">삼겹살 / 정육식당</option>
                        <option value="국밥 / 설렁탕 / 백반">국밥 / 설렁탕 / 백반</option>
                        <option value="프랜차이즈 가맹본부">프랜차이즈 가맹본부</option>
                        <option value="식자재 유통 및 도매">식자재 유통 및 도매</option>
                        <option value="외식업 창업 준비 중">외식업 창업 준비 중</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        월 예상 김치 소진량
                      </label>
                      <select
                        value={formData.monthlyUsage}
                        onChange={(e) => setFormData({ ...formData, monthlyUsage: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="월 50kg 미만">월 50kg 미만</option>
                        <option value="월 50kg ~ 150kg">월 50kg ~ 150kg</option>
                        <option value="월 150kg ~ 300kg">월 150kg ~ 300kg</option>
                        <option value="월 300kg ~ 500kg">월 300kg ~ 500kg</option>
                        <option value="월 500kg 이상 (대량)">월 500kg 이상 (대량)</option>
                      </select>
                    </div>
                  </div>

                  {/* Delivery Location / Region */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      배송 희망 지역 / 주소
                    </label>
                    <input
                      type="text"
                      value={formData.region}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                      placeholder="예: 서울 강남구 역삼동 또는 경기 성남시 분당구"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Additional Message */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      요청사항 및 상세 문의
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="예: 김칫속과 보쌈무김치 2종 모두 샘플로 받아보고 싶습니다. 현재 족발집 운영 중입니다."
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl font-bold text-white text-sm sm:text-base shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{ backgroundColor: state.theme.primaryColor }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>신청 데이터 전송 중...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>무료 샘플 1kg 및 단가표 신청하기</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 pt-1 text-[11px] text-blue-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>Formspree 공식 연동: 접수 즉시 담당자에게 실시간 알림이 발송됩니다.</span>
                  </div>

                  <p className="text-[11px] text-center text-slate-500">
                    수집된 개인정보 및 사업자 정보는 샘플 발송 및 B2B 견적 상담 목적으로만 안전하게 사용됩니다.
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
