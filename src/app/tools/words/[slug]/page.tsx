import { sql } from "@vercel/postgres";

// https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
// TODO add type and use RSC https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes
export default async function Page(props: any) {
  const {
    params: { slug },
  } = props;
  // TODO bad code
  const slugQuery = slug.replaceAll("-", " ");
  const { rows } =
    await sql`SELECT * FROM "Word" WHERE LOWER(word) = LOWER(${slugQuery});`;
  const target = rows[0];
  if (target) {
    // TODO add source
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="relative  place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
          <p>{target.word}</p>
          {/* linebreak */}

          <p>{target.definition}</p>
        </div>
      </main>
    );
  }
  return <p>not found, please return to home page</p>;
}
