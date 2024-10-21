import React from 'react';
import cs from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  people: Person[];
}

const PeoplePage: React.FC<Props> = ({ people }) => {
  const findPerson = (selectedPersonName: string | null) => {
    return people.find(p => p.name === selectedPersonName);
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map((person: Person) => (
          <tr
            key={person.name}
            className={cs('', {
              'has-background-warning':
                location.pathname.slice(8) === person.slug,
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
            <td>
              {!!person.motherName ? (
                !!findPerson(person.motherName) ? (
                  <Link
                    className="has-text-danger"
                    to={`/people/${findPerson(person.motherName)?.slug}`}
                  >
                    {person.motherName}
                  </Link>
                ) : (
                  person.motherName
                )
              ) : (
                '-'
              )}
            </td>
            <td>
              {!!person.fatherName ? (
                !!findPerson(person.fatherName) ? (
                  <Link to={`/people/${findPerson(person.fatherName)?.slug}`}>
                    {person.fatherName}
                  </Link>
                ) : (
                  person.fatherName
                )
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PeoplePage;
