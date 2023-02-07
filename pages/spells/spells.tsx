import { Spell } from "../../interfaces";
import styles from "../../styles/styles.module.scss";
import Link from "next/link";
import { Header } from "../../components/header";
import { useState } from "react";
interface SpellsProps {
  spells: Array<Spell>;
  types: Array<string>;
}

export const displayComponent = (data: Array<Spell>) =>
  data.map(({ id, name, type }) => (
    <Link
      className={styles.details}
      href={`/spells/${id}`}
      color="inherit"
      key={id}
    >
      <div>{name}</div>
      Type - {type}
    </Link>
  ));

export default function Spells({ spells, types }: SpellsProps) {
  const [searches, setSearches] = useState<Array<Spell>>([]);
  const handleSearch = (text: string) => {
    const textToLower = text.toLowerCase();
    const filtered = spells.filter(
      (spell) => spell.name && spell.name.toLowerCase().includes(textToLower)
    );
    setSearches(filtered);
  };

  const handleFilter = (type: string) => {
    if (type === "All") {
      setSearches(spells);
    }
    const filtered = spells.filter((spell) => spell.type === type);
    setSearches(filtered);
  };
  return (
    <div className={styles.Main}>
      <Header title="Spells" />
      <div className={styles.searchSection}>
        <div className={styles.search}>
          <label htmlFor="search"> Search by name</label>
          <input
            type="text"
            onChange={(e) => handleSearch(e.target.value)}
            name="search"
          />
        </div>
        <div className={styles.search}>
          <label htmlFor="filter"> Filter by Type</label>
          <select onChange={(e) => handleFilter(e.target.value)}>
            <option value="Select type" disabled selected hidden>
              Select type
            </option>
            <option value="All">All</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
      <h4>Click any card to view more</h4>
      <div className={styles.list}>
        {displayComponent(searches.length ? searches : spells)}
      </div>
    </div>
  );
}
