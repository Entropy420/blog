import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { cache } from "react";

// points to the folder containing the blogs files
const dirPath = path.join(process.cwd(), "src/blogPosts");

async function sortedPostsData(): Promise<BlogPost[] | undefined> {
  try {
    // get the list of files from that dir. if not valid, catch{} returns undefined
    const filesNames = await fs.readdir(dirPath);
    const allPostsData: BlogPost[] = [];

    // iterate over the file names
    for (const fileName of filesNames) {
      try {
        const fileContent = await fs.readFile(
          path.join(dirPath, fileName),
          "utf-8"
        );
        // removes the .md from file name, and uses its name as id
        const id = fileName.replace(/\.md$/, "");
        // parse the metadata and content using gray-matter
        const matterResult = matter(fileContent);

        const blogPost: BlogPost = {
          id,
          title: matterResult.data.title,
          date: matterResult.data.date,
        };

        allPostsData.push(blogPost);
      } catch (err) {
        console.log(err);
      }
    }

    // filter out files that have missing metadata(s)
    const filteredPostsData = allPostsData.filter(
      ({ title, date }) => title && date
    );

    // sort them by the date(older to newer)
    filteredPostsData.sort((a, b) => (a.date > b.date ? 1 : -1));

    // if the array is empty return undefined
    if (filteredPostsData.length === 0) return undefined;
    return filteredPostsData;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

async function postData(id: string): Promise<BlogPostContent | undefined> {
  const filePath = path.join(dirPath, `${id}.md`);

  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    const matterResult = matter(fileContent);
    const parsedHtml = (
      await remark().use(html).process(matterResult.content)
    ).toString();

    const blogPostWithHtml: BlogPostContent = {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
      content: parsedHtml,
    };
    return blogPostWithHtml;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

const getPostData = cache(postData);
const getSortedPostsData = cache(sortedPostsData);

export { getPostData, getSortedPostsData };
