"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

interface QueryWrapperProps {
  children?: React.ReactNode;
}

const queryClient = new QueryClient();

const queryWrapper = ({ children }: QueryWrapperProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      {children}
    </QueryClientProvider>
  );
};

export default queryWrapper;
