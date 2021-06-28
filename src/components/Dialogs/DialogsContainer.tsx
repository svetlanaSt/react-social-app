import { actions } from '../../redux/reducers/dialogs-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { authRedirect } from '../../hoc/AuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../redux/redux-store';



let mapStateToProps = (state: AppStateType) => {
  return {
    users: state.dialogs.users,
    messages: state.dialogs.messages
  };
};

let DialogsContainer = compose(
  connect(mapStateToProps, {
    addMessage: actions.addMessageActionCreator
  }),
  authRedirect
)(Dialogs);

export default DialogsContainer as React.FC;