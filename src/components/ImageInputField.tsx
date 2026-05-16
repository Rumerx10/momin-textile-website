"use client";

import React, { useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { MdPictureAsPdf, MdDownload } from "react-icons/md";

type PreviewItem =
  | { id: string; isExisting: true; url: string; type: "image" | "pdf" }
  | { id: string; isExisting: false; file: File; url: string; type: "image" | "pdf" };

const makeId = () =>
  Math.random().toString(36).slice(2, 9) + Date.now().toString(36);

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/jpg", "application/pdf"];
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

const ImageInputField = ({
  label,
  name,
  subLabel,
  placeholder = "Click to add images or drag here",
  required = false,
  requiredMessage,
  maxFiles = 5,
  existingImages = [],
  onImageRemove,
}: {
  label: string;
  name: string;
  subLabel?: string;
  placeholder?: string;
  required?: boolean;
  requiredMessage?: string;
  maxFiles?: number;
  existingImages?: string[];
  onImageRemove?: (imageUrl: string) => void;
}) => {
  const {
    control,
    formState: { errors },
    clearErrors,
  } = useFormContext();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previews, setPreviews] = useState<PreviewItem[]>([]);
  const [localError, setLocalError] = useState<string | null>(null);

  // Initialize from existing images array
  useEffect(() => {
    const initial = (existingImages || []).map((url) => {
      const isPdf = url.toLowerCase().endsWith('.pdf');
      return {
        id: makeId(),
        isExisting: true as const,
        url,
        type: isPdf ? "pdf" as const : "image" as const,
      };
    });
    setPreviews(initial);
  }, [JSON.stringify(existingImages)]);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      previews.forEach((p) => {
        if (!p.isExisting) URL.revokeObjectURL(p.url);
      });
    };
  }, [previews]);

  const currentCount = previews.length;

  const validateFile = (file: File) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return `Invalid file type: ${file.name}`;
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return `File too large: ${file.name} (max 10MB)`;
    }
    return null;
  };

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const incoming = Array.from(files);
    if (currentCount + incoming.length > maxFiles) {
      setLocalError(`You can upload up to ${maxFiles} files.`);
      return;
    }
    
    const fileErrors: string[] = [];
    const newItems: PreviewItem[] = [];

    for (const file of incoming) {
      const error = validateFile(file);
      if (error) {
        fileErrors.push(error);
      } else {
        const isPdf = file.type === "application/pdf";
        newItems.push({
          id: makeId(),
          isExisting: false as const,
          file,
          url: isPdf ? "" : URL.createObjectURL(file),
          type: isPdf ? "pdf" : "image",
        });
      }
    }

    if (fileErrors.length > 0) {
      setLocalError(fileErrors.join("\n"));
      return;
    }
    
    setLocalError(null);
    clearErrors(name);
    setPreviews((prev) => [...prev, ...newItems]);
  };

  const removePreview = (id: string) => {
    setPreviews((prev) => {
      const found = prev.find((p) => p.id === id);
      
      if (found && found.isExisting && onImageRemove) {
        onImageRemove(found.url);
      }
      
      if (found && !found.isExisting) {
        URL.revokeObjectURL(found.url);
      }
      
      return prev.filter((p) => p.id !== id);
    });
    setLocalError(null);
    clearErrors(name);
  };

  const openFilePicker = () => fileInputRef.current?.click();

  // Render preview based on type
  const renderPreview = (item: PreviewItem) => {
    // For PDF files
    if (item.type === "pdf") {
      const fileName = item.isExisting 
        ? item.url.split("/").pop() 
        : item.file.name;
      
      return (
        <div className="relative w-60 h-60 group">
          <div className="w-full h-full rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex flex-col items-center justify-center p-4">
            <MdPictureAsPdf className="w-16 h-16 text-red-500 mb-2" />
            <p className="text-pGray text-xs text-center break-words line-clamp-2">
              {fileName}
            </p>
            <a
              href={item.isExisting ? item.url : URL.createObjectURL(item.file)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-pBlue hover:text-pBlue/80 text-xs"
              onClick={(e) => e.stopPropagation()}
            >
              <MdDownload size={14} />
              Open PDF
            </a>
          </div>
          <button
            type="button"
            onClick={(ev) => {
              ev.stopPropagation();
              removePreview(item.id);
            }}
            className="absolute top-2 right-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-1 shadow"
            aria-label="Remove file"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3"
              />
            </svg>
          </button>
          {item.isExisting && (
            <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
              Existing
            </span>
          )}
        </div>
      );
    }

    // For image files
    return (
      <div className="relative w-60 h-60 group">
        <img
          src={item.url}
          alt="preview"
          className="w-full h-full object-cover rounded-lg border"
        />
        <button
          type="button"
          onClick={(ev) => {
            ev.stopPropagation();
            removePreview(item.id);
          }}
          className="absolute top-2 right-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-1 shadow"
          aria-label="Remove image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3"
            />
          </svg>
        </button>
        {item.isExisting && (
          <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
            Existing
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="font-bold text-pBlue">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {subLabel && <div className="text-sm text-gray-600">{subLabel}</div>}

      <Controller
        name={name}
        control={control}
        rules={{
          required: required
            ? requiredMessage || `${label} is required`
            : false,
          validate: () => {
            if (required && previews.length === 0)
              return requiredMessage || `${label} is required`;
            if (previews.length > maxFiles)
              return `Maximum ${maxFiles} files allowed`;
            return true;
          },
        }}
        render={({ field }) => {
          useEffect(() => {
            const value = previews.map((p) => (p.isExisting ? p.url : p.file));
            field.onChange(value);
          }, [previews]);

          const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            handleFiles(e.target.files);
            e.currentTarget.value = "";
          };

          const onDrop = (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            handleFiles(e.dataTransfer.files);
          };
          
          const onDragOver = (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
          };

          return (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,application/pdf"
                multiple
                onChange={onInputChange}
                className="hidden"
              />

              <div
                onClick={openFilePicker}
                onDrop={onDrop}
                onDragOver={onDragOver}
                className={`
                  w-full rounded-lg border-borderGray border-dashed border p-4
                  flex flex-wrap gap-4 items-start
                  ${errors[name] || localError ? "ring-2 ring-red-200" : "focus:outline-none"}
                  transition-all cursor-pointer
                `}
              >
                {previews.length === 0 && (
                  <div className="w-full text-center text-sm text-gray-500 py-2">
                    {placeholder}
                  </div>
                )}

                {previews.map((p) => renderPreview(p))}

                {previews.length < maxFiles && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      openFilePicker();
                    }}
                    className="flex items-center justify-center rounded-lg border border-dashed border-borderGray bg-white/40 hover:bg-gray-50"
                    style={{ width: 240, height: 240 }}
                  >
                    <div className="text-center text-sm text-gray-600">
                      <div className="mb-2">+ Add</div>
                      <div className="text-xs">PNG, JPG, PDF • up to 10MB</div>
                    </div>
                  </div>
                )}
              </div>

              {(errors[name] || localError) && (
                <p className="text-red-500 text-sm mt-1">
                  {localError ?? String(errors[name]?.message)}
                </p>
              )}
            </div>
          );
        }}
      />
    </div>
  );
};

export default ImageInputField;