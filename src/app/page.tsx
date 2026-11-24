import SmoothScroll from "@/components/SmoothScroll";
import Loader from "@/components/Loader";
import Nav from "@/components/Nav";
import Cursor from "@/components/Cursor";
import EasterEgg from "@/components/EasterEgg";
import Hero from "@/components/scenes/Hero";
import Human from "@/components/scenes/Human";
import Worlds from "@/components/scenes/Worlds";
import Universe from "@/components/scenes/Universe";
import Built from "@/components/scenes/Built";
import Media from "@/components/scenes/Media";
import Journey from "@/components/scenes/Journey";
import Life from "@/components/scenes/Life";
import Playground from "@/components/scenes/Playground";
import Connect from "@/components/scenes/Connect";
import { chapters } from "@/content/site";
import { lifeItems } from "@/content/life";

export default function Page() {
  // "Life outside the screen" waits for Sabreen's own answers — never invented.
  const showLife = lifeItems.length >= 3;
  const visible = chapters.map((c) => c.id).filter((id) => id !== "life" || showLife);

  return (
    <SmoothScroll>
      <Loader />
      <Nav visibleChapters={visible} />
      <main id="main">
        <Hero />
        <Human />
        <Worlds />
        <Universe />
        <Built />
        <Media />
        <Journey />
        {showLife && <Life />}
        <Playground />
        <Connect />
      </main>
      <Cursor />
      <EasterEgg />
    </SmoothScroll>
  );
}
