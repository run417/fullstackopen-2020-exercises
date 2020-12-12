import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeAnecdotes, voteFor } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    const anecdotes = state.anecdotes;
    // if negative a is sorted before b, if positive b is sorted before a
    const compareFunc = (a, b) => b.votes - a.votes;
    if (state.filter === "") return anecdotes.sort(compareFunc);
    return anecdotes
      .filter((a) => (a.content.search(state.filter) > 0 ? a : ""))
      .sort(compareFunc);
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  const vote = (anecdote) => {
    console.log("vote", anecdote.id);
    dispatch(voteFor(anecdote));
  };

  const notify = (anecdote) => {
    console.log("notify", anecdote);
    const notification = `you voted '${anecdote}'`;
    dispatch(setNotification(notification, 5));
  };

  const voteAndNotify = (anecdote) => {
    console.log("voteandnotify", anecdote);
    vote(anecdote);
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
