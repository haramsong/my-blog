# 📝 개인 블로그 프로젝트

Next.js 기반의 마크다운 블로그입니다.  
MDX 없이 순수 Markdown 파일과 `remark` / `rehype` 파이프라인을 이용해 정적 콘텐츠를 렌더링합니다.

**[개인블로그 링크](https://blog.hrsong.com/)**

## ✨ 주요 기능

- 정적 마크다운 파일 기반 포스트 렌더링
- 코드 하이라이팅 (`shiki`, `rehype-pretty-code`)
- 슬러그 자동 생성 (`slugify`, `github-slugger`)
- 태그 기반 탐색
- 포스트별 읽는 시간 계산 (`reading-time`)
- 커스텀 remark/rehype 디렉티브 사용
- 라이트/다크 테마 지원
- 상태 관리: `zustand`
- 스타일: TailwindCSS v4 + typography plugin

## 🔧 기술 스택

| 영역            | 사용 라이브러리                          |
| --------------- | ---------------------------------------- |
| 프레임워크      | Next.js (App Router)                     |
| 마크다운 파싱   | remark, rehype, unified, gray-matter     |
| 코드 하이라이팅 | shiki, rehype-pretty-code                |
| 상태 관리       | zustand                                  |
| 스타일          | Tailwind CSS v4, @tailwindcss/typography |
| 유틸            | reading-time, slugify, github-slugger 등 |

## 📂 폴더 구조 예시

```bash
my-blog/
├── app/               # Next.js App Router 기반 구조
├── posts/             # Markdown 파일 위치
│   ├── dev/
│   │   └── frontend/
│   │       └── hello.md
├── components/        # 공통 UI 컴포넌트
├── plugin/            # remark/rehype 처리 함수 등 유틸
├── public/            # 공개 정적 리소스
├── store/             # 전역 상태 관리
└── ...
```

## ▶️ 실행 방법

```bash
git clone https://github.com/haramsong/my-blog.git
cd my-blog

# 패키지 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

## 📄 마크다운 포스트 예시

`/posts/[section]/[category]/slug.md` 형태로 파일을 만들고 다음과 같이 작성합니다:

```md
---
title: "마크다운 포스트 예시"
summary: "이건 샘플 포스트입니다."
date: "2025-06-27"
tags: ["Next.js", "블로그"]
---

## 본문

여기서부터 본문입니다.
```

## ⚙️ 자동 배포 구성 (GitHub Actions)

이 프로젝트는 `main` 브랜치에 PR이 머지되면 자동으로 정적 사이트를 S3에 업로드하고, CloudFront 캐시를 무효화합니다.

### 📄 배포 자동화 워크플로우 요약

- 정적 빌드: `pnpm build` (`output: 'export'`)
- `.env.production` 파일은 AWS SSM Parameter Store에서 불러옵니다.
- 빌드 결과물(`out/`)을 S3로 업로드합니다.
- CloudFront 배포의 캐시를 무효화하여 최신 콘텐츠 반영됩니다.

### 🔐 GitHub Secrets 설정 필요

| Key                          | 설명                                         |
| ---------------------------- | -------------------------------------------- |
| `AWS_ACCESS_KEY_ID`          | IAM 사용자 액세스 키                         |
| `AWS_SECRET_ACCESS_KEY`      | IAM 사용자 시크릿 키                         |
| `AWS_REGION`                 | 예: `ap-northeast-2`                         |
| `AWS_S3_BUCKET`              | 배포 대상 S3 버킷 이름                       |
| `CLOUDFRONT_DISTRIBUTION_ID` | CloudFront 배포 ID                           |
| `PARAMETER_STORE_NAME`       | `.env.production`이 저장된 SSM 파라미터 이름 |

---

### 📦 `.env.production` 예시

SSM에 등록되는 `.env.production` 예시 포맷은 다음과 같습니다:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

> GitHub Actions에서는 위 내용을 aws ssm get-parameter 명령어로 가져와 .env.production 파일로 저장합니다.

### ✅ 결과

- 변경 사항이 main 브랜치에 반영되면 자동으로 배포됩니다.
- 브라우저 캐시에 남은 이전 콘텐츠는 CloudFront 무효화로 실시간 갱신됩니다.

## 🏗 인프라 구성 (S3 + CloudFront + Route 53)

이 프로젝트는 정적 파일을 효율적으로 제공하기 위해 다음과 같은 AWS 인프라로 구성되어 있습니다.

👉 [인프라 구성 Repository](https://github.com/haramsong/my-blog-infra)

### 1. 🪣 S3 – 정적 웹 호스팅

- **용도**: `next export` 결과물(`/out` 폴더)을 저장하는 정적 파일 저장소
- **설정 방법**:
  - 퍼블릭 액세스 차단
  - CloudFront Origin Access Control(OAC) 설정
- **배포 시**:
  ```bash
  aws s3 sync ./out s3://<your-bucket-name> --delete
  ```

### 2. 🌐 CloudFront – CDN 캐싱 및 TLS

- **용도**: 전 세계 사용자에게 정적 콘텐츠를 빠르게 전달하는 CDN
- **설정 방법**:
  - S3를 오리진으로 지정
  - 기본 경로를 `index.html`로 설정
  - Error code가 403일 때 `/404.html` 반환
  - OAC 또는 S3 버킷 정책을 통해 접근 제어
  - Cloudfront functions 추가 필요
- **Cloudfront functions** 설정

```javascript
var regexExpr = /^\/.+(\.\w+$)/;

function handler(event) {
  var request = event.request;
  var olduri = request.uri;

  if (!regexExpr.test(olduri)) {
    request.uri = olduri.replace(/\/?$/, "/") + "index.html";
    console.log(
      "Request for [" + olduri + "] rewritten to [" + request.uri + "]"
    );
  }

  return request;
}
```

- **무효화 명령어** (GitHub Actions에서 사용):

```bash
aws cloudfront create-invalidation \
  --distribution-id <DIST_ID> \
  --paths "/*"
```

### 3. 🛰 Route 53 – 사용자 도메인 연결

- **용도**: 사용자 지정 도메인 (예: blog.example.com) → CloudFront로 라우팅
- **설정 방법**:
  - 도메인 구매 또는 이전 후, 호스팅 존 생성
  - A 레코드 (Alias)로 CloudFront 배포 도메인 연결
  - SSL 인증서는 AWS Certificate Manager(ACM)를 통해 발급 (us-east-1 리전 필요)

### ✅ 전체 흐름

```
사용자 브라우저
        ↓
    Route 53
        ↓
   CloudFront (CDN + TLS)
        ↓
      S3 (정적 호스팅)
```

## 💡 참고 자료

- [remark 공식 문서](https://remark.js.org/)
- [rehype-pretty-code 사용법](https://rehype-pretty-code.netlify.app/)
- [shiki](https://shiki.style/)
- [Next.js App Router Docs](https://nextjs.org/docs/app)
