import type { Event } from '../types';

// 2026년 한국 IT 행사 샘플 데이터
export const events2026: Event[] = [
  {
    id: "1",
    title: "ICML 2026",
    description: "국제 머신러닝 학술대회로, 최신 머신러닝·AI 연구 발표 및 워크숍이 진행됩니다.",
    startDate: new Date(2026, 6, 6),
    endDate: new Date(2026, 6, 11),
    location: "서울 COEX",
    website: "https://icml.cc/",
    category: "conference",
    tags: ["AI", "Machine Learning", "Research"]
  },
  {
    id: "2",
    title: "AI EXPO KOREA 2026",
    description: "국내 최대 인공지능 산업 박람회로 AI 기술·서비스·솔루션을 전시합니다.",
    startDate: new Date(2026, 4, 6),
    endDate: new Date(2026, 4, 8),
    location: "서울 COEX Hall A",
    website: "https://www.aiexpo.co.kr/",
    category: "expo",
    tags: ["AI", "Exhibition", "Technology"]
  },
  {
    id: "3",
    title: "World IT Show 2026",
    description: "IT 전반을 다루는 대규모 기술 박람회로 최신 IT 제품·서비스를 소개합니다.",
    startDate: new Date(2026, 3, 22),
    endDate: new Date(2026, 3, 24),
    location: "서울 COEX",
    website: "https://ecck.or.kr/kait-world-it-show-2026/",
    category: "expo",
    tags: ["IT", "Innovation", "Exhibition"]
  },
  {
    id: "4",
    title: "SEMICON Korea 2026",
    description: "반도체 산업 전시 및 기술 세미나가 포함된 국제 전시회입니다.",
    startDate: new Date(2026, 1, 11),
    endDate: new Date(2026, 1, 13),
    location: "서울 COEX",
    website: "https://www.semiconkorea.org/",
    category: "expo",
    tags: ["Semiconductor", "Technology", "Exhibition"]
  },
  {
    id: "5",
    title: "Smart Tech Korea 2026",
    description: "AI·Big Data·IoT 등 최신 기술을 선보이는 종합 기술 박람회입니다.",
    startDate: new Date(2026, 5, 10),
    endDate: new Date(2026, 5, 12),
    location: "서울 COEX",
    website: "https://smarttechkorea.com/",
    category: "expo",
    tags: ["AI", "Big Data", "IoT"]
  },
  {
    id: "6",
    title: "NANO KOREA 2026",
    description: "국제 나노기술 전시회로 나노 기술·제품을 선보입니다.",
    startDate: new Date(2026, 6, 8),
    endDate: new Date(2026, 6, 10),
    location: "KINTEX",
    website: "https://nanokorea.or.kr/",
    category: "expo",
    tags: ["Nano", "Technology", "Innovation"]
  },
  {
    id: "7",
    title: "AI·ICT Convergence Korea 2026",
    description: "ICT 융합 및 신기술 전망을 다루는 국가 주도 기술 행사입니다.",
    startDate: new Date(2026, 3, 1),
    endDate: new Date(2026, 3, 2),
    location: "서울 한국과학기술회관 1관 지하1층",
    website: "https://ictkorea.org/",
    category: "conference",
    tags: ["ICT", "Convergence", "Technology"]
  },
  {
    id: "8",
    title: "ITCE 2026 (대한민국 ICT융합엑스포)",
    description: "ICT 융합 기술 및 응용 사례를 전시하는 종합 엑스포입니다.",
    startDate: new Date(2026, 9, 21),
    endDate: new Date(2026, 9, 24),
    location: "대구 EXCO",
    website: "https://www.itce.kr/",
    category: "expo",
    tags: ["ICT", "Expo", "Innovation"]
  }
];

