import { useRouter } from "next/router";
import { useEffect } from "react";

const IndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/team/list");
  }, [router]);

  return null;
};

export default IndexPage;
