###  백엔드 레포 주소 : https://github.com/One-Kakao-Onboarding/2-hyodo-report

<div align="center">

# 🌟 효도시그널 (Hyo-do Signal)

### 부모님의 진심을 데이터로 읽고, 기술로 잇는 패밀리 라이프 인텔리전스

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

> **"부모님의 '괜찮다'는 거짓말 속 진심을 읽는 기술"**

부모님의 "난 괜찮다"는 말 뒤에 숨겨진 건강 이상과 외로움, 이제 AI가 먼저 찾아냅니다.

</div>

---

## 📖 프로젝트 소개

**효도시그널**은 부모님께 새로운 앱이나 기기 학습을 강요하지 않습니다. 평소처럼 사용하시는 **카카오톡 대화 속에서 AI가 건강 징후와 감정 변화를 정밀 분석**하여 자녀에게 꼭 필요한 효도 가이드를 전달합니다.

### 🎯 핵심 가치

- **비침습적(Non-invasive) 방식**: 부모님의 추가 노력이 전혀 필요 없는 제로 허들 서비스
- **맥락 데이터 자산화**: 카카오톡에 쌓여있는 방대한 대화 맥락을 활용한 즉시 인사이트 도출
- **초개인화**: 우리 부모님만의 독특한 말투, 이모티콘 패턴, 가족 고유의 맥락을 학습한 전용 페르소나 구축

감시가 아닌 **'소중한 일상의 기록'**으로, 바쁜 일상 속에서도 부모님의 진심을 놓치지 않고 챙길 수 있는 가장 따뜻한 데이터 기술입니다.

---

## 🚀 주요 기능

### 1. 🏥 건강 시그널 (Health Watch)

- **분석 로직**: NLP 기술을 통해 두통, 요통, 무릎, 소화불량 등 신체 증상 관련 키워드의 발현 빈도와 강도 측정
- **제공 가치**: "병원 가야겠다", "약 먹어야겠다"와 같은 의도 분석을 병행하여 전문 의료기관 방문 권유 알림 발송

### 2. 💚 감정 상태 분석 (Sentiment Cloud)

- **분석 로직**: 긍정/부정 단어 비율, 답장 속도 변화, 이모티콘 종류 변화를 시계열로 분석
- **제공 가치**: 부모님의 외로움 수치나 우울감 지수를 시각화하여 정서적 지지가 필요한 타이밍 알림

### 3. 🎁 위시리스트 및 니즈 추출 (Needs Hunter)

- **분석 로직**: 대화 내용 중 "가지고 싶다", "낡았다", "좋다" 등 선호 관련 형용사와 객체 추출
- **제공 가치**: 부모님의 실질적인 필요를 기반으로 한 카카오 선물하기 연동형 추천 리스트 제공

### 4. 💬 대화 치트키 가이드 (Conversation Kit)

- **분석 로직**: 부모님이 최근 공유한 사진 속 객체나 반복적으로 언급한 관심사 키워드 추출
- **제공 가치**: 통화 시 어색함을 없애고 풍성한 대화를 이어갈 수 있는 맞춤형 대화 스크립트와 질문 리스트 제공

### 5. ✨ 별빛모드 (Memorial Mode)

- **분석 로직**: 부모님의 고유한 말투, 이모티콘 사용 패턴, 음성 데이터를 통합 학습한 디지털 페르소나 구축
- **제공 가치**: 부모님 유고 시 자녀가 건강하게 추모하고 그리움을 달랠 수 있는 디지털 레거시 공간 제공

---

## 🛠️ 기술 스택

### Frontend
- **Framework**: Next.js 16.0 (App Router)
- **Language**: TypeScript 5.0
- **UI Library**: React 19.2
- **Styling**: Tailwind CSS 4.1, shadcn/ui
- **State Management**: React Hooks
- **Form**: React Hook Form + Zod
- **Charts**: Recharts
- **Theme**: next-themes (다크모드 지원)

### UI Components
- **Design System**: Radix UI
- **Icons**: Lucide React
- **Animations**: Tailwind CSS Animate
- **Toast**: Sonner

### Tools & Utilities
- **Date**: date-fns
- **Carousel**: Embla Carousel
- **Analytics**: Vercel Analytics

---

## 🏃‍♂️ 시작하기

### 필수 요구사항

- Node.js 18.0 이상
- npm 또는 yarn, pnpm

### 설치 및 실행

```bash
# 1. 저장소 클론
git clone https://github.com/your-username/hyodo-signal.git
cd hyodo-signal

# 2. 의존성 설치
npm install
# 또는
yarn install
# 또는
pnpm install

# 3. 환경 변수 설정
cp .env.example .env
# .env 파일을 열어 필요한 API 키를 설정하세요

# 4. 개발 서버 실행
npm run dev
# 또는
yarn dev
# 또는
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start
```

---

## 📁 프로젝트 구조

```
hyodo-signal/
├── app/                    # Next.js App Router
│   ├── auth/              # 인증 관련 페이지
│   ├── layout.tsx         # 루트 레이아웃
│   └── page.tsx           # 메인 페이지
├── components/            # React 컴포넌트
│   └── ui/               # shadcn/ui 컴포넌트
├── hooks/                # Custom React Hooks
├── lib/                  # 유틸리티 함수
├── types/                # TypeScript 타입 정의
├── public/               # 정적 파일
└── styles/               # 전역 스타일
```

---

## 🎨 주요 화면

### 대시보드
부모님의 건강 상태, 감정 지수, 최근 대화 인사이트를 한눈에 확인할 수 있습니다.

### AI 효도 리포트
주간/월간 단위로 AI가 분석한 부모님의 상태 변화와 효도 액션 가이드를 제공합니다.

### 별빛모드
부모님의 소중한 기억과 대화를 영원히 간직할 수 있는 특별한 공간입니다.

---

## 🎯 기대 효과

### 자녀
- 막연한 불안감에서 해방
- 데이터 기반의 효율적이고 따뜻한 효도 실천

### 부모님
- 디지털 소외 없이 자녀와 더 깊게 소통
- 고립감 해소 및 안전망 확보

### 사회
- 민간 차원의 시니어 데이터 세이프티 넷 구축
- 고령화 문제의 혁신적 해결 모델 제시

---

## 📊 MVP 성능 목표 및 KPI

### 모델 성능 목표
- **시그널 추출 정확도**: 85% 이상 (Precision/Recall)
- **오경보율**: 5% 미만
- **실시간성**: 데이터 수집 후 리포트 생성까지 1시간 이내

### 비즈니스 성공 지표
- **효도 액션 전환율**: 40% 이상
- **정서적 개선 지수 (NPS)**: 75% 이상
- **장기 리텐션**: 3개월 이상 구독 유지율 60% 이상

---

## 🔒 프라이버시 및 보안

효도시그널은 사용자의 프라이버시를 최우선으로 생각합니다.

### 보안 원칙
- **이중 동의 시스템**: 부모님과 자녀 모두의 명시적 동의 필수
- **비식별화 처리**: 이름, 주소, 계좌번호 등 민감 정보 즉시 마스킹
- **데이터 파기**: 분석 완료 후 원본 텍스트 7일 이내 삭제
- **단방향 리포트**: 자녀는 대화 전문을 볼 수 없고, 가공된 요약 리포트만 열람 가능
- **부모님 제어권**: 특정 키워드 제외 설정 및 데이터 수집 중단 기능 제공

---

## 🏆 카카오 AI 핵심 테마

### 선한 영향력 (Social Impact)
독거노인 가족과의 소통을 위한 사회적 안전망 구축

### 자동화 (Automation)
수만 줄의 대화를 일일이 읽지 않아도 AI가 핵심 인사이트와 선제적 대응 가이드 자동 추출

### 초개인화 (Hyper-personalization)
우리 부모님만의 독특한 말투, 이모티콘 사용 패턴, 가족 고유의 맥락을 학습한 전용 페르소나 구축

---

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

---

## 👥 팀

효도시그널은 가족 간의 연결을 기술로 더욱 깊고 따뜻하게 만들고자 하는 팀입니다.

---

## 📞 문의

프로젝트에 대한 문의사항이나 제안이 있으시면 언제든지 연락 주세요.

- **Email**: contact@hyodo-signal.com
- **GitHub Issues**: [이슈 제기하기](https://github.com/your-username/hyodo-signal/issues)

---

<div align="center">

**효도시그널과 함께 부모님의 진심을 읽어보세요** 💝

Made with ❤️ by Hyodo Signal Team

</div>