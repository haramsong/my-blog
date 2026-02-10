import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center w-full h-full justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        페이지를 찾을 수 없어여
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        요청하신 페이지가 존재하지 않거나 이동되었어요.
      </p>
      <Link
        href="/"
        aria-label="홈으로 이동"
        className="px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600 transition"
      >
        홈으로 돌아가기
      </Link>
    </section>
  );
}
