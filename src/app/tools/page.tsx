import Layout from "@/components/appShellLayoutClient";

// https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
// TODO add type and use RSC https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes
export default async function Page(props: any) {
  return (
    <Layout>
      <p>not found, please return to home page</p>;
    </Layout>
  );
}
