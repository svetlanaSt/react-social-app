import { NavLink } from 'react-router-dom';
import classes from './navbar.module.css';

const Navbar = () => {
  return (
    <nav className={classes.nav}>
      <div className={classes.item}>
        <NavLink to="/profile" activeClassName={classes.active}>Profile</NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/dialogs" activeClassName={classes.active}>Messages</NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/users" activeClassName={classes.active}>Users</NavLink>
      </div>
      <div className={classes.item}>
        <a>Musics</a>
      </div>
      <div className={classes.item}>
        <a>Settings</a>
      </div>
    </nav>
  );
};

export default Navbar;
