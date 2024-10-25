import { FC } from 'react';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';
import { SearchFields } from '../utils/SearchFields';
import cn from 'classnames';

const COLUMNS = [
  { id: 'name', title: 'Name' },
  { id: 'sex', title: 'Sex' },
  { id: 'born', title: 'Born' },
  { id: 'died', title: 'Died' },
];

export const TableHead: FC = () => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get(SearchFields.Sort);
  const order = searchParams.get(SearchFields.Order);

  return (
    <thead>
      <tr>
        {COLUMNS.map(column => {
          const isSameColumn = sort === column.id;
          const newSort = isSameColumn && order === 'desc' ? null : column.id;
          let newOrder = null;

          if (isSameColumn) {
            newOrder = order === 'desc' ? null : 'desc';
          }

          return (
            <th key={column.id}>
              <span className="is-flex is-flex-wrap-nowrap is-capitalized">
                {column.title}
                <SearchLink params={{ sort: newSort, order: newOrder }}>
                  <span className="icon">
                    <i
                      className={cn('fas', {
                        'fa-sort': sort !== column.id,
                        'fa-sort-up': isSameColumn && sort && !order,
                        'fa-sort-down': isSameColumn && sort && order,
                      })}
                    ></i>
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
