"use client";

/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useUnifiedFileUpload } from "@/hooks/global/use-unified-file-upload";
import { cn } from "@/lib/utils";
import { createScopedLogger } from "@/utils";
import { SlSizeFullscreen } from "react-icons/sl";
import { ArrowRightLeft, X, Loader2, ImageUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import * as NextImage from "next/image";
import { PaintWindow } from "../paint/paint-window";
import { BrushMode, DrawLine } from "../paint/type";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/global/use-mobile";
import { PaintToolbar } from "../paint/paint-toolbar";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const logger = createScopedLogger("ImageUploader");

interface ImageUploaderProps {
  label?: string;
  placeholder?: string;
  showImageUrl?: string;
  children?: ReactNode;
  canPaint?: boolean;
  isEraser?: boolean;
  brushSize?: number;
  lines?: DrawLine[];
  setLines?: (newLine: DrawLine[]) => void;
  handleUploaded: (imageUrl: string) => void;
  onModeChange?: (mode: BrushMode) => void;
  onBrushSizeChange?: (newSize: number[]) => void;
  onReset?: () => void;
}

export function ImageUploader({
  label,
  placeholder,
  showImageUrl,
  children,
  canPaint = false,
  isEraser = false,
  brushSize = 20,
  lines = [],
  setLines = () => {},
  handleUploaded,
  onModeChange = () => {},
  onBrushSizeChange = () => {},
  onReset = () => {},
}: ImageUploaderProps) {
  const t = useTranslations("image_uploader");

  const { upload, isUploading } = useUnifiedFileUpload();
  const isMobile = useIsMobile();

  const [fullScreen, setFullScreen] = useState(false);

  const [uploadedImage, setUploadedImage] = useState<string>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFullScreen = useCallback(() => {
    setFullScreen(!fullScreen);
  }, [fullScreen, setFullScreen]);

  const handleReplace = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleImageUpload = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) {
        toast.error(t("error.invalid_file_type"));
        logger.error("Invalid file type. Please upload an image file.");
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        toast.error(t("error.file_too_large"));
        logger.error(
          `File size ${file.size} exceeds limit of ${MAX_FILE_SIZE}`
        );
        return;
      }

      try {
        const [uploadedFile] = await upload([file]);
        setUploadedImage(uploadedFile.base64);
        handleUploaded(uploadedFile.url);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error occurred";

        toast.error(t("error.upload_failed"));
        logger.error("Upload failed:", errorMessage);
      }
    },
    [handleUploaded, t, upload]
  );

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) {
      handleImageUpload(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageUpload(file);
      event.target.value = "";
    }
  };

  const handlePaste = useCallback(
    (event: ClipboardEvent) => {
      const items = event.clipboardData?.items;
      if (!items) return;

      for (const item of items) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (file) {
            handleImageUpload(file);
            break;
          }
        }
      }
    },
    [handleImageUpload]
  );

  const handleDelete = useCallback(() => {
    handleUploaded("");
  }, [handleUploaded]);

  useEffect(() => {
    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [handlePaste]);

  return (
    <div className="flex h-full w-full flex-col gap-y-2">
      {label && <Label>{label}</Label>}
      <div
        className={cn(
          "group relative flex h-[300px] items-center justify-center rounded-lg border border-dashed border-border bg-muted",
          showImageUrl
            ? "border-primary"
            : "transition-all duration-100 hover:border-primary"
        )}
      >
        {isUploading ? (
          <Loader2 className="size-8 animate-spin text-primary" />
        ) : showImageUrl ? (
          <>
            <NextImage.default
              className="object-contain"
              src={uploadedImage ?? showImageUrl}
              alt="Uploaded Image"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
            {canPaint && (
              <PaintWindow
                src={uploadedImage ?? showImageUrl}
                isEraser={isEraser}
                brushSize={brushSize}
                lines={lines}
                setLines={setLines}
              />
            )}
            <div className="absolute right-0 top-[-3px] flex translate-y-[-100%] flex-row">
              <Button
                variant="ghost"
                type="button"
                size="xs"
                onClick={handleReplace}
                className="flex flex-row items-center text-primary hover:text-primary/80"
              >
                <ArrowRightLeft />
                <p>{t("switch_image")}</p>
              </Button>
              <Button
                variant="ghost"
                type="button"
                size="xs"
                onClick={handleDelete}
                className="flex flex-row items-center text-destructive hover:text-destructive/80"
              >
                <X />
                <p>{t("remove_image")}</p>
              </Button>
            </div>
            <div
              className={cn(
                "absolute right-1 top-1 flex flex-row",
                canPaint ? "" : "hidden"
              )}
            >
              <Button
                variant="ghost"
                type="button"
                size="xs"
                onClick={handleFullScreen}
                className="px-1 text-primary hover:text-primary/80"
              >
                <SlSizeFullscreen />
              </Button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              multiple={false}
            />

            <Dialog open={fullScreen} onOpenChange={setFullScreen}>
              <DialogContent
                className={cn(
                  "flex flex-col",
                  isMobile
                    ? "h-[60vh] max-w-full pt-10"
                    : "h-[90vh] max-w-[60vw]"
                )}
              >
                <DialogTitle className="hidden" />
                <DialogDescription className="hidden" />

                <PaintToolbar
                  isEraser={isEraser}
                  brushSize={[brushSize]}
                  onBrushSizeChange={onBrushSizeChange}
                  onModeChange={onModeChange}
                  onReset={onReset}
                />

                <div className="relative flex-1 rounded-md border border-border bg-muted">
                  <NextImage.default
                    className="object-contain"
                    src={uploadedImage ?? showImageUrl}
                    alt="Uploaded Image"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />

                  <PaintWindow
                    src={uploadedImage ?? showImageUrl}
                    isEraser={isEraser}
                    brushSize={brushSize}
                    lines={lines}
                    setLines={setLines}
                  />
                </div>
              </DialogContent>
            </Dialog>
          </>
        ) : (
          <div
            className="relative flex h-full w-full items-center justify-center"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="flex flex-col items-center justify-center space-y-2 text-sm text-muted-foreground">
              {children ?? <ImageUp className="size-8" />}
              <span className="text-center">{placeholder}</span>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 cursor-pointer opacity-0"
              title=""
              multiple={false}
            />
          </div>
        )}
      </div>
    </div>
  );
}
