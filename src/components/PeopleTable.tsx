import React from 'react';
import { Person } from '../types';
import { TableHead } from './TableHead';
import { TableRow } from './TableRow';
import { useSearchParams } from 'react-router-dom';
import { SortBy } from '../utils/sortBy';

interface Props {
  people: Person[];
}

const PeoplePage: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const sortedPeople = people.sort((a, b) => {
    if (searchParams.get('sort') === SortBy.Name) {
      return searchParams.get('order')
        ? b.name.localeCompare(a.name)
        : a.name.localeCompare(b.name);
    }

    if (searchParams.get('sort') === SortBy.Sex) {
      return searchParams.get('order')
        ? b.sex.localeCompare(a.sex)
        : a.sex.localeCompare(b.sex);
    }

    if (searchParams.get('sort') === SortBy.Born) {
      return searchParams.get('order') ? b.born - a.born : a.born - b.born;
    }

    if (searchParams.get('sort') === SortBy.Died) {
      return searchParams.get('order') ? b.died - a.died : a.died - b.died;
    }

    return 0;
  });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <TableHead />

      <tbody>
        {sortedPeople.map((person: Person) => (
          <TableRow key={person.name} person={person} />
        ))}
      </tbody>
    </table>
  );
};

export default PeoplePage;
