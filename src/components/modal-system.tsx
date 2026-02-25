"use client";

import { createContext, useContext, useMemo, useState } from "react";
import AuthModal from "@/components/modal/auth-modal";
import UploadModal from "@/components/modal/upload-modal";

type ModalType = "auth" | "upload";

type AuthModalOptions = {
  onClose?: () => void;
  onSuccess?: () => void;
};

type UploadModalOptions = {
  onClose?: () => void;
  onSuccess?: () => void;
};

type ModalState =
  | { type: null; options?: undefined }
  | { type: "auth"; options?: AuthModalOptions }
  | { type: "upload"; options?: UploadModalOptions };

type ModalContextValue = {
  openAuthModal: (options?: AuthModalOptions) => void;
  openUploadModal: (options?: UploadModalOptions) => void;
  closeModal: () => void;
  activeModal: ModalType | null;
};

const ModalContext = createContext<ModalContextValue | null>(null);

export function useModalSystem() {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error("useModalSystem must be used within ModalProvider");
  }
  return ctx;
}

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalState, setModalState] = useState<ModalState>({ type: null });

  const closeModal = () => {
    setModalState({ type: null });
  };

  const value = useMemo<ModalContextValue>(
    () => ({
      openAuthModal: (options) => setModalState({ type: "auth", options }),
      openUploadModal: (options) => setModalState({ type: "upload", options }),
      closeModal,
      activeModal: modalState.type,
    }),
    [modalState.type],
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      {modalState.type === "auth" && (
        <AuthModal
          onClose={() => {
            modalState.options?.onClose?.();
            closeModal();
          }}
          onSuccess={() => {
            modalState.options?.onSuccess?.();
          }}
        />
      )}
      {modalState.type === "upload" && (
        <UploadModal
          onClose={() => {
            modalState.options?.onClose?.();
            closeModal();
          }}
          onSuccess={() => {
            modalState.options?.onSuccess?.();
          }}
        />
      )}
    </ModalContext.Provider>
  );
}
