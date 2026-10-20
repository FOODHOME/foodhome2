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

      {/* 1. 회사소개 관리 */}
      {activeSubTab === 'about' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-2xs space-y-6">
          <h4 className="text-sm font-black text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
            <Building className="w-4 h-4 text-[#872D35]" />
            <span>회사소개 (Company About) 페이지 내용 편집</span>
          </h4>

          {/* Banner & Intro */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                회사소개 메인 배너 이미지
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={contentForm.aboutBannerImage || ''}
                  onChange={(e) => handleFieldChange('aboutBannerImage', e.target.value)}
                  placeholder="이미지 URL"
                  className="flex-1 px-3 py-2 rounded-lg border border-stone-200 text-xs"
                />
                <label className="px-3 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold flex items-center gap-1 cursor-pointer shrink-0">
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

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                CEO 프로필 이미지
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={contentForm.ceoImageUrl || ''}
                  onChange={(e) => handleFieldChange('ceoImageUrl', e.target.value)}
                  placeholder="CEO 사진 URL"
                  className="flex-1 px-3 py-2 rounded-lg border border-stone-200 text-xs"
                />
                <label className="px-3 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold flex items-center gap-1 cursor-pointer shrink-0">
                  <Upload className="w-3.5 h-3.5" />
                  <span>업로드</span>
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

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              회사소개 메인 제목
            </label>
            <input
              type="text"
              value={contentForm.aboutTitle || ''}
              onChange={(e) => handleFieldChange('aboutTitle', e.target.value)}
              placeholder="예: 안전하고 정직한 먹거리, 푸드홈 이야기"
              className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              회사소개 요약 설명
            </label>
            <textarea
              rows={2}
              value={contentForm.aboutDescription || ''}
              onChange={(e) => handleFieldChange('aboutDescription', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              CEO 인사말 전문
            </label>
            <textarea
              rows={4}
              value={contentForm.ceoGreeting || ''}
              onChange={(e) => handleFieldChange('ceoGreeting', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                생산 및 물류 시스템 설명
              </label>
              <textarea
                rows={3}
                value={contentForm.systemDescription || ''}
                onChange={(e) => handleFieldChange('systemDescription', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                인허가 사항 및 제조역량
              </label>
              <textarea
                rows={3}
                value={contentForm.permitsDescription || ''}
                onChange={(e) => handleFieldChange('permitsDescription', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              오시는 길 및 제조센터 위치 안내
            </label>
            <input
              type="text"
              value={contentForm.locationGuide || ''}
              onChange={(e) => handleFieldChange('locationGuide', e.target.value)}
              placeholder="예: 충청북도 진천군 덕산읍 신척산단로 128 (신척산업단지 내)"
              className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs"
            />
          </div>

          <div className="flex justify-end pt-3">
            <button
              onClick={handleSaveContent}
              className="px-6 py-2 rounded-xl bg-[#872D35] hover:bg-[#6D242B] text-white text-xs font-bold cursor-pointer"
            >
              회사소개 수정사항 저장
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
