import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
};

export default function Page() {
  return (
    <>
      <h1>Next.js + In App Router PWA = AWESOME!</h1>
      <Link href="/about">About page</Link>
      <Link href="/scan">Scan page</Link>
    </>
  );
}
