import { PeopleFilters } from './PeopleFilters';
import PeopleTable from './PeopleTable';
import { Loader } from './Loader';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';

enum LoadingStatus {
  Initial = 'initial',
  Loading = 'loading',
  Loaded = 'loaded',
}

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<LoadingStatus>(LoadingStatus.Initial);

  useEffect(() => {
    setLoading(LoadingStatus.Loading);

    getPeople()
      .then(data => {
        if (!data.length) {
          setError(true);
        }

        setPeople(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(LoadingStatus.Loaded);
      });
  }, []);

  const filteredPeople = useMemo(() => {
    return people.filter(person => {
      const normalizeQuery = query.toLowerCase();
      const normalizePersonName = person.name.toLowerCase();
      const normalizeFatherName = person.fatherName?.toLowerCase();
      const normalizeMotherName = person.motherName?.toLowerCase();

      const isMatchedQuery = query
        ? normalizePersonName.includes(normalizeQuery) ||
          normalizeFatherName?.includes(normalizeQuery) ||
          normalizeMotherName?.includes(normalizeQuery)
        : true;

      const isMatchedSex = sex ? person.sex === sex : true;
      const bornCentury = String(Math.ceil(person.born / 100));
      const isMatchedCenturies = centuries.length
        ? centuries.includes(bornCentury)
        : true;

      return isMatchedQuery && isMatchedSex && isMatchedCenturies;
    });
  }, [people, query, sex, centuries]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="block">
              <div className="box table-container">
                {loading === LoadingStatus.Loading && <Loader />}

                {error && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                )}

                {!people.length && loading === LoadingStatus.Loaded && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

                {!!filteredPeople.length && <PeopleTable people={people} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
