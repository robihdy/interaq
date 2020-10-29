import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';

const CREATE_QUESTION = gql`
  mutation CreateQuestion(
    $meetingId: Int!
    $authorName: String
    $description: String!
  ) {
    insert_questions(
      objects: {
        meeting_id: $meetingId
        author_name: $authorName
        description: $description
      }
    ) {
      affected_rows
    }
  }
`;

const CreateQuestion = ({ meetingId }) => {
  const [authorName, setAuthorName] = useState('');
  const [description, setDescription] = useState('');
  const [createQuestion, { loading }] = useMutation(CREATE_QUESTION);

  const handleSubmit = () => {
    createQuestion({ variables: { meetingId, authorName, description } })
      .then(() => {
        setAuthorName('');
        setDescription('');
      })
      .catch((e) => {
        setDescription(e.message);
      });
  };

  return (
    <div className="box mt-5">
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input
            name="authorName"
            className="input"
            type="text"
            placeholder="Your name"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Question</label>
        <div className="control">
          <textarea
            name="description"
            className="textarea"
            placeholder="Your question"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="field">
        <div className="control">
          <button
            className={`button is-link ${loading && 'is-loading'}`}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateQuestion;
