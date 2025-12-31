---
name: New Event Registration
about: 새로운 행사 등록을 위한 이슈 템플릿
title: '[Event Registration] '
labels: 'event registration'
assignees: ''
---
본 이슈를 등록하고, PR 에 이슈를 첨부해주세요.

id는 고유해야 하며, 데이터 순번에 영향을 주지 않습니다.

## 이벤트 등록 방법

events.ts 파일을 수정.

예)

```typescript
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
```

## Tip

날짜 등록 방법

new Date(year: number, monthIndex: number, date: number)

@param year — The full year designation is required for cross-century date accuracy. If year is between 0 and 99 is used, then year is assumed to be 1900 + year.

@param monthIndex — The month as a number between 0 and 11 (January to December).

@param date — The date as a number between 1 and 31.
