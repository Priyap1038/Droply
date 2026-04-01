"use client";

import { Spinner } from "@heroui/spinner";

export default function FileLoadingState() {
  return (
    <div className="flex flex-col justify-center items-center py-32 space-y-6">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
        <Spinner size="lg" color="primary" className="relative z-10" />
      </div>
      <p className="text-muted-foreground font-bold tracking-wide animate-pulse">Synchronizing your workspace...</p>
    </div>
  );
}