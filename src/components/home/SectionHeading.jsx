import { cn } from "../../lib/utils.js";

export function SectionHeading({ title, description, action, className }) {
  return (
    <div className={cn("mb-6 flex items-end justify-between gap-3", className)}>
      <div>
        <h2 className="section-title">{title}</h2>
        {description && <p className="section-subtitle">{description}</p>}
      </div>
      {action}
    </div>
  );
}
