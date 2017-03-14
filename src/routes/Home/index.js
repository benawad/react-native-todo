import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from './View';
import * as actionCreators from './actions';

const mapStateToProps = (state, ownProps) => ({
  token: state.token,
});

const mapDispatchToProps = dispatch => (bindActionCreators(actionCreators, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(View);

