import Link from "next/link";
import SideMenu from "@/components/layout/SideMenu";

export default async function Home() {
  return (
    <>
      <Link href="/login">login</Link>
    </>
  );
}
