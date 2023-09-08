import MainSection from "@/components/MainSection";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
type SwingItem = {
  image_url: string;
};
export const getServerSideProps = async () => {
  const supabase = createClientComponentClient();
  const promise = await supabase.from("swing-public").select("image_url");
  return {
    props: {
      swingImages: promise.data || [],
    },
  };
};
// https://supabase.com/dashboard/project/tkbhdbhsnikrpsutyyxk/settings/api?
export default function Home({ swingImages }: { swingImages: SwingItem[] }) {
  // TODO select * from "Swing" inner join "Prediction" on "Prediction"."swingId" = "Swing".id where "Swing"."blobId" is not null and "Prediction"."url" is not null

  // @ts-ignore
  console.log(swingImages, "hi");

  return <MainSection swingImages={swingImages} />;
}
