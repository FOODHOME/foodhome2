import { AppState } from '../types';

export const initialData: AppState = {
  content: {
    brandName: '푸드홈',
    brandSubName: 'FOODHOME',
    tagline: '30년 전통 비법양념과 특허 수분제어로 빚어낸 명품 보쌈무김치',
    logoUrl: '', // Default SVG logo will be displayed, or custom logo uploaded by user
    
    // Navigation Menus (GNB) - Editable in Admin Dashboard
    navMenus: [
      {
        id: 'about',
        name: '회사소개',
        visible: true,
        actionType: 'scroll',
        target: 'footer-section',
        submenus: [
          { id: 'sub-about-1', label: '브랜드 스토리', actionType: 'scroll', target: 'footer-section' },
          { id: 'sub-about-2', label: '전통과 철학', actionType: 'scroll', target: 'footer-section' },
          { id: 'sub-about-3', label: '본사 및 공장 위치', actionType: 'scroll', target: 'footer-section' }
        ]
      },
      {
        id: 'products',
        name: '제품소개',
        visible: true,
        actionType: 'scroll',
        target: 'product-slider-section',
        submenus: [
          { id: 'sub-prod-1', label: '명품 보쌈무김치', actionType: 'scroll', target: 'product-slider-section' },
          { id: 'sub-prod-2', label: '비법 보쌈김칫속', actionType: 'scroll', target: 'product-slider-section' },
          { id: 'sub-prod-3', label: '업소용 대용량 (10kg)', actionType: 'scroll', target: 'product-slider-section' },
          { id: 'sub-prod-4', label: '소포장 & 밀키트 (500g)', actionType: 'scroll', target: 'product-slider-section' }
        ]
      },
      {
        id: 'facility',
        name: '제조공정',
        visible: true,
        actionType: 'wholesale',
        target: '',
        submenus: [
          { id: 'sub-fac-1', label: 'HACCP 위생 인증 시설', actionType: 'wholesale', target: '' },
          { id: 'sub-fac-2', label: '특허 수분제어 절임공법', actionType: 'scroll', target: 'product-slider-section' },
          { id: 'sub-fac-3', label: '콜드체인 익일 직배송', actionType: 'scroll', target: 'action-banners-section' }
        ]
      },
      {
        id: 'wholesale',
        name: '납품안내',
        visible: true,
        actionType: 'wholesale',
        target: '',
        submenus: [
          { id: 'sub-who-1', label: 'B2B 대량공급 절차 안내', actionType: 'scroll', target: 'action-banners-section' },
          { id: 'sub-who-2', label: '프랜차이즈 맞춤 OEM/PB', actionType: 'wholesale', target: '' },
          { id: 'sub-who-3', label: '사업자 1kg 무료 샘플팩', actionType: 'sample', target: '' }
        ]
      },
      {
        id: 'cs',
        name: '고객센터',
        visible: true,
        actionType: 'sample',
        target: '',
        submenus: [
          { id: 'sub-cs-1', label: '사업자 무료 샘플 신청', actionType: 'sample', target: '' },
          { id: 'sub-cs-2', label: '1:1 대량 납품·견적 상담', actionType: 'wholesale', target: '' },
          { id: 'sub-cs-3', label: '고객센터 유선 전화연결', actionType: 'scroll', target: 'footer-section' }
        ]
      }
    ],

    // Multi-Slide Hero Banners
    banners: [
      {
        id: 'banner-1',
        tagline: 'SINCE 1996 · 30년 전통 비법',
        title: '보쌈의 맛을 완성하는 특별한 김치',
        subtitle: '푸드홈 보쌈무김치',
        description: '정성스럽게 만든 맛, 변함없는 품질. 물 생김 없이 끝까지 아삭한 특허 수분제어 절임 공법으로 전국 480여 개 외식 매장에 매일 아침 공급합니다.',
        imageUrl: './images/banner_bossam.jpg',
        primaryButtonText: '제품 자세히 보기',
        primaryButtonAction: 'products',
        secondaryButtonText: '무료 샘플 1kg 신청',
        secondaryButtonAction: 'sample'
      },
      {
        id: 'banner-2',
        tagline: 'CHEF\'S SIGNATURE RECIPE',
        title: '굴보쌈과 수육의 풍미를 높이는',
        subtitle: '감칠맛 비법 김칫속(보쌈속)',
        description: '국내산 배와 양파를 갈아 넣은 천연 단맛과 광천 토굴 젓갈의 깊은 감칠맛. 주방의 수고를 덜어주는 명품 속양념.',
        imageUrl: './images/banner_kimchi_paste.jpg',
        primaryButtonText: '김칫속 라인업 보기',
        primaryButtonAction: 'products',
        secondaryButtonText: '납품 견적 문의하기',
        secondaryButtonAction: 'inquiry'
      },
      {
        id: 'banner-3',
        tagline: 'B2B WHOLESALE & SUPPLY',
        title: '전국 480개 외식 파트너의 선택',
        subtitle: '프랜차이즈 맞춤 납품 & 식자재 공급',
        description: '물류 편차 없는 균일한 품질, 철저한 HACCP 위생 관리. 사업자 고객님께 1kg 무료 샘플팩을 전액 무료로 배송해 드립니다.',
        imageUrl: './images/banner_b2b.jpg',
        primaryButtonText: '무료 샘플 신청하기',
        primaryButtonAction: 'sample',
        secondaryButtonText: '대량 납품 상담하기',
        secondaryButtonAction: 'inquiry'
      }
    ],

    // Legacy single hero fields kept for backwards-compatibility
    heroTitle: '보쌈의 맛을 완성하는 특별한 김치',
    heroHighlight: '푸드홈 명품 보쌈무김치',
    heroSubtitle: 'FOODHOME KOREAN TRADITIONAL RADISH KIMCHI',
    heroDescription: '정성스럽게 만든 맛, 변함없는 품질. 물 생김 없이 끝까지 아삭한 특허 수분제어 절임 공법으로 전국 480여 개 외식 매장에 매일 아침 공급합니다.',
    heroImageUrl: './images/banner_bossam.jpg',
    heroBadges: [
      '식약처 HACCP 인증시설 제조',
      '100% 국내산 엄선 농산물 계약재배',
      '특허받은 꼬들꼬들 수분제어 절임공법',
      '전국 콜드체인 익일 직배송 시스템'
    ],
    stats: [
      { label: '전국 가맹·식당 납품처', value: '480', unit: '개소+', sublabel: '프랜차이즈 및 맛집' },
      { label: '일일 김치 생산량', value: '4.2', unit: '톤', sublabel: 'HACCP 자동화 라인' },
      { label: '사업자 재발주율', value: '98.8', unit: '%', sublabel: '맛과 품질의 신뢰' },
      { label: '업계 업력 및 노하우', value: '30', unit: '년', sublabel: '전통 비법 전수' }
    ],

    // Company & Contact Details
    companyName: '주식회사 푸드홈 (FOODHOME Co., Ltd.)',
    ceoName: '김진성',
    businessNumber: '312-81-94821',
    mailOrderNumber: '제 2023-충북진천-0145호',
    haccpNumber: '식약처 HACCP 제 2021-04-9218호',
    factoryAddress: '충청북도 진천군 덕산읍 신척산단로 128 푸드홈 식품가공 제1·2공장',
    hqAddress: '서울특별시 송파구 백제고분로 38길 19 푸드홈 B2B 사업본부',
    phone: '1588-7241',
    fax: '043-535-7242',
    email: 'contact@foodhome.co.kr',
    csHours: '평일 08:30 ~ 17:30 (토/일/공휴일 휴무)',
    lunchHours: '점심시간 12:00 ~ 13:00',

    // Story
    storyTitle: '원칙과 타협하지 않는 30년, 김치 한 줄기에 담은 정성',
    storySubtitle: '왜 전국 1등 족발·보쌈 전문점들은 푸드홈을 선택할까요?',
    storyParagraph1: '보쌈과 족발의 맛을 결정하는 것은 고기뿐만이 아닙니다. 첫 입을 장식하고 기름진 풍미를 깔끔하게 잡아주는 보쌈무김치와 깊은 감칠맛의 김칫속이야말로 손님이 다시 찾게 만드는 진짜 비결입니다.',
    storyParagraph2: '푸드홈은 계절마다 최적의 산지(제주 월동무, 강원 고랭지무)를 엄선하고, 전통 엿기름과 청결 태양초로 숙성한 황금 양념을 매일 새벽 직접 버무려 갓 담근 듯 신선한 상태로 공급합니다.',
    coreValues: [
      {
        title: '특허받은 수분 제어 공법',
        desc: '시간이 지나도 물이 흥건해지지 않고 꼬들꼬들하고 아삭한 특유의 보쌈무 식감을 장시간 완벽히 유지합니다.',
        icon: 'Sparkles'
      },
      {
        title: '100% 우리 농산물 계약재배',
        desc: '강원 고랭지 및 제주 청정 월동무, 충남 영양 고춧가루, 전남 신안 천일염 등 엄격한 국산 식재료만을 고집합니다.',
        icon: 'ShieldCheck'
      },
      {
        title: '철저한 HACCP 클린 생산',
        desc: '에어샤워, 자외선 살균, 3단 버블 세척, X-ray 이물 검출기 통과 등 위생 안전 시스템을 구축했습니다.',
        icon: 'Award'
      },
      {
        title: '전국 냉장 콜드체인 직배송',
        desc: '생산 즉시 전용 저온 냉장차량을 통해 주문 다음 날 매장 주방까지 가장 신선하게 도착합니다.',
        icon: 'Truck'
      }
    ],

    // Facility Media Items
    facilityItems: [
      {
        id: 'fac-1',
        title: '스마트 첨단 클린룸 가공실',
        desc: '공기 중 미세먼지와 바이러스를 차단하는 헤파필터 양압 공조 시스템 및 에어샤워 라인',
        imageUrl: './images/facility_cleanroom.jpg',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-vegetables-being-washed-in-a-sink-42939-large.mp4',
        category: '클린룸'
      },
      {
        id: 'fac-2',
        title: '3단 마이크로 버블 세척 라인',
        desc: '초음파 버블 수류로 절임 전 원물 무 표면의 잔류 이물질을 3단계 완벽 세척',
        imageUrl: './images/facility_bubble_wash.jpg',
        category: '세척라인'
      },
      {
        id: 'fac-3',
        title: '3D X-ray & 초정밀 금속검출기',
        desc: '포장 직전 미세 금속 이물질 및 비금속 이물까지 전수 스캔 통과',
        imageUrl: './images/facility_xray.jpg',
        category: '품질검사'
      },
      {
        id: 'fac-4',
        title: '2중 안심 진공포장 & 콜드체인 출하장',
        desc: '특수 질소충전 2중 필름 실링 및 0~5℃ 저온 냉장차량 직배송 출고장',
        imageUrl: './images/facility_packing.jpg',
        category: '포장·물류'
      }
    ],

    // FAQ Items
    faqItems: [
      {
        id: 'faq-1',
        question: '무료 샘플 1kg 신청 자격과 배송비는 어떻게 되나요?',
        answer: '현재 족발, 보쌈, 삼겹살, 순대국밥 등 일반음식점을 운영 중이시거나 신규 창업을 준비 중인 사업자분이라면 누구나 신청 가능합니다. 제품값은 물론 우체국 냉장 택배비까지 푸드홈이 100% 전액 지원해 드립니다.',
        category: '샘플신청'
      },
      {
        id: 'faq-2',
        question: '정기 납품 시 최소 발주 단위와 배송 주기는 어떻게 되나요?',
        answer: '최소 발주 단위는 5kg 또는 10kg 박스 단위이며, 수도권 및 전국 매장으로 주 2~6회 원하시는 주기별 맞춤 직배송이 가능합니다. 매월 300kg 이상 소진하시는 대형 매장 및 프랜차이즈의 경우 특별 계약 단가가 적용됩니다.',
        category: '납품·단가'
      },
      {
        id: 'faq-3',
        question: '푸드홈 보쌈무김치는 왜 시간이 지나도 물이 흥건해지지 않나요?',
        answer: '푸드홈 고유의 \'특허 수분제어 절임공법\'을 적용하여 무 속 수분을 이상적인 삼투압 비율로 조절하였기 때문입니다. 보쌈 고기 접시 위에 올려두어도 고기가 젖지 않고 첫 입부터 마지막 입까지 꼬들꼬들 아삭한 식감이 유지됩니다.',
        category: '보관·유통'
      },
      {
        id: 'faq-4',
        question: '프랜차이즈 브랜드 전용 레시피(OEM) 개발도 가능한가요?',
        answer: '네, 가능합니다. 브랜드의 콘셉트에 따라 매운맛 강도, 단맛 배합, 규격 포장지 전용 로고 인쇄(PB 라벨링) 등 맞춤형 생산을 진행해 드립니다. 현재 전국 70여 개 이상 가맹 브랜드에 맞춤형 김치를 공급하고 있습니다.',
        category: '납품·단가'
      }
    ]
  },
  theme: {
    primaryColor: '#872D35', // Main Deep Burgundy
    accentColor: '#B64346',  // Sub Red
    darkBrown: '#332525',    // Dark Brown
    creamWhite: '#FAF8F5',   // Cream White
    warmGrey: '#EEEAE6',     // Warm Grey
    fontFamily: 'pretendard',
    cardRadius: 'rounded-xl',
    sectionsVisible: {
      hero: true,
      stats: false, // Hidden on main page to keep vertical height compact
      productSlider: true,
      actionBanners: true,
      productCategories: false, // Streamlined main landing page as requested
      features: false,          // Streamlined main landing page as requested
      products: false,          // Streamlined main landing page as requested
      process: false,           // Streamlined main landing page as requested
      b2bHighlights: false,     // Streamlined main landing page as requested
      reviews: false,           // Streamlined main landing page as requested
      faq: false,               // Streamlined main landing page as requested
      posts: false,             // Streamlined main landing page as requested
      inquiry: false            // Streamlined main landing page as requested
    }
  },
  products: [
    {
      id: 'prod-1',
      name: '아삭달콤 명품 보쌈무김치 (업소용)',
      subtitle: '전국 족발·보쌈 프랜차이즈 납품 1위 시그니처 상품',
      category: '보쌈무김치',
      tag: 'BEST B2B 1위',
      weight: '5kg / 10kg 박스 단위',
      storage: '냉장보관 (0~5℃)',
      shelfLife: '제조일로부터 30일 (권장 최적소비 15일 이내)',
      ingredients: '국내산 절임무 75%, 고춧가루(국내산), 마늘(국내산), 멸치액젓, 물엿, 사과·배 퓨레, 생강, 천일염',
      description: '제철 제주 월동무를 푸드홈 고유의 수분 제어 공법으로 절여 시간이 흘러도 물러짐 없이 끝까지 아삭하고 꼬들합니다. 감칠맛 도는 은은한 단맛과 깔끔한 매콤함으로 기름진 수육, 족발과 최상의 조화를 이룹니다.',
      imageUrl: './images/prod_bossam_mu.jpg',
      isPopular: true,
      isRecommended: true,
      bulkPriceGuide: '대량 주문 시 납품 단가 협의 (사업자 회원 전용가 적용)'
    },
    {
      id: 'prod-2',
      name: '감칠맛 폭발 수제 보쌈김칫속 (보쌈속양념)',
      subtitle: '굴보쌈, 생선회, 수육을 업그레이드하는 비법 속양념',
      category: '김칫속/양념',
      tag: '셰프 추천',
      weight: '3kg / 5kg / 10kg 전용팩',
      storage: '냉장보관 (0~5℃)',
      shelfLife: '제조일로부터 45일',
      ingredients: '국내산 배, 양파, 영양 고춧가루, 광천 토굴 멸치새우젓, 다진마늘, 매실발효액, 찹쌀풀, 볶음참깨',
      description: '신선한 굴보쌈이나 수육 접시 위에 얹어 나가는 바로 그 감칠맛 풍부한 명품 김칫속입니다. 사과·배 생과일을 갈아 넣어 인위적이지 않은 천연 단맛과 30년 비법 육수의 깊고 진한 풍미를 선사합니다.',
      imageUrl: './images/prod_kimchi_sok.jpg',
      isPopular: true,
      isRecommended: false,
      bulkPriceGuide: '10kg 이상 정기 배송 시 추가 12% 단가 할인 제공'
    },
    {
      id: 'prod-3',
      name: '정갈한 남도식 꼬들 무말랭이 무김치',
      subtitle: '전통 엿기름과 청결 태양초로 버무린 씹는 맛의 정수',
      category: '보쌈무김치',
      tag: '전통 명품',
      weight: '3kg / 5kg 용기형',
      storage: '냉장보관 (0~5℃)',
      shelfLife: '제조일로부터 60일',
      ingredients: '건조무(국내산) 68%, 태양초 고춧가루, 멸치육젓, 조청, 생강농축액, 대파, 볶은 통깨',
      description: '햇볕에 바싹 말린 깨끗한 국산 무를 정성껏 불려 잡내를 제거하고, 깊은 감칠맛의 남도식 양념장에 치대어 꼬들꼬들한 저작감을 극대화했습니다. 백반, 설렁탕, 칼국수집 찬으로도 인기 만점입니다.',
      imageUrl: './images/prod_mumalaengi.jpg',
      isPopular: false,
      isRecommended: true,
      bulkPriceGuide: '프랜차이즈 전용 규격 포장 및 라벨링 OEM 가능'
    },
    {
      id: 'prod-4',
      name: '프랜차이즈 전용 대용량 맞춤형 보쌈무 10kg',
      subtitle: '월 500kg 이상 소진 대형 매장 및 물류센터 전용',
      category: '업소용 대용량',
      tag: '대형 매장 전용',
      weight: '10kg 진공 벌크백 (2중 안심실링)',
      storage: '냉장보관 (0~5℃)',
      shelfLife: '제조일로부터 25일',
      ingredients: '국내산 절임무 76%, 고춧가루, 액젓혼합, 양파, 마늘, 사과엑기스',
      description: '회전율이 빠른 대형 족발보쌈 전문점과 프랜차이즈 물류센터를 위한 경제형 대용량 패키지입니다. 특수 질소 충전 진공 포장으로 운송 중 팽창 및 가스 발생을 최소화하여 완벽한 품질을 유지합니다.',
      imageUrl: './images/prod_bulk_10kg.jpg',
      isPopular: true,
      isRecommended: true,
      bulkPriceGuide: '월 정기 납품 계약 시 파격 물류비 무료 지원'
    },
    {
      id: 'prod-5',
      name: '신선 소포장 보쌈무김치 500g / 1kg 파우치',
      subtitle: '배달 전문점 1인 세트 및 밀키트 번들 납품 최적화',
      category: '소포장/밀키트',
      tag: '배달/소량 포장',
      weight: '500g / 1kg 스탠드 파우치',
      storage: '냉장보관 (0~5℃)',
      shelfLife: '제조일로부터 30일',
      ingredients: '국내산 무, 고춧가루, 사과, 마늘, 생강, 정제염, 액젓',
      description: '배달 전문 매장에서 소분할 필요 없이 바로 손님에게 전달할 수 있는 위생적인 소포장 형태입니다. 배달 리뷰 평점을 올려주는 깔끔한 포장과 일정한 맛을 보장합니다.',
      imageUrl: './images/prod_pouch_500g.jpg',
      isPopular: false,
      isRecommended: false,
      bulkPriceGuide: '1박스(20팩) 단위 주문 가능'
    },
    {
      id: 'prod-6',
      name: '칼칼하고 시원한 알타리 총각무김치 (업소용)',
      subtitle: '국밥집, 족발집, 수육집 인기 사이드 찬',
      category: '보쌈무김치',
      tag: '계절 별미',
      weight: '5kg / 10kg',
      storage: '냉장보관 (0~5℃)',
      shelfLife: '제조일로부터 45일',
      ingredients: '알타리무(국내산), 멸치젓, 다시마육수, 찹쌀풀, 고춧가루',
      description: '단단하고 알싸한 토종 알타리무를 멸치다시마 비법 육수에 절여 시원하고 개운한 뒷맛이 일품입니다. 기름기 많은 고기 요리와 곁들이기에 최적화된 계절 별미 김치입니다.',
      imageUrl: './images/prod_altari.jpg',
      isPopular: false,
      isRecommended: false,
      bulkPriceGuide: '식자재 유통 도매상 특별 공급가 별도 문의'
    }
  ],
  posts: [
    {
      id: 'post-1',
      title: '[공지] 푸드홈 제2공장 클린룸 확장 준공 및 위생 관리 점검 완료',
      category: '공지사항',
      author: '품질관리팀',
      date: '2026-03-12',
      content: '늘 푸드홈을 믿고 찾아주시는 전국 외식업 대표님들께 감사드립니다. 충북 진천 본사에 제2공장 첨단 자동화 클린룸 증축이 완료되었습니다. 최신 에어샤워 시스템, 3단계 마이크로 버블 세척 라인, 3D 광학 X-ray 이물질 선별기를 도입하여 하루 최대 10톤 규모의 안전하고 위생적인 보쌈무김치를 중단 없이 생산·공급할 수 있는 역량을 확보하였습니다.',
      readCount: 1420,
      thumbnail: './images/facility_cleanroom.jpg',
      tags: ['품질경영', '제2공장', '위생관리', '안전제조'],
      isPinned: true
    },
    {
      id: 'post-2',
      title: '[레시피] 보쌈 전문점 사장님이 극찬한 잡내 없는 삼겹 수육 삶기와 보쌈무 세팅 비법',
      category: '조리·활용 레시피',
      author: '메뉴개발팀',
      date: '2026-02-28',
      content: '수육을 삶을 때 된장과 통후추, 대파 뿌리와 월계수 잎 외에도 사과 반쪽과 소주 반 컵을 넣어주면 고기 속 기름기가 깔끔하게 정돈됩니다. 삶은 직후 찬 얼음물에 3초간 담갔다 썰어내면 겉은 쫄깃하고 속은 부드럽습니다. 접시 중앙에 푸드홈 보쌈무김치를 풍성하게 담고 참깨와 송송 썬 쪽파를 올려 완성해보세요.',
      readCount: 3840,
      thumbnail: './images/banner_bossam.jpg',
      tags: ['보쌈삶는법', '수육황금레시피', '식당노하우', '매출증대'],
      isPinned: true
    },
    {
      id: 'post-3',
      title: '[B2B스토리] 전국 75개 가맹 족발 프랜차이즈 \'한양왕족발\' 푸드홈 단독 공급 체결',
      category: 'B2B 납품스토리',
      author: '영업기획본부',
      date: '2026-02-14',
      content: '가맹점별로 김치 맛 편차가 심해 고민이 깊으셨던 한양왕족발 본사와 3개월간의 블라인드 테스트 및 샘플 검증을 거쳐 전 가맹점 단독 공급 협약을 체결했습니다. 주방 인건비 절감과 균일한 품질 유지로 점주 만족도 97%를 달성한 공급 혁신 사례를 소개합니다.',
      readCount: 2150,
      thumbnail: './images/banner_b2b.jpg',
      tags: ['프랜차이즈', 'B2B공급', '한양왕족발', '인건비절감'],
      isPinned: false
    },
    {
      id: 'post-4',
      title: '[안내] 신규 외식업 사장님을 위한 2026 \'보쌈무김치 1kg 무료 샘플팩\' 지원 정책',
      category: '이벤트',
      author: '고객지원센터',
      date: '2026-01-20',
      content: '맛을 보지 않고는 식자재를 바꿀 수 없다는 사장님들의 마음을 깊이 이해합니다. 현재 족발, 보쌈, 삼겹살, 순대국밥 전문점을 운영 중이시거나 창업을 준비 중인 사업자분들께 푸드홈 시그니처 보쌈무김치 1kg 무료 샘플을 택배비까지 전액 지원하여 보내드립니다.',
      readCount: 5690,
      thumbnail: './images/prod_bossam_mu.jpg',
      tags: ['무료샘플', '사업자전용', '체험이벤트'],
      isPinned: true
    }
  ],
  reviews: [
    {
      id: 'rev-1',
      clientName: '도담보쌈 본점',
      businessType: '보쌈·족발 전문점 (서울 마포)',
      rating: 5,
      comment: '직접 김치를 담글 때는 주방 이모님 컨디션 따라 맛이 달라져서 스트레스가 이만저만이 아니었습니다. 푸드홈으로 바꾼 지 1년 반 되었는데, 손님들이 무김치 리필을 3번씩 하십니다. 물도 안 생기고 아삭함이 대박입니다.',
      date: '2026-03-08',
      location: '서울 마포구',
      verifiedPartner: true
    },
    {
      id: 'rev-2',
      clientName: '황금족발보쌈 가맹본부',
      businessType: '전국 42개 가맹 프랜차이즈',
      rating: 5,
      comment: '전국 가맹점에 매일 아침 차질 없이 콜드체인으로 배송되는 물류 안정성이 최고입니다. 특히 여름철 장마철에도 무 품질이 흔들리지 않고 균일해서 본사 품질관리가 한결 수월해졌습니다.',
      date: '2026-02-22',
      location: '경기 성남시',
      verifiedPartner: true
    },
    {
      id: 'rev-3',
      clientName: '제주흑돈정육식당',
      businessType: '돼지고기 전문 구이점 (부산 해운대)',
      rating: 5,
      comment: '오겹살과 목살 구이에 곁들임 찬으로 푸드홈 보쌈무김치와 김칫속을 함께 내는데, 고기 맛을 확 살려줘서 객단가가 올랐습니다. 단가도 합리적이라 식자재 원가 절감에 큰 도움이 됩니다.',
      date: '2026-02-05',
      location: '부산 해운대구',
      verifiedPartner: true
    },
    {
      id: 'rev-4',
      clientName: '인생수육국밥',
      businessType: '국밥·수육 체인점 (대전 유성)',
      rating: 5,
      comment: '샘플 신청해서 먹어보고 다음 날 바로 100kg 정기 발주 넣었습니다. 텁텁하지 않고 끝맛이 청량하게 똑 떨어지는 단맛이라 수육과 천생연분입니다.',
      date: '2026-01-18',
      location: '대전 유성구',
      verifiedPartner: true
    }
  ],
  inquiries: [
    {
      id: 'inq-101',
      companyName: '압구정 대박보쌈',
      contactPerson: '박현우 대표',
      phone: '010-3819-4821',
      email: 'hwpark@daebakbossam.com',
      businessType: '일반음식점 (보쌈·족발)',
      requestType: '무료 샘플 요청',
      monthlyUsage: '월 200kg ~ 300kg 예상',
      region: '서울 강남구 신사동',
      message: '기존 거래처 무김치가 여름철에 자꾸 물러져서 거래처 변경을 검토 중입니다. 시그니처 보쌈무 1kg 샘플 부탁드립니다.',
      status: '샘플발송완료',
      createdAt: '2026-03-14 11:20',
      adminMemo: '우체국 냉장택배 발송 완료 (송장: 6891-2309-1123). 통화 시 만족도 매우 높음'
    },
    {
      id: 'inq-102',
      companyName: '(주)참한푸드 프랜차이즈 본사',
      contactPerson: '이선영 구매팀장',
      phone: '010-7712-9041',
      email: 'sylee@chamhanfnb.kr',
      businessType: '프랜차이즈 가맹본부',
      requestType: '대량 납품 견적',
      monthlyUsage: '월 1.5톤 (전국 28개 직영·가맹)',
      region: '경기도 부천시',
      message: '직영 매장 4곳 및 가맹점 정기 납품 견적서 요청합니다. OEM 전용 패키징 라벨링 가능 여부도 상담 희망합니다.',
      status: '접수대기',
      createdAt: '2026-03-15 09:45',
      adminMemo: '견적서 및 규격서 이메일 발송 준비 중'
    },
    {
      id: 'inq-103',
      companyName: '수복식당 & 정육마을',
      contactPerson: '최민기 사장',
      phone: '010-5231-1876',
      email: 'subok2024@naver.com',
      businessType: '정육식당',
      requestType: '무료 샘플 요청',
      monthlyUsage: '월 80kg 내외',
      region: '충남 천안시 서북구',
      message: '김칫속 양념과 보쌈무김치 함께 테스트해보고 싶습니다. 식자재 단가표도 동봉 부탁드립니다.',
      status: '상담완료',
      createdAt: '2026-03-13 16:30',
      adminMemo: '초도 발주 20kg 계약 확정'
    }
  ],
  seo: {
    metaTitle: '푸드홈(FOODHOME) - 대한민국 1등 보쌈무김치·김칫속 전문 제조업체',
    metaDescription: '30년 전통 비법양념과 특허 수분제어로 빚어낸 명품 보쌈무김치, 굴보쌈 김칫속 전문 제조 푸드홈. 전국 480여 개 프랜차이즈 및 맛집 납품. 무료 샘플 신청 지원.',
    keywords: '푸드홈, FOODHOME, 보쌈무김치, 무김치, 김칫속, 보쌈김치, 족발무김치, 업소용김치, 외식업식자재, 보쌈식자재납품, HACCP김치',
    ogTitle: '푸드홈(FOODHOME) - 대한민국 1등 보쌈무김치·김칫속 전문 제조업체',
    ogDescription: '물 생김 없이 끝까지 아삭한 특허 수분제어 보쌈무김치. 전국 외식업 대표님을 위한 무료 1kg 샘플팩 신청 접수 중.',
    ogImageUrl: './images/banner_bossam.jpg',
    canonicalUrl: 'https://foodhome.co.kr'
  },
  social: {
    instagramUrl: 'https://instagram.com/foodhome_official',
    youtubeUrl: 'https://youtube.com/@foodhome_kr',
    naverBlogUrl: 'https://blog.naver.com/foodhome_kimchi',
    kakaoTalkUrl: 'https://pf.kakao.com/_foodhome',
    smartStoreUrl: 'https://smartstore.naver.com/foodhome/products/4266908131',
    coupangUrl: 'https://coupang.com'
  },
  formspreeEndpoint: 'https://formspree.io/f/xoejykbn'
};
