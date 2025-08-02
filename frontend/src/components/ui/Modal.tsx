"use client";
import { CircleX } from "lucide-react";
import React, { useRef, useEffect } from "react";



export interface ModalProps {
  isOpen: boolean;
  title?: string,
  onClose: () => void;
}

interface RequiredModalProps extends ModalProps{
  children: React.ReactNode;
  showCloseButton?: boolean; // New prop to control close button visibility
  isFullscreen?: boolean; // Default to false for backwards compatibility
    className?: string;
}

export const Modal: React.FC<RequiredModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
  title,
  showCloseButton = true, // Default to true for backwards compatibility
  isFullscreen = false,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const contentClasses = isFullscreen
    ? "w-full h-full"
    : "relative rounded-lg bg-white  dark:bg-zinc-900 shadow-lg";

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-y-auto modal z-99999">
      {!isFullscreen && (
        <div
          className="fixed inset-0 h-full w-full bg-zinc-400/5 backdrop-blur-[32px]"
          onClick={onClose}
        ></div>
      )}
      <div
        ref={modalRef}
        className={`${contentClasses}  ${className}`}
        onClick={(e) => e.stopPropagation()}
      >

        <div className="p-4 flex flex-row gap-3 items-center justify-between">
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold text-xl">{title}</span>
          {showCloseButton && (
            <button
              title="Close"
              onClick={onClose}
              className="flex items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-colors hover:bg-zinc-200 hover:text-zinc-800 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white p-1 transition-colors duration-400 ease-in-out"
            >
              <CircleX />
            </button>
          )}
        </div>

         <hr className="border-t-1 dark:border-zinc-700" />

        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
