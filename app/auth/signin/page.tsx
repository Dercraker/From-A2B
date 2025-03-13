import { HeaderBase } from "@components/layout/HeaderBase";
import { LogoSvg } from "@components/svg/LogoSvg";
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { GetCurrentUser } from "@lib/auth/helper";
import { combineWithParentMetadata } from "@lib/metadata";
import type { PageParams } from "@type/next";
import { AlertTriangle } from "lucide-react";
import { redirect } from "next/navigation";
import { getError } from "../error/auth-error-mapping";
import { SignInProviders } from "./SignInProviders";

export const generateMetadata = combineWithParentMetadata({
  title: "Sign in",
  description: "Sign in to your account",
});

export default async function AuthSignInPage(params: PageParams) {
  const searchParams = await params.searchParams;
  const { errorMessage, error } = getError(searchParams.error);

  const user = await GetCurrentUser();

  if (user) {
    redirect("/account");
  }

  return (
    <div className="flex h-full flex-col">
      <HeaderBase />
      <div className="flex h-screen items-center justify-center">
        <Card className="w-full max-w-md lg:max-w-lg lg:p-6">
          <CardHeader className="flex flex-col items-center justify-center gap-2">
            <LogoSvg />
            <CardTitle>Sign in to your account</CardTitle>
          </CardHeader>
          <CardContent className="mt-8">
            <SignInProviders />
          </CardContent>
          {error ? (
            <Alert>
              <AlertTriangle size={16} />
              <AlertDescription>{error}</AlertDescription>
              <AlertTitle>{errorMessage}</AlertTitle>
            </Alert>
          ) : null}
        </Card>
      </div>
    </div>
  );
}
