import styles from "./LocalUi.module.css";

interface SortOption {
  id: number;
  label: string;
  value: "exp-desc" | "exp-asc" | "name-asc" | "name-desc";
}

interface Props {
  sortOptions: SortOption[];
  selectedOption: SortOption | undefined;
  onSelectOption: (option: SortOption) => void;
}

const TeamSortBY = ({
  sortOptions,
  selectedOption,
  onSelectOption
}: Props) => {
  const selectedValue = selectedOption?.value || "";

  return (
    <label className={styles.fieldGroup}>
      <span className={styles.fieldLabel}>Sort teams</span>
      <select
        className={styles.selectField}
        onChange={(event) => {
          const nextOption = sortOptions.find(
            (sortOption) => sortOption.value === event.target.value
          );

          if (nextOption) {
            onSelectOption(nextOption);
          }
        }}
        value={selectedValue}
      >
        <option value="">Choose an order</option>
        {sortOptions.map((sortOption) => (
          <option key={sortOption.id} value={sortOption.value}>
            {sortOption.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default TeamSortBY;
