import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Calendar, 
  User, 
  Eye, 
  Tag, 
  Share2, 
  BookmarkCheck,
  ChevronLeft
} from 'lucide-react';

export const PostDetailModal: React.FC = () => {
  const { 
    selectedPostForDetail, 
    setSelectedPostForDetail, 
    showToast 
  } = useApp();

  if (!selectedPostForDetail) return null;

  const post = selectedPostForDetail;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('게시글 링크가 클립보드에 복사되었습니다.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <button
            onClick={() => setSelectedPostForDetail(null)}
            className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>목록으로 돌아가기</span>
          </button>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors flex items-center gap-1 text-xs font-semibold"
              title="링크 복사"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">공유</span>
            </button>
            <button
              onClick={() => setSelectedPostForDetail(null)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Category & Pin */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded bg-blue-100 text-blue-700">
              {post.category}
            </span>
            {post.isPinned && (
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 flex items-center gap-1">
                <BookmarkCheck className="w-3.5 h-3.5" />
                추천 공지
              </span>
            )}
          </div>

          {/* Title */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-snug">
            {post.title}
          </h2>

          {/* Meta Bar */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 border-b border-slate-100 pb-4">
            <span className="flex items-center gap-1 font-medium text-slate-700">
              <User className="w-3.5 h-3.5 text-blue-600" />
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              조회 {post.readCount}회
            </span>
          </div>

          {/* Featured Image if present */}
          {post.thumbnail && (
            <div className="rounded-xl overflow-hidden aspect-16/9 bg-slate-100 border border-slate-200">
              <img 
                src={post.thumbnail} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content Body */}
          <div className="prose prose-slate max-w-none text-sm sm:text-base text-slate-700 leading-relaxed space-y-4 whitespace-pre-line">
            {post.content}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <Tag className="w-4 h-4 text-slate-400" />
              {post.tags.map((tag, idx) => (
                <span 
                  key={idx}
                  className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-white border-t border-slate-100 px-6 py-4 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            푸드홈 공식 아티클 & 소식지
          </span>
          <button
            onClick={() => setSelectedPostForDetail(null)}
            className="px-5 py-2 text-xs sm:text-sm font-bold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
