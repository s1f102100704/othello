// import { useSearchParams } from 'next/navigation';
import styles from './index.module.css';
import { useState } from 'react';
// import { reportWebVitals } from 'next/dist/build/templates/pages';

const Home = () => {
  const [turnColor, setTurncolor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 1, 2, 3, 0, 0],
    [0, 0, 3, 2, 1, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  //候補地の処理

  const clickHandler = (x: number, y: number) => {
    const newBoard = structuredClone(board);

    // 上下左右ひっくり返す処理
    //上方向
    for (let n = 2, i = 1, z = 1000; y - n >= 0 && z > 100; n++, i++) {
      if (newBoard[y][x] === 3) {
        newBoard[y][x] = turnColor;
        setTurncolor(turnColor === 1 ? 2 : 1);
        //上方向のすべての座標の色を判定する
        for (let p = 1; p < n; p++) {
          newBoard[y - n + p][x] = turnColor;
          //すべてひっくり返さないようにする
          if (newBoard[y - n + i][x] === turnColor) {
            z = 0;
            break;
          }
        }
      }
    }
    //下方向
    for (let n = 2, i = 1, z = 1000; y + n <= 7 && z > 100; n++, i++) {
      if (
        newBoard[y + n][x] === turnColor &&
        newBoard[y + 1][x] !== 0 &&
        newBoard[y + 1][x] !== turnColor &&
        board[y][x] === 0
      ) {
        newBoard[y][x] = turnColor;
        setTurncolor(turnColor === 1 ? 2 : 1);
        for (let p = 1; p < n; p++) {
          newBoard[y + n - p][x] = turnColor;
          if (newBoard[y + n - i][x] === turnColor) {
            z = 0;
            break;
          }
        }
      }
    }
    //左方向
    for (let n = 2, i = 1, z = 1000; x - n >= 0 && z > 100; n++, i++) {
      if (
        newBoard[y][x - n] === turnColor &&
        newBoard[y][x - 1] !== 0 &&
        newBoard[y][x - 1] !== turnColor &&
        board[y][x] === 0
      ) {
        newBoard[y][x] = turnColor;
        setTurncolor(turnColor === 1 ? 2 : 1);
        for (let p = 1; p < n; p++) {
          newBoard[y][x - n + p] = turnColor;
          if (newBoard[y][x - n + i] === turnColor) {
            z = 0;
            break;
          }
        }
      }
    }
    //右方向
    for (let n = 2, i = 1, z = 1000; x + n <= 7 && z > 100; n++, i++) {
      if (
        newBoard[y][x + n] === turnColor &&
        newBoard[y][x + 1] !== 0 &&
        newBoard[y][x + 1] !== turnColor &&
        board[y][x] === 0 //重ねお禁止
      ) {
        newBoard[y][x] = turnColor;
        setTurncolor(turnColor === 1 ? 2 : 1);
        for (let p = 1; p < n; p++) {
          newBoard[y][x + n - p] = turnColor;
          if (newBoard[y][x + n - i] === turnColor) {
            z = 0;
            break;
          }
        }
      }
    }
    //右斜め上方向
    for (let n = 2, i = 1, z = 1000; y - n >= 0 && x + n <= 7 && z > 100; n++, i++) {
      if (
        newBoard[y - n][x + n] === turnColor &&
        newBoard[y - 1][x + 1] !== 0 &&
        newBoard[y - 1][x + 1] !== turnColor &&
        board[y][x] === 0 //重ねお禁止
      ) {
        newBoard[y][x] = turnColor;
        setTurncolor(turnColor === 1 ? 2 : 1);

        for (let p = 1; p < n; p++) {
          newBoard[y - n + p][x + n - p] = turnColor;
          if (newBoard[y - n + i][x + n - i] === turnColor) {
            z = 0;
            break;
          }
        }
      }
    }
    //右斜め下方向
    for (let n = 2, i = 1, z = 1000; y + n <= 7 && x + n <= 7 && z > 100; n++, i++) {
      if (
        newBoard[y + n][x + n] === turnColor &&
        newBoard[y + 1][x + 1] !== 0 &&
        newBoard[y + 1][x + 1] !== turnColor &&
        board[y][x] === 0 //重ねお禁止
      ) {
        newBoard[y][x] = turnColor;
        setTurncolor(turnColor === 1 ? 2 : 1);

        for (let p = 1; p < n; p++) {
          newBoard[y + n - p][x + n - p] = turnColor;
          if (newBoard[y + n - i][x + n - i] === turnColor) {
            z = 0;
            break;
          }
        }
      }
    }
    //左斜め上方向
    for (let n = 2, i = 1, z = 1000; y - n >= 0 && x - n >= 0 && z > 100; n++, i++) {
      if (
        newBoard[y - n][x - n] === turnColor &&
        newBoard[y - 1][x - 1] !== 0 &&
        newBoard[y - 1][x - 1] !== turnColor &&
        board[y][x] === 0 //重ねお禁止
      ) {
        newBoard[y][x] = turnColor;
        setTurncolor(turnColor === 1 ? 2 : 1);

        for (let p = 1; p < n; p++) {
          newBoard[y - n + p][x - n + p] = turnColor;
          //すべてひっくり返さないようにする
          if (newBoard[y - n + i][x - n + i] === turnColor) {
            z = 0;
            break;
          }
        }
      }
    }
    //左斜め下方向
    for (let n = 2, i = 1, z = 1000; y + n <= 7 && x - n >= 0 && z > 100; n++, i++) {
      if (
        newBoard[y + n][x - n] === turnColor &&
        newBoard[y + 1][x - 1] !== 0 &&
        newBoard[y + 1][x - 1] !== turnColor &&
        board[y][x] === 0 //重ねお禁止
      ) {
        newBoard[y][x] = turnColor;
        setTurncolor(turnColor === 1 ? 2 : 1);

        for (let p = 1; p < n; p++) {
          newBoard[y + n - p][x - n + p] = turnColor;
          if (newBoard[y + n - i][x - n + i] === turnColor) {
            z = 0;
            break;
          }
        }
      }
    }

    //候補地のリセット
    for (let p = 0; p <= 7; p++) {
      //y軸
      for (let q = 0; q <= 7; q++) {
        // x軸;
        if (newBoard[p][q] === 3) {
          newBoard[p][q] = 0;
        }
      }
    }

    setBoard(newBoard);
    blue(newBoard, turnColor);
  };
  const blue = (newBoard: number[][], turnColor: number) => {
    //read board
    let number = 0;
    const turn = turnColor === 1 ? 2 : 1;
    for (let p = 0; p <= 7; p++) {
      //y軸
      for (let q = 0; q <= 7; q++) {
        //x軸
        number = newBoard[p][q];
        if (number === 0) {
          for (let n = 2, i = 1, z = 1000; p - n >= 0 && z > 100; n++, i++) {
            if (
              newBoard[p - n][q] === turn &&
              newBoard[p - 1][q] !== 0 &&
              newBoard[p - 1][q] !== 3 &&
              newBoard[p - 1][q] !== turn
            ) {
              newBoard[p][q] = 3; //座標p,qの値を3に変更
              for (let j = 1; j < n; j++) {
                if (newBoard[p - n + j][q] === turn) {
                  z = 0;
                  break;
                }
              }
            }
          }
        }
      }
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.boardstyle}>
        {/*for文ぽい, mapは中身を取り出す*/}
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cellstyle} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              {color !== 0 && color !== 3 && (
                <div
                  className={styles.stonestyle}
                  style={{ background: color === 1 ? '#000' : '#fff' }}
                />
              )}
              {color === 3 && <div className={styles.stonestyle} style={{ background: 'blue' }} />}
              {color === 0 && <div className={styles.stonestyle} style={{ background: 'green' }} />}
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default Home;
