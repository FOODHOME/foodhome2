import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Printer, 
  Globe, 
  Settings,
  ExternalLink
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { state, setIsAdminOpen } = useApp();
  const { content, social } = state;

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Overview */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xl">
                푸
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight">
                  {content.brandName}
                </span>
                <span className="text-xs font-bold text-blue-400 ml-2">
                  {content.brandSubName}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md font-normal">
              {content.tagline}. 대한민국 대표 보쌈무김치, 무김치, 명품 김칫속(보쌈속) 수제 제조 전문 기업 푸드홈입니다.
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {social.naverBlogUrl && (
                <a
                  href={social.naverBlogUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 text-xs rounded-md bg-slate-800 text-emerald-400 hover:bg-slate-700 transition-colors font-bold"
                >
                  네이버 블로그
                </a>
              )}
              {social.kakaoTalkUrl && (
                <a
                  href={social.kakaoTalkUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 text-xs rounded-md bg-amber-400/20 text-amber-300 hover:bg-amber-400/30 transition-colors font-bold"
                >
                  카카오톡 채널
                </a>
              )}
              {social.instagramUrl && (
                <a
                  href={social.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 text-xs rounded-md bg-slate-800 text-pink-400 hover:bg-slate-700 transition-colors font-bold"
                >
                  인스타그램
                </a>
              )}
              {social.youtubeUrl && (
                <a
                  href={social.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 text-xs rounded-md bg-slate-800 text-red-400 hover:bg-slate-700 transition-colors font-bold"
                >
                  유튜브
                </a>
              )}
              {social.smartStoreUrl && (
                <a
                  href={social.smartStoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 text-xs rounded-md bg-slate-800 text-blue-300 hover:bg-slate-700 transition-colors font-bold"
                >
                  네이버 스마트스토어
                </a>
              )}
            </div>
          </div>

          {/* Quick CS Box */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              B2B 고객지원 및 주문 상담센터
            </h4>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-white">
                {content.phone}
              </span>
              <span className="text-xs text-blue-400 font-semibold">전국 납품 전용</span>
            </div>
            
            <div className="text-xs text-slate-400 space-y-1">
              <p className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                운영시간: {content.csHours}
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                이메일: {content.email}
              </p>
              <p className="flex items-center gap-1.5">
                <Printer className="w-3.5 h-3.5 text-slate-500" />
                팩스: {content.fax}
              </p>
            </div>
          </div>

          {/* Sitemaps & Certifications */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              품질 인증 & 관리
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                식약처 HACCP 인증 공식 취득
              </div>
              <p className="text-[11px] text-slate-400">
                {content.haccpNumber}
              </p>
            </div>

            <button
              onClick={() => setIsAdminOpen(true)}
              className="w-full py-2 px-3 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
            >
              <Settings className="w-3.5 h-3.5 text-blue-400" />
              <span>웹사이트 관리자 대시보드</span>
            </button>
          </div>

        </div>

        {/* Bottom Legal Info */}
        <div className="pt-8 text-xs text-slate-500 space-y-3 leading-relaxed">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="font-semibold text-slate-400">{content.companyName}</span>
            <span>대표자: {content.ceoName}</span>
            <span>사업자등록번호: {content.businessNumber}</span>
            <span>통신판매업신고: {content.mailOrderNumber}</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-600" />
              제조공장: {content.factoryAddress}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>서울본부: {content.hqAddress}</span>
          </div>

          <div className="pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
            <p>© {new Date().getFullYear()} FOODHOME Co., Ltd. All rights reserved. 대한민국 대표 김치제조원.</p>
            <div className="flex items-center gap-4 text-slate-500">
              <a href="#" className="hover:text-slate-300">개인정보처리방침</a>
              <span>|</span>
              <a href="#" className="hover:text-slate-300">이용약관</a>
              <span>|</span>
              <a href="#" className="hover:text-slate-300">사업자정보확인</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
