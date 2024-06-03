import "./global.scss";
import Navbar from "./_component/Navbar";
import Picture from "./_component/Picture";

export const metadata = {
  title: "Blog",
  description: "Entropy's Blog",
};

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Navbar />
        <Picture />
        <main className="wrapper">{children}</main>
      </body>
    </html>
  );
}
