import Image from "next/legacy/image";
import styles from "../styles/Card.module.css";
import Link from "next/link";

function WizardCard() {
  return (
    <>
      <div className={styles.main}>
        <h1>
          Welcome to Wizarding World <br /> What would you like to see
        </h1>
        <div className={styles.card}>
          {/* link to the detail page */}
          <Link href="/wizards" color="inherit">
            <div className={styles.img}>
              <img
                src="/images/wiz.jpg"
                alt="Wizard"
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <div className={styles.container}>
                <span>Wizards</span>
              </div>
            </div>
          </Link>

          {/* link to the detail page */}
          <Link href={"/elixirs"}>
            <div className={styles.img}>
              <img
                src="/images/Elixirs.jpg"
                alt="Elixirs"
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <div className={styles.container}>
                <span>Elixirs</span>
              </div>
            </div>
          </Link>

          {/* link to the detail page */}
          <Link href={"/spells"}>
            <div className={styles.img}>
              <img
                src="/images/spells.jpg"
                alt="Spells"
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <div className={styles.container}>
                <span>Spells</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
export default WizardCard;
