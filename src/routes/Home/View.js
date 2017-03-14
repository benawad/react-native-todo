import React from 'react';
import TodoForm from './components/TodoForm';

export default class Home extends React.Component {
  componentWillMount() {
    this.props.checkIfSignedIn();
  }

  render() {
    return (
      <TodoForm {...this.props}/>
    );
  }
}
