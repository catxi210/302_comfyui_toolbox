"use client";

import { useEffect, useRef } from "react";

interface BrushCursorProps {
  brushSize: number;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export function BrushCursor({ brushSize, canvasRef }: BrushCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);

  const cursorSize = brushSize;
  const color = "rgba(121, 0, 245, 0.5)";
  const borderColor = "rgba(121, 0, 245, 0.8)";

  useEffect(() => {
    const canvas = canvasRef.current;
    const cursor = cursorRef.current;
    if (!canvas || !cursor) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const canvasLeft = parseFloat(canvas.style.left || "0");
      const canvasTop = parseFloat(canvas.style.top || "0");

      cursor.style.left = `${x + canvasLeft}px`;
      cursor.style.top = `${y + canvasTop}px`;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) {
        return;
      }
      const rect = canvas.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const y = e.touches[0].clientY - rect.top;

      const canvasLeft = parseFloat(canvas.style.left || "0");
      const canvasTop = parseFloat(canvas.style.top || "0");

      cursor.style.left = `${x + canvasLeft}px`;
      cursor.style.top = `${y + canvasTop}px`;
    };

    const handleMouseEnter = () => {
      cursor.style.display = "block";
    };

    const handleMouseLeave = () => {
      cursor.style.display = "none";
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseenter", handleMouseEnter);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    canvas.addEventListener("touchmove", handleTouchMove);
    canvas.addEventListener("touchstart", handleMouseEnter);
    canvas.addEventListener("touchend", handleMouseLeave);
    canvas.addEventListener("touchcancel", handleMouseLeave);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseenter", handleMouseEnter);
      canvas.removeEventListener("mouseleave", handleMouseLeave);

      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchstart", handleMouseEnter);
      canvas.removeEventListener("touchend", handleMouseLeave);
      canvas.removeEventListener("touchcancel", handleMouseLeave);
    };
  }, [canvasRef]);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "absolute",
        width: `${cursorSize}px`,
        height: `${cursorSize}px`,
        borderRadius: "50%",
        backgroundColor: color,
        border: `1px solid ${borderColor}`,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        display: "none",
        zIndex: 1000,
      }}
    />
  );
}
