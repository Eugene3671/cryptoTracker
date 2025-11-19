import { fetchPopCoins } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CoinsClientPage from "./CoinsPageClient";

export default async function CoinsPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["coins"],
    queryFn: () => fetchPopCoins(1),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CoinsClientPage />
    </HydrationBoundary>
  );
}
