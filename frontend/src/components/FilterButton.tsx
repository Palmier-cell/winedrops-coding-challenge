import React from "react";
import './style.css'; 

type FilterButtonsProps = {
  filter: string;
  setFilter: (filter: string) => void;
};

const FilterButtons: React.FC<FilterButtonsProps> = ({ filter, setFilter }) => {
  return (
    <div className="filter-buttons">
      <button
        className={`filter-button ${filter === "revenue" ? "revenue" : ""}`}
        onClick={() => setFilter("revenue")}
      >
        By revenue
      </button>
      <button
        className={`filter-button ${filter === "quantity" ? "quantity" : ""}`}
        onClick={() => setFilter("quantity")}
      >
        By # bottles sold
      </button>
      <button
        className={`filter-button ${filter === "orders" ? "orders" : ""}`}
        onClick={() => setFilter("orders")}
      >
        By # orders
      </button>
    </div>
  );
};

export default FilterButtons;
