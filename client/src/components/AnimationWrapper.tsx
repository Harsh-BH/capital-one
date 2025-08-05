"use client";

import { useEffect, useRef, ReactNode } from "react";

interface AnimationWrapperProps {
  children: ReactNode;
  animation: string;
  duration?: string;
  delay?: string;
  className?: string;
  threshold?: number;
  once?: boolean;
}

export function AnimationWrapper({
  children,
  animation,
  duration = "1s",
  delay = "0s",
  className = "",
  threshold = 0.1,
  once = true,
}: AnimationWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Create intersection observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Make element visible first
          entry.target.style.visibility = "visible";
          entry.target.style.opacity = "1";
          
          // Then add animation classes
          entry.target.classList.add("animate__animated", `animate__${animation}`);
          entry.target.style.animationDuration = duration;
          entry.target.style.animationDelay = delay;
          
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          entry.target.classList.remove("animate__animated", `animate__${animation}`);
          entry.target.style.visibility = "hidden";
          entry.target.style.opacity = "0";
        }
      },
      { threshold }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [animation, duration, delay, threshold, once]);

  return (
    <div 
      ref={ref} 
      className={`${className}`} 
      style={{ 
        visibility: "hidden",
        opacity: "0",
        transition: "opacity 0.3s ease"
      }}
    >
      {children}
    </div>
  );
}
