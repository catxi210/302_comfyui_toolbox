"use client";

import { TbLoaderQuarter } from "react-icons/tb";

interface LoadingIconProps {
  text?: string;
}

export function LoadingIcon({ text }: LoadingIconProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-y-2">
      <div className="relative h-8 w-8">
        {[0, 1, 2, 3].map((index) => (
          <TbLoaderQuarter
            key={index}
            className={`absolute left-1/2 top-1/2 h-8 w-8 animate-loaderFade text-primary`}
            style={{
              transform: `translate(-50%, -50%) rotate(${index * 90}deg)`,
              animationDelay: `${index * 0.1}s`,
            }}
          />
        ))}
      </div>
      {text && <p className="text-sm text-primary">{text}</p>}
    </div>
  );
}
