import { CoinList } from "@/components/CoinList/CoinList";
import { fetchPopCoins } from "@/lib/api";

export default async function Home() {
  const res = await fetchPopCoins(1);
  return (
    <div className="flex flex-col items-center px-6 py-10 text-white min-h-screen">
      {/* Інформація про сайт */}
      <div className="text-center mb-10 max-w-2xl">
        <h1 className="text-4xl font-bold text-blue-400">💰 Crypto Tracker</h1>
        <p className="text-gray-400 mt-3">
          Відстежуй ціни криптовалют у реальному часі, дивись популярні монети
          та отримуй актуальні дані з CoinGecko API.
        </p>
      </div>
      {/* Популярні монети */}
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Популярні монети
        </h2>
        <CoinList coins={res} />
      </div>
    </div>
  );
}
