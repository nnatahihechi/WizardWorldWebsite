import Link from "next/link";
import { Header } from "../../components/header";
import { Elixir, Ingredient, Inventor, WElixirs } from "../../interfaces";
import styles from "../../styles/styles.module.scss";

interface ElixirProps {
  elixir: Elixir;
}
function Elixir({ elixir }: ElixirProps) {
  const { id, ingredients, inventors, ...otherElixirItems } = elixir;
  const keys = Object.keys(otherElixirItems).filter(
    (key) => key !== "ingredients" && key !== "inventors"
  );
  return (
    <div className={styles.Detail}>
      <Header title={`Elixir - ${elixir.name}`} />
      <h1>Details</h1>
      {keys.map((data, index) => (
        <div className={styles.content} key={data + index}>
          <h4 className={styles.item}>{data}</h4>
          <p className={`${styles.item} ${styles.value}`}>
            {otherElixirItems[data as keyof typeof otherElixirItems]}
          </p>
        </div>
      ))}
      <div className={styles.content}>
        <h4 className={styles.item}>Ingredients</h4>
        <p className={`${styles.item} ${styles.value}`}>
          {ingredients.map((ingredient: Ingredient) => (
            <div className={styles.tag}>{ingredient.name}</div>
          ))}
        </p>
      </div>
      <div className={styles.content}>
        <h4 className={styles.item}>Inventors</h4>
        <p className={`${styles.item} ${styles.value}`}>
          {inventors.map((inventor: Inventor) => (
            <div className={styles.tag}>
              {inventor.firstName} {inventor.lastName}
            </div>
          ))}
        </p>
      </div>
    </div>
  );
}
export default Elixir;

export async function getStaticPaths() {
  const response = await fetch(
    "https://wizard-world-api.herokuapp.com/Elixirs"
  );
  const elixirs = await response.json();

  const paths = elixirs.map((elixir: Elixir) => ({
    params: { id: elixir.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const res = await fetch(
    `https://wizard-world-api.herokuapp.com/Elixirs/${params.id}`
  );
  const elixir = await res.json();

  return { props: { elixir } };
}
