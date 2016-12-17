import React from 'react';
import Sidebar from './sidebar';
import Toolbar from './toolBar';
import { connect } from 'react-redux';

// The second params of mapStateToProps is a router object
const mapStateToProps = (props, { params: {deckId }}) => ({
  deckId
});

const App = ({deckId, children}) => {
  return (
    <div className="app">
      <Toolbar deckId={deckId}/>
      <Sidebar/>
      {children}
    </div>
  );
};

export default connect(mapStateToProps)(App);