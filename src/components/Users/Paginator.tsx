import s from './users.module.css';
import React, { useState } from 'react';

type PropsType = {
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    onPageChanged: (pageNumber: number) => void
};

const Paginator: React.FC<PropsType> = ({totalUsersCount, pageSize, onPageChanged, currentPage}) => {

    let pageCount = Math.ceil(totalUsersCount / pageSize);
    let pages: Array<number> = [];

    for (let i = 1; i < pageCount; i++) {
        pages.push(i);
    }

    let portionSize = 10;
    let portionCount = Math.ceil(pageCount / portionSize);
    let [portionNumber, setPortionNumber] = useState<number>(1);

    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return (
        <div>
            { portionNumber > 1 &&
                <button onClick={() => { setPortionNumber(portionNumber - 1)}}> PREV </button>}
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map((p) => {
                    return <span className={currentPage === p && s.selectPage}
                        key={p}
                        onClick={(e) => {
                            onPageChanged(p)
                        }}>{p}</span>
                })}
            { portionCount > portionNumber &&
                <button onClick={() => { setPortionNumber(portionNumber + 1) }}>NEXT</button>}
        </div>
    );
};

export default Paginator;


