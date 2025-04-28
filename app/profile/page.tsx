export const dynamic = "force-static";

export default function ProfilePage() {
  return (
    <div className="p-6 max-w-3xl w-full mx-auto space-y-10">
      <section>
        <h1 className="text-3xl font-bold mb-4">Introduction</h1>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">🛠️ Skill</h2>
        <p className="text-sm">
          Python, GitHub, React, Node.js, Spring Boot, React Native, Nuxt.js,
          TypeScript, AWS, Terraform, Jenkins, Github Action, Next.js
        </p>
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
              <li>배포 자동화 및 비용 절감 경험 有</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">
              비케이위너㈜ (2021.12 ~ 2023.07)
            </h3>
            <p className="font-semibold">풀스택 · R&D/연구원 1년차</p>
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
          <li>AWS Solutions Architect Associate (2024.08)</li>
          <li>Terraform Associate (2025.01)</li>
        </ul>
      </section>
    </div>
  );
}
