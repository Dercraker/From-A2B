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
 * @name OrgPageParams
 *
 * @usage
 * This type is used to define the parameters of the `org/[orgSlug]/page.tsx` page.
 *
 * @example
 * ```tsx
 * export default function Page(params: OrgPageParams) {
 *   ...
 * }
 * ```
 */
export type OrgPageParams = PageParams<{
  orgSlug: string;
}>;

/**
 * @name TripPageParams
 *
 * @usage
 * This type is used to define the parameters of the `org/[orgSlug]/trips/[tripSlug]/page.tsx` page.
 *
 * @example
 * ```tsx
 * export default function Page(params: TripPageParams) {
 *   ...
 * }
 * ```
 */
export type TripPageParams = PageParams<{
  orgSlug: string;
  tripSlug: string;
}>;

/**
 * @name StepPageParams
 *
 * @usage
 * This type is used to define the parameters of the `org/[orgSlug]/trips/[tripSlug]/steps/[stepSlug]/page.tsx` page.
 *
 * @example
 * ```tsx
 * export default function Page(params: StepPageParams) {
 *   ...
 * }
 * ```
 */
export type StepPageParams = PageParams<{
  orgSlug: string;
  tripSlug: string;
  stepSlug: string;
}>;

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
 * @name OrgLayoutParams
 *
 * @usage
 * This type is used to define the parameters of the `org/[orgSlug]/layout.tsx` page.
 *
 * @example
 * ```tsx
 * export default function Layout(params: OrgLayoutParams) {
 *   ...
 * }
 */
export type OrgLayoutParams = LayoutParams<{
  orgSlug: string;
}>;

/**
 * @name TripLayoutParams
 *
 * @usage
 * This type is used to define the parameters of the `org/[orgSlug]/trips/[tripSlug]/layout.tsx` page.
 *
 * @example
 * ```tsx
 * export default function Layout(params: TripLayoutParams) {
 *   ...
 * }
 */
export type TripLayoutParams = LayoutParams<{
  orgSlug: string;
  tripSlug: string;
}>;

/**
 * @name StepLayoutParams
 *
 * @usage
 * This type is used to define the parameters of the `org/[orgSlug]/trips/[tripSlug]/steps/[stepSlug]/layout.tsx` page.
 *
 * @example
 * ```tsx
 * export default function Layout(params: StepLayoutParams) {
 *   ...
 * }
 */
export type StepLayoutParams = LayoutParams<{
  orgSlug: string;
  tripSlug: string;
  stepSlug: string;
}>;

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
