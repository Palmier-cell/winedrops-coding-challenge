import { useEffect, useState } from "react";
import SearchComponent from "./components/Search";
import WineList from "./components/WineList";
import FilterButtons from "./components/FilterButton";
import './index.css';

type Wine = {
  name: string;
  vintage: number;
  total_bottles_sold: number;
  total_revenue: number;
  total_orders: number;
};

export default function Home() {
  const [wines, setWines] = useState<Wine[]>([]);
  const [filter, setFilter] = useState("revenue");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/wines")
      .then((response) => response.json())
      .then((data) => setWines(data));
  }, []);

  // Filter wines based on search term
  const filteredWines = wines.filter(
    (wine) =>
      wine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wine.vintage.toString().includes(searchTerm)
  );

  // Sort the filtered wines based on the selected filter
  const sortedWines = [...filteredWines].sort((a, b) => {
    switch (filter) {
      case "revenue":
        return b.total_revenue - a.total_revenue;
      case "quantity":
        return b.total_bottles_sold - a.total_bottles_sold;
      case "orders":
        return b.total_orders - a.total_orders;
      default:
        return 0;
    }
  });

  const top10PercentIndex = Math.floor(sortedWines.length * 0.1);
  const bottom10PercentIndex = sortedWines.length - top10PercentIndex;

  return (
    <div className="home-container">
      <h1 className="home-title">Best Selling Wine</h1>

      <FilterButtons filter={filter} setFilter={setFilter} />

      <SearchComponent setSearchTerm={setSearchTerm} searchTerm={searchTerm} />

      <WineList
        wines={sortedWines}
        top10PercentIndex={top10PercentIndex}
        bottom10PercentIndex={bottom10PercentIndex}
      />
    </div>
  );
}
