import React, { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import Search from './Search';
import { Link } from 'react-router-dom';
import { Header } from './shared/Header';

const SEARCH_MEETING = gql`
  query SearchMeeting($code: String) {
    meetings(where: { code: { _eq: $code } }) {
      id
      name
      code
    }
  }
`;

const MeetingSearch = () => {
  const [inputVal, setInputVal] = useState('');
  const [search, { loading, error, data }] = useLazyQuery(SEARCH_MEETING);

  return (
    <section className="hero is-link is-fullheight">
      <Header />
      <div className="hero-body">
        <div className="container">
          <div className="columns">
            <div className="column">
              <h2 className="title">Join a meeting</h2>
              <Search
                inputVal={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onSearch={(e) => {
                  e.preventDefault();
                  search({ variables: { code: inputVal } });
                }}
              />
            </div>
            <div className="column has-text-centered">
              {loading && <p className="title">Loading...</p>}
              {error && <p className="title">{error.message}</p>}
              {data && data.meetings.length > 0 && (
                <div>
                  <h2 className="title">{data.meetings[0].name}</h2>
                  <h3 className="subtitle">#{data.meetings[0].code}</h3>
                  <Link
                    to={`/meeting/${data.meetings[0].id}`}
                    className="button is-black"
                  >
                    Join
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetingSearch;
