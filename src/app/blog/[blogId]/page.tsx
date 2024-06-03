import { getPostData, getSortedPostsData } from "@/lib/posts";
import { notFound } from "next/navigation";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { JSDOM } from "jsdom";

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

  const htmlContent = (await getPostData(blogId))?.content;
  if (!htmlContent) {
    notFound();
  }

  // creating a virtual DOM for DOMPurify(as on server side it won't have access to DOM)
  const window = new JSDOM("").window;
  // sanitizes the raw html(removes dangerous tags like <script> <style> etc)
  const sanitizedHTML = DOMPurify(window).sanitize(htmlContent);
  // converts the sanitized html to a react element, using dangerouslySetHtml skips react virtual dom and injects code directly in the dom that could create problems latter on
  const reactElement = parse(sanitizedHTML);

  // const UnsafeHtml = { __html: htmlContent };

  return <div>{reactElement}</div>;
  // return <section dangerouslySetInnerHTML={UnsafeHtml} />;
}
