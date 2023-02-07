import { Elixir } from "../../interfaces";

export { default } from "./elixirs";

export async function getStaticProps() {
  const response = await fetch(
    "https://wizard-world-api.herokuapp.com/Elixirs"
  );
  const elixirs = await response.json();

  const difficulties = new Set();

  elixirs.forEach((elixir: Elixir) => difficulties.add(elixir.difficulty));
  return {
    props: {
      elixirs,
      difficulties: Array.from(difficulties),
    },
  };
}
