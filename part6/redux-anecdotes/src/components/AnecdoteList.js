import React, { useEffect } from "react";
import { connect } from "react-redux";
import { initializeAnecdotes, voteFor } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = (props) => {
  console.log(props);
  const anecdotes = props.anecdotes;
  const initializeAnecdotes = props.initializeAnecdotes;
  useEffect(() => {
    initializeAnecdotes();
  }, [initializeAnecdotes]);

  const vote = (anecdote) => {
    console.log("vote", anecdote.id);
    props.voteFor(anecdote);
  };

  const notify = (anecdote) => {
    console.log("notify", anecdote);
    const notification = `you voted '${anecdote}'`;
    props.setNotification(
      { message: notification, timeOutId: props.notification.timeOutId },
      5
    );
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

const mapStateToProps = (state) => {
  console.log(state);
  let anecdotes = state.anecdotes;
  // if negative a is sorted before b, if positive b is sorted before a
  const compareFunc = (a, b) => b.votes - a.votes;
  if (state.filter === "")
    return {
      anecdotes: anecdotes.sort(compareFunc),
      notification: state.notification,
    };
  return {
    anecdotes: anecdotes
      .filter((a) => (a.content.search(state.filter) > 0 ? a : ""))
      .sort(compareFunc),
    notification: state.notification,
  };
};

const mapDispatchToProps = {
  initializeAnecdotes,
  voteFor,
  setNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
