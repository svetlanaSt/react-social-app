import s from './users.module.css';
import React, { useState } from 'react';

const Paginator = (props) => {

    let pageCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];

    for (let i = 1; i < pageCount; i++) {
        pages.push(i);
    }

    let portionSize = 10;
    let portionCount = Math.ceil(pageCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);

    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return (
        <div>
            { portionNumber > 1 &&
                <button onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button>}
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map((p) => {
                    return <span className={props.currentPage === p && s.selectPage}
                        key={p}
                        onClick={(e) => {
                            props.onPageChanged(p)
                        }}>{p}</span>
                })}
            { portionCount > portionNumber &&
                <button onClick={() => { setPortionNumber(portionNumber + 1) }}>NEXT</button>}
        </div>
    );
};

export default Paginator;


