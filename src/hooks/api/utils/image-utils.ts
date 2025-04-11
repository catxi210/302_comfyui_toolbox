import { DrawLine } from "@/components/business/paint/type";

export async function getImageSize(imageSrc: string): Promise<{
  width: number;
  height: number;
}> {
  return new Promise<{
    width: number;
    height: number;
  }>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageSrc;
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = (error) => {
      reject(error);
    };
  });
}

export function restoreToBinaryImage(
  lines: DrawLine[],
  imageSize: {
    width: number;
    height: number;
  }
): string {
  const canvas = document.createElement("canvas");
  canvas.width = imageSize.width;
  canvas.height = imageSize.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return "";
  }

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "white";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  lines.forEach((line) => {
    if (line.erase || line.points.length < 2) {
      return;
    }

    ctx.beginPath();
    ctx.lineWidth = line.brushSize;
    ctx.moveTo(line.points[0].x, line.points[0].y);

    for (let i = 1; i < line.points.length; i++) {
      const { x, y } = line.points[i];
      ctx.lineTo(x, y);
    }

    ctx.stroke();
  });

  return canvas.toDataURL();
}
