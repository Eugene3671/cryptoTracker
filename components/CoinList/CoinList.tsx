"use client";

import { useFavoritesStore } from "@/lib/store/favoritesStore";
import { Coins } from "@/types/coins";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

interface CointListProps {
  coins: Coins[];
}

export function CoinList({ coins }: CointListProps) {
  const { favorites, setFavorites } = useFavoritesStore();

  return (
    <section>
      <ul className="space-y-4 mt-4">
        {coins.map((coin) => {
          const isFavorite = favorites.includes(coin.id);
          return (
            <li key={coin.id}>
              <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-between hover:bg-gray-700 transition">
                <button
                  onClick={() => {
                    setFavorites(coin.id);
                  }}
                  className="mr-4"
                >
                  <FaStar
                    size={20}
                    className={isFavorite ? "text-yellow-400" : "text-gray-500"}
                  />
                </button>

                <Link
                  className="flex items-center justify-between w-full"
                  href={`/coins/${coin.id}`}
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={coin.image}
                      alt={coin.name}
                      width={40}
                      height={40}
                      className="rounded-full w-10 h-auto"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{coin.name}</h3>
                      <p className="text-gray-400 uppercase">{coin.symbol}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">
                      ${coin.current_price.toLocaleString()}
                    </p>
                    <p
                      className={`${
                        coin.price_change_percentage_24h >= 0
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </p>
                  </div>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
