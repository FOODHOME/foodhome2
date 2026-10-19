export interface BannerSlide {
  id: string;
  tagline: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  primaryButtonText: string;
  primaryButtonAction: 'products' | 'inquiry' | 'sample';
  secondaryButtonText: string;
  secondaryButtonAction: 'products' | 'inquiry' | 'sample';
}

export interface FacilityMediaItem {
  id: string;
  title: string;
  desc: string;
  imageUrl: string;
  videoUrl?: string;
  category: '클린룸' | '세척라인' | '품질검사' | '포장·물류';
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: '샘플신청' | '납품·단가' | '보관·유통' | '배송안내';
}

export interface NavSubmenuItem {
  id: string;
  label: string;
  actionType: 'scroll' | 'sample' | 'wholesale' | 'url';
  target: string;
}

export interface NavMenuItem {
  id: string;
  name: string;
  link?: string;
  actionType?: 'scroll' | 'sample' | 'wholesale' | 'url';
  target?: string;
  visible: boolean;
  submenus: NavSubmenuItem[];
}

export interface SiteContent {
  brandName: string;
  brandSubName: string;
  tagline: string;
  logoUrl?: string;
  
  // Navigation Menus (GNB)
  navMenus: NavMenuItem[];
  
  // Hero Banner Slider
  banners: BannerSlide[];

  // Legacy single hero fields kept for backwards-compatibility
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  heroDescription: string;
  heroImageUrl: string;
  heroBadges: string[];
  stats: {
    label: string;
    value: string;
    unit: string;
    sublabel: string;
  }[];
  
  // Company & Contact
  companyName: string;
  ceoName: string;
  businessNumber: string;
  mailOrderNumber: string;
  haccpNumber: string;
  factoryAddress: string;
  hqAddress: string;
  phone: string;
  fax: string;
  email: string;
  csHours: string;
  lunchHours: string;

  // Story & Brand Info
  storyTitle: string;
  storySubtitle: string;
  storyParagraph1: string;
  storyParagraph2: string;
  coreValues: {
    title: string;
    desc: string;
    icon: string;
  }[];

  // Facility & FAQ
  facilityItems: FacilityMediaItem[];
  faqItems: FaqItem[];
}

export interface ThemeSettings {
  primaryColor: string; // #872D35 Deep Burgundy
  accentColor: string;  // #B64346 Sub Red
  darkBrown: string;    // #332525 Dark Brown
  creamWhite: string;   // #FAF8F5 Cream White
  warmGrey: string;     // #EEEAE6 Warm Grey
  fontFamily: 'pretendard' | 'noto-sans' | 'myeongjo';
  cardRadius: 'rounded-none' | 'rounded-lg' | 'rounded-xl' | 'rounded-2xl';
  sectionsVisible: {
    hero: boolean;
    stats: boolean;
    productSlider: boolean;
    actionBanners: boolean;
    productCategories: boolean;
    features: boolean;
    products: boolean;
    process: boolean;
    b2bHighlights: boolean;
    reviews: boolean;
    faq: boolean;
    posts: boolean;
    inquiry: boolean;
  };
}

export interface ProductItem {
  id: string;
  name: string;
  subtitle: string;
  category: '보쌈무김치' | '김칫속/양념' | '업소용 대용량' | '소포장/밀키트';
  tag: string;
  weight: string;
  storage: string;
  shelfLife: string;
  ingredients: string;
  description: string;
  imageUrl: string;
  isPopular?: boolean;
  isRecommended?: boolean;
  bulkPriceGuide: string;
}

export interface PostItem {
  id: string;
  title: string;
  category: '공지사항' | '조리·활용 레시피' | 'B2B 납품스토리' | '이벤트';
  author: string;
  date: string;
  content: string;
  readCount: number;
  thumbnail: string;
  imageUrl?: string;
  tags: string[];
  isPinned?: boolean;
}

export interface ReviewItem {
  id: string;
  clientName: string;
  businessType: string;
  rating: number;
  comment: string;
  date: string;
  location: string;
  verifiedPartner: boolean;
  storeName?: string;
  ownerName?: string;
}

export interface B2BInquiry {
  id: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  businessType: string;
  requestType: '무료 샘플 요청' | '대량 납품 견적' | 'OEM/PB 제휴 문의';
  monthlyUsage: string;
  region: string;
  message: string;
  status: '접수대기' | '샘플발송완료' | '상담완료' | '보류';
  createdAt: string;
  adminMemo?: string;
}

export interface SeoSettings {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImageUrl: string;
  canonicalUrl: string;
}

export interface SocialSettings {
  instagramUrl: string;
  youtubeUrl: string;
  naverBlogUrl: string;
  kakaoTalkUrl: string;
  smartStoreUrl: string;
  coupangUrl: string;
}

export interface AppState {
  content: SiteContent;
  theme: ThemeSettings;
  products: ProductItem[];
  posts: PostItem[];
  reviews: ReviewItem[];
  inquiries: B2BInquiry[];
  seo: SeoSettings;
  social: SocialSettings;
  formspreeEndpoint: string;
}
