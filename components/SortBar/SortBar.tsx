interface SortOptionProps {
  sortOption: string;
  setSortOption: (option: string) => void;
}
export function SortBar({ sortOption, setSortOption }: SortOptionProps) {
  return (
    <div className="flex items-center justify-end mt-6 gap-2">
      <label htmlFor="sort" className="text-gray-400">
        Sort by:
      </label>
      <select
        id="sort"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700"
      >
        <option value="rank">Market Cap Rank</option>
        <option value="price">Price</option>
        <option value="name">Name</option>
        <option value="change">24h Change</option>
      </select>
    </div>
  );
}
