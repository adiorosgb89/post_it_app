"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function LogOut({ image }: { image: string }) {
  return (
    <li className="flex gap-8 items-center">
      <button
        className="text-sm bg-gray-700 text-white py-2 px-6 rounded-xl"
        onClick={() => signOut()}
      >
        Sign out
      </button>
      <Link href="/dashboard">
        <Image
          width={64}
          height={64}
          src={image}
          alt="User Pic"
          className="w-14 rounded-full"
          priority
        />
      </Link>
    </li>
  );
}
