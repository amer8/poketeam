import styles from "./LocalUi.module.css";

interface Props {
  baseExp: number;
}

const ExpTag = ({ baseExp }: Props) => {
  return (
    <span className={styles.expTag}>
      <span className={styles.expLabel}>EXP</span>
      <span className={styles.expValue}>{baseExp || "?"}</span>
    </span>
  );
};

export default ExpTag;
