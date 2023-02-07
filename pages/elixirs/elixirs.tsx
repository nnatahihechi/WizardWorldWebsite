import { Elixir } from "../../interfaces";
import styles from "../../styles/styles.module.scss";
import Link from "next/link";
import { Header } from "../../components/header";
import { useState } from "react";
interface ElixirsProps {
  elixirs: Array<Elixir>;
  difficulties: Array<string>;
}

export const displayComponent = (data: Array<Elixir>) =>
  data.map(({ id, name, difficulty }) => (
    <Link
      className={styles.details}
      href={`/elixirs/${id}`}
      color="inherit"
      key={id}
    >
      <div>{name}</div>
      Difficulty - {difficulty}
    </Link>
  ));

export default function Elixirs({ elixirs, difficulties }: ElixirsProps) {
  const [searches, setSearches] = useState<Array<Elixir>>([]);
  const handleSearch = (text: string) => {
    const textToLower = text.toLowerCase();
    const filtered = elixirs.filter(
      (elixir) => elixir.name && elixir.name.toLowerCase().includes(textToLower)
    );
    setSearches(filtered);
  };

  const handleFilter = (difficulty: string) => {
    if (difficulty === "All") {
      setSearches(elixirs);
    }
    const filtered = elixirs.filter(
      (elixir) => elixir.difficulty === difficulty
    );
    setSearches(filtered);
  };
  return (
    <div className={styles.Main}>
      <Header title="Elixirs" />
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
          <label htmlFor="filter"> Filter by Difficulty</label>
          <select onChange={(e) => handleFilter(e.target.value)}>
            <option value="Select difficulty" disabled selected hidden>
              Select difficulty
            </option>
            <option value="All">All</option>
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </div>
      </div>
      <h4>Click any card to view more</h4>
      <div className={styles.list}>
        {displayComponent(searches.length ? searches : elixirs)}
      </div>
    </div>
  );
}
