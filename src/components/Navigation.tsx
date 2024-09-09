"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex justify-between items-center py-4">
      <Link href="/" className="text-xl font-semibold text-purple-600 hover:text-purple-800 transition-colors">
        A Tribute to my Genevieve
      </Link>
      <div className="space-x-4">
        <NavLink href="/" active={pathname === "/"}>Home</NavLink>
        <NavLink href="/gallery" active={pathname === "/gallery"}>Gallery</NavLink>
      </div>
    </nav>
  );
}

function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active: boolean }) {
  return (
    <Link
      href={href}
      className={`text-lg font-medium transition-colors ${
        active
          ? "text-purple-600 hover:text-purple-800"
          : "text-gray-600 hover:text-purple-600"
      }`}
    >
      {children}
    </Link>
  );
}