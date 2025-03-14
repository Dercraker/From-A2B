import { GetRequiredUser } from "@lib/auth/helper";
import { combineWithParentMetadata } from "@lib/metadata";
import { DeleteDangerCard } from "./_components/DeleteDangerCard";

export const generateMetadata = combineWithParentMetadata({
  title: "Danger",
  description: "Delete your account",
});

const DeleteProfilePage = async () => {
  const { email, name } = await GetRequiredUser();

  return <DeleteDangerCard displayName={name ?? email} />;
};

export default DeleteProfilePage;
