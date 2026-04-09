import Head from "next/head";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import ListFilter from "@/components/TeamListFilter";
import { useEffect, useState } from "react";
import { listTeams } from "@/services/teams";
import TeamList from "@/components/TeamList";
import TeamListIntro from "@/components/TeamListIntro";
import TeamListLoading from "@/components/TeamListLoading";
import SortBy from "@/components/TeamSortBy";
import styles from "@/components/LocalUi.module.css";

export interface FilterQuery {
  type: string | undefined;
}

interface SortOption {
  id: number;
  label: string;
  value: "exp-desc" | "exp-asc" | "name-asc" | "name-desc";
}

function sortTeams(teams: any[], option: SortOption) {
  const sorted = [...teams];

  switch (option.value) {
    case "exp-desc":
      sorted.sort((a, b) => b.baseExpTotal - a.baseExpTotal);
      break;
    case "exp-asc":
      sorted.sort((a, b) => a.baseExpTotal - b.baseExpTotal);
      break;
    case "name-asc":
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      sorted.sort((a, b) => b.name.localeCompare(a.name));
      break;
    default:
      break;
  }

  return sorted;
}

export default function PageList() {
  const [isTeamsLoading, setIsTeamsLoading] = useState<boolean>(true);
  const [teams, setTeams] = useState<any[]>([]);
  const [availableTypes, setAvailableTypes] = useState<string[]>([]);
  const [filterQuery, setFilterQuery] = useState<FilterQuery>(
    {} as FilterQuery
  );
  const [sortOption, setSortOption] = useState<SortOption>();

  const sortOptions: SortOption[] = [
    { id: 1, label: "Experience: high to low", value: "exp-desc" },
    { id: 2, label: "Experience: low to high", value: "exp-asc" },
    { id: 3, label: "Name: A to Z", value: "name-asc" },
    { id: 4, label: "Name: Z to A", value: "name-desc" },
  ];

  useEffect(() => {
    const runQuery = async () => {
      let teams = await listTeams();
      const types = new Set();
      for (const team of teams) {
        for (const t in team.badges) {
          types.add(t);
        }
      }
      setAvailableTypes(Array.from(types).sort() as string[]);

      if (filterQuery.type) {
        teams = teams.filter((t) => !!t.badges[filterQuery.type as string]);
      }
      setTeams(teams.reverse());
      setIsTeamsLoading(false);
    };
    runQuery();
  }, [filterQuery]);
  const visibleTeams = sortOption ? sortTeams(teams, sortOption) : teams;

  return (
    <>
      <Head>
        <title>List teams</title>
        <meta
          name="description"
          content="Pokeapi team let's build your dream team"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="/Poke_Ball_icon.svg"
          sizes="any"
        />
        <link
          rel="icon"
          href="/Poke_Ball_icon.svg"
          type="image/svg+xml"
        />
        <link rel="apple-touch-icon" href="/Poke_Ball_icon.svg" />
      </Head>
      <main>
        <NavBar />
        {isTeamsLoading ? (
          <TeamListLoading />
        ) : teams.length ? (
          <>
            <div className={styles.toolbar}>
              <div className={styles.toolbarControls}>
                <ListFilter
                  availableTypes={availableTypes}
                  selectedType={filterQuery.type}
                  onSelectType={(type) =>
                    setFilterQuery({ ...filterQuery, type })
                  }
                />
                <SortBy
                  sortOptions={sortOptions}
                  selectedOption={sortOption}
                  onSelectOption={(sortOption: SortOption) => {
                    setSortOption(sortOption);
                  }}
                />
              </div>
              <div className={styles.toolbarAction}>
                <Link className={styles.primaryButton} href="/team/create">
                Create team
                </Link>
              </div>
            </div>
            <TeamList teams={visibleTeams} />
          </>
        ) : (
          <TeamListIntro />
        )}
      </main>
    </>
  );
}
