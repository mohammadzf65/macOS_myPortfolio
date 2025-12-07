import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";

const FONT_WEIGHTS = {
  Subtitles: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
};

const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={className}
      style={{ fontVariationSettings: `'wght' ${baseWeight}` }}>
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

const setupTextHover = (container, type) => {
  if (!container) return () => {};
  const letters = container.querySelectorAll("span");
  const { min, max, default: base } = FONT_WEIGHTS[type];

  const animateLetter = (letter, weight, duration = 0.25) => {
    return gsap.to(letter, {
      duration,
      ease: "power2.out",
      fontVariationSettings: `'wght' ${weight}`,
    });
  };

  const handleMouseMove = (e) => {
    const { left } = container.getBoundingClientRect();
    const mouseX = e.clientX - left;

    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect();
      const distanse = Math.abs(mouseX - (l - left + w / 2));
      const intensity = Math.exp(-(distanse ** 2) / 2000);

      animateLetter(letter, min + (max - min) * intensity);
    });
  };
  const handleMouseLeave = () => {
    letters.forEach((letter) => {
      animateLetter(letter, base, 0.3);
    });
  };

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};

const Welcome = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(() => {
    const titleCleanup = setupTextHover(titleRef.current, "title");
    const subtitleCleanup = setupTextHover(subtitleRef.current, "Subtitles");
    return () => {
      titleCleanup();
      subtitleCleanup();
    };
  }, []);

  return (
    <section id="welcome" className="col-center h-full">
      <p ref={subtitleRef} className="flex-center text-white">
        {renderText(
          "Hey, I'm Mohammadreza ! welcome to my",
          "text-3xl font-georama",
          100
        )}
      </p>
      <h1
        ref={titleRef}
        className="mt-7 flex-center font-bold text-white
      ">
        {renderText("Portfolio", "text-8xl font-georama")}
      </h1>

      <div
        className="absolute top-20 bg-amber-950/50 p-3
      rounded-md text-white sm:hidden">
        <p>this Portfolio is designed for small screens.</p>
      </div>
    </section>
  );
};

export default Welcome;
