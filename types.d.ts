interface BlogPost {
  id: string;
  title: string;
  date: string;
}

interface BlogPostContent extends BlogPost {
  content: string;
}
