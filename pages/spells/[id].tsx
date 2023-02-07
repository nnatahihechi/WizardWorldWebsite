import { Header } from "../../components/header";
import { Spell, Wizard } from "../../interfaces";
import styles from "../../styles/styles.module.scss";

interface SpellProps {
  spell: Spell;
  wizards: Array<Wizard>;
}
function Spell({ spell, wizards }: SpellProps) {
  const { id, ...otherSpellItems } = spell;
  const keys = Object.keys(otherSpellItems);

  const handleAssign = (wizardId: string) => {
    const wizardSpell = localStorage.getItem(wizardId);
    const wizard = wizards.find((wizard) => wizard.id === wizardId);
    if (!wizardSpell) {
      localStorage.setItem(wizardId, JSON.stringify([spell]));
    } else {
      const wizardSpellParsed = JSON.parse(wizardSpell);
      wizardSpellParsed.push(spell);
      localStorage.setItem(wizardId, JSON.stringify(wizardSpellParsed));
    }
    alert(`Spell assigned to ${wizard?.firstName} ${wizard?.lastName}`);
  };
  return (
    <div className={styles.Detail}>
      <Header title={`Spell - ${spell.name}`} />
      <div className={styles.search}>
        <select onChange={(e) => handleAssign(e.target.value)}>
          <option value="Select type" disabled selected hidden>
            Assign to Wizard
          </option>
          {wizards?.map((wizard) => (
            <option key={wizard.id} value={wizard.id}>
              {wizard.firstName} - {wizard.lastName}
            </option>
          ))}
        </select>
      </div>
      <h1>Details</h1>
      {keys.map((data, index) => (
        <div className={styles.content} key={data + index}>
          <h4 className={styles.item}>{data}</h4>
          <p className={`${styles.item} ${styles.value}`}>
            {spell[data as keyof typeof spell]}
          </p>
        </div>
      ))}
    </div>
  );
}
export default Spell;

export async function getStaticPaths() {
  const response = await fetch("https://wizard-world-api.herokuapp.com/Spells");
  const spells = await response.json();

  const paths = spells.map((spell: Spell) => ({
    params: { id: spell.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const res = await fetch(
    `https://wizard-world-api.herokuapp.com/Spells/${params.id}`
  );
  const spell = await res.json();

  const wizResp = await fetch(`https://wizard-world-api.herokuapp.com/Wizards`);

  const wizards = await wizResp.json();

  return { props: { spell, wizards } };
}
