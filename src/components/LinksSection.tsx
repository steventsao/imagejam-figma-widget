import Link from "next/link";
export default function LinksSection() {
  return (
    <>
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <Link
          href="/tools/words"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Golf Terms{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Words</p>
        </Link>
        {/* WIP */}
        {/* <Link href="/tools/random-golf-club-generator" className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30" target="_blank" rel="noopener noreferrer" > <h2 className={`mb-3 text-2xl font-semibold`}> Club Generator{" "} <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none"> -&gt; </span> </h2> <p className={`m-0 max-w-[30ch] text-sm opacity-50`}> Wheel of misfortune </p> </Link> */}
      </div>
    </>
  );
}
