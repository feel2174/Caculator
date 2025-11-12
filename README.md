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
- D-Day 계산기: `https://calc.zucca100.com/dday`
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

각 앱은 독립적인 Next.js 애플리케이션으로 구성되어 있으며, 서브도메인으로 배포됩니다:

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

각 앱은 Vercel을 통해 서브도메인으로 배포됩니다:
- `bmi.yourdomain.com`
- `age.yourdomain.com`
- `dday.yourdomain.com`
- `percentage.yourdomain.com`
- `unit.yourdomain.com`
- `interest.yourdomain.com`
- `loan.yourdomain.com`
- `color.yourdomain.com`
- `qr.yourdomain.com`
- `password.yourdomain.com`
- `text.yourdomain.com`
- `currency.yourdomain.com`

## 개발 가이드

### 개별 앱 실행

```bash
# 특정 앱만 실행
cd apps/bmi-calculator
pnpm dev
```

### 전체 빌드

```bash
# 모든 앱 빌드
pnpm build
```

## SEO 최적화

각 앱은 독립적인 SEO 설정을 가지고 있으며, `@cal/seo` 패키지를 통해 메타데이터를 생성합니다.

# Caculator
