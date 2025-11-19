"use client";
import { CoinList } from "@/components/CoinList/CoinList";
import { fetchPopCoins } from "@/lib/api";
import { useFavoritesStore } from "@/lib/store/favoritesStore";
import { useQuery } from "@tanstack/react-query";

export default function FavoritesPage() {
  const { favorites } = useFavoritesStore();
  const { data: coins, isSuccess } = useQuery({
    queryKey: ["coin", favorites],
    queryFn: () => fetchPopCoins(undefined, favorites),
    enabled: favorites.length > 0,
  });

  return <>{isSuccess && <CoinList coins={coins} />}</>;
}
