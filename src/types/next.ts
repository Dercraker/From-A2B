import type { ReactNode } from "react";

/**
 * @name PageParams
 *
 * @usage
 * In NextJS, params are the dynamic parts of the URL.
 * For example, if you have a page with the route `/posts/[id]`, then `id` is a param.
 *
 * You can then use the `PageParams` type to define the type of the params.
 *
 * ```tsx
 * export default function Page(params: PageParams<{ id: string }>) {
 *   ...
 * }
 * ```
 */
export type PageParams<T extends Record<string, string> = {}> = {
  params: Promise<T>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

/**
 * @name OrgPathParams
 *
 * @usage
 * This type is used to define the parameters of the `org/[orgSlug]/page.tsx` page.
 *
 * @example
 * ```tsx
 * export default function Page(params: PageParams<OrgPathParams>) {
 *   ...
 * }
 * ```
 */
export type OrgPathParams = {
  orgSlug: string;
};

/**
 * @name TripPathParams
 *
 * @usage
 * This type is used to define the parameters of the `org/[orgSlug]/trips/[tripSlug]/page.tsx` page.
 *
 * @example
 * ```tsx
 * export default function Page(params: PageParams<TripPathParams>) {
 *   ...
 * }
 * ```
 */
export type TripPathParams = OrgPathParams & {
  tripSlug: string;
};

/**
 * @name StepPathParams
 *
 * @usage
 * This type is used to define the parameters of the `org/[orgSlug]/trips/[tripSlug]/steps/[stepSlug]/page.tsx` page.
 *
 * @example
 * ```tsx
 * export default function Page(params: PageParams<StepPathParams>) {
 *   ...
 * }
 * ```
 */
export type StepPathParams = TripPathParams & {
  stepSlug: string;
};

/**
 * @name LayoutParams
 *
 * @usage
 * In NextJS, params can be defined also in the layout.
 *
 * For an example, this file `/app/users/[userId]/layout.tsx` will have the following params:
 *
 * ```tsx
 * export default function Layout(params: LayoutParams<{ userId: string }>) {
 *   ...
 * }
 * ```
 */
export type LayoutParams<T extends Record<string, string> = {}> = {
  params: Promise<T>;
  children?: ReactNode | undefined;
};

/**
 * @name ErrorParams
 *
 * @usage
 * This type is used to define the parameters of the `error.tsx` page.
 */
export type ErrorParams = {
  error: Error & { digest?: string };
  reset: () => void;
};
