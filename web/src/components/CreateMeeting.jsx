import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Header } from './shared/Header';

const CREATE_MEETING = gql`
  mutation CreateMeeting($name: String!, $description: String) {
    CreateMeeting(name: $name, description: $description) {
      id
    }
  }
`;

const CreateMeeting = ({ history }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [createMeeting, { loading }] = useMutation(CREATE_MEETING);

  const handleSubmit = async () => {
    const res = await createMeeting({ variables: { name, description } });
    setName('');
    setDescription('');
    history.push(`/meeting/${res.data.CreateMeeting.id}`);
  };

  return (
    <section className="hero is-link is-fullheight">
      <Header />
      <div className="hero-body">
        <div className="container">
          <div className="box">
            <div className="field">
              <label className="label">Meeting Name</label>
              <div className="control">
                <input
                  name="name"
                  className="input"
                  type="text"
                  placeholder="Meeting name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <textarea
                  name="description"
                  className="textarea"
                  placeholder="Meeting description"
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
        </div>
      </div>
    </section>
  );
};

export default CreateMeeting;
