import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route } from "react-router-dom";

import "./App.css";

import Login from './user/Login';
import Register from './user/Register';
import BoardHome from './board/BoardHome';
import Profile from './user/Profile';
import BoardUser from './board/BoardUser';
import BoardModerator from './board/BoardModerator';
import BoardAdmin from './board/BoardAdmin';
import RegionCreate from './regions/RegionCreate';
import RegionList from './regions/RegionList';
import RegionEdit from './regions/RegionEdit';
import RegionView from './regions/RegionView';
import RegionDelete from './regions/RegionDelete';

import { logout } from "../actions/auth";
import { clearMessage } from "../actions/message";

import history from '../history';
import Header from "./Header";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  logOut() {
    this.props.dispatch(logout());
    window.location.reload();
  }

  render() {
    const { currentUser } = this.state;

    return (
      <Router history={history}>
        <div>
          <Header currentUser={currentUser} logOut={this.logOut}/>
          <div>
            <Switch>
              <Route exact path={["/", "/home"]} component={BoardHome} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/user" component={BoardUser} />
              <Route path="/mod" component={BoardModerator} />
              <Route path="/admin" component={BoardAdmin} />
              <Route path="/regions" exact component={RegionList} />
              <Route path="/regions/new" exact component={RegionCreate} />
              <Route path="/regions/edit/:_id" exact component={RegionEdit} />
              <Route path="/regions/delete/:_id" exact component={RegionDelete} />
              <Route path="/regions/:_id" exact component={RegionView} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);