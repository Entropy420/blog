import Link from "next/link";
import "./navbar.scss";
import { FaYoutube, FaGithub, FaTwitter, FaLaptop } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="nav__wrapper wrapper">
        <Link className="nav__home-link" href={"/"}>
          Entropy
        </Link>

        <div className="nav__social-links">
          <Link href={"https://shopglitch.in"} target="_blank">
            <FaYoutube />
          </Link>
          <Link href={"https://shopglitch.in"} target="_blank">
            <FaGithub />
          </Link>
          <Link href={"https://shopglitch.in"} target="_blank">
            <FaTwitter />
          </Link>
          <Link href={"https://shopglitch.in"} target="_blank">
            <FaLaptop />
          </Link>
        </div>
      </div>
    </nav>
  );
}
