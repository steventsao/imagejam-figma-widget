import Image from "next/image";
import Link from "next/link";
import MyDropzone from "@/components/MyDropzone";
import {
  createServerComponentClient,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// https://supabase.com/dashboard/project/tkbhdbhsnikrpsutyyxk/settings/api?
export default async function Home() {
  const supabase = createClientComponentClient();
  let { data, error } = await supabase.from("swing-public").select("image_url");

  // @ts-ignore
  const swings = data["swing-public"];
  console.log(swings);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MyDropzone />
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            bogeybot
          </a>
        </div>
      </div>
    </main>
  );
}
