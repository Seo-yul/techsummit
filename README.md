# TechSummit Asia

한국 IT 행사 정보를 제공하는 정적 웹사이트입니다.

## 프로젝트 소개

TechSummit Asia는 한국에서 진행되는 IT 행사 정보를 달력 형태로 제공하는 웹사이트입니다. 공공의 목적 및 정보 전달을 위해 운영되며, 개발자들이 쉽게 행사 일정을 확인할 수 있도록 구성되어 있습니다.

## 기술 스택

- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Vite** - 빌드 도구
- **Material UI (MUI)** - UI 컴포넌트 및 아이콘
- **date-fns** - 날짜 처리
- **Netlify** - 정적 사이트 호스팅

## 주요 기능

- 📅 달력 기반 행사 일정 표시
- 🎯 카테고리별 행사 분류 (컨퍼런스, 밋업, 워크샵, 해커톤 등)
- 📍 행사 위치 및 상세 정보 제공
- 🔗 행사 공식 웹사이트 링크
- 📱 반응형 디자인

## 개발 환경 설정

### 필수 요구사항

- Node.js 18 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

## 프로젝트 구조

```
src/
├── components/          # React 컴포넌트
│   ├── Calendar/        # 달력 컴포넌트
│   ├── EventCard/       # 행사 카드 컴포넌트
│   └── Header/          # 헤더 컴포넌트
├── data/                # 행사 데이터
│   └── events.ts        # 2026년 행사 데이터
├── types/               # TypeScript 타입 정의
│   └── index.ts
├── App.tsx              # 메인 앱 컴포넌트
└── main.tsx             # 진입점
```

## 배포

이 프로젝트는 Netlify를 통해 배포됩니다.

### Netlify 배포 설정

1. GitHub 저장소에 코드를 푸시합니다.
2. Netlify에 로그인하고 새 사이트를 생성합니다.
3. GitHub 저장소를 연결합니다.
4. 빌드 설정:
   - Build command: `npm run build`
   - Publish directory: `dist`

`netlify.toml` 파일이 이미 설정되어 있어 자동으로 SPA 라우팅이 처리됩니다.

## 데이터 추가

새로운 행사 정보를 추가하려면 `src/data/events.ts` 파일을 수정하세요.

```typescript
{
  id: 'unique-id',
  title: '행사 제목',
  description: '행사 설명',
  startDate: new Date(2026, 2, 15), // 년, 월(0부터 시작), 일
  endDate: new Date(2026, 2, 15),
  location: '행사 장소',
  website: 'https://example.com', // 선택사항
  category: 'conference', // conference | meetup | workshop | hackathon | exhibition | other
  tags: ['태그1', '태그2'], // 선택사항
}
```

## 라이선스

이 프로젝트는 [MIT License](LICENSE) 하에 배포됩니다.

공공의 목적 및 정보 전달을 위해 운영되며, 자유롭게 사용, 수정, 배포할 수 있습니다.
