import { requiredUser } from "@lib/auth/helper";
import { combineWithParentMetadata } from "@lib/metadata";
import type { PageParams } from "@type/next";
import { verifyDeleteAccountToken } from "../delete-account.action";
import { DeleteAccountCard } from "./_components/DeleteAccountCard";
import { InvalidTokenCard } from "./_components/InvalidTokenCard";

export const generateMetadata = combineWithParentMetadata({
  title: "Confirm deletion",
  description: "One last step to delete your account.",
});

const RoutePage = async (params: PageParams) => {
  const searchParams = await params.searchParams;
  const token = searchParams.token;
  const user = await requiredUser();

  try {
    if (typeof token !== "string") {
      return <InvalidTokenCard />;
    }

    await verifyDeleteAccountToken(String(token), user.email);
  } catch {
    return <InvalidTokenCard />;
  }

  return <DeleteAccountCard token={String(token)} />;
};

export default RoutePage;
