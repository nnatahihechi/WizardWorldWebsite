export interface WElixirs {
  id: string;
  name: string;
}
export interface Wizard {
  id: string;
  elixirs: Array<WElixirs>;
  firstName: string;
  lastName: string;
}

export interface Ingredient {
  id: string;
  name: string;
}
export interface Inventor {
  id: string;
  firstName: string;
  lastName: string;
}
export interface Elixir {
  id: string;
  name: string;
  effect: string;
  sideEffects: string;
  characteristics: string;
  time: string;
  difficulty: string;
  ingredients: Array<Ingredient>;
  inventors: Array<Inventor>;
  manufacturer: string;
}

export interface Spell {
  id: string;
  name: string;
  incantation: string;
  effect: string;
  canBeVerbal: boolean;
  type: string;
  light: string;
  creator: string;
}
