import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "../../data/products.js";
import { SectionHeading } from "./SectionHeading.jsx";

const SHOWCASE = categories.slice(0, 8);

export function CategoryShowcase() {
  return (
    <section className="py-10">
      <div className="container-shell">
        <SectionHeading
          title="Featured Categories"
          description="Browse collections tailored for trending lifestyles and everyday essentials."
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {SHOWCASE.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group surface-card overflow-hidden p-3 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-3 aspect-[4/3] overflow-hidden rounded-xl">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold md:text-base">{category.name}</p>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:text-primary" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
