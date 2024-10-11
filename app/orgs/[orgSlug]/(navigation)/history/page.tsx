import { combineWithParentMetadata } from "@/lib/metadata";

export const generateMetadata = combineWithParentMetadata({
  title: "History",
  description: "History",
});

const RoutePage = async () => {
  return <>History</>;
};

export default RoutePage;
