import { useState } from "react";
import { ChevronDown, ChevronUp, Filter, Star } from "lucide-react";
import { Button } from "../ui/button.jsx";
import { Checkbox } from "../ui/checkbox.jsx";
import { Slider } from "../ui/slider.jsx";
import { Separator } from "../ui/separator.jsx";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "../ui/sheet.jsx";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible.jsx";
import { formatCurrency } from "../../lib/formatters.js";

export function FilterSidebar({
  brands = [],
  subcategories = [],
  priceRange = { min: 0, max: 100000 },
  filters,
  onFilterChange,
  onClearFilters,
}) {
  const [openSections, setOpenSections] = useState({
    price: true,
    brands: true,
    subcategories: true,
    ratings: true,
  });

  const toggleSection = (section) => {
    setOpenSections((current) => ({
      ...current,
      [section]: !current[section],
    }));
  };

  const handlePriceChange = (values) => {
    onFilterChange({
      ...filters,
      minPrice: values[0],
      maxPrice: values[1],
    });
  };

  const handleBrandChange = (brand, checked) => {
    const current = filters.brands || [];
    const next = checked ? [...current, brand] : current.filter((item) => item !== brand);
    onFilterChange({ ...filters, brands: next });
  };

  const handleSubcategoryChange = (subcategory, checked) => {
    const current = filters.subcategories || [];
    const next = checked
      ? [...current, subcategory]
      : current.filter((item) => item !== subcategory);
    onFilterChange({ ...filters, subcategories: next });
  };

  const handleRatingChange = (rating) => {
    onFilterChange({
      ...filters,
      minRating: filters.minRating === rating ? undefined : rating,
    });
  };

  const activeFiltersCount =
    (filters.brands?.length || 0) +
    (filters.subcategories?.length || 0) +
    (filters.minRating ? 1 : 0) +
    (filters.minPrice || filters.maxPrice ? 1 : 0);

  const FilterContent = () => (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">Filters</h3>
          {activeFiltersCount > 0 && (
            <p className="text-xs text-muted-foreground">{activeFiltersCount} active</p>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs"
          onClick={onClearFilters}
          data-testid="button-clear-filters"
        >
          Reset
        </Button>
      </div>

      <Separator />

      <Collapsible open={openSections.price} onOpenChange={() => toggleSection("price") }>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-1.5 text-sm font-medium">
          Price range
          {openSections.price ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-3">
          <div className="px-1">
            <Slider
              min={priceRange.min}
              max={priceRange.max}
              step={100}
              value={[filters.minPrice ?? priceRange.min, filters.maxPrice ?? priceRange.max]}
              onValueChange={handlePriceChange}
              className="mb-4"
              data-testid="slider-price"
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{formatCurrency(filters.minPrice ?? priceRange.min)}</span>
              <span>{formatCurrency(filters.maxPrice ?? priceRange.max)}</span>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {brands.length > 0 && (
        <>
          <Separator />
          <Collapsible open={openSections.brands} onOpenChange={() => toggleSection("brands") }>
            <CollapsibleTrigger className="flex w-full items-center justify-between py-1.5 text-sm font-medium">
              Brand
              {openSections.brands ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-3">
              <div className="max-h-48 space-y-2 overflow-y-auto pr-1">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={(filters.brands || []).includes(brand)}
                      onCheckedChange={(checked) => handleBrandChange(brand, !!checked)}
                      data-testid={`checkbox-brand-${brand.toLowerCase().replace(/\s+/g, "-")}`}
                    />
                    <span>{brand}</span>
                  </label>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </>
      )}

      {subcategories.length > 0 && (
        <>
          <Separator />
          <Collapsible
            open={openSections.subcategories}
            onOpenChange={() => toggleSection("subcategories")}
          >
            <CollapsibleTrigger className="flex w-full items-center justify-between py-1.5 text-sm font-medium">
              Subcategory
              {openSections.subcategories ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-3">
              <div className="max-h-48 space-y-2 overflow-y-auto pr-1">
                {subcategories.map((subcategory) => (
                  <label key={subcategory} className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={(filters.subcategories || []).includes(subcategory)}
                      onCheckedChange={(checked) =>
                        handleSubcategoryChange(subcategory, !!checked)
                      }
                      data-testid={`checkbox-subcategory-${subcategory
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    />
                    <span>{subcategory}</span>
                  </label>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </>
      )}

      <Separator />

      <Collapsible open={openSections.ratings} onOpenChange={() => toggleSection("ratings") }>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-1.5 text-sm font-medium">
          Customer ratings
          {openSections.ratings ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2">
          <div className="space-y-1.5">
            {[4, 3, 2, 1].map((rating) => {
              const selected = filters.minRating === rating;
              return (
                <button
                  key={rating}
                  type="button"
                  onClick={() => handleRatingChange(rating)}
                  className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm transition ${
                    selected ? "bg-primary/10 text-primary" : "hover:bg-muted"
                  }`}
                  data-testid={`button-rating-${rating}`}
                >
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={`h-3.5 w-3.5 ${
                          index < rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span>& up</span>
                </button>
              );
            })}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );

  return (
    <>
      <aside className="hidden w-72 shrink-0 lg:block">
        <div className="surface-card sticky top-24 p-4">
          <FilterContent />
        </div>
      </aside>

      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="h-10 rounded-xl" data-testid="button-filter-mobile">
              <Filter className="h-4 w-4" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="ml-1 rounded-full bg-primary px-1.5 py-0.5 text-[10px] text-primary-foreground">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-none p-0 sm:max-w-sm">
            <div className="h-full overflow-y-auto p-5">
              <SheetHeader className="mb-4 text-left">
                <SheetTitle>Refine results</SheetTitle>
              </SheetHeader>
              <FilterContent />
            </div>
            <div className="sticky bottom-0 border-t bg-background p-4">
              <SheetClose asChild>
                <Button className="w-full">Apply filters</Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
