// import { sql } from "@vercel/postgres";
import Link from "next/link";

// https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
// TODO add type and use RSC https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes
export default async function Page(props: any) {
  const {
    params: { slug },
  } = props;

  // TODO fix later
  const rows = [{ word: "hi", definition: "hello" }];
  // const { rows, fields } =
  // await sql`SELECT "Word".word, "Word".definition, "Source".url FROM "Word" inner join "Source" ON "Source".id="Word"."sourceId"`;

  if (rows.length) {
    // TODO add source
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="relative place-items-center before:absolute">
          {rows.map((target, i) => (
            <div className="my-5" key={i}>
              {/* TODO need icon for outbound */}
              {/* TODO handle word with spaces */}
              <Link
                href={
                  "/tools/words/" +
                  target.word.replaceAll(" ", "-").toLowerCase()
                }
              >
                <p className="text-base font-bold">{target.word} </p>
                {/* linebreak */}

                <p className="text-sm">{target.definition}</p>
              </Link>
            </div>
          ))}
        </div>
      </main>
    );
  }
  return <p>not found</p>;
}
