import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeAnecdotes, voteFor } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

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
    anecdoteService
      .getAll()
      .then((anecdotes) => dispatch(initializeAnecdotes(anecdotes)));
  }, [dispatch]);

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
