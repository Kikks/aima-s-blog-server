import type { Meta } from "./Meta.type";

type Pagination<T> = {
  data: T[];
  meta: Meta;
};

export { Pagination };
