import React from "react";
import Input from "../../Inputs/input";

interface SelectCategoryProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  // Fields for table
  height: string;
  setHeight: React.Dispatch<React.SetStateAction<string>>;
  weight: string;
  setWeight: React.Dispatch<React.SetStateAction<string>>;
  woodType: string;
  setWoodType: React.Dispatch<React.SetStateAction<string>>;
  // Fields for chair
  width: string;
  setWidth: React.Dispatch<React.SetStateAction<string>>;
  seatHeight: string;
  setSeatHeight: React.Dispatch<React.SetStateAction<string>>;
  totalHeight: string;
  setTotalHeight: React.Dispatch<React.SetStateAction<string>>;
}

const SelectCategory: React.FC<SelectCategoryProps> = ({
  value,
  onChange,
  // Table Fields
  height,
  setHeight,
  weight,
  setWeight,
  woodType,
  setWoodType,
  // Chair Fields
  width,
  setWidth,
  seatHeight,
  setSeatHeight,
  totalHeight,
  setTotalHeight,
}) => {
  return (
    <div className="flex flex-col p-2 space-y-6 border-2 border-gray-400 dark:border-gray-600 pt-6">
      {/* Category Selection */}
      <label
        htmlFor="category"
        className="font-bold text-gray-700 dark:text-black"
      >
        Category
      </label>
      <select
        id="category"
        name="category"
        value={value}
        onChange={onChange}
        className="w-full p-3 rounded border border-black dark:border-gray-600 dark:bg-slate-600 dark:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black transition duration-300"
        required
      >
        <option value="">Select a category</option>
        <option value="Chairs">Chairs</option>
        <option value="Armchairs">Armchairs</option>
        <option value="Lounge Seatings">Lounge Seatings</option>
        <option value="Barstools">Barstools</option>
        <option value="Tables">Tables</option>
        <option value="Accessories">Accessories</option>
      </select>

      {/* Table-specific fields */}
      {value === "Tables" && (
        <>
        <div className="flex flex-col">
            <label
              htmlFor="width"
              className="font-bold text-gray-700 dark:text-black"
            >
              Width (cm)
            </label>
            <Input
              data-cy="product-width-input"
              type="number"
              id="width"
              name="width"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="w-full p-3 rounded border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-500 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 transition duration-300"
              placeholder="Enter the chair width"
              required
              min="0"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="height"
              className="font-bold text-gray-700 dark:text-black"
            >
              Height
            </label>
            <Input
              data-cy="product-height-input"
              type="number"
              id="height"
              name="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full p-3 rounded border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-500 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 transition duration-300"
              placeholder="Enter the product height"
              required
              min="0"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="weight"
              className="font-bold text-gray-700 dark:text-black"
            >
              Weight (kg)
            </label>
            <Input
              data-cy="product-weight-input"
              type="number"
              id="weight"
              name="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full p-3 rounded border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-500 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 transition duration-300"
              placeholder="Enter the weight in kg"
              required
              min="0"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="woodType"
              className="font-bold text-gray-700 dark:text-black"
            >
              Wood Type
            </label>
            <Input
              data-cy="product-wood-type-input"
              type="text"
              id="woodType"
              name="woodType"
              value={woodType}
              onChange={(e) => setWoodType(e.target.value)}
              className="w-full p-3 rounded border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-500 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 transition duration-300"
              placeholder="Enter the wood type"
              required
              min="0"
            />
          </div>
        </>
      )}

      {/* Chair/Armchairs/LoungeSeatings/Bearstools-specific fields */}
      {(value === "Chairs" || value === "Armchairs" || value === "Barstools" || value === "Lounge Seatings") && (
        <>
          <div className="flex flex-col">
            <label
              htmlFor="width"
              className="font-bold text-gray-700 dark:text-black"
            >
              Width (cm)
            </label>
            <Input
              data-cy="product-width-input"
              type="number"
              id="width"
              name="width"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="w-full p-3 rounded border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-500 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 transition duration-300"
              placeholder="Enter the chair width"
              required
              min="0"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="width"
              className="font-bold text-gray-700 dark:text-black"
            >
              Total Heigth (cm)
            </label>
            <Input
              data-cy="product-width-input"
              type="number"
              id="totalHeight"
              name="totalHeight"
              value={totalHeight}
              onChange={(e) => setTotalHeight(e.target.value)}
              className="w-full p-3 rounded border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-500 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 transition duration-300"
              placeholder="Enter the chair width"
              required
              min="0"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="seatHeight"
              className="font-bold text-gray-700 dark:text-black"
            >
              Seat Height (cm)
            </label>
            <Input
              data-cy="product-total-height-input"
              type="number"
              id="seatHeight"
              name="seatHeight"
              value={seatHeight}
              onChange={(e) => setSeatHeight(e.target.value)}
              className="w-full p-3 rounded border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-500 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 transition duration-300"
              placeholder="Enter the seat height"
              required
              min="0"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="weight"
              className="font-bold text-gray-700 dark:text-black"
            >
              Weight (kg)
            </label>
            <Input
              data-cy="product-weight-input"
              type="number"
              id="weight"
              name="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full p-3 rounded border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-500 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 transition duration-300"
              placeholder="Enter the weight in kg"
              required
              min="0"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="woodType"
              className="font-bold text-gray-700 dark:text-black"
            >
              Wood Type
            </label>
            <Input
              data-cy="product-wood-type-input"
              type="text"
              id="woodType"
              name="woodType"
              value={woodType}
              onChange={(e) => setWoodType(e.target.value)}
              className="w-full p-3 rounded border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-500 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 transition duration-300"
              placeholder="Enter the wood type"
              required
              min="0"
            />
          </div>
        </>
      )}
      {value === "Accessories" && (
        <>
          <div className="flex flex-col">
            <label
              htmlFor="width"
              className="font-bold text-gray-700 dark:text-black"
            >
              Width (cm)
            </label>
            <Input
              data-cy="product-width-input"
              type="number"
              id="width"
              name="width"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="w-full p-3 rounded border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-500 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 transition duration-300"
              placeholder="Enter accessories width"
              required
              min="0"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="height"
              className="font-bold text-gray-700 dark:text-black"
            >
              Heigth (cm)
            </label>
            <Input
              data-cy="product-height-input"
              type="number"
              id="height"
              name="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full p-3 rounded border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-500 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 transition duration-300"
              placeholder="Enter the accessories height"
              required
              min="0"
            />
          </div>
          

          <div className="flex flex-col">
            <label
              htmlFor="weight"
              className="font-bold text-gray-700 dark:text-black"
            >
              Weight (kg)
            </label>
            <Input
              data-cy="product-weight-input"
              type="number"
              id="weight"
              name="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full p-3 rounded border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-500 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 transition duration-300"
              placeholder="Enter the weight in kg"
              required
              min="0"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="woodType"
              className="font-bold text-gray-700 dark:text-black"
            >
              Wood Type
            </label>
            <Input
              data-cy="product-wood-type-input"
              type="text"
              id="woodType"
              name="woodType"
              value={woodType}
              onChange={(e) => setWoodType(e.target.value)}
              className="w-full p-3 rounded border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-500 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 transition duration-300"
              placeholder="Enter the wood type"
              required
              min="0"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SelectCategory;
