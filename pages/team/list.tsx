import Head from "next/head";
import NavBar from "@/components/NavBar";
import { Exo_2, Roboto } from "next/font/google";
import {
  Button,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import ListFilter from "@/components/TeamListFilter";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { listTeams } from "@/services/teams";
import TeamList from "@/components/TeamList";
import TeamListIntro from "@/components/TeamListIntro";
import TeamListLoading from "@/components/TeamListLoading";
import SortBy from "@/components/TeamSortBy";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export interface FilterQuery {
  type: string | undefined;
}



export default function PageList() {
  const router = useRouter();
  const [isTeamsLoading, setIsTeamsLoading] = useState<boolean>(true);
  const [teams, setTeams] = useState<any[]>([]);
  const [availableTypes, setAvailableTypes] = useState<string[]>([]);
  const [filterQuery, setFilterQuery] = useState<FilterQuery>(
    {} as FilterQuery
  );
  const [sortedData, setSortedData] = useState([...teams]);
  const [sortOption, setSortOption] = useState<string>();

  const sortOptions = [
    {id: 1, label: "Exp DESC"},
    {id: 2, label: "Exp ASC"},
    {id: 2, label: "Name ASC"},
    {id: 2, label: "Name DESC"},
    
  ]

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

  const sortData = (option: any) => {
    const sorted = [...teams];
    switch (option.label) {
      case 'Exp DESC':
        sorted.sort((a, b) => b.baseExpTotal - a.baseExpTotal);
        break;
      case 'Exp ASC':
        sorted.sort((a, b) => a.baseExpTotal - b.baseExpTotal);
        break;
      case 'Name ASC':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Name DESC':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      // Weitere Sortieroptionen könnten hier hinzugefügt werden
      default:
        break;
    }
    setSortedData(sorted);
  };

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
          href="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg"
          sizes="any"
        />
        <link
          rel="icon"
          href="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg"
          type="image/svg+xml"
        />
        <link rel="apple-touch-icon" sizes="180x180" href="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/192px-Pok%C3%A9_Ball_icon.svg.png" />
      </Head>
      <main className={roboto.className}>
        <NavBar />
        {isTeamsLoading ? <TeamListLoading /> : (teams.length ? (
          <>
            <Flex marginBottom={3} padding="5">
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
                onSelectOption={(sortOption: any) => {
                  setSortOption(sortOption);
                  sortData(sortOption);
                  }
                }
                />
              <Spacer />
              <Button
                onClick={() => router.push("/team/create")}
                colorScheme="yellow"
              >
                Create team
              </Button>
            </Flex>
            <TeamList teams={sortOption ? sortedData : teams}/>
          </>
        ) : (
          <TeamListIntro />
        )) }
      </main>
    </>
  );
}
