import { NavLink } from 'react-router-dom';
import s from './dialogUser.module.css';


const DialogUser = (props) => {
  return (
    <div className={s.dialogs}>
      <NavLink to={"/dialogs/" + props.id} activeClassName={s.active}>
        {props.name}
      </NavLink>
    </div>
  );
};

export default DialogUser;


