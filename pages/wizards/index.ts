export { default } from "./wizards";

export async function getStaticProps() {
  const response = await fetch(
    "https://wizard-world-api.herokuapp.com/Wizards"
  );
  const wizards = await response.json();
  return {
    props: {
      wizards,
    },
  };
}
