// src/components/SidebarFilters.tsx
import React, { useState } from "react";

export const SidebarFilters: React.FC<{
  onFilter: (opts: any) => void;
}> = ({ onFilter }) => {
  const [category, setCategory] = useState("");
  const [priceRange] = useState<[number, number]>([0, 10000]);
  // … brand, rating, discount
  const handleApply = () => {
    onFilter({ category, priceRange /* … */ });
  };
  return (
    <div className="sidebar">
      <h3>Filters</h3>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        {/* fill from your product data */}
      </select>
      {/* price range slider, rating dropdown, discount checkbox… */}
      <button onClick={handleApply}>Apply</button>
    </div>
  );
};
