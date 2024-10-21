import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import { Person } from '../types';
import { noop } from '../utils/noop';

interface IPeopleContext {
  people: Person[];
  setPeople: Dispatch<SetStateAction<Person[]>>;
}

interface Props {
  children: ReactNode;
}

const PeopleContext = createContext<IPeopleContext>({
  people: [],
  setPeople: noop,
});

export const PeopleContextProvider: FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);

  return (
    <PeopleContext.Provider value={{ people, setPeople }}>
      {children}
    </PeopleContext.Provider>
  );
};
