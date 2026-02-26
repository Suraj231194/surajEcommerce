import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select.jsx";

const sortOptions = [
  { value: "newest", label: "Newest Arrivals" },
  { value: "relevance", label: "Recommended" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Customer Rating" },
  { value: "discount", label: "Discount" },
];

export function SortSelect({ value, onChange }) {
  return (
    <Select value={value || "newest"} onValueChange={onChange}>
      <SelectTrigger
        className="h-10 w-full min-w-[14rem] rounded-xl border-border/80 bg-card shadow-sm sm:w-56"
        data-testid="select-sort"
      >
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem 
            key={option.value} 
            value={option.value}
            data-testid={`option-sort-${option.value}`}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
