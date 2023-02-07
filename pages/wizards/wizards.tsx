import Link from "next/link";
import { Header } from "../../components/header";
import { Wizard } from "../../interfaces";
import styles from "../../styles/styles.module.scss";
import { useState } from "react";

interface WizardProps {
  wizards: Array<Wizard>;
}

const displayComponent = (data: Array<Wizard>) =>
  data.map(({ id, firstName, lastName }) => (
    <Link
      className={styles.details}
      href={`/wizards/${id}`}
      color="inherit"
      key={id}
    >
      <div>
        {firstName} {lastName}
      </div>
    </Link>
  ));

function Wizards({ wizards }: WizardProps) {
  const [searches, setSearches] = useState<Array<Wizard>>([]);
  const handleSearch = (text: string) => {
    const textToLower = text.toLowerCase();
    const filtered = wizards.filter(
      (wizard) =>
        (wizard.firstName &&
          wizard.firstName.toLowerCase().includes(textToLower)) ||
        (wizard.lastName && wizard.lastName.toLowerCase().includes(textToLower))
    );
    setSearches(filtered);
  };
  return (
    <div className={styles.Main}>
      <Header title="Wizards" />
      <div className={styles.search}>
        <label htmlFor="search"> Search by Firstname or Lastname</label>
        <input
          type="text"
          onChange={(e) => handleSearch(e.target.value)}
          name="search"
        />
      </div>
      <h4>Click any card to view more</h4>
      <div className={styles.list}>
        {displayComponent(searches.length ? searches : wizards)}
      </div>
    </div>
  );
}
export default Wizards;
