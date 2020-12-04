import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteFor } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(
    (state) => state.anecdotes.sort((a, b) => b.votes - a.votes)
    // if negative a is sorted before b, if positive b is sorted before a
  );
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
    dispatch(voteFor(id));
  };

  const notify = (anecdote) => {
    console.log("notify", anecdote);
    const notification = `you voted '${anecdote}'`;
    dispatch(setNotification(notification));
  };

  const voteAndNotify = (anecdote) => {
    console.log("voteandnotify", anecdote);
    vote(anecdote.id);
    notify(anecdote.content);
  };
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAndNotify(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
