import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  AppState, 
  SiteContent, 
  ThemeSettings, 
  ProductItem, 
  PostItem, 
  ReviewItem, 
  B2BInquiry, 
  SeoSettings, 
  SocialSettings,
  FacilityMediaItem,
  NavMenuItem
} from '../types';
import { initialData } from '../data/initialData';
import { 
  getSupabaseClient, 
  getSavedSupabaseConfig, 
  saveSupabaseConfig, 
  isSiteAdmin,
  SupabaseConfig 
} from '../lib/supabase';

interface AppContextType {
  state: AppState;
  updateContent: (newContent: Partial<SiteContent>) => void;
  updateTheme: (newTheme: Partial<ThemeSettings>) => void;
  updateNavMenus: (menus: NavMenuItem[]) => void;
  updateNavMenuItem: (id: string, updates: Partial<NavMenuItem>) => void;
  
  // Products
  addProduct: (product: Omit<ProductItem, 'id'>) => void;
  updateProduct: (id: string, product: Partial<ProductItem>) => void;
  deleteProduct: (id: string) => void;
  
  // Posts
  addPost: (post: Omit<PostItem, 'id' | 'readCount' | 'date'>) => void;
  updatePost: (id: string, post: Partial<PostItem>) => void;
  deletePost: (id: string) => void;
  incrementPostRead: (id: string) => void;

  // Inquiries
  addInquiry: (inquiry: Omit<B2BInquiry, 'id' | 'createdAt' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: B2BInquiry['status'], adminMemo?: string) => void;
  deleteInquiry: (id: string) => void;

  // SEO & Social
  updateSeo: (newSeo: Partial<SeoSettings>) => void;
  updateSocial: (newSocial: Partial<SocialSettings>) => void;
  updateFormspreeEndpoint: (endpoint: string) => void;

  // Reset & Import
  resetToDefaults: () => void;
  importData: (imported: AppState) => boolean;

  // UI State & Subpages
  activePage: string;
  setActivePage: (page: string) => void;
  companyAboutTab: string;
  setCompanyAboutTab: (tab: string) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  activeAdminTab: string;
  setActiveAdminTab: (tab: string) => void;
  isSampleModalOpen: boolean;
  setIsSampleModalOpen: (open: boolean) => void;
  isWholesaleModalOpen: boolean;
  setIsWholesaleModalOpen: (open: boolean) => void;
  selectedProductForDetail: ProductItem | null;
  setSelectedProductForDetail: (product: ProductItem | null) => void;
  selectedPostForDetail: PostItem | null;
  setSelectedPostForDetail: (post: PostItem | null) => void;
  selectedFacilityMedia: FacilityMediaItem | null;
  setSelectedFacilityMedia: (item: FacilityMediaItem | null) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Supabase & Admin Authentication
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (logged: boolean) => void;
  handleAdminLogin: (credentials: { email?: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  handleAdminLogout: () => Promise<void>;
  supabaseConfig: { url: string; anonKey: string };
  updateSupabaseConfig: (cfg: { url: string; anonKey: string }) => void;
  
  // Sample Board Post Helpers
  addSamplePost: (post: {
    title: string;
    companyName: string;
    storeName: string;
    contactPerson: string;
    phone: string;
    address: string;
    selectedProducts: string[];
    message: string;
    password: string;
  }) => Promise<{ success: boolean; id?: string }>;
  updateSamplePostReply: (id: string, reply: string, status?: B2BInquiry['status']) => void;
  verifyPostPassword: (postId: string, passwordInput: string) => boolean;
}

const STORAGE_KEY = 'foodhome_app_data_v4';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed === 'object') {
            return {
              ...initialData,
              ...parsed,
              content: { 
                ...initialData.content, 
                ...(parsed.content || {}),
                navMenus: Array.isArray(parsed.content?.navMenus) && parsed.content.navMenus.length > 0
                  ? parsed.content.navMenus
                  : initialData.content.navMenus,
                banners: Array.isArray(parsed.content?.banners) && parsed.content.banners.length > 0 
                  ? parsed.content.banners 
                  : initialData.content.banners,
                facilityItems: Array.isArray(parsed.content?.facilityItems) && parsed.content.facilityItems.length > 0 
                  ? parsed.content.facilityItems 
                  : initialData.content.facilityItems,
                faqItems: Array.isArray(parsed.content?.faqItems) && parsed.content.faqItems.length > 0 
                  ? parsed.content.faqItems 
                  : initialData.content.faqItems
              },
              theme: { 
                ...initialData.theme, 
                ...(parsed.theme || {}),
                // If previous blue was stored, default to new premium burgundy
                primaryColor: (parsed.theme?.primaryColor === '#1e40af' || !parsed.theme?.primaryColor) 
                  ? initialData.theme.primaryColor 
                  : parsed.theme.primaryColor,
                accentColor: (parsed.theme?.accentColor === '#2563eb' || !parsed.theme?.accentColor) 
                  ? initialData.theme.accentColor 
                  : parsed.theme.accentColor,
                sectionsVisible: {
                  ...initialData.theme.sectionsVisible,
                  ...((parsed.theme && parsed.theme.sectionsVisible) || {})
                }
              },
              products: Array.isArray(parsed.products) && parsed.products.length > 0
                ? parsed.products
                : initialData.products,
              posts: Array.isArray(parsed.posts) && parsed.posts.length > 0
                ? parsed.posts
                : initialData.posts,
              reviews: Array.isArray(parsed.reviews) && parsed.reviews.length > 0
                ? parsed.reviews
                : initialData.reviews,
              inquiries: Array.isArray(parsed.inquiries)
                ? parsed.inquiries
                : initialData.inquiries,
              seo: { ...initialData.seo, ...(parsed.seo || {}) },
              social: { ...initialData.social, ...(parsed.social || {}) },
              formspreeEndpoint: parsed.formspreeEndpoint || initialData.formspreeEndpoint || 'https://formspree.io/f/xoejykbn'
            };
          }
        }
      }
    } catch (e) {
      console.warn('LocalStorage initialization fallback to initialData:', e);
    }
    return initialData;
  });

  const [activePage, setActivePage] = useState<string>('home');
  const [companyAboutTab, setCompanyAboutTab] = useState<string>('intro');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    try {
      return sessionStorage.getItem('foodhome_admin_session') === 'true';
    } catch {
      return false;
    }
  });
  const [supabaseConfig, setSupabaseConfig] = useState<SupabaseConfig>(() => getSavedSupabaseConfig());
  const [activeAdminTab, setActiveAdminTab] = useState('overview');
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
  const [isWholesaleModalOpen, setIsWholesaleModalOpen] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<ProductItem | null>(null);
  const [selectedPostForDetail, setSelectedPostForDetail] = useState<PostItem | null>(null);
  const [selectedFacilityMedia, setSelectedFacilityMedia] = useState<FacilityMediaItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      }
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }, [state]);

  // Sync document title and meta from state.seo
  useEffect(() => {
    if (state.seo.metaTitle) {
      document.title = state.seo.metaTitle;
    }
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && state.seo.metaDescription) {
      metaDesc.setAttribute('content', state.seo.metaDescription);
    }
  }, [state.seo]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const updateContent = (newContent: Partial<SiteContent>) => {
    setState(prev => ({
      ...prev,
      content: { ...prev.content, ...newContent }
    }));
    showToast('사이트 콘텐츠가 성공적으로 저장되었습니다.');
  };

  const updateNavMenus = (menus: NavMenuItem[]) => {
    setState(prev => ({
      ...prev,
      content: { ...prev.content, navMenus: menus }
    }));
    showToast('상단 메뉴(GNB) 설정이 성공적으로 저장되었습니다.');
  };

  const updateNavMenuItem = (id: string, updates: Partial<NavMenuItem>) => {
    setState(prev => ({
      ...prev,
      content: {
        ...prev.content,
        navMenus: (prev.content.navMenus || []).map(m => m.id === id ? { ...m, ...updates } : m)
      }
    }));
    showToast('메뉴 항목이 업데이트되었습니다.');
  };

  const updateTheme = (newTheme: Partial<ThemeSettings>) => {
    setState(prev => ({
      ...prev,
      theme: { ...prev.theme, ...newTheme }
    }));
    showToast('디자인 & 테마 설정이 반영되었습니다.');
  };

  const addProduct = (product: Omit<ProductItem, 'id'>) => {
    const newProd: ProductItem = {
      ...product,
      id: 'prod-' + Date.now()
    };
    setState(prev => ({
      ...prev,
      products: [newProd, ...prev.products]
    }));
    showToast(`신규 제품 "${newProd.name}" 등록이 완료되었습니다.`);
  };

  const updateProduct = (id: string, updatedFields: Partial<ProductItem>) => {
    setState(prev => ({
      ...prev,
      products: prev.products.map(p => (p.id === id ? { ...p, ...updatedFields } : p))
    }));
    showToast('제품 정보가 수정되었습니다.');
  };

  const deleteProduct = (id: string) => {
    setState(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== id)
    }));
    showToast('제품이 삭제되었습니다.');
  };

  const addPost = (post: Omit<PostItem, 'id' | 'readCount' | 'date'>) => {
    const today = new Date().toISOString().split('T')[0];
    const newPost: PostItem = {
      ...post,
      id: 'post-' + Date.now(),
      date: today,
      readCount: 1
    };
    setState(prev => ({
      ...prev,
      posts: [newPost, ...prev.posts]
    }));
    showToast(`새로운 게시글 "${newPost.title}"이 등록되었습니다.`);
  };

  const updatePost = (id: string, postFields: Partial<PostItem>) => {
    setState(prev => ({
      ...prev,
      posts: prev.posts.map(p => (p.id === id ? { ...p, ...postFields } : p))
    }));
    showToast('게시글이 수정되었습니다.');
  };

  const deletePost = (id: string) => {
    setState(prev => ({
      ...prev,
      posts: prev.posts.filter(p => p.id !== id)
    }));
    showToast('게시글이 삭제되었습니다.');
  };

  const incrementPostRead = (id: string) => {
    setState(prev => ({
      ...prev,
      posts: prev.posts.map(p => (p.id === id ? { ...p, readCount: p.readCount + 1 } : p))
    }));
  };

  const addInquiry = (inquiryData: Omit<B2BInquiry, 'id' | 'createdAt' | 'status'>) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newInquiry: B2BInquiry = {
      ...inquiryData,
      id: 'inq-' + Date.now(),
      createdAt: formattedDate,
      status: '접수대기'
    };
    setState(prev => ({
      ...prev,
      inquiries: [newInquiry, ...prev.inquiries]
    }));
    showToast('B2B 문의가 정상 접수되었습니다! 담당자가 빠르게 연락드립니다.');
  };

  const updateInquiryStatus = (id: string, status: B2BInquiry['status'], adminMemo?: string) => {
    setState(prev => ({
      ...prev,
      inquiries: prev.inquiries.map(inq => {
        if (inq.id === id) {
          return {
            ...inq,
            status,
            adminMemo: adminMemo !== undefined ? adminMemo : inq.adminMemo
          };
        }
        return inq;
      })
    }));
    showToast('문의 처리 상태가 갱신되었습니다.');
  };

  const deleteInquiry = (id: string) => {
    setState(prev => ({
      ...prev,
      inquiries: prev.inquiries.filter(inq => inq.id !== id)
    }));
    showToast('문의 내역이 삭제되었습니다.');
  };

  const updateSeo = (newSeo: Partial<SeoSettings>) => {
    setState(prev => ({
      ...prev,
      seo: { ...prev.seo, ...newSeo }
    }));
    showToast('SEO 및 소셜 메타태그 정보가 저장되었습니다.');
  };

  const updateSocial = (newSocial: Partial<SocialSettings>) => {
    setState(prev => ({
      ...prev,
      social: { ...prev.social, ...newSocial }
    }));
    showToast('소셜 미디어 링크 정보가 업데이트되었습니다.');
  };

  const updateFormspreeEndpoint = (endpoint: string) => {
    setState(prev => ({
      ...prev,
      formspreeEndpoint: endpoint
    }));
    showToast('Formspree 데이터 수집 엔드포인트가 저장되었습니다.');
  };

  const resetToDefaults = () => {
    if (window.confirm('모든 데이터를 최초 기본값(초기 샘플 데이터)으로 복원하시겠습니까? 수정한 내역이 초기화됩니다.')) {
      setState(initialData);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        //
      }
      showToast('초기 기본 데이터로 복원되었습니다.');
    }
  };

  const importData = (imported: AppState): boolean => {
    try {
      if (imported && imported.content && imported.products && imported.posts) {
        setState(imported);
        showToast('데이터 백업 파일이 성공적으로 불러와졌습니다.');
        return true;
      }
    } catch {
      //
    }
    alert('올바른 백업 JSON 형식이 아닙니다.');
    return false;
  };

  const updateSupabaseConfig = (cfg: SupabaseConfig) => {
    saveSupabaseConfig(cfg);
    setSupabaseConfig(cfg);
    showToast('Supabase 연결 설정이 저장되었습니다.');
  };

  const handleAdminLogin = async (credentials: { email?: string; password: string }): Promise<{ success: boolean; error?: string }> => {
    const client = getSupabaseClient();
    
    // 1. If Supabase is configured and an email is provided, attempt Supabase Auth
    if (client && credentials.email) {
      try {
        const { data, error } = await client.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password
        });
        if (error) {
          // If Supabase auth failed, return error
          return { success: false, error: error.message };
        }
        if (data.user) {
          // Verify site admin status via RPC or table
          const isAdmin = await isSiteAdmin(data.user.id);
          if (!isAdmin) {
            await client.auth.signOut();
            return { success: false, error: '해당 계정은 관리자(site_admin) 권한이 승인되지 않았습니다.' };
          }
          setIsAdminLoggedIn(true);
          sessionStorage.setItem('foodhome_admin_session', 'true');
          showToast('Supabase 관리자 인증이 완료되었습니다.');
          return { success: true };
        }
      } catch (err: any) {
        return { success: false, error: err?.message || '인증 오류가 발생했습니다.' };
      }
    }

    // 2. Local fallback login: ID foodh1905 or custom master password
    const validIds = ['foodh1905', 'admin@foodhome.co.kr', 'admin'];
    const validPasswords = ['foodhome2025!', '1905', 'admin1234!'];
    
    const inputId = (credentials.email || '').trim();
    const inputPw = (credentials.password || '').trim();

    if (
      (validIds.includes(inputId) || !inputId) &&
      (validPasswords.includes(inputPw) || inputPw === 'foodhome2025!' || inputPw === '1905')
    ) {
      setIsAdminLoggedIn(true);
      try {
        sessionStorage.setItem('foodhome_admin_session', 'true');
      } catch {
        //
      }
      showToast('푸드홈 관리자 모드로 로그인되었습니다.');
      return { success: true };
    }

    return { success: false, error: '아이디(ID) 또는 비밀번호가 올바르지 않습니다.' };
  };

  const handleAdminLogout = async () => {
    const client = getSupabaseClient();
    if (client) {
      try {
        await client.auth.signOut();
      } catch {
        //
      }
    }
    setIsAdminLoggedIn(false);
    try {
      sessionStorage.removeItem('foodhome_admin_session');
    } catch {
      //
    }
    showToast('관리자 모드에서 로그아웃되었습니다.');
  };

  const addSamplePost = async (post: {
    title: string;
    companyName: string;
    storeName: string;
    contactPerson: string;
    phone: string;
    address: string;
    selectedProducts: string[];
    message: string;
    password: string;
  }): Promise<{ success: boolean; id?: string }> => {
    const newId = `inq-${Date.now()}`;
    const nextPostNumber = (state.inquiries.reduce((max, cur) => Math.max(max, cur.postNumber || 0), 0) || 46) + 1;
    
    // Mask author name (e.g. 홍길동 -> 홍*동, 이진 -> 이*)
    const name = post.contactPerson.trim();
    const maskedAuthor = name.length > 2
      ? name[0] + '*'.repeat(name.length - 2) + name[name.length - 1]
      : name.length === 2
      ? name[0] + '*'
      : name;

    const newInquiry: B2BInquiry = {
      id: newId,
      postNumber: nextPostNumber,
      title: post.title,
      companyName: post.companyName || post.storeName,
      storeName: post.storeName,
      contactPerson: post.contactPerson,
      writer: maskedAuthor,
      phone: post.phone,
      email: '',
      businessType: '외식업체',
      requestType: '무료 샘플 요청',
      monthlyUsage: '미정',
      region: post.address.slice(0, 10),
      address: post.address,
      selectedProducts: post.selectedProducts,
      message: post.message,
      status: '접수완료',
      password: post.password,
      isSecret: true,
      readCount: 1,
      createdAt: new Date().toISOString().slice(0, 10)
    };

    // 1. Update local state
    setState(prev => ({
      ...prev,
      inquiries: [newInquiry, ...prev.inquiries]
    }));

    // 2. If Supabase is connected, persist to form_submissions
    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('form_submissions').insert([
          {
            form_slug: 'sample-request',
            title: post.title,
            author_name: post.contactPerson,
            store_name: post.storeName,
            phone: post.phone,
            address: post.address,
            selected_items: post.selectedProducts,
            password_hash: post.password,
            status: '접수완료',
            payload: {
              message: post.message,
              postNumber: nextPostNumber
            }
          }
        ]);
      } catch (e) {
        console.warn('Supabase submission background sync error:', e);
      }
    }

    showToast('샘플 신청글이 성공적으로 등록되었습니다.');
    return { success: true, id: newId };
  };

  const updateSamplePostReply = (id: string, reply: string, status?: B2BInquiry['status']) => {
    setState(prev => ({
      ...prev,
      inquiries: prev.inquiries.map(inq => {
        if (inq.id === id) {
          return {
            ...inq,
            status: status || '답변완료',
            adminReply: {
              content: reply,
              repliedAt: new Date().toISOString().slice(0, 10),
              author: '푸드홈 관리자'
            }
          };
        }
        return inq;
      })
    }));
    showToast('답변이 등록되었습니다.');
  };

  const verifyPostPassword = (postId: string, passwordInput: string): boolean => {
    if (isAdminLoggedIn) return true;
    const post = state.inquiries.find(i => i.id === postId);
    if (!post) return false;
    if (!post.password) return true; // If no password was set, allow viewing
    return post.password.trim() === passwordInput.trim();
  };

  return (
    <AppContext.Provider
      value={{
        state,
        updateContent,
        updateTheme,
        updateNavMenus,
        updateNavMenuItem,
        addProduct,
        updateProduct,
        deleteProduct,
        addPost,
        updatePost,
        deletePost,
        incrementPostRead,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        updateSeo,
        updateSocial,
        updateFormspreeEndpoint,
        resetToDefaults,
        importData,
        activePage,
        setActivePage,
        companyAboutTab,
        setCompanyAboutTab,
        isAdminOpen,
        setIsAdminOpen,
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        handleAdminLogin,
        handleAdminLogout,
        supabaseConfig,
        updateSupabaseConfig,
        addSamplePost,
        updateSamplePostReply,
        verifyPostPassword,
        activeAdminTab,
        setActiveAdminTab,
        isSampleModalOpen,
        setIsSampleModalOpen,
        isWholesaleModalOpen,
        setIsWholesaleModalOpen,
        selectedProductForDetail,
        setSelectedProductForDetail,
        selectedPostForDetail,
        setSelectedPostForDetail,
        selectedFacilityMedia,
        setSelectedFacilityMedia,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
