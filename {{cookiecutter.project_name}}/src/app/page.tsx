import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link, { LinkProps } from 'next/link';
import { getServerSession } from "next-auth/next";


export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
      Welcome
      
    </main>
  )
}
