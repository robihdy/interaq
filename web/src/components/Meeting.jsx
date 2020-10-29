import React from 'react';
import { useSubscription, gql } from '@apollo/client';
import Question from './Question';

const MEETING = gql`
  subscription Meeting($id: Int!) {
    meetings_by_pk(id: $id) {
      id
      name
      code
      description
      questions {
        id
        author_name
        description
        points
      }
    }
  }
`;

const Meeting = ({
  match: {
    params: { id },
  },
}) => {
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
              <div className="column is-desktop is-one-third">
                <div className="has-text-centered">
                  <h2 className="title">{name}</h2>
                  <h3 className="subtitle">#{code}</h3>
                  <p>{description}</p>
                </div>
              </div>
              <div className="column is-desktop is-two-third">
                {questions &&
                  questions.map((q) => (
                    <Question
                      key={q.id}
                      authorName={q.author_name}
                      description={q.description}
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
