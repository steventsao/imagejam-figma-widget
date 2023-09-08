import MainSection from "@/components/MainSection";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { sql } from "@vercel/postgres";
type SwingItem = {
  image_url: string;
};

// https://stackoverflow.com/questions/76725399/nextjs-how-to-fix-getserversideprops-is-not-supported-in-app
export const getServerSideProps = async () => {
  // TODO Converge supabase and postgres into one payload
  const supabase = createClientComponentClient();
  const promise = await supabase.from("swing-public").select("image_url");
  const payload =
    await sql`select * from "Swing" inner join "Prediction" on "Prediction"."swingId" = "Swing".id where "Swing"."blobId" is not null and "Prediction"."url" is not null`;
  console.log("stsao payload:", payload);
  return {
    props: {
      swingImages: promise.data || [],
    },
  };
};
// https://supabase.com/dashboard/project/tkbhdbhsnikrpsutyyxk/settings/api?
export default function Home({ swingImages }: { swingImages: SwingItem[] }) {
  // @ts-ignore
  return <MainSection swingImages={swingImages} />;
}
