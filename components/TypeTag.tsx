export type PokemonTypes =
  | "normal"
  | "fighting"
  | "flying"
  | "ground"
  | "poison"
  | "rock"
  | "bug"
  | "ghost"
  | "steel"
  | "fire"
  | "water"
  | "grass"
  | "electric"
  | "psychic"
  | "ice"
  | "dragon"
  | "dark"
  | "fairy"
  | "unknown"
  | "shadow";

export function TypeTag({ name }: { name: PokemonTypes }) {
  return (
    <span
      key={name}
      className={`h-6 capitalize text-xs flex items-center bg-red-100 text-red-800 font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300`}
    >
      {name}
    </span>
  );
}
