import React, { useState } from 'react';

const CategoryDropdown: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = ['Electronics', 'Fashion', 'Books', 'Home & Kitchen', 'Sports'];

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
    console.log(`Selected Category: ${event.target.value}`);
  };

  return (
    <div className="flex flex-col items-start">
      <label htmlFor="category-select" className="mb-2 font-medium">
        Select a Category:
      </label>
      <select
        id="category-select"
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="p-2 border border-gray-300 rounded-lg"
      >
        <option value="" disabled>
          -- Select an option --
        </option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      {selectedCategory && (
        <p className="mt-2 text-sm text-gray-600">
          You selected: <strong>{selectedCategory}</strong>
        </p>
      )}
    </div>
  );
};

export default CategoryDropdown;
