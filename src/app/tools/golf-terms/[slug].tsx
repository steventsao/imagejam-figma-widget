import { useRouter } from "next/router";

// https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
export default function Page() {
  const router = useRouter();
  return <p>Post: {router.query.slug}</p>;
}
