import { getPostData, getSortedPostsData } from "@/lib/posts";
import { notFound } from "next/navigation";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { JSDOM } from "jsdom";
import "./blog.scss";

export async function generateMetadata({
  params,
}: {
  params: { blogId: string };
}) {
  const { blogId } = params;

  const allPosts = await getSortedPostsData();
  if (!allPosts) {
    throw new Error("Failed To Load Blogs");
  }

  const blog = allPosts?.find((post) => post.id == blogId);

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }
  return {
    title: blog.title,
  };
}

export default async function Blog({ params }: { params: { blogId: string } }) {
  const { blogId } = params;

  const allPosts = await getSortedPostsData();
  if (!allPosts) {
    throw new Error("Failed To Load Blogs");
  }

  if (!allPosts?.find((post) => post.id === blogId)) {
    notFound();
  }

  const blog = await getPostData(blogId);
  if (!blog) {
    notFound();
  }

  const { title, date, content } = blog;

  // creating a virtual DOM for DOMPurify(as on server side it won't have access to DOM)
  const window = new JSDOM("").window;
  // sanitizes the raw html(removes dangerous tags like <script> <style> etc)
  const sanitizedHTML = DOMPurify(window).sanitize(content);
  // converts the sanitized html to a react element. `dangerouslySetHtml` SKIPS react virtual dom and injects code directly in the dom that could create problems latter on
  const reactElement = parse(sanitizedHTML);

  return (
    <section className="blog-post">
      <h1 className="blog-post__title">{title}</h1>
      <p className="blog-post__date">{new Date(date).toDateString()}</p>
      <article className="blog-post__content">{reactElement}</article>
    </section>
  );
}
