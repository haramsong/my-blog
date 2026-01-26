import Image from "next/image";
import Link from "next/link";

import GithubIcon from "@/public/icons/github.svg";
import FacebookIcon from "@/public/icons/facebook.svg";
import InstagramIcon from "@/public/icons/instagram.svg";
import LinkedinIcon from "@/public/icons/linkedin.svg";
import UserIcon from "@/public/icons/user.svg";
import { getWebpSrc } from "@/lib/getWebpSrc";

export default function ProfileSection() {
  return (
    <section
      aria-labelledby="profile-heading"
      className="flex flex-col items-center gap-2 py-6"
    >
      <h2 id="profile-heading" className="sr-only">
        프로필
      </h2>
      <div className="w-25 h-25 relative">
        <Image
          src={getWebpSrc("/images/profile.jpg")}
          alt="Frontend 개발자 송하람 프로필 사진"
          width={100}
          height={100}
          className="rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
        />
      </div>
      <h3 className="text-5xl leading-9 font-[Champignon]">@h0tr4m</h3>
      <div className="flex gap-5 mt-1 text-gray-600 dark:text-gray-300">
        <a
          href="https://github.com/haramsong/haramsong"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 duration-150 hover:text-black dark:hover:text-white transition"
          aria-label="내 Github 프로필 방문"
        >
          <GithubIcon className="w-4.5 h-4.5" aria-hidden="true" />
        </a>
        <a
          href="https://www.facebook.com/profile.php?id=100003373457651"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 duration-150 hover:text-blue-500 transition"
          aria-label="내 Facebook 프로필 방문"
        >
          <FacebookIcon className="w-4.5 h-4.5" aria-hidden="true" />
        </a>
        <a
          href="https://www.instagram.com/s0ngh0tr4m?igsh=M2oxdjlqNm54dmx4&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 duration-150 hover:text-pink-500 transition"
          aria-label="내 Instagram 프로필 방문"
        >
          <InstagramIcon className="w-4.5 h-4.5" aria-hidden="true" />
        </a>
        <a
          href="https://linkedin.com/in/haramsong"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 duration-150 hover:text-blue-600 transition"
          aria-label="내 LinkedIn 프로필 방문"
        >
          <LinkedinIcon className="w-4.5 h-4.5" aria-hidden="true" />
        </a>
        <Link
          href="/profile/"
          className="hover:scale-110 duration-150 hover:text-gray-500 dark:hover:text-gray-300 transition"
          aria-label="내 프로필 페이지로 이동"
        >
          <UserIcon className="w-4.5 h-4.5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
