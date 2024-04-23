// import { useSearchParams } from 'next/navigation';
import styles from './index.module.css';
import { useState } from 'react';
// import { reportWebVitals } from 'next/dist/build/templates/pages';

const Home = () => {
  const [turnColor, setTurncolor] = useState(1);
  const [board, setBoard] = useState([
    [1, 0, 0, 0, 0, 0, 0, 1],
    [2, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 1, 2, 0, 0, 2],
    [0, 0, 0, 2, 1, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const clickHandler = (x: number, y: number) => {
    const newBoard = structuredClone(board);
    newBoard[y][x] = turnColor;
    setTurncolor(turnColor === 1 ? 2 : 1);

    // ひっくり返す処理

    for (let n = 2, i = 1, z = 1000; y - n >= 0 && z > 100; n++, i++) {
      if (newBoard[y - n][x] === turnColor) {
        console.log('a');
        for (let p = 1; p < n; p++) {
          console.log('b:', n);
          newBoard[y - n + p][x] = turnColor;
          //すべてひっくり返さないようにする
          if (newBoard[y - n + i][x] === turnColor) {
            console.log('break');
            z = 0;
            break;
          }
        }
      }
    }

    setBoard(newBoard);
    // console.log(x, y);
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
