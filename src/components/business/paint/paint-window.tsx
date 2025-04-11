"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { DrawLine } from "./type";
import { BrushCursor } from "./brush-cursor";
import { createScopedLogger } from "@/utils";

interface PaintWindowProps {
  src: string;
  isEraser: boolean;
  brushSize: number;
  lines: DrawLine[];
  setLines: (newLine: DrawLine[]) => void;
}

const logger = createScopedLogger("PaintWindow");

export function PaintWindow({
  src,
  isEraser,
  brushSize,
  lines,
  setLines,
}: PaintWindowProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tempCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [scalingRatio, setScalingRatio] = useState(1);

  const getCanvasPoint = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return null;
    }

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX, clientY;

    if ("touches" in e) {
      if (e.touches.length === 0) {
        return null;
      }

      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    const point = getCanvasPoint(e);
    if (!point) return;

    setIsDrawing(true);
    setLines([
      ...lines,
      {
        points: [point],
        erase: isEraser,
        brushSize: brushSize * scalingRatio,
      },
    ]);
  };

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) {
      return null;
    }

    const point = getCanvasPoint(e);
    if (!point) {
      return null;
    }

    const newLines = [...lines];
    const currentLine = newLines.at(-1);

    if (currentLine) {
      currentLine.points = [...currentLine.points, point];
      setLines(newLines);
    }
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
  };

  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const tempCanvas = tempCanvasRef.current;
    if (!canvas || !tempCanvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    const tempCtx = tempCanvas.getContext("2d");
    if (!ctx || !tempCtx) {
      return;
    }

    if (tempCanvas.width === 0 || tempCanvas.height === 0) {
      tempCanvas.width = canvasSize.width;
      tempCanvas.height = canvasSize.height;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);

    const rect = canvas.getBoundingClientRect();
    const scalingRatio = canvas.width / rect.width;
    setScalingRatio(scalingRatio);

    lines.forEach((line) => {
      if (line.points.length < 2) {
        return;
      }

      tempCtx.beginPath();
      tempCtx.moveTo(line.points[0].x, line.points[0].y);

      for (let i = 1; i < line.points.length; i++) {
        const { x, y } = line.points[i];
        tempCtx.lineTo(x, y);
      }

      tempCtx.lineWidth = line.brushSize;
      tempCtx.lineCap = "round";
      tempCtx.lineJoin = "round";

      if (line.erase) {
        tempCtx.globalCompositeOperation = "destination-out";
        tempCtx.strokeStyle = "rgba(255, 255, 255, 1)";
      } else {
        tempCtx.globalCompositeOperation = "source-over";
        tempCtx.strokeStyle = "rgba(121, 0, 245, 0.5)";
      }

      tempCtx.stroke();
    });

    tempCtx.globalCompositeOperation = "source-over";

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (tempCanvas.width > 0 && tempCanvas.height > 0) {
      ctx.drawImage(tempCanvas, 0, 0);
    }
  }, [lines, canvasSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const parentWidth = parent.clientWidth;
      const parentHeight = parent.clientHeight;
      const parentRatio = parentWidth / parentHeight;
      const aspectRatio = canvasSize.width / canvasSize.height;

      let displayWidth: number;
      let displayHeight: number;

      if (parentRatio > aspectRatio) {
        displayHeight = parentHeight;
        displayWidth = displayHeight * aspectRatio;
      } else {
        displayWidth = parentWidth;
        displayHeight = displayWidth / aspectRatio;
      }

      canvas.width = canvasSize.width;
      canvas.height = canvasSize.height;

      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;

      canvas.style.left = `${(parentWidth - displayWidth) / 2}px`;
      canvas.style.top = `${(parentHeight - displayHeight) / 2}px`;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => window.removeEventListener("resize", resizeCanvas);
  }, [canvasSize]);

  useEffect(() => {
    if (!tempCanvasRef.current) {
      tempCanvasRef.current = document.createElement("canvas");
    }

    if (tempCanvasRef.current) {
      tempCanvasRef.current.width = canvasSize.width;
      tempCanvasRef.current.height = canvasSize.height;
    }
  }, [canvasSize]);

  useEffect(() => {
    redrawCanvas();
  }, [lines, redrawCanvas, canvasSize]);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = src;
    img.onload = () =>
      setCanvasSize({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
  }, [src]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const preventDefault = (e: Event) => {
      e.preventDefault();
    };

    canvas.addEventListener("touchstart", preventDefault, { passive: false });
    canvas.addEventListener("touchmove", preventDefault, { passive: false });

    return () => {
      canvas.removeEventListener("touchstart", preventDefault);
      canvas.removeEventListener("touchmove", preventDefault);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        width={canvasSize.width}
        height={canvasSize.height}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
        style={{
          touchAction: "none",
          cursor: "none",
        }}
      />
      <BrushCursor brushSize={brushSize} canvasRef={canvasRef} />
    </>
  );
}
