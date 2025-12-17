# zucca100 계산기 도구 모음

> 일상생활에 필요한 다양한 계산기와 유틸리티 도구를 한 곳에서 제공하는 웹 애플리케이션

**도메인**: https://calc.zucca100.com

---

## 📋 프로젝트 소개

zucca100 계산기 도구 모음은 일상생활에서 자주 사용하는 15가지 이상의 계산기와 유틸리티 도구를 제공하는 다국어 지원 웹 플랫폼입니다. 건강, 금융, 날짜, 개발/디자인 등 다양한 카테고리의 계산기를 한 곳에서 사용할 수 있습니다.

---

## 🚀 주요 기능

### 제공하는 계산기 도구 (총 15개)

#### 건강 관련
- **BMI 계산기** (`/bmi`) - 체질량지수를 계산하여 건강 상태 확인
- **칼로리 계산기** (`/calorie`) - 일일 칼로리, BMR, TDEE 계산
- **기대수명 계산기** (`/expect_age`) - 23개 문항 기반 건강 스타일 분석 및 예상 수명 계산

#### 날짜/시간 관련
- **만나이 계산기** (`/age`) - 한국 나이와 만나이 계산
- **D-Day 계산기** (`/dday`) - 목표 날짜까지 남은 일수 계산

#### 금융 관련
- **이자 계산기** (`/interest`) - 단리/복리 이자 계산
- **대출 계산기** (`/loan`) - 대출 상환금 계산
- **급여 계산기** (`/salary`) - 실수령액 및 공제액 계산 (4대보험, 소득세, 지방소득세)
- **환율 계산기** (`/currency`) - 실시간 환율 변환

#### 수학/계산 관련
- **퍼센트 계산기** (`/percentage`) - 다양한 퍼센트 계산
- **단위 변환기** (`/unit`) - 길이, 무게, 온도, 부피 등 단위 변환

#### 개발/디자인 도구
- **색상 코드 변환기** (`/color`) - HEX, RGB, HSL 변환
- **QR 코드 생성기** (`/qr`) - 텍스트/URL을 QR 코드로 변환
- **비밀번호 생성기** (`/password`) - 보안 비밀번호 생성
- **텍스트 카운터** (`/text`) - 글자 수, 단어 수, 줄 수 계산

### 핵심 기능

- ✅ **다국어 지원** - 한국어/영어 지원 (next-intl)
- ✅ **SEO 최적화** - 구조화된 데이터 (Schema.org), 메타 태그, sitemap.xml, robots.txt
- ✅ **반응형 디자인** - 모바일/태블릿/데스크톱 지원
- ✅ **실시간 계산** - 즉시 결과 표시
- ✅ **북마크 기능** - 로컬 스토리지 기반 플로팅 버튼
- ✅ **모던한 DatePicker** - react-day-picker 기반 커스텀 캘린더 컴포넌트
- ✅ **사용자 친화적 UI/UX** - 카드형 선택지, 직관적인 인터페이스
- ✅ **구조화된 데이터** - FAQPage, SoftwareApplication, BreadcrumbList, WebPage

---

## 🛠 기술 스택

### 프론트엔드
- **프레임워크**: Next.js 15.0.5 (App Router)
- **언어**: TypeScript 5.3.3
- **UI 라이브러리**: React 18.2.0
- **스타일링**: Tailwind CSS 3.4.1
- **UI 컴포넌트**: Radix UI, 커스텀 UI 라이브러리 (@cal/ui)

### 다국어 지원
- **라이브러리**: next-intl 4.5.3
- **지원 언어**: 한국어(ko), 영어(en)
- **기본 언어**: 한국어

### 주요 라이브러리
- **날짜 처리**: date-fns 4.1.0, react-day-picker 9.12.0
- **UI 컴포넌트**: @radix-ui/react-popover (DatePicker용)
- **QR 코드**: qrcode 1.5.3
- **아이콘**: lucide-react 0.556.0
- **분석**: @vercel/analytics 1.5.0

### 모노레포 구조
- `@cal/seo`: SEO 메타데이터 생성 라이브러리
- `@cal/ui`: 공통 UI 컴포넌트 라이브러리
- `@cal/utils`: 유틸리티 함수 라이브러리

---

## 📁 프로젝트 구조

```
calc-main/
├── app/
│   ├── [locale]/              # 다국어 라우팅
│   │   ├── age/              # 만나이 계산기
│   │   ├── bmi/              # BMI 계산기
│   │   ├── calorie/          # 칼로리 계산기
│   │   ├── color/            # 색상 코드 변환기
│   │   ├── currency/         # 환율 계산기
│   │   ├── dday/             # D-Day 계산기
│   │   ├── expect_age/       # 기대수명 계산기
│   │   ├── interest/         # 이자 계산기
│   │   ├── loan/             # 대출 계산기
│   │   ├── password/         # 비밀번호 생성기
│   │   ├── percentage/       # 퍼센트 계산기
│   │   ├── qr/               # QR 코드 생성기
│   │   ├── salary/           # 급여 계산기
│   │   ├── text/             # 텍스트 카운터
│   │   ├── unit/             # 단위 변환기
│   │   ├── components/       # 공통 컴포넌트
│   │   │   ├── AdSense.tsx          # Google AdSense 광고 컴포넌트
│   │   │   ├── BookmarkButton.tsx   # 북마크 플로팅 버튼 (로컬 스토리지)
│   │   │   ├── DatePicker.tsx       # 모던한 날짜 선택 컴포넌트 (react-day-picker)
│   │   │   ├── Navigation.tsx       # 네비게이션 바
│   │   │   ├── StructuredData.tsx   # 구조화된 데이터 (클라이언트)
│   │   │   └── StructuredDataServer.tsx # 구조화된 데이터 (서버)
│   │   ├── lib/              # 유틸리티 함수
│   │   │   └── seo.ts        # SEO 설정
│   │   ├── layout.tsx        # 루트 레이아웃
│   │   └── page.tsx          # 홈페이지
│   ├── api/                  # API 라우트
│   │   └── rates/            # 환율 API
│   ├── robots.ts             # robots.txt
│   └── sitemap.ts            # sitemap.xml
├── messages/                 # 다국어 메시지 파일
│   ├── ko.json
│   └── en.json
├── lib/                      # 공통 라이브러리
│   └── exchange-rate-api.ts  # 환율 API 클라이언트
├── i18n.ts                   # 다국어 설정
├── middleware.ts             # 미들웨어 (다국어 라우팅)
└── next.config.js            # Next.js 설정
```

---

## 🎯 기술적 특징

### 아키텍처
- **모노레포 구조**: 여러 패키지로 분리된 모듈화된 구조
- **서버 컴포넌트 우선**: Next.js 15의 서버 컴포넌트 활용
- **타입 안정성**: TypeScript로 타입 안정성 보장

### SEO 구현
- 각 페이지별 독립적인 메타데이터 생성 (`@cal/seo` 패키지)
- 구조화된 데이터 (Schema.org)를 통한 검색엔진 최적화
  - **WebPage**: 페이지 기본 정보
  - **FAQPage**: 자주 묻는 질문 구조화
  - **SoftwareApplication**: 계산기 앱 정보
  - **BreadcrumbList**: 네비게이션 경로
- FAQ 구조화된 데이터로 검색 결과 향상 (Google 검색 결과에 FAQ 표시)
- Sitemap.xml 자동 생성 (`/sitemap.xml`)
- Robots.txt 설정 (`/robots.txt`) - Googlebot, Bingbot, Naverbot 등 지원
- 다국어 alternate links (hreflang)
- Canonical URL 설정

### 다국어 처리
- JSON 기반 메시지 파일 관리 (`messages/ko.json`, `messages/en.json`)
- 서버 사이드 다국어 처리 (next-intl)
- URL 기반 언어 라우팅 (`/ko/`, `/en/`)
- 미들웨어를 통한 자동 언어 감지 및 리다이렉트
- 날짜 포맷팅 다국어 지원 (date-fns locale)

### 성능 최적화
- Next.js App Router 기반 서버 사이드 렌더링
- 정적 페이지 생성 (Static Generation)
- 코드 스플리팅
- 폰트 최적화 (Inter)
- 클라이언트 사이드 계산 (서버 부하 없음)
- 로컬 스토리지 기반 북마크 (서버 요청 없음)

---

## 🚀 시작하기

### 사전 요구사항

- Node.js 18.x 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 브라우저에서 http://localhost:3000 열기
```

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 린트 검사
npm run lint
```

---

## 🔧 환경 변수

프로젝트를 실행하기 위해 다음 환경 변수가 필요할 수 있습니다:

```env
# Google Analytics (선택사항)
NEXT_PUBLIC_GA_ID=your_ga_id

# 환율 API (필요시)
EXCHANGE_RATE_API_KEY=your_api_key
```

---

## 📊 SEO 최적화

### 구현된 SEO 기능

- ✅ 메타 태그 최적화 (Title, Description)
- ✅ 구조화된 데이터 (Schema.org)
- ✅ Sitemap.xml 자동 생성
- ✅ Robots.txt 설정
- ✅ 다국어 alternate links
- ✅ Canonical URL 설정

### 검색엔진 제출

- Google Search Console
- 네이버 서치어드바이저
- Bing Webmaster Tools

---

## 🔒 보안 및 개인정보

- 모든 계산은 클라이언트 사이드에서 수행 (서버 전송 없음)
- 로컬 스토리지 기반 북마크 (개인정보 수집 없음)
- HTTPS 통신
- 입력 검증 및 에러 처리
- XSS 방지 (React 기본 보안)

---

## 📈 분석 및 광고

- Vercel Analytics 통합
- Google AdSense 통합
- 네이버 사이트 인증

---

## 🌐 배포

- **호스팅**: Vercel
- **도메인**: calc.zucca100.com
- **빌드**: Next.js 빌드 시스템
- **환경 변수**: Vercel 환경 변수 관리

---

## 📝 라이선스

이 프로젝트는 private 프로젝트입니다.

---

## 🤝 기여

프로젝트 개선을 위한 제안이나 버그 리포트는 이슈로 등록해주세요.

---

## 📞 문의

프로젝트 관련 문의사항이 있으시면 이슈를 통해 연락해주세요.

---

## 🎨 주요 의존성

- **Next.js 15**: React 프레임워크
- **next-intl**: 다국어 지원
- **Tailwind CSS**: 유틸리티 CSS
- **TypeScript**: 타입 안정성
- **Radix UI**: 접근성 컴포넌트

---

## ✨ 프로젝트 특징 요약

1. **15개의 다양한 계산기 도구** 제공
2. **다국어 지원** (한국어/영어, next-intl)
3. **SEO 최적화** (구조화된 데이터, 메타 태그, sitemap, robots.txt)
4. **반응형 디자인** (모든 디바이스 지원)
5. **모노레포 구조** (확장 가능한 아키텍처)
6. **타입 안정성** (TypeScript)
7. **서버 사이드 렌더링** (빠른 로딩)
8. **사용자 친화적 UI/UX** (카드형 선택지, 모던한 DatePicker)
9. **북마크 기능** (로컬 스토리지 기반)
10. **구조화된 데이터** (Google 검색 결과 향상)

## 📝 최근 업데이트

### 주요 추가 기능
- ✅ **기대수명 계산기**: 23개 문항 기반 건강 스타일 분석
- ✅ **칼로리 계산기**: BMR, TDEE, 목표 칼로리 계산
- ✅ **급여 계산기**: 실수령액 및 공제액 상세 계산
- ✅ **북마크 기능**: 플로팅 버튼으로 즐겨찾기 관리
- ✅ **DatePicker 컴포넌트**: react-day-picker 기반 모던한 캘린더 UI
- ✅ **SEO 강화**: 구조화된 데이터, sitemap.xml, robots.txt 추가

### UI/UX 개선
- 카드형 선택지로 변경 (기대수명 계산기)
- DatePicker 네비게이션 화살표 위치 조정
- 반응형 디자인 개선

---

**Made with ❤️ by zucca100**

