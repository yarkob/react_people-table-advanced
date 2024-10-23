import { FC } from 'react';
import { SearchLink } from './SearchLink';

export const TableHead: FC = () => {
  return (
    <thead>
      <tr>
        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Name
            <SearchLink params={{}}>
              <span className="icon">
                <i className="fas fa-sort"></i>
              </span>
            </SearchLink>
          </span>
        </th>
        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Sex
            <SearchLink params={{}}>
              <span className="icon">
                <i className="fas fa-sort"></i>
              </span>
            </SearchLink>
          </span>
        </th>
        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Born
            <SearchLink params={{}}>
              <span className="icon">
                <i className="fas fa-sort"></i>
              </span>
            </SearchLink>
          </span>
        </th>
        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Died
            <SearchLink params={{}}>
              <span className="icon">
                <i className="fas fa-sort"></i>
              </span>
            </SearchLink>
          </span>
        </th>
        <th>Mother</th>
        <th>Father</th>
      </tr>
    </thead>
  );
};
