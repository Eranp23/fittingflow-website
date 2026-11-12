"use client";

import React, { createContext, useContext, useState } from "react";
import DemoRequestForm from "@/components/landing/DemoRequestForm";

type DemoModalContextType = {
  openDemo: () => void;
  closeDemo: () => void;
};

const DemoModalContext = createContext<DemoModalContextType | undefined>(
  undefined
);

export const DemoModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <DemoModalContext.Provider
      value={{
        openDemo: () => setOpen(true),
        closeDemo: () => setOpen(false),
      }}
    >
      {children}

      <DemoRequestForm
        open={open}
        onClose={() => setOpen(false)}
      />
    </DemoModalContext.Provider>
  );
};

export const useDemoModal = () => {
  const context = useContext(DemoModalContext);

  if (!context) {
    throw new Error(
      "useDemoModal must be used inside DemoModalProvider"
    );
  }

  return context;
};