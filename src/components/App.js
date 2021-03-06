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
import PeopleList from './peoples/PeopleList';
import PeopleCreate from './peoples/PeopleCreate';
import PeopleView from './peoples/PeopleView';
import PeopleEdit from './peoples/PeopleEdit';
import PeopleDelete from './peoples/PeopleDelete';
import BasinList from './basins/BasinList';
import BasinCreate from './basins/BasinCreate';
import BasinView from './basins/BasinView';
import BasinEdit from './basins/BasinEdit';
import BasinDelete from './basins/BasinDelete';
import FpList from './fps/FpList';
import FpView from './fps/FpView';
import FpCreate from './fps/FpCreate';
import FpEdit from './fps/FpEdit';
import FpDelete from './fps/FpDelete';
import SurveyList from './surveys/SurveyList';
import DprList from './dprs/DprList';

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
              <Route path="/peoples" exact component={PeopleList} />
              <Route path="/peoples/new" exact component={PeopleCreate} />
              <Route path="/peoples/:_id" exact component={PeopleView} />
              <Route path="/peoples/edit/:_id" exact component={PeopleEdit} />
              <Route path="/peoples/delete/:_id" exact component={PeopleDelete} />
              <Route path="/basins" exact component={BasinList} />
              <Route path="/basins/new" exact component={BasinCreate} />
              <Route path="/basins/:_id" exact component={BasinView} />
              <Route path="/basins/edit/:_id" exact component={BasinEdit} />
              <Route path="/basins/delete/:_id" exact component={BasinDelete} />
              <Route path="/fps" exact component={FpList} />
              <Route path="/fps/new" exact component={FpCreate} />
              <Route path="/fps/:_id" exact component={FpView} />
              <Route path="/fps/edit/:_id" exact component={FpEdit} />
              <Route path="/fps/delete/:_id" exact component={FpDelete} />
              <Route path="/surveys" exact component={SurveyList} />
              <Route path="/dprs" exact component={DprList} />
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