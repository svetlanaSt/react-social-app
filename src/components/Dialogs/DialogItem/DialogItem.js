import s from './dialogItem.module.css';


const DialogItem = (props) => {
  return (
    <div className={s.dialogItem}>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcReO3uImv9PV8hUU3wz5TbTmdJ3fYyxNzWssg&usqp=CAU"></img>
      <div>
        {props.message}
      </div>
    </div>
  );
};

export default DialogItem;


