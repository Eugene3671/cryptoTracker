import { CoinDetails, Coins } from "@/types/coins";
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  params: {
    vs_currency: "usd",
    order: "market_cap_desc",
    per_page: 10,
  },
});

export async function fetchPopCoins(page?: number, ids?: string[]) {
  const res = await api.get<Coins[]>("/coins/markets", {
    params: {
      page: page,
      ids: ids?.join(","),
    },
  });
  return res.data;
}

export async function fetchSearchCoins(query: string) {
  const searchRes = await api.get<{ coins: { id: string }[] }>("/search", {
    params: { query },
  });

  const ids = searchRes.data.coins.map((c) => c.id).join(",");
  if (!ids) return [];

  const marketsRes = await api.get("/coins/markets", {
    params: {
      vs_currency: "usd",
      ids,
    },
  });

  return marketsRes.data;
}
export async function fetchCoinById(id: string) {
  const res = await api.get<CoinDetails>(`/coins/${id}`);
  return res.data;
}
