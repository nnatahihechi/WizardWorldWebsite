import Image from "next/legacy/image";
import styles from "./header.module.scss";
import Link from "next/link";
interface HeaderProps {
  title: string;
}
function Header({ title }: HeaderProps) {
  return (
    <section className={styles.Header}>
      <div className={styles.banner}>
        <h2>{title}</h2>

        <div className={styles.item}>
          <Link className={styles.tag} href="/">
            Home
          </Link>
          <Link href="/wizards" className={styles.tag}>
            Wizards
          </Link>
          <Link href="/spells" className={styles.tag}>
            Spells
          </Link>
          <Link href="/elixirs" className={styles.tag}>
            Elixirs
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Header;
