import React from 'react';

const Search = ({ inputVal, onChange, onSearch }) => {
  return (
    <form onSubmit={onSearch}>
      <div className="field has-addons">
        <div className="control">
          <input
            className="input"
            value={inputVal}
            onChange={onChange}
            placeholder="Meeting code..."
          />
        </div>
        <div className="control">
          <button type="submit" className="button is-black">
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default Search;
