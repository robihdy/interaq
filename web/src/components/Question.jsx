import React from 'react';

const Question = ({ authorName, description }) => {
  return (
    <div className="box">
      <div className="media">
        <div className="media-left">
          <figure className="image is-32x32">
            <img
              src="https://bulma.io/images/placeholders/128x128.png"
              alt="Upvote"
            />
          </figure>
        </div>
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{authorName}</strong>
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
