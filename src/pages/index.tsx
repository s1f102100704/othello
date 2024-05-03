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
  const [blackWhite, setBlackWhite] = useState('黒の番です');
  const [blackPoints, setBlackPoints] = useState(2);
  const [whitePoints, setWhitePoints] = useState(2);

  let pass = 0; //count pass

  const clickHandler = (x: number, y: number) => {
    const newBoard = structuredClone(board); // 上下左右ひっくり返す処理

    if (newBoard[y][x] === 3) {
      for (let n = 2, k = 1, i = 0, z = 1000; z > 100; n++, k++, i++) {
        //上方向
        if (
          y - n >= 0 &&
          newBoard[y - n][x] === turnColor &&
          newBoard[y - n + i][x] !== 0 &&
          newBoard[y - n + i][x] !== 3 &&
          newBoard[y - 1][x] !== 0 &&
          newBoard[y - 1][x] !== 3 &&
          newBoard[y - 1][x] !== turnColor
        ) {
          newBoard[y][x] = turnColor;
          setTurncolor(turnColor === 1 ? 2 : 1);
          //上方向のすべての座標の色を判定する
          for (let p = 1; p < n; p++) {
            newBoard[y - n + p][x] = turnColor;
            //すべてひっくり返さないようにする
            if (newBoard[y - n + k][x] === turnColor) {
              z = 0;
              break;
            }
          }
        }
        //下方向
        if (
          y + n <= 7 &&
          newBoard[y + n][x] === turnColor &&
          newBoard[y + n - i][x] !== 0 &&
          newBoard[y + n - i][x] !== 3 &&
          newBoard[y + 1][x] !== 0 &&
          newBoard[y + 1][x] !== 3 &&
          newBoard[y + 1][x] !== turnColor
        ) {
          console.log('下');
          newBoard[y][x] = turnColor;
          setTurncolor(turnColor === 1 ? 2 : 1);
          for (let p = 1; p < n; p++) {
            newBoard[y + n - p][x] = turnColor;
            if (newBoard[y + n - k][x] === turnColor) {
              z = 0;
              break;
            }
          }
        }

        //左方向
        if (
          x - n >= 0 &&
          newBoard[y][x - n] === turnColor &&
          newBoard[y][x - n + i] !== 0 &&
          newBoard[y][x - n + i] !== 3 &&
          newBoard[y][x - 1] !== 0 &&
          newBoard[y][x - 1] !== 3 &&
          newBoard[y][x - 1] !== turnColor
        ) {
          console.log('左');
          newBoard[y][x] = turnColor;
          setTurncolor(turnColor === 1 ? 2 : 1);
          for (let p = 1; p < n; p++) {
            newBoard[y][x - n + p] = turnColor;
            if (newBoard[y][x - n + k] === turnColor) {
              z = 0;
              break;
            }
          }
        }
        //右方向
        if (
          x + n <= 7 &&
          newBoard[y][x + n] === turnColor &&
          newBoard[y][x + n - i] !== 0 &&
          newBoard[y][x + n - i] !== 3 &&
          newBoard[y][x + 1] !== 0 &&
          newBoard[y][x + 1] !== 3 &&
          newBoard[y][x + 1] !== turnColor
        ) {
          console.log('右右');
          newBoard[y][x] = turnColor;
          setTurncolor(turnColor === 1 ? 2 : 1);
          for (let p = 1; p < n; p++) {
            newBoard[y][x + n - p] = turnColor;
            if (newBoard[y][x + n - k] === turnColor) {
              z = 0;
              break;
            }
          }
        }
        //右斜め上
        if (
          y - n >= 0 &&
          x + n <= 7 &&
          newBoard[y - n][x + n] === turnColor &&
          newBoard[y - n + i][x + n - i] !== 0 &&
          newBoard[y - n + i][x + n - i] !== 3 &&
          newBoard[y - 1][x + 1] !== 0 &&
          newBoard[y - 1][x + 1] !== 3 &&
          newBoard[y - 1][x + 1] !== turnColor
        ) {
          newBoard[y][x] = turnColor;
          setTurncolor(turnColor === 1 ? 2 : 1);

          for (let p = 1; p < n; p++) {
            newBoard[y - n + p][x + n - p] = turnColor;
            if (newBoard[y - n + k][x + n - k] === turnColor) {
              z = 0;
              break;
            }
          }
        }
        //右斜め下
        if (
          y + n <= 7 &&
          x + n <= 7 &&
          newBoard[y + n][x + n] === turnColor &&
          newBoard[y + n - i][x + n - i] !== 0 &&
          newBoard[y + n - i][x + n - i] !== 3 &&
          newBoard[y + 1][x + 1] !== 0 &&
          newBoard[y + 1][x + 1] !== 3 &&
          newBoard[y + 1][x + 1] !== turnColor
        ) {
          newBoard[y][x] = turnColor;
          setTurncolor(turnColor === 1 ? 2 : 1);

          for (let p = 1; p < n; p++) {
            newBoard[y + n - p][x + n - p] = turnColor;
            if (newBoard[y + n - k][x + n - k] === turnColor) {
              z = 0;
              break;
            }
          }
        }
        //左斜め上
        if (
          y - n >= 0 &&
          x - n >= 0 &&
          newBoard[y - n][x - n] === turnColor &&
          newBoard[y - n + i][x - n + i] !== 0 &&
          newBoard[y - n + i][x - n + i] !== 3 &&
          newBoard[y - 1][x - 1] !== 0 &&
          newBoard[y - 1][x - 1] !== 3 &&
          newBoard[y - 1][x - 1] !== turnColor
        ) {
          newBoard[y][x] = turnColor;
          setTurncolor(turnColor === 1 ? 2 : 1);

          for (let p = 1; p < n; p++) {
            newBoard[y - n + p][x - n + p] = turnColor;
            //すべてひっくり返さないようにする
            if (newBoard[y - n + k][x - n + k] === turnColor) {
              z = 0;
              break;
            }
          }
        }
        if (
          y + n <= 7 &&
          x - n >= 0 &&
          newBoard[y + n][x - n] === turnColor &&
          newBoard[y + n - i][x - n + i] !== 0 &&
          newBoard[y + n - i][x - n + i] !== 3 &&
          newBoard[y + 1][x - 1] !== 0 &&
          newBoard[y + 1][x - 1] !== 3 &&
          newBoard[y + 1][x - 1] !== turnColor
        ) {
          newBoard[y][x] = turnColor;
          setTurncolor(turnColor === 1 ? 2 : 1);

          for (let p = 1; p < n; p++) {
            newBoard[y + n - p][x - n + p] = turnColor;
            if (newBoard[y + n - k][x - n + k] === turnColor) {
              z = 0;
              break;
            }
          }
        }
      }
      //上方向
      // for (let n = 2, k = 1, i = 0, z = 1000; y - n >= 0 && z > 100; n++, k++, i++) {
      //   if (
      //     newBoard[y - n][x] === turnColor &&
      //     newBoard[y - n + i][x] !== 0 &&
      //     newBoard[y - n + i][x] !== 3 &&
      //     newBoard[y - 1][x] !== 0 &&
      //     newBoard[y - 1][x] !== 3 &&
      //     newBoard[y - 1][x] !== turnColor
      //   ) {
      //     newBoard[y][x] = turnColor;
      //     setTurncolor(turnColor === 1 ? 2 : 1);
      //     //上方向のすべての座標の色を判定する
      //     for (let p = 1; p < n; p++) {
      //       newBoard[y - n + p][x] = turnColor;
      //       //すべてひっくり返さないようにする
      //       if (newBoard[y - n + k][x] === turnColor) {
      //         z = 0;
      //         break;
      //       }
      //     }
      //   }
      // }
      //下方向
      // for (let n = 2, k = 1, i = 0, z = 1000; y + n <= 7 && z > 100; n++, k++, i++) {
      //   if (
      //     newBoard[y + n][x] === turnColor &&
      //     newBoard[y + n - i][x] !== 0 &&
      //     newBoard[y + n - i][x] !== 3 &&
      //     newBoard[y + 1][x] !== 0 &&
      //     newBoard[y + 1][x] !== 3 &&
      //     newBoard[y + 1][x] !== turnColor
      //   ) {
      //     console.log('下');
      //     newBoard[y][x] = turnColor;
      //     setTurncolor(turnColor === 1 ? 2 : 1);
      //     for (let p = 1; p < n; p++) {
      //       newBoard[y + n - p][x] = turnColor;
      //       if (newBoard[y + n - k][x] === turnColor) {
      //         z = 0;
      //         break;
      //       }
      //     }
      //   }
      // }
      //左方向
      // for (let n = 2, k = 1, i = 0, z = 1000; x - n >= 0 && z > 100; n++, k++, i++) {
      //   if (
      //     newBoard[y][x - n] === turnColor &&
      //     newBoard[y][x - n + i] !== 0 &&
      //     newBoard[y][x - n + i] !== 3 &&
      //     newBoard[y][x - 1] !== 0 &&
      //     newBoard[y][x - 1] !== 3 &&
      //     newBoard[y][x - 1] !== turnColor
      //   ) {
      //     console.log('左');
      //     newBoard[y][x] = turnColor;
      //     setTurncolor(turnColor === 1 ? 2 : 1);
      //     for (let p = 1; p < n; p++) {
      //       newBoard[y][x - n + p] = turnColor;
      //       if (newBoard[y][x - n + k] === turnColor) {
      //         z = 0;
      //         break;
      //       }
      //     }
      //   }
      // }
      //右方向
      // for (let n = 2, k = 1, i = 0, z = 1000; x + n <= 7 && z > 100; n++, k++, i++) {
      //   if (
      //     newBoard[y][x + n] === turnColor &&
      //     newBoard[y][x + n - i] !== 0 &&
      //     newBoard[y][x + n - i] !== 3 &&
      //     newBoard[y][x + 1] !== 0 &&
      //     newBoard[y][x + 1] !== 3 &&
      //     newBoard[y][x + 1] !== turnColor
      //   ) {
      //     console.log('右右');
      //     newBoard[y][x] = turnColor;
      //     setTurncolor(turnColor === 1 ? 2 : 1);
      //     for (let p = 1; p < n; p++) {
      //       newBoard[y][x + n - p] = turnColor;
      //       if (newBoard[y][x + n - k] === turnColor) {
      //         z = 0;
      //         break;
      //       }
      //     }
      //   }
      // }
      //右斜め上方向
      // for (let n = 2, k = 1, i = 0, z = 1000; y - n >= 0 && x + n <= 7 && z > 100; n++, k++, i++) {
      //   if (
      //     newBoard[y - n][x + n] === turnColor &&
      //     newBoard[y - n + i][x + n - i] !== 0 &&
      //     newBoard[y - n + i][x + n - i] !== 3 &&
      //     newBoard[y - 1][x + 1] !== 0 &&
      //     newBoard[y - 1][x + 1] !== 3 &&
      //     newBoard[y - 1][x + 1] !== turnColor
      //   ) {
      //     newBoard[y][x] = turnColor;
      //     setTurncolor(turnColor === 1 ? 2 : 1);

      //     for (let p = 1; p < n; p++) {
      //       newBoard[y - n + p][x + n - p] = turnColor;
      //       if (newBoard[y - n + k][x + n - k] === turnColor) {
      //         z = 0;
      //         break;
      //       }
      //     }
      //   }
      // }
      //右斜め下方向
      // for (let n = 2, k = 1, i = 0, z = 1000; y + n <= 7 && x + n <= 7 && z > 100; n++, k++, i++) {
      //   if (
      //     newBoard[y + n][x + n] === turnColor &&
      //     newBoard[y + n - i][x + n - i] !== 0 &&
      //     newBoard[y + n - i][x + n - i] !== 3 &&
      //     newBoard[y + 1][x + 1] !== 0 &&
      //     newBoard[y + 1][x + 1] !== 3 &&
      //     newBoard[y + 1][x + 1] !== turnColor
      //   ) {
      //     newBoard[y][x] = turnColor;
      //     setTurncolor(turnColor === 1 ? 2 : 1);

      //     for (let p = 1; p < n; p++) {
      //       newBoard[y + n - p][x + n - p] = turnColor;
      //       if (newBoard[y + n - k][x + n - k] === turnColor) {
      //         z = 0;
      //         break;
      //       }
      //     }
      //   }
      // }
      //左斜め上方向
      // for (let n = 2, k = 1, i = 0, z = 1000; y - n >= 0 && x - n >= 0 && z > 100; n++, k++, i++) {
      //   if (
      //     newBoard[y - n][x - n] === turnColor &&
      //     newBoard[y - n + i][x - n + i] !== 0 &&
      //     newBoard[y - n + i][x - n + i] !== 3 &&
      //     newBoard[y - 1][x - 1] !== 0 &&
      //     newBoard[y - 1][x - 1] !== 3 &&
      //     newBoard[y - 1][x - 1] !== turnColor
      //   ) {
      //     newBoard[y][x] = turnColor;
      //     setTurncolor(turnColor === 1 ? 2 : 1);

      //     for (let p = 1; p < n; p++) {
      //       newBoard[y - n + p][x - n + p] = turnColor;
      //       //すべてひっくり返さないようにする
      //       if (newBoard[y - n + k][x - n + k] === turnColor) {
      //         z = 0;
      //         break;
      //       }
      //     }
      //   }
      // }
      //左斜め下方向
      // for (let n = 2, k = 1, i = 0, z = 1000; y + n <= 7 && x - n >= 0 && z > 100; n++, k++, i++) {
      //   if (
      //     newBoard[y + n][x - n] === turnColor &&
      //     newBoard[y + n - i][x - n + i] !== 0 &&
      //     newBoard[y + n - i][x - n + i] !== 3 &&
      //     newBoard[y + 1][x - 1] !== 0 &&
      //     newBoard[y + 1][x - 1] !== 3 &&
      //     newBoard[y + 1][x - 1] !== turnColor
      //   ) {
      //     newBoard[y][x] = turnColor;
      //     setTurncolor(turnColor === 1 ? 2 : 1);

      //     for (let p = 1; p < n; p++) {
      //       newBoard[y + n - p][x - n + p] = turnColor;
      //       if (newBoard[y + n - k][x - n + k] === turnColor) {
      //         z = 0;
      //         break;
      //       }
      //     }
      //   }
      // }

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
      orange(newBoard, turnColor);
    }
  };
  //候補地の処理
  const orange = (newBoard: number[][], turnColor: number) => {
    //read board
    let number = 0;
    const turn = turnColor === 1 ? 2 : 1;
    let black = 0; //黒の数
    let white = 0; //白の数
    let site = 0; //候補地の数
    for (let p = 0; p <= 7; p++) {
      //y軸
      for (let q = 0; q <= 7; q++) {
        //x軸
        number = newBoard[p][q];
        if (number === 0) {
          //上方向
          for (let n = 2, i = 0, z = 1000; p - n >= 0 && z > 100; n++, i++) {
            if (
              newBoard[p - n][q] === turn &&
              newBoard[p - n + i][q] !== 0 &&
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
          //下方向;
          for (let n = 2, i = 0, z = 1000; p + n <= 7 && z > 100; n++, i++) {
            if (
              newBoard[p + n][q] === turn &&
              newBoard[p + n - i][q] !== 0 &&
              newBoard[p + 1][q] !== 0 &&
              newBoard[p + 1][q] !== 3 &&
              newBoard[p + 1][q] !== turn
            ) {
              newBoard[p][q] = 3; //座標p,qの値を3に変更
              for (let j = 1; j < n; j++) {
                if (newBoard[p + n - j][q] === turn) {
                  z = 0;
                  break;
                }
              }
            }
          }
          //左方向
          for (let n = 2, i = 0, z = 1000; q - n >= 0 && z > 100; n++, i++) {
            if (
              newBoard[p][q - n] === turn &&
              newBoard[p][q - n + i] !== 0 &&
              newBoard[p][q - n + i] !== 3 &&
              newBoard[p][q - 1] !== 0 &&
              newBoard[p][q - 1] !== 3 &&
              newBoard[p][q - 1] !== turn
            ) {
              newBoard[p][q] = 3; //座標p,qの値を3に変更
              for (let j = 1; j < n; j++) {
                if (newBoard[p][q - n + j] === turn) {
                  z = 0;
                  break;
                }
              }
            }
          }
          //右方向;
          for (let n = 2, i = 0, z = 1000; q + n <= 7 && z > 100; n++, i++) {
            if (
              newBoard[p][q + n] === turn &&
              newBoard[p][q + n - i] !== 0 &&
              newBoard[p][q + 1] !== 0 &&
              newBoard[p][q + 1] !== 3 &&
              newBoard[p][q + 1] !== turn
            ) {
              newBoard[p][q] = 3; //座標p,qの値を3に変更
              for (let j = 1; j < n; j++) {
                if (newBoard[p][q + n - j] === turn) {
                  z = 0;
                  break;
                }
              }
            }
          }
          //右斜め上方向
          for (let n = 2, i = 0, z = 1000; p - n >= 0 && q + n <= 7 && z > 100; n++, i++) {
            if (
              newBoard[p - n][q + n] === turn &&
              newBoard[p - n + i][q + n - i] !== 0 &&
              newBoard[p - 1][q + 1] !== 0 &&
              newBoard[p - 1][q + 1] !== 3 &&
              newBoard[p - 1][q + 1] !== turn
            ) {
              newBoard[p][q] = 3; //座標p,qの値を3に変更
              for (let j = 1; j < n; j++) {
                if (newBoard[p - n + j][q + n - j] === turn) {
                  z = 0;
                  break;
                }
              }
            }
          }
          //右斜め下方向
          for (let n = 2, i = 0, z = 1000; p + n <= 7 && q + n <= 7 && z > 100; n++, i++) {
            if (
              newBoard[p + n][q + n] === turn &&
              newBoard[p + n - i][q + n - i] !== 0 &&
              newBoard[p + 1][q + 1] !== 0 &&
              newBoard[p + 1][q + 1] !== 3 &&
              newBoard[p + 1][q + 1] !== turn
            ) {
              newBoard[p][q] = 3; //座標p,qの値を3に変更
              for (let j = 1; j < n; j++) {
                if (newBoard[p + n - j][q + n - j] === turn) {
                  z = 0;
                  break;
                }
              }
            }
          }
          //左斜め上方向
          for (let n = 2, i = 0, z = 1000; p - n >= 0 && q - n >= 0 && z > 100; n++, i++) {
            if (
              newBoard[p - n][q - n] === turn &&
              newBoard[p - n + i][q - n + i] !== 0 &&
              newBoard[p - 1][q - 1] !== 0 &&
              newBoard[p - 1][q - 1] !== 3 &&
              newBoard[p - 1][q - 1] !== turn
            ) {
              newBoard[p][q] = 3; //座標p,qの値を3に変更
              for (let j = 1; j < n; j++) {
                if (newBoard[p - n + j][q - n + j] === turn) {
                  z = 0;
                  break;
                }
              }
            }
          }
          //左斜め下方向
          for (let n = 2, i = 0, z = 1000; p + n <= 7 && q - n >= 0 && z > 100; n++, i++) {
            if (
              newBoard[p + n][q - n] === turn &&
              newBoard[p + n - i][q - n + i] !== 0 &&
              newBoard[p + 1][q - 1] !== 0 &&
              newBoard[p + 1][q - 1] !== 3 &&
              newBoard[p + 1][q - 1] !== turn
            ) {
              newBoard[p][q] = 3; //座標p,qの値を3に変更
              for (let j = 1; j < n; j++) {
                if (newBoard[p + n - j][q - n + j] === turn) {
                  z = 0;
                  break;
                }
              }
            }
          }
        }
        //おける場所があるか
        //ターン表示
        if (number === 1) {
          black += 1;
        }
        if (number === 2) {
          white += 1;
        }
        if (newBoard[p][q] === 3) {
          site += 1;
        }
      }
    }
    setBoard(newBoard);
    setBlackPoints(black);
    setWhitePoints(white);
    console.log(site);

    if (turn === 1) {
      setBlackWhite('黒の番です');
    } else {
      setBlackWhite('白の番です');
    }
    //pass時
    if (site === 0) {
      console.log('A');
      pass += 1;
      if (pass === 3) {
        console.log('AAAA');
        if (black > white) {
          setBlackWhite('黒の勝ち');
          return 0;
        } else if (black < white) {
          setBlackWhite('白の勝ち');
          return 0;
        } else {
          return 0;
        }
      }
      orange(newBoard, turn);
      setTurncolor(turn === 1 ? 2 : 1);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.countstyle}>
        <a>
          {blackWhite}
          <br />
        </a>
        <a>●:{blackPoints}</a>
        <a>○:{whitePoints}</a>
      </div>
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
              {color === 3 && (
                <div
                  className={styles.stonestyle}
                  style={{ background: 'orange', width: 20, height: 20 }}
                />
              )}
              {color === 0 && <div className={styles.stonestyle} style={{ background: 'green' }} />}
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default Home;
