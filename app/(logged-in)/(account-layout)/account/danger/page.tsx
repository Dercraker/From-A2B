import { requiredUser } from "@lib/auth/helper";
import { DeleteDangerCard } from "./_components/DeleteDangerCard";

const DeleteProfilePage = async () => {
  const { email, name } = await requiredUser();

  return <DeleteDangerCard displayName={name ?? email} />;
};

export default DeleteProfilePage;
