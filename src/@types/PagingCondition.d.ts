type SortType = 'NEWEST' | 'OLDEST';

type PagingCondition = {
  sort: SortType;
  lastId: number;
  hasNext: boolean;
};
