import styles from "./LocalUi.module.css";

interface Props {
  onSelectType: (type: string) => void;
  selectedType: string | undefined;
  availableTypes: string[];
}

const TeamListFilter = ({
  availableTypes,
  onSelectType,
  selectedType,
}: Props) => {
  const getTypeLabel = (type: string) => `${type.charAt(0).toUpperCase()}${type.slice(1)}`;

  return (
    <label className={styles.fieldGroup}>
      <span className={styles.fieldLabel}>Type</span>
      <select
        className={styles.selectField}
        onChange={(event) => onSelectType(event.target.value)}
        value={selectedType || ""}
      >
        <option value="">All types</option>
        {availableTypes.map((type) => (
          <option key={type} value={type}>
            {getTypeLabel(type)}
          </option>
        ))}
      </select>
    </label>
  );
};

export default TeamListFilter;
