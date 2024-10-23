import React from 'react';
import { Person } from '../types';
import { TableHead } from './TableHead';
import { TableRow } from './TableRow';

interface Props {
  people: Person[];
}

const PeoplePage: React.FC<Props> = ({ people }) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <TableHead />

      <tbody>
        {people.map((person: Person) => (
          <TableRow key={person.name} people={people} person={person} />
        ))}
      </tbody>
    </table>
  );
};

export default PeoplePage;
