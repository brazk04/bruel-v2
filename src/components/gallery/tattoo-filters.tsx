import { tattooCategories, type TattooCategory } from "@/types/tattoo-work";

export function TattooFilters({ active, onChange }: { active: TattooCategory | "Todos"; onChange: (category: TattooCategory | "Todos") => void }) {
  return <div className="tattoo-filters" role="group" aria-label="Filtrar trabalhos por categoria">
    {tattooCategories.map(category => <button type="button" key={category} className={active === category ? "tattoo-filter-active" : ""} aria-pressed={active === category} onClick={() => onChange(category)}>{category}</button>)}
  </div>;
}
