import React from "react";
import { setFilter } from "../reducers/FilterReducer";
import { useDispatch } from "react-redux";

const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    dispatch(setFilter(event.target.value));
  };
  return (
    <div style={{ marginBottom: 10 }}>
      filter
      <input name="filter" onChange={handleChange} />
    </div>
  );
};

export default Filter;
