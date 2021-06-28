import { NavLink } from 'react-router-dom';
import s from './dialogUser.module.css';

type PropsType = {
  name: string,
  id: number
};

const DialogUser: React.FC<PropsType> = (props) => {
  return (
    <div className={s.dialogs}>
      <NavLink to={"/dialogs/" + props.id} activeClassName={s.active}>
        {props.name}
      </NavLink>
    </div>
  );
};

export default DialogUser;


