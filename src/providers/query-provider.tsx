"use client";
import { isServer } from "@/lib/validators/productSchema";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

let browserQueryClient: QueryClient | undefined = undefined;
function makeQueryClient() {
  return new QueryClient();
}
//singleton pattern
function getQueryClient() {
  //we are on server
  if (isServer) {
    return makeQueryClient();
  } else {
    //we are on client
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient();
    }
    return browserQueryClient;
  }
}

const queryClient = getQueryClient();

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
