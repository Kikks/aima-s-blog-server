import { GraphQLResolveInfo, Kind, SelectionSetNode } from "graphql";
import { Meta } from "../types/Meta.type";

const selectionIncludes = (selectionSet: SelectionSetNode | undefined, field: string): boolean =>
  (selectionSet?.selections || []).some((selection) => {
    // Fragments are not resolved here, so assume they may include the field.
    if (selection.kind !== Kind.FIELD) return true;
    return selection.name.value === field || selectionIncludes(selection.selectionSet, field);
  });

/**
 * Whether the incoming query asks for `field` anywhere under the current resolver.
 * Lets resolvers skip loading large columns (e.g. a post's body) nobody requested.
 */
export const requestsField = (info: GraphQLResolveInfo, field: string): boolean =>
  info.fieldNodes.some((node) => selectionIncludes(node.selectionSet, field));

/** Mongoose projection that leaves out the post body unless the query asks for it. */
export const postProjection = (info: GraphQLResolveInfo) =>
  requestsField(info, "body") ? "" : "-body";

export const calculatePages = (totalDocs: number, limit: number) =>
  totalDocs % limit === 0 ? Math.floor(totalDocs / limit) : Math.floor(totalDocs / limit) + 1;

export const generateMeta: (page: number, count: number, limit: number) => Meta = (
  page,
  count,
  limit
) => ({
  currentPage: page,
  pages: calculatePages(count, limit),
  total: count,
});
