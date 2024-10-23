import cs from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { FC } from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface Props {
  person: Person;
}

export const TableRow: FC<Props> = ({ person }) => {
  const { personId } = useParams();

  console.log(personId);

  return (
    <tr
      key={person.name}
      className={cs('', {
        'has-background-warning': personId === person.slug,
      })}
      data-cy="person"
    >
      <td>
        <Link
          className={cs('', {
            'has-text-danger': person.sex === 'f',
          })}
          to={`/people/${person.slug}`}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <PersonLink person={person.mother} parentName={person.motherName} />
      <PersonLink person={person.father} parentName={person.fatherName} />
    </tr>
  );
};
