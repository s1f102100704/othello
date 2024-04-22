import { useSearchParams } from 'next/navigation';
import styles from './index.module.css';
import { useState } from 'react';
import { reportWebVitals } from 'next/dist/build/templates/pages';

const Home = () => {
  const [turnColor, setTurncolor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const clickHandler = (x: number, y: number) => {
    const newBoard = structuredClone(board);
    newBoard[y][x] = turnColor;
    setTurncolor(turnColor === 1 ? 2 : 1);
    if (newBoard[y - 1][x] === 3 - turnColor) {
      newBoard[y][x] = turnColor;
    }
    if (newBoard[y + 1][x] === 3 - turnColor) {
      newBoard[y][x] = turnColor;
    }
    if (newBoard[y][x - 1] === 3 - turnColor) {
      newBoard[y][x] = turnColor;
    }
    if (newBoard[y][x + 1] === 3 - turnColor) {
      newBoard[y][x] = turnColor;
    }
    setBoard(newBoard);
    console.log(x, y);
  };
  return (
    <div className={styles.container}>
      <div className={styles.boardstyle}>
        {/*for文ぽい, mapは中身を取り出す*/}
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cellstyle} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stonestyle}
                  style={{ background: color === 1 ? '#000' : '#fff' }}
                />
              )}
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default Home;
