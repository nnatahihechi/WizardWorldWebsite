import Link from "next/link";
import { Header } from "../../components/header";
import { Spell, WElixirs, Wizard } from "../../interfaces";
import styles from "../../styles/styles.module.scss";
import { useMemo } from "react";

interface WizardProps {
  wizard: Wizard;
}
function Wizard({ wizard }: WizardProps) {
  const spells = useMemo(() => {
    if (typeof window !== "undefined") {
      const wizardSpell = localStorage.getItem(wizard.id);
      const spell = wizardSpell ? JSON.parse(wizardSpell) : [];
      return spell;
    }
    return [];
  }, [wizard.id]);
  return (
    <div className={styles.Detail}>
      <Header title={`Wizard - ${wizard.firstName}`} />
      <h1>Details</h1>
      <div className={styles.content}>
        <h4 className={styles.item}>First Name</h4>
        <p className={`${styles.item} ${styles.value}`}>{wizard.firstName}</p>
      </div>
      <div className={styles.content}>
        <h4 className={styles.item}>Last Name</h4>
        <p className={`${styles.item} ${styles.value}`}>{wizard.lastName}</p>
      </div>
      <div className={styles.content}>
        <h4 className={styles.item}>Elixirs</h4>
        <p className={`${styles.item} ${styles.value}`}>
          {wizard.elixirs.map((elixir: WElixirs) => (
            <Link className={styles.tag} href={`/elixirs/${elixir.id}`}>
              <div>{elixir.name}</div>
            </Link>
          ))}
        </p>
      </div>
      <div className={styles.content}>
        <h4 className={styles.item}>Spells</h4>
        <p className={`${styles.item} ${styles.value}`}>
          {spells.map((spell: Spell) => (
            <Link className={styles.tag} href={`/spells/${spell.id}`}>
              <div>{spell.name}</div>
            </Link>
          ))}
        </p>
      </div>
    </div>
  );
}
export default Wizard;

export async function getStaticPaths() {
  const response = await fetch(
    "https://wizard-world-api.herokuapp.com/Wizards"
  );
  const wizards = await response.json();

  const paths = wizards.map((wizard: Wizard) => ({
    params: { id: wizard.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const res = await fetch(
    `https://wizard-world-api.herokuapp.com/Wizards/${params.id}`
  );
  const wizard = await res.json();

  return { props: { wizard } };
}
