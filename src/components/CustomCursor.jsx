import { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    const onMouseMove = (e) => {
      // Cursor pequeno (ponteiro)
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0,
        ease: "none",
      });

      // Follower maior (efeito de rastro)
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    // Efeitos de hover
    const onMouseOver = (e) => {
      const target = e.target;

      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        gsap.to(cursor, { scale: 0.5, duration: 0.3 });
        gsap.to(follower, { scale: 1.5, duration: 0.3 });
        follower.classList.add("hover");
      }
    };

    const onMouseOut = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3 });
      gsap.to(follower, { scale: 1, duration: 0.3 });
      follower.classList.remove("hover");
    };

    // Event listeners
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    // Hide default cursor
    document.body.style.cursor = "none";

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor"></div>
      <div ref={followerRef} className="cursor-follower"></div>
    </>
  );
};

export default CustomCursor;
