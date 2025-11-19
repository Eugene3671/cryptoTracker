
export interface Coins{
     id: string;
    name: string;
    symbol: string;
    image: string;
    current_price: number;
    price_change_percentage_24h: number;
  market_cap: number;
  market_cap_rank: number;
    total_volume: number;
    high_24h: number;
    low_24h: number;
}

export interface CoinDetails {
  id: string;
  symbol: string;
  name: string;
  hashing_algorithm: string | null;
  description: {
    en: string;
  };
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  market_cap_rank: number | null;
  genesis_date: string | null;
  market_data: {
    current_price: {
      usd: number;
    };
  };
  links: {
    homepage: string[];
    whitepaper: string;
  };
}