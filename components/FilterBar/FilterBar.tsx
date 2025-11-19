"use client";

interface FilterBarProps {
  filterOption: string;
  setFilterOption: (option: string) => void;
}

export function FilterBar({ filterOption, setFilterOption }: FilterBarProps) {
  return (
    <div className="flex items-center justify-end gap-2 mt-4">
      <label htmlFor="filter" className="text-gray-400">
        Filter:
      </label>
      <select
        id="filter"
        value={filterOption}
        onChange={(e) => setFilterOption(e.target.value)}
        className="bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700"
      >
        <option value="all">All Coins</option>
        <option value="top100">Top 100</option>
        <option value="gainers">Gainers</option>
        <option value="losers">Losers</option>
      </select>
    </div>
  );
}
