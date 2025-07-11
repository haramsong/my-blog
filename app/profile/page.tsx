import { Metadata } from "next";
import Image from "next/image";

import { getMetadata } from "@/lib/getMetaData";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata({
    title: "소개",
    description: "안녕하세요! 개발자 송하람입니다.",
    asPath: "/posts/profile",
  });
}

export default function ProfilePage() {
  return (
    <div className="p-6 max-w-3xl w-full mx-auto space-y-10">
      <section>
        <h1 className="text-3xl font-bold mb-4">Introduction</h1>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">🛠️ Skill</h2>
        <ul className="list-disc text-md pl-6 mt-3 space-y-3">
          <li>
            <strong>🌏 Frontend</strong>
            <ul className="list-disc text-sm pt-2 pl-6 space-y-1">
              <li>React, Nuxt.js 기반 SPA 개발 및 유지보수</li>
              <li>TypeScript 기반 컴포넌트 아키텍처 설계 및 리팩토링</li>
              <li>React Native로 모바일 앱 개발 경험</li>
              <li>Python(PyQT5)으로 설치형 애플리케이션 개발 경험</li>
            </ul>
          </li>
          <li>
            <strong>🖥 Backend</strong>
            <ul className="list-disc text-sm pt-2 pl-6 space-y-1">
              <li>Spring Boot 기반 API 서버 개발 및 유지보수</li>
              <li>RESTful API 설계 및 DB 연동 구현</li>
            </ul>
          </li>
          <li>
            <strong>🧰 DevOps & Infra</strong>
            <ul className="list-disc text-sm pt-2 pl-6 space-y-1">
              <li>Jenkins 및 GitHub Actions를 활용한 CI/CD 파이프라인 구축</li>
              <li>Terraform으로 AWS 인프라 코드 관리 (IaC)</li>
              <li>배포 자동화 및 비용 최적화 경험 有</li>
            </ul>
          </li>
          <li>
            <strong>☁️ Cloud 및 기타</strong>
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
        <h2 className="text-2xl font-semibold mb-2">🏢 Career</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-2">
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
            <h3 className="text-xl font-bold mb-2">
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
        <h2 className="text-2xl font-semibold mb-4">🎓 Education</h2>
        <p className="text-sm">부산대학교 수학과 (2015.03 ~ 2022.02 졸업)</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">📚 Project</h2>
        <ul className="list-disc text-sm pl-6 mt-3 space-y-1">
          <li>
            교수용 수업 할당 프로그램 개발 (Python) -{" "}
            <a
              className="text-blue-500 underline"
              href="https://github.com/haramsong/classschedule"
              target="_blank"
            >
              GitHub
            </a>
          </li>
          <li>
            유동인구 분석 알고리즘 개발 (Python) -{" "}
            <a
              className="text-blue-500 underline"
              href="https://github.com/haramsong/danviproject"
              target="_blank"
            >
              GitHub
            </a>
          </li>
          <li>
            학원 관리 프로그램 개발 (Python) -{" "}
            <a
              className="text-blue-500 underline"
              href="https://github.com/haramsong/hakwonmgmt"
              target="_blank"
            >
              GitHub
            </a>
          </li>
          <li>
            회원 관리 프로그램 개발 (PHP/Python) -{" "}
            <a
              className="text-blue-500 underline"
              href="https://github.com/haramsong/membermgmt"
              target="_blank"
            >
              GitHub
            </a>
          </li>
          <li>
            아파트 관리 프로그램 개발 (PHP) -{" "}
            <a
              className="text-blue-500 underline"
              href="https://github.com/haramsong/apartment"
              target="_blank"
            >
              GitHub
            </a>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">🏆 Certificates</h2>
        <ul className="list-disc text-sm pl-6 mt-3 space-y-1">
          <li>SQL개발자(SQLD) (2023.04)</li>
          <li>AWS Cloud Practitioner (2023.12)</li>
          <li>AWS Solutions Architect - Associate (2024.08)</li>
          <li>Terraform Associate (2025.01)</li>
          <li>AWS Solutions Architect - Professional (2025.07)</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">🏅 My badges</h2>
        <div className="flex space-x-1">
          <a
            href="https://www.credly.com/badges/f1a3d9b6-e5d8-46da-ad05-85711fc94d30"
            title="AWS Certified Solutions Architect – Professional"
          >
            <Image
              src="https://images.credly.com/size/80x80/images/2d84e428-9078-49b6-a804-13c15383d0de/image.png"
              alt="AWS Certified Solutions Architect – Professional"
              width="80"
              height="80"
            />
          </a>
          <a
            href="https://www.credly.com/badges/5f432589-4435-436d-8436-d3e3b83984ef"
            title="AWS Certified Solutions Architect – Associate"
          >
            <Image
              src="https://images.credly.com/size/80x80/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png"
              alt="AWS Certified Solutions Architect – Associate"
              width="80"
              height="80"
            />
          </a>
          <a
            href="https://www.credly.com/badges/1fa00a4e-e067-40a7-a0ae-400ff37cbc26"
            title="AWS Certified Cloud Practitioner"
          >
            <Image
              src="https://images.credly.com/size/80x80/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png"
              alt="AWS Certified Cloud Practitioner"
              width="80"
              height="80"
            />
          </a>
          <a
            href="https://www.credly.com/badges/41367965-e2ed-4166-bfb2-b413bcc8dcc8"
            title="AWS Knowledge: Architecting (Retired)"
          >
            <Image
              src="https://images.credly.com/size/80x80/images/519a6dba-f145-4c1a-85a2-1d173d6898d9/image.png"
              alt="AWS Knowledge: Architecting (Retired)"
              width="80"
              height="80"
            />
          </a>
          <a
            href="https://www.credly.com/badges/e2705e8b-1657-40bc-9e7d-d7d5c175eb5b"
            title="HashiCorp Certified: Terraform Associate (003)"
          >
            <Image
              src="https://images.credly.com/size/80x80/images/ed4be915-68f8-428a-b332-40ded9084ee5/blob"
              alt="HashiCorp Certified: Terraform Associate (003)"
              width="80"
              height="80"
            />
          </a>
        </div>
      </section>
    </div>
  );
}
