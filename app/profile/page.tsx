import { Metadata } from "next";
import Image from "next/image";

import HydrateHeader from "@/components/HydrateHeader";
import { getMetadata } from "@/lib/getMetaData";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata({
    title: "소개",
    description: "안녕하세요! 비전공자 프론트엔드 개발자 송하람입니다.",
    asPath: "/posts/profile",
  });
}

export default function ProfilePage() {
  return (
    <div className="p-6 max-w-4xl w-full mx-auto space-y-10">
      <HydrateHeader title="소개" />
      <section>
        <h1 className="text-3xl font-bold mb-4">소개</h1>
        <p className="text-md mb-1">
          안녕하세요! Frontend 개발자 송하람입니다.
        </p>
        <p className="text-md mb-1">
          웹, 모바일 페이지 제작 및 DevOps, 클라우드에 관심이 많고 계속해서
          배워가는 중입니다.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">
          <span aria-hidden="true">🛠️</span> 개발 스킬
        </h2>
        <ul className="list-disc text-md pl-6 mt-3 space-y-3">
          <li>
            <strong>
              <span aria-hidden="true">🌏</span> Frontend
            </strong>
            <ul className="list-disc text-sm pt-2 pl-6 space-y-1">
              <li>React, Nuxt.js 기반 SPA 개발 및 유지보수</li>
              <li>TypeScript 기반 컴포넌트 아키텍처 설계 및 리팩토링</li>
              <li>React Native로 모바일 앱 개발 경험</li>
              <li>Python(PyQT5)으로 설치형 애플리케이션 개발 경험</li>
            </ul>
          </li>
          <li>
            <strong>
              <span aria-hidden="true">🖥</span> Backend
            </strong>
            <ul className="list-disc text-sm pt-2 pl-6 space-y-1">
              <li>Spring Boot 기반 API 서버 개발 및 유지보수</li>
              <li>RESTful API 설계 및 DB 연동 구현</li>
            </ul>
          </li>
          <li>
            <strong>
              <span aria-hidden="true">🧰</span> DevOps & Infra
            </strong>
            <ul className="list-disc text-sm pt-2 pl-6 space-y-1">
              <li>Jenkins 및 GitHub Actions를 활용한 CI/CD 파이프라인 구축</li>
              <li>Terraform으로 AWS 인프라 코드 관리 (IaC)</li>
              <li>배포 자동화 및 비용 최적화 경험 有</li>
            </ul>
          </li>
          <li>
            <strong>
              <span aria-hidden="true">☁️</span> Cloud 및 기타
            </strong>
            <ul className="list-disc text-sm pt-2 pl-6 space-y-1">
              <li>
                AWS EC2, S3, Cloudfront, Lambda, CloudWatch 등 서비스 운영 경험
              </li>
              <li>AWS Solutions Architect Professional 자격증 보유</li>
              <li>GitHub를 통한 협업 및 코드 리뷰 문화 경험</li>
            </ul>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">
          <span aria-hidden="true">🏢</span> 경력 및 경험
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">
              이지스엔터프라이즈㈜ (2023.07 ~ 재직중)
            </h3>
            <p className="font-semibold">프론트엔드 · 대리/팀원 4년차</p>
            <ul className="list-disc text-sm pl-6 mt-3 space-y-1">
              <li>Nuxt 3, TypeScript 기반 SPA 개발 및 유지보수</li>
              <li>전자결재, 직원관리 기능 유지보수 및 신규 개발</li>
              <li>Jenkins 배포 파이프라인 및 AWS 인프라 관리</li>
              <li>프론트엔드 인프라 Terraform으로 코드 관리</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">
              비케이위너㈜ (2021.12 ~ 2023.07)
            </h3>
            <p className="font-semibold">풀스택 · R&D/연구원 2년차</p>
            <ul className="list-disc text-sm pl-6 mt-3 space-y-1">
              <li>
                React, React Native, Spring Boot 기반 플랫폼 풀스택 유지보수 및
                개발
              </li>
              <li>E-Book, 전자투표, 입대의 API 개발 및 유지보수</li>
              <li>Gitlab을 통한 형상관리 경험</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">🎓 학력</h2>
        <p className="text-sm mb-1">안양고등학교 (2012.03 ~ 2015.02 졸업)</p>
        <p className="text-sm">부산대학교 수학과 (2015.03 ~ 2022.02 졸업)</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">📚 프로젝트</h2>
        <ul className="list-disc text-sm pl-6 mt-3 space-y-1">
          <li>
            교수용 수업 할당 프로그램 개발 (Python) -{" "}
            <a
              className="text-blue-500 underline"
              href="https://github.com/haramsong/classschedule"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub 저장소
            </a>
          </li>
          <li>
            유동인구 분석 알고리즘 개발 (Python) -{" "}
            <a
              className="text-blue-500 underline"
              href="https://github.com/haramsong/danviproject"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub 저장소
            </a>
          </li>
          <li>
            학원 관리 프로그램 개발 (Python) -{" "}
            <a
              className="text-blue-500 underline"
              href="https://github.com/haramsong/hakwonmgmt"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub 저장소
            </a>
          </li>
          <li>
            회원 관리 프로그램 개발 (PHP/Python) -{" "}
            <a
              className="text-blue-500 underline"
              href="https://github.com/haramsong/membermgmt"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub 저장소
            </a>
          </li>
          <li>
            아파트 관리 프로그램 개발 (PHP) -{" "}
            <a
              className="text-blue-500 underline"
              href="https://github.com/haramsong/apartment"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub 저장소
            </a>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">
          <span aria-hidden="true">🏆</span> 자격증
        </h2>
        <ul className="list-disc text-sm pl-6 mt-3 space-y-1">
          <li>SQL개발자(SQLD) (2023.04)</li>
          <li>AWS Cloud Practitioner (2023.12)</li>
          <li>AWS Solutions Architect - Associate (2024.08)</li>
          <li>Terraform Associate (2025.01)</li>
          <li>AWS Solutions Architect - Professional (2025.07)</li>
          <li>AWS Certified Security - Specialty (2025.07)</li>
          <li>CKAD: Certified Kubernetes Application Developer (2025.12)</li>
          <li>KCNA: Kubernetes and Cloud Native Associate (2026.01)</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">
          <span aria-hidden="true">🏅</span> 내 뱃지
        </h2>
        <div className="flex flex-wrap gap-2">
          <a
            href="https://www.credly.com/badges/81c22b8a-4f4c-4119-843b-03005b71547f/public_url"
            aria-label="KCNA: Kubernetes and Cloud Native Associate"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://images.credly.com/size/80x80/images/f28f1d88-428a-47f6-95b5-7da1dd6c1000/KCNA_badge.png"
              alt=""
              aria-hidden="true"
              width="80"
              height="80"
            />
          </a>
          <a
            href="https://www.credly.com/badges/62b31b41-87cc-4868-871f-30ca7f6b1241/public_url"
            aria-label="CKAD: Certified Kubernetes Application Developer"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://images.credly.com/size/80x80/images/cc8adc83-1dc6-4d57-8e20-22171247e052/blob"
              alt=""
              aria-hidden="true"
              width="80"
              height="80"
            />
          </a>
          <a
            href="https://www.credly.com/badges/0019121e-58ed-44a0-b0f4-0a7d9ef7ddbc/public_url"
            aria-label="AWS Certified Security - Specialty"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://images.credly.com/size/80x80/images/53acdae5-d69f-4dda-b650-d02ed7a50dd7/image.png"
              alt=""
              aria-hidden="true"
              width="80"
              height="80"
            />
          </a>
          <a
            href="https://www.credly.com/badges/f1a3d9b6-e5d8-46da-ad05-85711fc94d30/public_url"
            aria-label="AWS Certified Solutions Architect - Professional"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://images.credly.com/size/80x80/images/2d84e428-9078-49b6-a804-13c15383d0de/image.png"
              alt=""
              aria-hidden="true"
              width="80"
              height="80"
            />
          </a>
          <a
            href="https://www.credly.com/badges/5f432589-4435-436d-8436-d3e3b83984ef/public_url"
            aria-label="AWS Certified Solutions Architect - Associate"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://images.credly.com/size/80x80/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png"
              alt=""
              aria-hidden="true"
              width="80"
              height="80"
            />
          </a>
          <a
            href="https://www.credly.com/badges/1fa00a4e-e067-40a7-a0ae-400ff37cbc26/public_url"
            aria-label="AWS Certified Cloud Practitioner"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://images.credly.com/size/80x80/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png"
              alt=""
              aria-hidden="true"
              width="80"
              height="80"
            />
          </a>
          <a
            href="https://www.credly.com/badges/e2705e8b-1657-40bc-9e7d-d7d5c175eb5b/public_url"
            aria-label="HashiCorp Certified: Terraform Associate (003)"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://images.credly.com/size/80x80/images/0dc62494-dc94-469a-83af-e35309f27356/blob"
              alt=""
              aria-hidden="true"
              width="80"
              height="80"
            />
          </a>
          <a
            href="https://www.credly.com/badges/41367965-e2ed-4166-bfb2-b413bcc8dcc8/public_url"
            aria-label="AWS Knowledge: Architecting (Retired)"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://images.credly.com/size/80x80/images/519a6dba-f145-4c1a-85a2-1d173d6898d9/image.png"
              alt=""
              aria-hidden="true"
              width="80"
              height="80"
            />
          </a>
          <a
            href="https://www.credly.com/badges/148ea57c-c461-4f76-bf25-a9422c92184e/public_url"
            aria-label="AWS Knowledge: Networking Core"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://images.credly.com/size/80x80/images/e1c202b1-bca1-469a-9149-127b4fe891d7/blob"
              alt=""
              aria-hidden="true"
              width="80"
              height="80"
            />
          </a>
          <a
            href="https://www.credly.com/badges/c354d673-2932-4f1f-a0c7-2d5eb68cde70/public_url"
            aria-label="AWS Knowledge: Cloud Essentials"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://images.credly.com/size/80x80/images/7cf036b0-c609-4378-a7be-9969e1dea7ab/blob"
              alt=""
              aria-hidden="true"
              width="80"
              height="80"
            />
          </a>
          <a
            href="https://www.credly.com/badges/60020a0d-558b-4b5b-9913-588b42bb0774/public_url"
            aria-label="AWS Knowledge: Compute - Training Badge"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://images.credly.com/size/80x80/images/c2d44375-6567-495a-b868-d17828c62872/blob"
              alt=""
              aria-hidden="true"
              width="80"
              height="80"
            />
          </a>
          <a
            href="https://www.credly.com/badges/35d1eaf5-f419-4420-a99e-9fe7e9fc3082/public_url"
            aria-label="AWS Knowledge: Security Champion - Training Badge"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://images.credly.com/size/80x80/images/478cdcb9-9b92-4893-9c95-617ad0f28257/blob"
              alt=""
              aria-hidden="true"
              width="80"
              height="80"
            />
          </a>
          <a
            href="https://www.credly.com/badges/8eec8f3c-0699-4bbe-ac21-ffccbb08236d/public_url"
            aria-label="AWS Knowledge: Serverless - Training Badge"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://images.credly.com/size/80x80/images/0c20a5b7-b4e9-4c2f-8b68-342e00a85e05/blob"
              alt=""
              aria-hidden="true"
              width="80"
              height="80"
            />
          </a>
          <a
            href="https://www.credly.com/badges/73e98ef2-51f6-4a8c-a9fa-d6d8d01a7683/public_url"
            aria-label="AWS Knowledge: Amazon Q Developer Fundamentals - Training Badge"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://images.credly.com/size/80x80/images/7c51f63c-14ef-4df9-a340-14938d05963a/blob"
              alt=""
              aria-hidden="true"
              width="80"
              height="80"
            />
          </a>
        </div>
      </section>
    </div>
  );
}
