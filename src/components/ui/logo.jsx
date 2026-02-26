import { BRAND_NAME, BRAND_SHORT, BRAND_TAGLINE } from "../../lib/brand.js";

export function BrandLogo() {
  return (
    <div className="group flex cursor-pointer items-center gap-2">
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-sky-500 via-blue-600 to-cyan-500 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-blue-500/35" />
        <div className="absolute inset-1 rounded-lg bg-gradient-to-br from-cyan-300/80 to-blue-400/80" />
        <div className="absolute inset-2 flex items-center justify-center rounded-md bg-white/90">
          <span className="bg-gradient-to-br from-blue-700 to-cyan-600 bg-clip-text text-xl font-black text-transparent">
            {BRAND_SHORT}
          </span>
        </div>
      </div>

      <div className="hidden sm:block">
        <h1 className="text-xl font-black tracking-tight text-foreground md:text-2xl">{BRAND_NAME}</h1>
        <p className="text-xs font-semibold text-muted-foreground">{BRAND_TAGLINE}</p>
      </div>
    </div>
  );
}
