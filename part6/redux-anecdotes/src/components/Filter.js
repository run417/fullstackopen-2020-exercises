import React from "react";
import { setFilter } from "../reducers/FilterReducer";
import { connect } from "react-redux";

const Filter = (props) => {
  const handleChange = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    props.setFilter(event.target.value);
  };
  return (
    <div style={{ marginBottom: 10 }}>
      filter
      <input name="filter" onChange={handleChange} />
    </div>
  );
};

export default connect(null, { setFilter })(Filter);
