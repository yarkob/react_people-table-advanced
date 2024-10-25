import { FC } from 'react';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';
import { SearchFields } from '../utils/SearchFields';

const COLUMNS = ['name', 'sex', 'born', 'died'];

export const TableHead: FC = () => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get(SearchFields.Sort);
  const order = searchParams.get(SearchFields.Order);

  return (
    <thead>
      <tr>
        {COLUMNS.map(column => {
          const isSameColumn = sort === column;
          const newSort = isSameColumn && order === 'desc' ? null : column;
          let newOrder = null;

          if (isSameColumn) {
            newOrder = order === 'desc' ? null : 'desc';
          }

          return (
            <th key={column}>
              <span className="is-flex is-flex-wrap-nowrap is-capitalized">
                {column}
                <SearchLink params={{ sort: newSort, order: newOrder }}>
                  <span className="icon">
                    <i className="fas fa-sort"></i>
                  </span>
                </SearchLink>
              </span>
            </th>
          );
        })}
        <th>Mother</th>
        <th>Father</th>
      </tr>
    </thead>
  );
};
