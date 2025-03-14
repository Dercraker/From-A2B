import AuthNavigationWrapper from "@components/navigation/LogInNavigationWrapper";
import { Page404 } from "@components/page/Page404";

export default function NotFoundPage() {
  return (
    <AuthNavigationWrapper>
      <Page404 />
    </AuthNavigationWrapper>
  );
}
