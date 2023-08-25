import { sql } from "@vercel/postgres";

// https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
// TODO add type and use RSC https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes
export default async function Page(props: any) {
  const {
    params: { slug },
  } = props;
  const { rows, fields } =
    await sql`SELECT * FROM "Word" WHERE LOWER(word) = LOWER(${slug});`;
  const target = rows[0];
  if (target) {
    // TODO add source
    return (
      <>
        {" "}
        <p>Word: {target.word}</p>
        <p>{target.definition}</p>
      </>
    );
  }
  return <p>not found</p>;
}
