import React from 'react';
import { Route, Switch, Link, useRouteMatch } from 'react-router-dom';
import User from './User';

const UserList = ({ users, handleLikes, handleDelete, handleComment }) => {
    const match = useRouteMatch('/users/:id');
    console.log(match);
    const user = match
        ? users.find((user) => user.id === match.params.id)
        : null;
    console.log(user);
    return (
        <div>
            <Switch>
                <Route path={'/users/:id'}>
                    <User
                        user={user}
                        updateBlogLikes={handleLikes}
                        deleteBlog={handleDelete}
                        addComment={handleComment}
                    />
                </Route>
                <Route path="/users">
                    <div>
                        <h2>Users</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>blogs created</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => {
                                    return (
                                        <tr key={user.id}>
                                            <td>
                                                <Link to={`/users/${user.id}`}>
                                                    {user.name}
                                                </Link>
                                            </td>
                                            <td>{user.blogs.length}</td>
                                        </tr>
                                    );
                                })}
                                <tr></tr>
                            </tbody>
                        </table>
                    </div>
                </Route>
            </Switch>
        </div>
    );
};

export default UserList;
