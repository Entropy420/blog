import Image from "next/image";
import "./picture.scss";

export default function Picture() {
  return (
    <section className="picture wrapper">
      <Image
        src="/images/Glitch.png"
        alt="Glitch"
        width={1200}
        height={1200}
        priority={true}
      />
    </section>
  );
}
