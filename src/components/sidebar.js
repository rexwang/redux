import React from 'react';
import ReactDOM from 'react-dom';
import { addDeck, showAddDeck, hideDeck } from '../actions';
import {connect} from 'react-redux';
import { Link } from 'react-router';

const mapStateToProps = ({decks, addingDeck}) => ({
  decks,
  addingDeck
});

const mapDispatchToProps = dispatch => ({
  addDeck    : name => dispatch(addDeck(name)),
  showAddDeck: () => dispatch(showAddDeck()),
  hideDeck   : () => dispatch(hideDeck())
});

const Sidebar = React.createClass({
  componentDidUpdate() {
    var el = ReactDOM.findDOMNode(this.refs.add);
    if (el) el.focus();
  },
  render() {
    let props = this.props;

    return (
      <div className="sidebar">
        <h2>All Decks</h2>

        <ul>
          {props.decks.map((deck, i) =>
            <Link to={`/deck/${deck.id}`} key={i}>
              <li>{deck.name}</li>
            </Link>
          )}
        </ul>
        {props.addingDeck && <input ref="add" onKeyPress={this.createDeck}/>}
      </div>
    );
  },
  createDeck(evt) {
    if (evt.which !== 13) return;
    var name = ReactDOM.findDOMNode(this.refs.add).value;
    this.props.addDeck(name);
    this.props.hideDeck();
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);