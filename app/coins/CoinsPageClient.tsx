"use client";

import { CoinList } from "@/components/CoinList/CoinList";
import { FilterBar } from "@/components/FilterBar/FilterBar";
import LoadMoreBtn from "@/components/LoadMoreBtn/LoadMoreBtn";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { SortBar } from "@/components/SortBar/SortBar";
import { fetchPopCoins, fetchSearchCoins } from "@/lib/api";
import { Coins } from "@/types/coins";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

export default function CoinsClientPage() {
  const [query, setQuery] = useState("");
  const [debounceQuery] = useDebounce(query, 1000);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sortOption, setSortOption] = useState("rank");
  const [filterOption, setFilterOption] = useState("all");
  const [coins, setCoins] = useState<Coins[]>([]);
  const PAGE_SIZE = 10;

  const { data: popularCoins } = useQuery({
    queryKey: ["coins", "popular", page],
    queryFn: () => fetchPopCoins(page),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const { data: searchCoins } = useQuery({
    queryKey: ["coins", "search", debounceQuery],
    queryFn: () => fetchSearchCoins(debounceQuery),
    placeholderData: keepPreviousData,
  });
  useEffect(() => {
    const newCoins = debounceQuery.trim()
      ? (searchCoins ?? [])
      : (popularCoins ?? []);
    if (!newCoins.length) {
      setHasMore(false);
      return;
    }

    if (page === 1) {
      setCoins(newCoins);
    } else {
      setCoins((prev) => {
        const combined = [...prev, ...newCoins];
        const uniqueCoins = combined.filter(
          (coin, index, self) =>
            self.findIndex((c) => c.id === coin.id) === index
        );
        return uniqueCoins;
      });
      setHasMore(newCoins.length >= PAGE_SIZE);
    }

    if (newCoins.length < PAGE_SIZE) setHasMore(false);
  }, [popularCoins, searchCoins, page, debounceQuery]);
  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const filteredCoins = (coins ?? []).filter((coin: Coins) => {
    if (filterOption === "top100") return coin.market_cap_rank <= 100;
    if (filterOption === "gainers") return coin.price_change_percentage_24h > 0;
    if (filterOption === "losers") return coin.price_change_percentage_24h < 0;
    return true;
  });

  const sortedCoins = useMemo(() => {
    if (!filteredCoins) return [];
    return [...filteredCoins].sort((a, b) => {
      switch (sortOption) {
        case "price":
          return b.current_price - a.current_price;
        case "name":
          return a.name.localeCompare(b.name);
        case "change":
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        default:
          return a.market_cap_rank - b.market_cap_rank;
      }
    });
  }, [filteredCoins, sortOption]);
  return (
    <div className=" w-full max-w-4xl  mx-auto pt-10">
      <SearchBar value={query} onChange={setQuery} />
      <FilterBar
        filterOption={filterOption}
        setFilterOption={setFilterOption}
      />
      <SortBar sortOption={sortOption} setSortOption={setSortOption} />
      {sortedCoins && <CoinList coins={sortedCoins} />}
      {hasMore && <LoadMoreBtn handleClick={handleLoadMore} />}
    </div>
  );
}
