import { fetchCoinById } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { CoinDetailsClient } from "./Coin.client";

type Props = {
  params: Promise<{ id: string }>;
};
export default async function CoinDetails({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["coin", id],
    queryFn: () => fetchCoinById(id),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CoinDetailsClient />
    </HydrationBoundary>
  );
}
