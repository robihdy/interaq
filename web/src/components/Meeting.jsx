import { gql, useSubscription } from '@apollo/client';
import React from 'react';
import { v4 } from 'uuid';
import { cookies, setOptions } from '../utils/cookies';
import CreateQuestion from './CreateQuestion';
import Question from './Question';

const MEETING = gql`
  subscription Meeting($id: Int!) {
    meetings_by_pk(id: $id) {
      id
      name
      code
      description
      questions(order_by: { points: desc, created_at: desc }) {
        id
        author_name
        description
        points
        created_at
      }
    }
  }
`;

const Meeting = ({
  match: {
    params: { id },
  },
}) => {
  const guestId = v4();
  if (!cookies.get('iq_guestId')) {
    cookies.set('iq_guestId', guestId, setOptions);
  }

  const { loading, error, data } = useSubscription(MEETING, {
    variables: { id },
  });

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>{error.message}</p>;

  const { name, description, code, questions } = data.meetings_by_pk;

  return (
    <div>
      <section className="hero is-link is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column is-desktop">
                <div className="has-text-centered">
                  <h2 className="title">{name}</h2>
                  <h3 className="subtitle">#{code}</h3>
                  <p>{description}</p>
                </div>
                <CreateQuestion meetingId={id} />
              </div>
              <div className="column is-desktop">
                {questions &&
                  questions.map((q) => (
                    <Question
                      key={q.id}
                      id={q.id}
                      authorName={q.author_name}
                      description={q.description}
                      points={q.points}
                      createdAt={q.created_at}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Meeting;
