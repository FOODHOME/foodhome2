import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FaqItem } from '../../types';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  HelpCircle, 
  ChevronUp, 
  ChevronDown, 
  Eye, 
  EyeOff, 
  RotateCcw,
  Sparkles,
  Check,
  X,
  Search
} from 'lucide-react';

export const FaqManager: React.FC = () => {
  const { state, addFaqItem, updateFaqItem, deleteFaqItem, reorderFaqItems, showToast } = useApp();
  
  const faqs = state.content.faqItems || [];
  
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form state for creating or editing FAQ
  const [faqForm, setFaqForm] = useState<{
    question: string;
    answer: string;
    category: string;
    visible: boolean;
  }>({
    question: '',
    answer: '',
    category: '샘플신청',
    visible: true
  });

  const availableCategories = ['샘플신청', '납품·단가', '보관·유통', '배송안내', '위생·안전', '기타문의'];

  const handleOpenAdd = () => {
    setEditingFaqId(null);
    setFaqForm({
      question: '',
      answer: '',
      category: '샘플신청',
      visible: true
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (faq: FaqItem) => {
    setEditingFaqId(faq.id);
    setFaqForm({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      visible: faq.visible !== false
    });
    setIsAddModalOpen(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqForm.question.trim() || !faqForm.answer.trim()) {
      showToast('질문과 답변을 모두 입력해 주세요.');
      return;
    }

    if (editingFaqId) {
      updateFaqItem(editingFaqId, {
        question: faqForm.question,
        answer: faqForm.answer,
        category: faqForm.category,
        visible: faqForm.visible
      });
      showToast('FAQ 항목이 수정되었습니다.');
    } else {
      addFaqItem({
        question: faqForm.question,
        answer: faqForm.answer,
        category: faqForm.category,
        visible: faqForm.visible
      });
      showToast('새 FAQ 항목이 추가되었습니다.');
    }
    setIsAddModalOpen(false);
  };

  const handleToggleVisible = (id: string, currentVisible?: boolean) => {
    updateFaqItem(id, { visible: currentVisible === false });
  };

  const handleMoveOrder = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= faqs.length) return;
    const newItems = [...faqs];
    const [moved] = newItems.splice(index, 1);
    newItems.splice(targetIdx, 0, moved);
    reorderFaqItems(newItems);
    showToast('FAQ 순서가 변경되었습니다.');
  };

  const handleDelete = (id: string, q: string) => {
    if (confirm(`'${q}' FAQ를 삭제하시겠습니까?`)) {
      deleteFaqItem(id);
    }
  };

  const filteredFaqs = faqs.filter(f => {
    if (categoryFilter !== 'all' && f.category !== categoryFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-[#872D35]/10 text-[#872D35]">
              <HelpCircle className="w-5 h-5" />
            </span>
            <h3 className="text-base font-extrabold text-slate-900">
              자주하는 질문 (FAQ) 관리
            </h3>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              총 {faqs.length}건
            </span>
          </div>
          <p className="text-xs text-slate-500">
            고객센터 &gt; 자주하는 질문 페이지에 표시되는 Q&A를 등록, 수정, 순서 변경 및 노출 관리합니다.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-[#872D35] hover:bg-[#6E1D24] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>새 FAQ 등록하기</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto no-scrollbar py-0.5">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
              categoryFilter === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            전체 ({faqs.length})
          </button>
          {availableCategories.map(cat => {
            const count = faqs.filter(f => f.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                  categoryFilter === cat
                    ? 'bg-[#872D35] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="질문 및 답변 검색..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#872D35]"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* FAQ Items List */}
      <div className="space-y-3">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, idx) => {
            const originalIndex = faqs.findIndex(f => f.id === faq.id);
            return (
              <div 
                key={faq.id} 
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3 transition-all hover:border-slate-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    {/* Reorder Buttons */}
                    <div className="flex flex-col gap-0.5 pt-0.5">
                      <button
                        onClick={() => handleMoveOrder(originalIndex, 'up')}
                        disabled={originalIndex === 0}
                        className="p-1 rounded hover:bg-slate-100 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                        title="위로 이동"
                      >
                        <ChevronUp className="w-3.5 h-3.5 text-slate-600" />
                      </button>
                      <button
                        onClick={() => handleMoveOrder(originalIndex, 'down')}
                        disabled={originalIndex === faqs.length - 1}
                        className="p-1 rounded hover:bg-slate-100 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                        title="아래로 이동"
                      >
                        <ChevronDown className="w-3.5 h-3.5 text-slate-600" />
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded bg-[#872D35]/10 text-[#872D35] font-black text-xs flex items-center justify-center">
                          Q
                        </span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                          {faq.category}
                        </span>
                        {faq.visible === false && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-700">
                            숨김(비노출)
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {faq.question}
                      </h4>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
                    <button
                      onClick={() => handleToggleVisible(faq.id, faq.visible)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                        faq.visible !== false
                          ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                      title={faq.visible !== false ? '클릭 시 비노출로 전환' : '클릭 시 노출로 전환'}
                    >
                      {faq.visible !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      <span>{faq.visible !== false ? '노출' : '숨김'}</span>
                    </button>
                    
                    <button
                      onClick={() => handleOpenEdit(faq)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                      title="FAQ 수정"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(faq.id, faq.question)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      title="FAQ 삭제"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Answer Box */}
                <div className="ml-8 p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                  <div className="font-bold text-slate-500 mb-1 flex items-center gap-1">
                    <span className="text-amber-600 font-black">A.</span> 답변 내용:
                  </div>
                  {faq.answer}
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500 space-y-3">
            <HelpCircle className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold">등록된 FAQ 항목이 없거나 검색 결과가 없습니다.</p>
            <button
              onClick={handleOpenAdd}
              className="text-xs font-bold text-[#872D35] underline cursor-pointer"
            >
              새 FAQ 등록하기
            </button>
          </div>
        )}
      </div>

      {/* Add / Edit FAQ Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div 
            className="bg-white rounded-2xl shadow-xl max-w-lg w-full overflow-hidden border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#2A2020] text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-300" />
                <span>{editingFaqId ? 'FAQ 항목 수정' : '새 FAQ 항목 등록'}</span>
              </h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  카테고리 분류 *
                </label>
                <select
                  value={faqForm.category}
                  onChange={(e) => setFaqForm({ ...faqForm, category: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                >
                  {availableCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  질문 (Question) *
                </label>
                <input
                  type="text"
                  required
                  value={faqForm.question}
                  onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                  placeholder="예: 무료 샘플 신청 자격과 배송비는 어떻게 되나요?"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#872D35]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  답변 (Answer) *
                </label>
                <textarea
                  required
                  rows={5}
                  value={faqForm.answer}
                  onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                  placeholder="고객이 이해하기 쉽도록 친절하고 명확하게 답변을 입력해 주세요..."
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#872D35] leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={faqForm.visible}
                    onChange={(e) => setFaqForm({ ...faqForm, visible: e.target.checked })}
                    className="rounded text-[#872D35]"
                  />
                  <span>홈페이지에 즉시 노출 활성화</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold rounded-lg bg-[#872D35] hover:bg-[#6E1D24] text-white cursor-pointer shadow-sm"
                >
                  {editingFaqId ? '수정사항 저장' : '등록하기'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
