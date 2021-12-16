import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchStreams } from '../../actions';
// import StreamsAccordions from './StreamsAccordion';
import StreamsDataTable from './StreamsDataTable';

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId) {
      return(
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit </Link>
          <Link to={`/streams/delete/${stream.id}`} className="ui button negative">Delete</Link>
        </div>
      );
    }
  }

  // handleTitleClick = (e) => {
  //   if (e.target.nextSibling.className === "active content") {
  //     e.target.className = "title";
  //     e.target.nextSibling.className = "content";
  //   } else {
  //     e.target.className = "active title";
  //     e.target.nextSibling.className = "active content";
  //   }
  // }

  renderList() {
    const rows = this.props.streams.map(stream => {
      return ({ ...stream, id: stream._id }); 
    });
    return (
      <StreamsDataTable streams={rows} />
    );
  }

  // renderList() {
  //   console.log(this.props.streams);
  //   return this.props.streams.map(stream => {
  //     return (
  //       <div className="item" key={stream.id}>
  //         {this.renderAdmin(stream)}
  //         <i className="large middle aligned icon camera" />
  //         <div className="content">
  //           <Link to={`/streams/${stream.id}`} className="header">{stream.title}</Link>
  //           <div className="description">{stream.description}</div>
  //         </div>
  //       </div>
  //     );
  //   })
  // }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to="/streams/new" className="ui button primary">Create Stream</Link>
        </div>
      );
    }
  }

  render() {
    // return (
    //   <div>
    //     <h2>2D Surveys</h2>
    //     <div className="ui styled fluid accordion">{this.renderList()}</div>
    //     {this.renderCreate()}
    //   </div>
    // );
    return (
      <div>
        <h3>2D Surveys</h3>
        {this.renderList()}
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { streams: Object.values(state.streams), currentUserId: state.auth.userId, isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, { fetchStreams })(StreamList);