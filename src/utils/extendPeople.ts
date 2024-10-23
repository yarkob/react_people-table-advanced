import { Person } from '../types';

type TPersonMap = { [key: string]: Person };

export const extendPeople = (people: Person[]) => {
  const peopleMap = people.reduce<TPersonMap>((acc, person) => {
    return { ...acc, [person.name]: person };
  }, {});

  return people.map(person => ({
    ...person,
    mother: peopleMap[person.motherName || ''],
    father: peopleMap[person.fatherName || ''],
  }));
};
