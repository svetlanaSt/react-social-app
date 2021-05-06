import { NavLink } from 'react-router-dom';
import s from './header.module.css';

const Header = (props) => {
  return (
    <header className={s.header}>
      <img src='https://c7.uihere.com/files/840/535/704/columbidae-doves-as-symbols-logo-pigeon.jpg'></img>
      <div className={s.loginBlock}>
        {props.isAuth ? <button onClick={props.logoutThunkCreator}>Logout</button>
          : <NavLink to={'/login'}>Login</NavLink>}
      </div>
    </header>
  );
};

export default Header;


