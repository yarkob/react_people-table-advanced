import { Link } from 'react-router-dom';
import { FC } from 'react';
import { Person } from '../types';

interface Props {
  person: Person | undefined;
  parentName: string | null;
}

export const PersonLink: FC<Props> = ({ person, parentName }) => {
  return (
    <td>
      {!!person ? (
        <Link to={`/people/${person.slug}`}>{person.name}</Link>
      ) : (
        parentName || '-'
      )}
    </td>
  );
};
