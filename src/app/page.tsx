import "./home.scss";
import "../lib/posts";
import Page from "./_component/Posts";
import Picture from "./_component/Picture";

export default function Home() {
  return (
    <section className="home">
      <Picture />
      <h1 className="home__heading">Salutations, The name is Entropy</h1>
      <Page />
    </section>
  );
}
