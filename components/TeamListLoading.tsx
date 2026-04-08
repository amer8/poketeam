import styles from "./LocalUi.module.css";

const TeamListLoading = () => {
  return (
    <div className={styles.loadingRoot}>
      <div aria-label="Loading teams" className={styles.spinner} role="status" />
    </div>
  );
};

export default TeamListLoading;
