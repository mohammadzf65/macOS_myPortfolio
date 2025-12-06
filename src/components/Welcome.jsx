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
  if (!container) return;
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
// import React, { useEffect, useRef } from "react";
// import { gsap } from "gsap";

// /**
//  * نکته مهم: حتماً از یک Variable Font استفاده کن (مثلاً Georama Variable).
//  * اگر فونت متغیر نیست، تغییر وزن اثر نخواهد داشت.
//  */

// const FONT_WEIGHTS = {
//   Subtitles: { min: 100, max: 400, default: 100 },
//   title: { min: 400, max: 900, default: 400 },
// };

// const renderText = (text, className, baseWeight = 400) =>
//   [...text].map((char, i) => (
//     <span
//       key={i}
//       className={className}
//       // مقدار اولیه را هم ست می‌کنیم تا وقتی لود شد، درست نمایش دهد
//       style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
//       aria-hidden="true">
//       {char === " " ? "\u00A0" : char}
//     </span>
//   ));

// const Welcome = () => {
//   const titleRef = useRef(null);
//   const subtitleRef = useRef(null);

//   useEffect(() => {
//     // helper: راه‌اندازی افکت برای یک کانتینر حاوی spanها
//     const setupTextHover = (container, type) => {
//       if (!container) return null;
//       const letters = Array.from(container.querySelectorAll("span"));
//       const {
//         min,
//         max,
//         default: baseDefault,
//       } = FONT_WEIGHTS[type] || {
//         min: 100,
//         max: 900,
//         default: 400,
//       };

//       // set base weight initially (در صورت نیاز)
//       letters.forEach((l) => {
//         l.style.fontVariationSettings =
//           l.style.fontVariationSettings || `'wght' ${baseDefault}`;
//         // برای افزایش دقت رندر از will-change استفاده می‌کنیم
//         l.style.willChange = "transform";
//       });

//       // انیمیت عددی: هر letter یک آبجکت weight دارد که ما آن را tween می‌کنیم
//       const animateToWeight = (letter, targetWeight, duration = 0.25) => {
//         // اگر قبلاً یک tween داریم، آن را پاک می‌کنیم
//         const current = parseFloat(
//           (letter.style.fontVariationSettings || "wght 400").match(
//             /-?\d+(\.\d+)?/
//           )[0]
//         );
//         const obj = { v: current };
//         return gsap.to(obj, {
//           v: targetWeight,
//           duration,
//           ease: "power2.out",
//           onUpdate: () => {
//             letter.style.fontVariationSettings = `'wght' ${obj.v.toFixed(2)}`;
//           },
//         });
//       };

//       const handleMouseMove = (e) => {
//         const rect = container.getBoundingClientRect();
//         const mouseX = e.clientX - rect.left;

//         letters.forEach((letter) => {
//           const r = letter.getBoundingClientRect();
//           const center = r.left - rect.left + r.width / 2;
//           const distance = Math.abs(mouseX - center);

//           // تابع کاهش (gaussian-ish) — عدد 2000 را می‌توان تنظیم کرد برای گستره افکت
//           const intensity = Math.exp(-(distance ** 2) / 2000);
//           const weight = min + (max - min) * intensity;
//           animateToWeight(letter, weight, 0.18);
//         });
//       };

//       const handleMouseLeave = () => {
//         // وقتی موس بیرون رفت، همه را به مقدار پایه برمی‌گردانیم
//         letters.forEach((letter) => {
//           animateToWeight(letter, baseDefault, 0.4);
//         });
//       };

//       container.addEventListener("mousemove", handleMouseMove);
//       container.addEventListener("mouseleave", handleMouseLeave);

//       // بازگشت cleanup function برای حذف listener در unmount
//       return () => {
//         container.removeEventListener("mousemove", handleMouseMove);
//         container.removeEventListener("mouseleave", handleMouseLeave);
//       };
//     };

//     const cleanups = [];
//     const c1 = setupTextHover(subtitleRef.current, "Subtitles");
//     if (c1) cleanups.push(c1);
//     const c2 = setupTextHover(titleRef.current, "title");
//     if (c2) cleanups.push(c2);

//     return () => {
//       cleanups.forEach((fn) => {
//         try {
//           fn();
//         } catch (e) {
//           // ignore
//         }
//       });
//     };
//   }, []); // فقط یک بار در mount اجرا شود

//   return (
//     <section id="welcome" className="col-center h-full">
//       <p ref={subtitleRef} className="flex-center text-white select-none">
//         {renderText(
//           "Hey, I'm Mohammadreza ! welcome to my",
//           "text-3xl font-georama",
//           FONT_WEIGHTS.Subtitles.default
//         )}
//       </p>

//       <h1
//         ref={titleRef}
//         className="mt-7 flex-center font-bold text-white select-none">
//         {renderText(
//           "Portfolio",
//           "text-8xl font-georama",
//           FONT_WEIGHTS.title.default
//         )}
//       </h1>

//       <div className="absolute top-20 bg-amber-950/50 p-3 rounded-md text-white sm:hidden">
//         <p>This portfolio is designed for small screens.</p>
//       </div>
//     </section>
//   );
// };

// export default Welcome;
