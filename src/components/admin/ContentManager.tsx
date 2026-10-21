import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { uploadImageToStorage } from '../../lib/supabase';
import { 
  Building, 
  Package, 
  Cpu, 
  Truck, 
  PhoneCall, 
  Save, 
  Upload, 
  Plus, 
  Trash2, 
  Sparkles, 
  Check, 
  HelpCircle,
  FileText
} from 'lucide-react';

export const ContentManager: React.FC = () => {
  const { 
    state, 
    updateContent, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    showToast 
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'about' | 'products' | 'process' | 'wholesale' | 'cs'>('about');
  const [aboutSubSection, setAboutSubSection] = useState<'intro' | 'system' | 'permits' | 'location'>('intro');
  const [contentForm, setContentForm] = useState(state.content);
  const [isUploading, setIsUploading] = useState(false);

  // Sync when state.content updates
  React.useEffect(() => {
    setContentForm(state.content);
  }, [state.content]);

  const handleFieldChange = (field: keyof typeof contentForm, value: any) => {
    setContentForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveContent = () => {
    updateContent(contentForm);
    showToast('콘텐츠 변경사항이 홈페이지에 성공적으로 저장되었습니다.');
  };

  const handleImageUpload = async (field: keyof typeof contentForm, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const res = await uploadImageToStorage(file, 'content');
    setIsUploading(false);

    if (res.url) {
      handleFieldChange(field, res.url);
      showToast('이미지가 업로드되었습니다.');
    } else {
      alert(res.error || '이미지 업로드에 실패했습니다.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-[#872D35]/10 text-[#872D35]">
              <FileText className="w-5 h-5" />
            </span>
            <h3 className="text-base font-bold text-stone-900">전체 홈페이지 콘텐츠 관리</h3>
          </div>
          <p className="text-xs text-stone-500">
            회사소개, 제품소개, 제조공정, 납품안내, 고객센터 페이지의 모든 문구와 이미지를 직접 수정합니다.
          </p>
        </div>

        <button
          onClick={handleSaveContent}
          className="px-6 py-2.5 rounded-xl bg-[#872D35] hover:bg-[#6D242B] text-white text-xs font-extrabold shadow-sm flex items-center gap-1.5 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>콘텐츠 전체 저장</span>
        </button>
      </div>

      {/* Sub Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'about', label: '1. 회사소개 관리', icon: Building },
          { id: 'products', label: '2. 제품소개 관리', icon: Package },
          { id: 'process', label: '3. 제조공정 관리', icon: Cpu },
          { id: 'wholesale', label: '4. 납품안내 관리', icon: Truck },
          { id: 'cs', label: '5. 고객센터 관리', icon: PhoneCall },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-[#872D35] text-white shadow-2xs'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. 회사소개 관리 (4개 세부 페이지 독립 관리) */}
      {activeSubTab === 'about' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
            <div>
              <h4 className="text-base font-black text-stone-900 flex items-center gap-2">
                <Building className="w-5 h-5 text-[#872D35]" />
                <span>회사소개 4개 세부 페이지 콘텐츠 관리</span>
              </h4>
              <p className="text-xs text-stone-500 mt-0.5">
                CEO 인사말, 생산시스템, 인허가사항, 오시는 길의 모든 문구와 이미지를 직접 수정합니다.
              </p>
            </div>

            <button
              onClick={handleSaveContent}
              className="self-start sm:self-auto px-5 py-2 rounded-xl bg-[#872D35] hover:bg-[#6D242B] text-white text-xs font-extrabold shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>회사소개 변경사항 저장</span>
            </button>
          </div>

          {/* 4 Detail Subtabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-stone-100/80 rounded-xl">
            {[
              { id: 'intro', label: '1. 회사소개 & CEO 인사말' },
              { id: 'system', label: '2. 생산 & 물류시스템' },
              { id: 'permits', label: '3. 인허가사항' },
              { id: 'location', label: '4. 오시는 길' }
            ].map((sub) => {
              const isActive = (aboutSubSection || 'intro') === sub.id;
              return (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => setAboutSubSection(sub.id as any)}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                    isActive
                      ? 'bg-[#872D35] text-white shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                  }`}
                >
                  {sub.label}
                </button>
              );
            })}
          </div>

          {/* ① 회사소개 & CEO 인사말 */}
          {(!aboutSubSection || aboutSubSection === 'intro') && (
            <div className="space-y-5 animate-in fade-in duration-150">
              {/* Banner Info */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                <span className="text-xs font-black text-stone-800 block">상단 메인 배너 설정</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 mb-1">상단 배너 제목</label>
                    <input
                      type="text"
                      value={contentForm.aboutTitle || ''}
                      onChange={(e) => handleFieldChange('aboutTitle', e.target.value)}
                      placeholder="예: FOOD HOME 회사소개"
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 mb-1">상단 배너 설명 문구</label>
                    <input
                      type="text"
                      value={contentForm.aboutDescription || ''}
                      onChange={(e) => handleFieldChange('aboutDescription', e.target.value)}
                      placeholder="예: 우리 가족이 먹을 수 있는 안전한 푸드를 제공하는 푸드홈 입니다."
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">상단 배너 배경 이미지</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={contentForm.aboutBannerImage || ''}
                      onChange={(e) => handleFieldChange('aboutBannerImage', e.target.value)}
                      placeholder="이미지 URL"
                      className="flex-1 px-3 py-2 rounded-lg border border-stone-200 text-xs bg-white"
                    />
                    <label className="px-3 py-2 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs font-bold flex items-center gap-1 cursor-pointer shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <span>업로드</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload('aboutBannerImage', e)}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* CEO Greeting Info */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                <span className="text-xs font-black text-stone-800 block">CEO 인사말 설정</span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 mb-1">CEO 인사말 소제목 (뱃지)</label>
                    <input
                      type="text"
                      value={contentForm.ceoSubtitle || 'SINCE 1996 · 30년의 고집'}
                      onChange={(e) => handleFieldChange('ceoSubtitle', e.target.value)}
                      placeholder="예: SINCE 1996 · 30년의 고집"
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 mb-1">강조 문구 (사진 위 문구)</label>
                    <input
                      type="text"
                      value={contentForm.ceoHighlight || '안전하고 정직한 김치만 만듭니다'}
                      onChange={(e) => handleFieldChange('ceoHighlight', e.target.value)}
                      placeholder="예: 안전하고 정직한 김치만 만듭니다"
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">CEO 인사말 메인 제목</label>
                  <input
                    type="text"
                    value={contentForm.ceoTitle || '우리 가족이 먹는다는 마음으로, 끝까지 아삭하고 정직한 맛을 지켜갑니다.'}
                    onChange={(e) => handleFieldChange('ceoTitle', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs bg-white font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">
                    CEO 인사말 본문 (줄바꿈 시 홈페이지에 단락으로 반영됩니다)
                  </label>
                  <textarea
                    rows={6}
                    value={contentForm.ceoGreeting || ''}
                    onChange={(e) => handleFieldChange('ceoGreeting', e.target.value)}
                    placeholder="인사말 본문 내용..."
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs bg-white leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 mb-1">CEO 성함</label>
                    <input
                      type="text"
                      value={contentForm.ceoName || '김진성'}
                      onChange={(e) => handleFieldChange('ceoName', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 mb-1">CEO 직책</label>
                    <input
                      type="text"
                      value={contentForm.ceoRole || '대표이사'}
                      onChange={(e) => handleFieldChange('ceoRole', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 mb-1">CEO 이미지 URL</label>
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={contentForm.ceoImageUrl || ''}
                        onChange={(e) => handleFieldChange('ceoImageUrl', e.target.value)}
                        className="flex-1 px-2.5 py-2 rounded-lg border border-stone-200 text-xs bg-white"
                      />
                      <label className="px-2.5 py-2 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs font-bold cursor-pointer shrink-0">
                        <Upload className="w-3 h-3" />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload('ceoImageUrl', e)}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ② 생산 & 물류시스템 */}
          {aboutSubSection === 'system' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                <span className="text-xs font-black text-stone-800 block">페이지 헤더 문구</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 mb-1">페이지 제목</label>
                    <input
                      type="text"
                      value={contentForm.systemTitle || '스마트 자동화 생산 공정 프로세스'}
                      onChange={(e) => handleFieldChange('systemTitle', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs bg-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 mb-1">페이지 설명 문구</label>
                    <input
                      type="text"
                      value={contentForm.systemDescription || '산지 직송부터 매장 주방 도착까지, 푸드홈만의 6단계 안심 품질 관리 시스템을 운영합니다.'}
                      onChange={(e) => handleFieldChange('systemDescription', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Steps List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-stone-800">
                    6단계 안심 공정 단계 관리 ({(contentForm.systemSteps || []).length}개)
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const cur = contentForm.systemSteps || [];
                      const nextStepNum = cur.length + 1;
                      const newStep = {
                        step: `STEP 0${nextStepNum}`,
                        title: `새 공정 단계 ${nextStepNum}`,
                        desc: '공정에 대한 상세 설명을 입력해 주세요.',
                        img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'
                      };
                      handleFieldChange('systemSteps', [...cur, newStep]);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>공정 단계 추가</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {(contentForm.systemSteps || []).map((st, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-[#872D35] text-white text-[11px] font-mono font-bold">
                            {st.step}
                          </span>
                          <input
                            type="text"
                            value={st.title}
                            onChange={(e) => {
                              const updated = [...(contentForm.systemSteps || [])];
                              updated[idx].title = e.target.value;
                              handleFieldChange('systemSteps', updated);
                            }}
                            className="px-2.5 py-1 text-xs font-bold border border-stone-300 rounded-lg bg-white w-52"
                            placeholder="공정 제목"
                          />
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => {
                              const updated = [...(contentForm.systemSteps || [])];
                              const [moved] = updated.splice(idx, 1);
                              updated.splice(idx - 1, 0, moved);
                              handleFieldChange('systemSteps', updated);
                            }}
                            className="p-1 rounded bg-stone-100 hover:bg-stone-200 disabled:opacity-30 cursor-pointer text-xs"
                          >
                            ▲
                          </button>
                          <button
                            type="button"
                            disabled={idx === (contentForm.systemSteps || []).length - 1}
                            onClick={() => {
                              const updated = [...(contentForm.systemSteps || [])];
                              const [moved] = updated.splice(idx, 1);
                              updated.splice(idx + 1, 0, moved);
                              handleFieldChange('systemSteps', updated);
                            }}
                            className="p-1 rounded bg-stone-100 hover:bg-stone-200 disabled:opacity-30 cursor-pointer text-xs"
                          >
                            ▼
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`'${st.title}' 단계를 삭제하시겠습니까?`)) {
                                const updated = (contentForm.systemSteps || []).filter((_, i) => i !== idx);
                                handleFieldChange('systemSteps', updated);
                              }
                            }}
                            className="p-1 text-red-500 hover:text-red-700 cursor-pointer ml-1"
                            title="삭제"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                        <div className="sm:col-span-2">
                          <input
                            type="text"
                            value={st.desc}
                            onChange={(e) => {
                              const updated = [...(contentForm.systemSteps || [])];
                              updated[idx].desc = e.target.value;
                              handleFieldChange('systemSteps', updated);
                            }}
                            className="w-full px-2.5 py-1.5 text-xs border border-stone-200 rounded-lg bg-white"
                            placeholder="공정 상세 설명"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            value={st.img}
                            onChange={(e) => {
                              const updated = [...(contentForm.systemSteps || [])];
                              updated[idx].img = e.target.value;
                              handleFieldChange('systemSteps', updated);
                            }}
                            className="w-full px-2.5 py-1.5 text-xs border border-stone-200 rounded-lg bg-white font-mono"
                            placeholder="이미지 URL"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ③ 인허가사항 */}
          {aboutSubSection === 'permits' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                <span className="text-xs font-black text-stone-800 block">인허가 페이지 헤더 문구</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 mb-1">페이지 제목</label>
                    <input
                      type="text"
                      value={contentForm.permitsTitle || '공식 영업등록 및 품질 안전 인허가'}
                      onChange={(e) => handleFieldChange('permitsTitle', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs bg-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 mb-1">페이지 설명 문구</label>
                    <input
                      type="text"
                      value={contentForm.permitsDescription || '식품위생법 및 관련 법령에 따른 엄격한 정식 인허가를 필하여 안심하고 납품받으실 수 있습니다.'}
                      onChange={(e) => handleFieldChange('permitsDescription', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Permits List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-stone-800">
                    공식 인허가 및 인증 목록 ({(contentForm.permitsList || []).length}개)
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const cur = contentForm.permitsList || [];
                      const newPermit = {
                        title: '새 인증 / 인허가명',
                        issuer: '발급 기관명',
                        number: '제 2026-00호',
                        desc: '인허가에 대한 상세 인증 내역입니다.',
                        status: '정상 등록 완료'
                      };
                      handleFieldChange('permitsList', [...cur, newPermit]);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>인증 항목 추가</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {(contentForm.permitsList || []).map((cert, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1">
                          <input
                            type="text"
                            value={cert.title}
                            onChange={(e) => {
                              const updated = [...(contentForm.permitsList || [])];
                              updated[idx].title = e.target.value;
                              handleFieldChange('permitsList', updated);
                            }}
                            className="px-2.5 py-1 text-xs font-bold border border-stone-300 rounded-lg bg-white"
                            placeholder="인증명 (예: 식품제조가공업 영업등록)"
                          />
                          <input
                            type="text"
                            value={cert.issuer}
                            onChange={(e) => {
                              const updated = [...(contentForm.permitsList || [])];
                              updated[idx].issuer = e.target.value;
                              handleFieldChange('permitsList', updated);
                            }}
                            className="px-2.5 py-1 text-xs border border-stone-200 rounded-lg bg-white"
                            placeholder="발급 기관 (예: 충청북도 진천군청)"
                          />
                          <input
                            type="text"
                            value={cert.number}
                            onChange={(e) => {
                              const updated = [...(contentForm.permitsList || [])];
                              updated[idx].number = e.target.value;
                              handleFieldChange('permitsList', updated);
                            }}
                            className="px-2.5 py-1 text-xs font-mono font-bold border border-stone-200 rounded-lg bg-white text-[#872D35]"
                            placeholder="인가 번호"
                          />
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => {
                              const updated = [...(contentForm.permitsList || [])];
                              const [moved] = updated.splice(idx, 1);
                              updated.splice(idx - 1, 0, moved);
                              handleFieldChange('permitsList', updated);
                            }}
                            className="p-1 rounded bg-stone-100 hover:bg-stone-200 disabled:opacity-30 cursor-pointer text-xs"
                          >
                            ▲
                          </button>
                          <button
                            type="button"
                            disabled={idx === (contentForm.permitsList || []).length - 1}
                            onClick={() => {
                              const updated = [...(contentForm.permitsList || [])];
                              const [moved] = updated.splice(idx, 1);
                              updated.splice(idx + 1, 0, moved);
                              handleFieldChange('permitsList', updated);
                            }}
                            className="p-1 rounded bg-stone-100 hover:bg-stone-200 disabled:opacity-30 cursor-pointer text-xs"
                          >
                            ▼
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`'${cert.title}' 인증 항목을 삭제하시겠습니까?`)) {
                                const updated = (contentForm.permitsList || []).filter((_, i) => i !== idx);
                                handleFieldChange('permitsList', updated);
                              }
                            }}
                            className="p-1 text-red-500 hover:text-red-700 cursor-pointer ml-1"
                            title="삭제"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-1">
                        <div className="sm:col-span-3">
                          <input
                            type="text"
                            value={cert.desc}
                            onChange={(e) => {
                              const updated = [...(contentForm.permitsList || [])];
                              updated[idx].desc = e.target.value;
                              handleFieldChange('permitsList', updated);
                            }}
                            className="w-full px-2.5 py-1.5 text-xs border border-stone-200 rounded-lg bg-white"
                            placeholder="인증 상세 내용 설명"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            value={cert.status}
                            onChange={(e) => {
                              const updated = [...(contentForm.permitsList || [])];
                              updated[idx].status = e.target.value;
                              handleFieldChange('permitsList', updated);
                            }}
                            className="w-full px-2.5 py-1.5 text-xs border border-emerald-300 rounded-lg bg-emerald-50 text-emerald-800 font-bold"
                            placeholder="상태 (예: 정상 등록 유지)"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ④ 오시는 길 */}
          {aboutSubSection === 'location' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                <span className="text-xs font-black text-stone-800 block">오시는 길 헤더 & 위치 정보</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 mb-1">페이지 제목</label>
                    <input
                      type="text"
                      value={contentForm.locationTitle || '오시는 길 & 제조 가공 센터'}
                      onChange={(e) => handleFieldChange('locationTitle', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs bg-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 mb-1">페이지 설명 문구</label>
                    <input
                      type="text"
                      value={contentForm.locationDescription || '충북 진천 제1·2 식품가공공장 및 제조물류센터 안내입니다.'}
                      onChange={(e) => handleFieldChange('locationDescription', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 mb-1">제조공장 및 본사 주소</label>
                    <input
                      type="text"
                      value={contentForm.factoryAddress || ''}
                      onChange={(e) => handleFieldChange('factoryAddress', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs bg-white font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 mb-1">상세 위치 / 단지 안내</label>
                    <input
                      type="text"
                      value={contentForm.locationGuide || ''}
                      onChange={(e) => handleFieldChange('locationGuide', e.target.value)}
                      placeholder="예: 충청북도 진천군 덕산읍 신척산단로 128 (신척산업단지 내)"
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 mb-1">교통 안내</label>
                    <input
                      type="text"
                      value={contentForm.transitInfo || ''}
                      onChange={(e) => handleFieldChange('transitInfo', e.target.value)}
                      placeholder="예: 중부고속도로 진천IC에서 차량 10분"
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 mb-1">주차 안내</label>
                    <input
                      type="text"
                      value={contentForm.parkingInfo || ''}
                      onChange={(e) => handleFieldChange('parkingInfo', e.target.value)}
                      placeholder="예: 사옥 내 방문객 무료 주차 가능"
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end pt-3 border-t border-stone-100">
            <button
              onClick={handleSaveContent}
              className="px-6 py-2.5 rounded-xl bg-[#872D35] hover:bg-[#6D242B] text-white text-xs font-extrabold shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>회사소개 전체 저장 및 홈페이지 즉시 반영</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. 제품소개 관리 */}
      {activeSubTab === 'products' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-2xs space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h4 className="text-sm font-black text-stone-900 flex items-center gap-2">
              <Package className="w-4 h-4 text-[#872D35]" />
              <span>등록된 제품 라인업 ({state.products.length}종)</span>
            </h4>
            <span className="text-xs text-stone-500">제품 추가, 규격, 단가, 이미지 수정</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {state.products.map((prod, idx) => (
              <div key={prod.id || idx} className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2">
                <div className="flex items-center gap-3">
                  <img src={prod.imageUrl} alt="" className="w-14 h-14 rounded-lg object-cover border border-stone-200" />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold text-[#872D35] block">{prod.category}</span>
                    <h5 className="text-xs font-black text-stone-900 truncate">{prod.name}</h5>
                    <span className="text-[11px] text-stone-500 font-mono">{prod.weight}</span>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm(`'${prod.name}' 제품을 삭제하시겠습니까?`)) {
                        deleteProduct(prod.id);
                      }
                    }}
                    className="p-1.5 text-stone-400 hover:text-red-600 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="pt-2 border-t border-stone-200/60 grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-stone-400 block">규격/용량:</span>
                    <input
                      type="text"
                      value={prod.weight}
                      onChange={(e) => updateProduct(prod.id, { weight: e.target.value })}
                      className="w-full px-2 py-1 rounded border border-stone-200 bg-white"
                    />
                  </div>
                  <div>
                    <span className="text-stone-400 block">보관방법:</span>
                    <input
                      type="text"
                      value={prod.storage}
                      onChange={(e) => updateProduct(prod.id, { storage: e.target.value })}
                      className="w-full px-2 py-1 rounded border border-stone-200 bg-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. 제조공정 관리 */}
      {activeSubTab === 'process' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-2xs space-y-6">
          <h4 className="text-sm font-black text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#872D35]" />
            <span>제조공정 (Manufacturing Process) 페이지 내용 편집</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                제조공정 메인 제목
              </label>
              <input
                type="text"
                value={contentForm.processTitle || ''}
                onChange={(e) => handleFieldChange('processTitle', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                제조공정 소제목
              </label>
              <input
                type="text"
                value={contentForm.processSubtitle || ''}
                onChange={(e) => handleFieldChange('processSubtitle', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              제조공정 총괄 설명 문구
            </label>
            <textarea
              rows={2}
              value={contentForm.processDescription || ''}
              onChange={(e) => handleFieldChange('processDescription', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              품질관리 및 안심 위생 안내 문구
            </label>
            <input
              type="text"
              value={contentForm.qualityNotice || ''}
              onChange={(e) => handleFieldChange('qualityNotice', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs"
            />
          </div>

          <div className="flex justify-end pt-3">
            <button
              onClick={handleSaveContent}
              className="px-6 py-2 rounded-xl bg-[#872D35] hover:bg-[#6D242B] text-white text-xs font-bold cursor-pointer"
            >
              제조공정 내용 저장
            </button>
          </div>
        </div>
      )}

      {/* 4. 납품안내 관리 */}
      {activeSubTab === 'wholesale' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-2xs space-y-6">
          <h4 className="text-sm font-black text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#872D35]" />
            <span>납품안내 (Wholesale Guide) 내용 편집</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                납품안내 제목
              </label>
              <input
                type="text"
                value={contentForm.wholesaleTitle || ''}
                onChange={(e) => handleFieldChange('wholesaleTitle', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                납품안내 소제목
              </label>
              <input
                type="text"
                value={contentForm.wholesaleSubtitle || ''}
                onChange={(e) => handleFieldChange('wholesaleSubtitle', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                납품 가능 지역
              </label>
              <input
                type="text"
                value={contentForm.deliveryRegions || ''}
                onChange={(e) => handleFieldChange('deliveryRegions', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                납품 방식
              </label>
              <input
                type="text"
                value={contentForm.deliveryMethods || ''}
                onChange={(e) => handleFieldChange('deliveryMethods', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              납품안내 상세 설명
            </label>
            <textarea
              rows={3}
              value={contentForm.wholesaleDescription || ''}
              onChange={(e) => handleFieldChange('wholesaleDescription', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs"
            />
          </div>

          <div className="flex justify-end pt-3">
            <button
              onClick={handleSaveContent}
              className="px-6 py-2 rounded-xl bg-[#872D35] hover:bg-[#6D242B] text-white text-xs font-bold cursor-pointer"
            >
              납품안내 내용 저장
            </button>
          </div>
        </div>
      )}

      {/* 5. 고객센터 관리 */}
      {activeSubTab === 'cs' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-2xs space-y-6">
          <h4 className="text-sm font-black text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-[#872D35]" />
            <span>고객센터 (Customer Service) 안내 문구 및 연락처 편집</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                고객센터 대표 안내 타이틀
              </label>
              <input
                type="text"
                value={contentForm.csNoticeTitle || ''}
                onChange={(e) => handleFieldChange('csNoticeTitle', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                고객센터 대표 전화번호
              </label>
              <input
                type="text"
                value={contentForm.phone}
                onChange={(e) => handleFieldChange('phone', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                운영시간 안내
              </label>
              <input
                type="text"
                value={contentForm.csHours}
                onChange={(e) => handleFieldChange('csHours', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                점심시간 안내
              </label>
              <input
                type="text"
                value={contentForm.lunchHours}
                onChange={(e) => handleFieldChange('lunchHours', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              무료 샘플 신청 안내 문구
            </label>
            <textarea
              rows={2}
              value={contentForm.sampleGuideText || ''}
              onChange={(e) => handleFieldChange('sampleGuideText', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              대량 납품 견적 상담 안내 문구
            </label>
            <textarea
              rows={2}
              value={contentForm.quoteGuideText || ''}
              onChange={(e) => handleFieldChange('quoteGuideText', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs"
            />
          </div>

          <div className="flex justify-end pt-3">
            <button
              onClick={handleSaveContent}
              className="px-6 py-2 rounded-xl bg-[#872D35] hover:bg-[#6D242B] text-white text-xs font-bold cursor-pointer"
            >
              고객센터 설정 저장
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
