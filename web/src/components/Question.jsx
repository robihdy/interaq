import { useMutation, gql } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { cookies, removeOptions, setOptions } from '../utils/cookies';
import Moment from 'react-moment';

const VOTE = gql`
  mutation Vote($id: uuid!, $value: Int!) {
    update_questions(_inc: { points: $value }, where: { id: { _eq: $id } }) {
      returning {
        id
        description
        points
      }
    }
  }
`;

const Question = ({ id, authorName, description, points, createdAt }) => {
  const [vote] = useMutation(VOTE);

  const getVoteStatus = () => {
    console.log('GET_VOTE_STATUS');
    if (!cookies.get(`vote_${id}`)) return false;
    if (cookies.get(`vote_${id}`) !== cookies.get('iq_guestId')) return false;
    return true;
  };
  const voteStatus = getVoteStatus();
  const [isVoted, setIsVoted] = useState(voteStatus);
  useEffect(() => {
    setIsVoted(voteStatus);
  }, [voteStatus]);

  const handleVote = async () => {
    await vote({ variables: { id, value: isVoted ? -1 : 1 } });
    if (!isVoted) {
      setIsVoted(true);
      cookies.set(`vote_${id}`, cookies.get('iq_guestId'), setOptions);
    } else if (getVoteStatus()) {
      setIsVoted(false);
      cookies.remove(`vote_${id}`, removeOptions);
      console.log('cook', cookies.get(`vote_${id}`));
    }
  };

  return (
    <div className="box">
      <div className="media">
        <div className="media-left is-align-items-center">
          <button
            onClick={handleVote}
            className={`button icon ${isVoted ? 'is-link' : ''}`}
          >
            <FontAwesomeIcon icon="caret-up" size="lg" />
          </button>
          <div className="has-text-centered">{points}</div>
        </div>
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{authorName}</strong>{' '}
              <small>
                <Moment fromNow>{createdAt}</Moment>
              </small>
              <br />
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
