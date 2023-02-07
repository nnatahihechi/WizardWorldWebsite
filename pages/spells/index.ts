import { Spell } from "../../interfaces";

export { default } from "./spells";

export async function getStaticProps() {
  const response = await fetch("https://wizard-world-api.herokuapp.com/Spells");
  const spells = await response.json();

  const types = new Set();

  spells.forEach((elixir: Spell) => types.add(elixir.type));

  return {
    props: {
      spells,
      types: Array.from(types),
    },
  };
}
