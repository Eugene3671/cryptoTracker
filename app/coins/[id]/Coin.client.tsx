"use client";

import { fetchCoinById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";

export function CoinDetailsClient() {
  const { id } = useParams<{ id: string }>();
  const {
    data: coin,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["coin", id],
    queryFn: () => fetchCoinById(id),
    refetchOnMount: false,
  });
  if (isLoading) return <p>Loading, please wait...</p>;

  if (isError || !coin) return <p>Something went wrong.</p>;

  return (
    <>
      <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-xl shadow-lg">
        {/* Назва і логотип */}
        <div className="flex items-center gap-4 mb-6">
          <Image
            src={coin.image.large}
            alt={coin.name}
            width={64}
            height={64}
            className="rounded-full"
          />
          <div>
            <h1 className="text-3xl font-bold">{coin.name}</h1>
            <p className="text-gray-400 uppercase">{coin.symbol}</p>
          </div>
        </div>

        {/* Ціна і ринковий ранг */}
        <div className="bg-gray-800 rounded-xl p-4 mb-6">
          <p className="text-lg">
            <span className="font-semibold">Current Price:</span> $
            {coin.market_data.current_price.usd.toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">Market Cap Rank:</span> #
            {coin.market_cap_rank}
          </p>
          <p>
            <span className="font-semibold">Hashing Algorithm:</span>{" "}
            {coin.hashing_algorithm || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Genesis Date:</span>{" "}
            {coin.genesis_date || "Unknown"}
          </p>
        </div>

        {/* Опис */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">About</h2>
          <p
            className="text-gray-300 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: coin.description.en || "No description available.",
            }}
          />
        </div>

        {/* Посилання */}
        <div className="bg-gray-800 rounded-xl p-4 space-y-2">
          <h2 className="text-xl font-semibold">Official Links</h2>
          {coin.links.homepage[0] && (
            <a
              href={coin.links.homepage[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline block"
            >
              Website
            </a>
          )}
          {coin.links.whitepaper && (
            <a
              href={coin.links.whitepaper}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline block"
            >
              Whitepaper
            </a>
          )}
        </div>
      </div>
    </>
  );
}
