import React from 'react';
import TodoForm from './components/TodoForm';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Home extends React.Component {

  componentWillReceiveProps() {
    console.log('----');
    console.log(this.props);
  }

  render() {
    return (
      <TodoForm {...this.props}/>
    );
  }
}

const viewerQuery = gql`
query {
  viewer {
    todos {
    	text
    }
  }
}
`;

const getViewer = graphql(viewerQuery, {
  props: ({ data }) => ({
    viewer: data,
  }),
});

export default getViewer(Home);
