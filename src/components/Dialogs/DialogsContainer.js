import { addMessageActionCreator } from '../../redux/reducers/dialogs-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { authRedirect } from '../../hoc/AuthRedirect';
import { compose } from 'redux';



let mapStateToProps = (state) => {
  return {
    users: state.dialogs.users,
    messages: state.dialogs.messages
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    addMessage: (text) => {
      dispatch(addMessageActionCreator(text));
    }
  };
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  authRedirect
)(Dialogs);


