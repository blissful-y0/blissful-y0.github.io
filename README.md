# Bliss portfolio

Astro로 만든 개인 홈페이지와 블로그 미리보기입니다. 홈에는 제공받은 작업실 일러스트에 비·김·조명과 스크롤 확대를 적용하고, 글은 Markdown 콘텐츠 컬렉션으로 관리합니다. 블로그 글은 교체를 전제로 한 샘플 데이터입니다.

## 시작하기

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:4321/`을 엽니다.

정적 결과와 Pagefind 검색 인덱스를 함께 만들려면 다음을 실행합니다.

```bash
npm run check
npm run build
npm run preview
```

`npm run build`는 `dist/`에 정적 페이지를 만들고 `dist/pagefind/`에 본문 검색 인덱스를 생성합니다. 개발 서버에서는 검색 인덱스가 아직 없기 때문에 제목과 요약을 사용하는 fallback이 동작합니다.

## 콘텐츠 수정

블로그 글은 [`src/content/posts`](src/content/posts)에 Markdown 파일로 추가합니다.

```md
---
title: '글 제목'
description: '목록과 검색 결과에 표시할 요약'
date: 2026-09-09
category: 'build log'
tags: ['astro', 'notes']
readingTime: '4분 읽기'
featured: false
sample: true
---

본문을 여기에 씁니다.
```

제목, 설명, 날짜, 카테고리, 태그는 콘텐츠 스키마로 검사합니다. 실제 글로 교체하면 `sample: false`로 바꾸고 카드의 샘플 표기도 함께 조정하면 됩니다.

작업실 이미지는 [`public/images`](public/images)의 `lofi-room-desktop.webp`와 `lofi-room-mobile.webp`를 교체하면 됩니다. 데스크톱은 가로, 모바일은 세로 이미지를 사용합니다.

## 경로

- `/` — About me 랜딩 페이지
- `/blog/` — 글 목록, tag 필터, 본문 검색
- `/blog/<slug>/` — 글 본문과 목차
- `/rss.xml` — 블로그 RSS

## 배포

`master` 브랜치에 push하면 [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)이 검사, 빌드, Pagefind 인덱스 생성을 거친 뒤 GitHub Pages에 배포합니다. GitHub 저장소의 Pages 설정은 `GitHub Actions`를 source로 사용해야 합니다.
