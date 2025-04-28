import Image from "next/image";
import Link from "next/link";
import {
  FaGithub,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaUser,
} from "react-icons/fa6";

export default function ProfileSection() {
  return (
    <div className="flex flex-col items-center gap-2 py-6">
      <div className="w-25 h-25 relative">
        <Image
          src="/images/profile.jpg"
          alt="Profile"
          width={100}
          height={100}
          className="rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
        />
      </div>
      <p className="text-5xl leading-9 font-[Champignon]">@h0tr4m</p>
      <div className="flex gap-5 mt-1 text-gray-600 dark:text-gray-300">
        <a
          href="https://github.com/haramsong/haramsong"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 duration-150 hover:text-black dark:hover:text-white transition"
          aria-label="Visit my Github profile"
        >
          <FaGithub size={18} />
        </a>
        <a
          href="https://www.facebook.com/profile.php?id=100003373457651"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 duration-150 hover:text-blue-500 transition"
          aria-label="Visit my Facebook profile"
        >
          <FaFacebook size={18} />
        </a>
        <a
          href="https://www.instagram.com/s0ngh0tr4m?igsh=M2oxdjlqNm54dmx4&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 duration-150 hover:text-pink-500 transition"
          aria-label="Visit my Instagram profile"
        >
          <FaInstagram size={18} />
        </a>
        <a
          href="https://linkedin.com/in/haramsong"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 duration-150 hover:text-blue-600 transition"
          aria-label="Visit my LinkedIn profile"
        >
          <FaLinkedin size={18} />
        </a>
        <Link
          href="/profile"
          className="hover:scale-110 duration-150 hover:text-gray-500 dark:hover:text-gray-300 transition"
          aria-label="Visit my profile page"
        >
          <FaUser size={18} />
        </Link>
      </div>
    </div>
  );
}
