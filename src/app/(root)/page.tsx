import Image from "next/image";
import SearchForm from "../component/SearchForm";
import StartupCard from "../component/StartupCard";

export default function Home({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const query = searchParams.query;

  const posts = [
    {
      _createdAt: Date.now(),
      views: 55,
      author: { _id: 1, name: "ardino" },
      _id: 1,
      description: "this is the discription",
      image:
        "https://png.pngtree.com/png-vector/20211023/ourmid/pngtree-salon-logo-png-image_4004444.png",
      catogery: "Robots",
      title: "we robots",
    },
  ];
  return (
    <>
      <section className="pink_container pattern">
        <h1 className="heading">
          Pitch your startup <br />
          connect with enthronoprish
        </h1>
        <p className="sub-heading">
          Submit ideas vote on pitches and get noticed in virtual
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container ">
        <p className="text-30-semibold">
          {query ? `Search reasults for ${query}` : "All startsup"}
        </p>
        <ul className="mt-7 card_grid card_grid-sm">
          {posts?.length > 0 ? (
            posts.map((post: StartupCardtype, index: number) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No startsups found</p>
          )}
        </ul>
      </section>
    </>
  );
}
