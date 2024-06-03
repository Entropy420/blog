import { getSortedPostsData } from "@/lib/posts";
import "./posts.scss";
import ItemsList from "./ItemsList";

export default async function Posts() {
  const allPosts = await getSortedPostsData();
  if (!allPosts) {
    return <h2>Error Fetching Blogs / Blogs Does Not Exist</h2>;
  }

  return (
    <section className="posts">
      <ul className="posts__list">
        {allPosts.map((post) => (
          <ItemsList post={post} key={post.id} />
        ))}
      </ul>
    </section>
  );
}
