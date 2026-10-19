import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PostItem } from '../types';
import { 
  FileText, 
  Calendar, 
  Eye, 
  BookmarkCheck, 
  Plus, 
  Search, 
  ArrowRight,
  Sparkles,
  BookOpen
} from 'lucide-react';

export const BlogNoticeSection: React.FC = () => {
  const { 
    state, 
    setSelectedPostForDetail, 
    incrementPostRead,
    setIsAdminOpen,
    setActiveAdminTab 
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['전체', '공지사항', '조리·활용 레시피', 'B2B 납품스토리', '이벤트'];

  const filteredPosts = state.posts.filter(post => {
    const matchesCategory = activeCategory === '전체' || post.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handlePostClick = (post: PostItem) => {
    incrementPostRead(post.id);
    setSelectedPostForDetail(post);
  };

  return (
    <section id="post-section" className="py-20 bg-slate-50/70 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span 
              className="text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-blue-100/70 text-blue-700"
            >
              NEWS, RECIPES & B2B INSIGHTS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              푸드홈 공지사항 & 외식 레시피 가이드
            </h2>
            <p className="text-base text-slate-600 font-normal">
              식품위생 안전 소식부터 보쌈 전문점 사장님들을 위한 꿀팁, 프랜차이즈 납품 성공 사례를 전해드립니다.
            </p>
          </div>

          {/* Action to create post */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveAdminTab('posts');
                setIsAdminOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-blue-600" />
              <span>새 게시글 작성 (관리자)</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
                style={{
                  backgroundColor: activeCategory === cat ? state.theme.primaryColor : undefined
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="제목, 내용, 태그 검색..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-700">검색된 게시글이 없습니다.</h4>
            <p className="text-xs text-slate-500 mt-1">다른 검색어나 카테고리를 선택해 보세요.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => handlePostClick(post)}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  {/* Thumbnail */}
                  <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                    <img
                      src={post.thumbnail || 'https://images.unsplash.com/photo-1583032015879-67990c74900a?auto=format&fit=crop&w=600&q=80'}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-900/80 text-white backdrop-blur-xs">
                        {post.category}
                      </span>
                      {post.isPinned && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500 text-white flex items-center gap-0.5">
                          <BookmarkCheck className="w-3 h-3" />
                          공지
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4 space-y-2">
                    <h3 className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {post.content}
                    </p>
                  </div>
                </div>

                {/* Footer info */}
                <div className="p-4 pt-0">
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>{post.readCount}회</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
