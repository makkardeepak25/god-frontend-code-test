import { useEffect, useState, useRef } from "react";

interface UseSliderIndexProps {
  className: string;
}

export default function useSliderIndex({ className }: UseSliderIndexProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const slideElementsRef = useRef<Element[]>([]);

  useEffect(() => {
    slideElementsRef.current = Array.from(document.querySelectorAll(className));
  }, [className]);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveIndex(
            parseInt(entry.target.getAttribute("data-index") || "0", 10)
          );
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });

    slideElementsRef.current.forEach((slide) => observer.observe(slide));

    return () => {
      observer.disconnect();
    };
  }, [className]);

  return { activeIndex };
}
