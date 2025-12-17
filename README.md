# Calculator Tools Monorepo

다양한 계산기 및 유틸리티 도구를 제공하는 모노레포 프로젝트입니다.

## 프로젝트 구조

```
.
├── apps/              # 각 계산기 앱들
│   ├── calc-main      # 메인 통합 앱 (calc.zucca100.com)
│   ├── bmi-calculator # 독립 앱 (선택사항)
│   ├── age-calculator # 독립 앱 (선택사항)
│   └── ...
├── packages/          # 공통 패키지
│   ├── ui            # 공통 UI 컴포넌트
│   ├── utils         # 공통 유틸리티
│   └── seo           # SEO 관련 유틸리티
└── package.json
```

## 메인 앱: calc-main

**하위 도메인**: `calc.zucca100.com`

모든 계산기를 하나의 앱에서 통합 관리합니다.

### URL 구조

- 메인 페이지: `https://calc.zucca100.com/`
- BMI 계산기: `https://calc.zucca100.com/bmi`
- 만나이 계산기: `https://calc.zucca100.com/age`
- 기대수명 계산기: `https://calc.zucca100.com/expect_age`
- D-Day 계산기: `https://calc.zucca100.com/dday`
- 칼로리 계산기: `https://calc.zucca100.com/calorie`
- 급여 계산기: `https://calc.zucca100.com/salary`
- 퍼센트 계산기: `https://calc.zucca100.com/percentage`
- 단위 변환기: `https://calc.zucca100.com/unit`
- 이자 계산기: `https://calc.zucca100.com/interest`
- 대출 계산기: `https://calc.zucca100.com/loan`
- 색상 코드 변환기: `https://calc.zucca100.com/color`
- QR 코드 생성기: `https://calc.zucca100.com/qr`
- 비밀번호 생성기: `https://calc.zucca100.com/password`
- 텍스트 카운터: `https://calc.zucca100.com/text`
- 환율 계산기: `https://calc.zucca100.com/currency`

## 기술 스택

- **Framework**: Next.js 15+
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Package Manager**: pnpm
- **Monorepo**: Turborepo
- **Deployment**: Vercel

## 시작하기

### 설치

```bash
pnpm install
```

### 개발 서버 실행

```bash
pnpm dev
```

### 빌드

```bash
pnpm build
```

## 앱 목록

### 메인 통합 앱

**calc-main** (포트 3000) - **권장 배포 방식**
- **하위 도메인**: `calc.zucca100.com`
- 모든 계산기를 하나의 앱에서 통합 관리
- 메인 페이지에서 모든 계산기 목록 제공
- 각 계산기는 하위 경로로 접근 가능

### 독립 앱 (선택사항)

각 계산기를 독립적인 앱으로도 배포할 수 있습니다:

1. **BMI 계산기** (`bmi-calculator`) - 포트 3001
2. **만나이 계산기** (`age-calculator`) - 포트 3002
3. **D-Day 계산기** (`dday-calculator`) - 포트 3003
4. **퍼센트 계산기** (`percentage-calculator`) - 포트 3004
5. **단위 변환기** (`unit-converter`) - 포트 3005
6. **이자 계산기** (`interest-calculator`) - 포트 3006
7. **대출 계산기** (`loan-calculator`) - 포트 3007
8. **색상 코드 변환기** (`color-converter`) - 포트 3008
9. **QR 코드 생성기** (`qr-generator`) - 포트 3009
10. **비밀번호 생성기** (`password-generator`) - 포트 3010
11. **텍스트 카운터** (`text-counter`) - 포트 3011
12. **환율 계산기** (`currency-converter`) - 포트 3012

## 배포

### 메인 앱 배포 (권장)

**calc-main** 앱을 Vercel에 배포하고 하위 도메인을 설정합니다:

- **메인 도메인**: `calc.zucca100.com`
- **하위 경로**:
  - `calc.zucca100.com/` - 메인 페이지 (모든 계산기 목록)
  - `calc.zucca100.com/bmi` - BMI 계산기
  - `calc.zucca100.com/age` - 만나이 계산기
  - `calc.zucca100.com/expect_age` - 기대수명 계산기
  - `calc.zucca100.com/dday` - D-Day 계산기
  - `calc.zucca100.com/calorie` - 칼로리 계산기
  - `calc.zucca100.com/salary` - 급여 계산기
  - `calc.zucca100.com/percentage` - 퍼센트 계산기
  - `calc.zucca100.com/unit` - 단위 변환기
  - `calc.zucca100.com/interest` - 이자 계산기
  - `calc.zucca100.com/loan` - 대출 계산기
  - `calc.zucca100.com/color` - 색상 코드 변환기
  - `calc.zucca100.com/qr` - QR 코드 생성기
  - `calc.zucca100.com/password` - 비밀번호 생성기
  - `calc.zucca100.com/text` - 텍스트 카운터
  - `calc.zucca100.com/currency` - 환율 계산기

### 독립 앱 배포 (선택사항)

각 앱을 개별 서브도메인으로 배포할 수도 있습니다:
- `bmi.zucca100.com`
- `age.zucca100.com`
- `dday.zucca100.com`
- 등등...

## 개발 가이드

### 메인 앱 실행 (권장)

```bash
# 메인 통합 앱 실행
cd apps/calc-main
pnpm dev
# 또는 루트에서
pnpm --filter calc-main dev
```

메인 앱은 `http://localhost:3000`에서 실행됩니다.

### 개별 독립 앱 실행

```bash
# 특정 앱만 실행
cd apps/bmi-calculator
pnpm dev
# 또는 루트에서
pnpm --filter bmi-calculator dev
```

### 전체 빌드

```bash
# 모든 앱 빌드
pnpm build
```

### 특정 앱만 빌드

```bash
# 메인 앱만 빌드
pnpm --filter calc-main build

# 특정 독립 앱만 빌드
pnpm --filter bmi-calculator build
```

## SEO 최적화

각 페이지는 독립적인 SEO 설정을 가지고 있으며, `@cal/seo` 패키지를 통해 메타데이터를 생성합니다.

### 메인 앱 SEO 구조

- 메인 페이지 (`/`): 전체 계산기 도구 모음에 대한 SEO
- 각 계산기 페이지 (`/bmi`, `/age` 등): 개별 계산기에 대한 독립적인 SEO
- 각 페이지는 고유한 메타 태그, Open Graph, Twitter Card를 가집니다
- 구조화된 데이터 (Schema.org): WebPage, FAQPage, SoftwareApplication, BreadcrumbList
- Sitemap.xml 자동 생성 (`/sitemap.xml`)
- Robots.txt 설정 (`/robots.txt`)

### 독립 앱 SEO

각 독립 앱도 자체 SEO 설정을 가지고 있어 개별 배포 시에도 최적화된 SEO를 제공합니다.

## 주요 기능

- ✅ 15가지 다양한 계산기 및 유틸리티 도구
- ✅ 통합 관리 가능한 메인 앱
- ✅ 다국어 지원 (한국어/영어)
- ✅ 반응형 디자인 (모바일/태블릿/데스크톱)
- ✅ 실시간 환율 API 연동
- ✅ 입력 검증 및 에러 처리
- ✅ SEO 최적화 (구조화된 데이터, sitemap, robots.txt)
- ✅ 북마크 기능 (로컬 스토리지 기반)
- ✅ 모던한 DatePicker 컴포넌트 (react-day-picker)
- ✅ 공통 UI 컴포넌트 재사용
- ✅ 타입 안전성 (TypeScript)
