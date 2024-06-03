import Link from "next/link";

type Props = { post: BlogPost };
export default function ItemsList({ post }: Props) {
  const { id, title, date } = post;
  return (
    <li className="blog">
      <Link href={`/blog/${id}`}>
        <h2 className="blog__title">{title}</h2>
        <p className="blog__date">{new Date(date).toDateString()}</p>
      </Link>
    </li>
  );
}
