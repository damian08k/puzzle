const area = document.querySelector(".area");
const filledSquares = document.querySelectorAll(".square");

const usedNumbers = [];
const MAX_USED_NUMBERS_LENGTH = 15;
const WIN_SITUATION = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];

// const fillSquaresWithRandomValues = () => {
//   const MAX_SQUARE_VALUE = 15;
//   const MIN_SQUARE_VALUE = 1;

//   do {
//     const randomNumber = Math.floor(
//       Math.random() * MAX_SQUARE_VALUE + MIN_SQUARE_VALUE
//     );
//     const isUsed = checkIfNumberUsed(randomNumber);

//     if (!isUsed) {
//       usedNumbers.push(randomNumber);
//     }
//   } while (usedNumbers.length < MAX_USED_NUMBERS_LENGTH);

//   return fillSquaresWithNumbers();
// };

// const fillSquaresWithNumbers = () => {
//   const squaresCopy = [...squares];

//   for (let i = 0; i < squaresCopy.length; i++) {
//     squaresCopy[i].textContent = usedNumbers[i];
//   }

//   return squaresCopy;
// };

// const checkIfNumberUsed = (randomNumber) =>
//   usedNumbers.includes(randomNumber) ? true : false;

// const filledSquares = fillSquaresWithRandomValues();

const gameBoard = [
  [filledSquares[0], filledSquares[1], filledSquares[2], filledSquares[3]],
  [filledSquares[4], filledSquares[5], filledSquares[6], filledSquares[7]],
  [filledSquares[8], filledSquares[9], filledSquares[10], filledSquares[11]],
  [filledSquares[12], filledSquares[13], filledSquares[14], filledSquares[15]],
];

const renderArea = (gameBoard) => {
  gameBoard.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      column.style.top = `${rowIndex * 100}px`;
      column.style.left = `${columnIndex * 100}px`;
    });
  });
};

renderArea(gameBoard);

const moveSquare = (clickedSquare, emptySquare) => {
  const clickedSquareCurrentTop = clickedSquare.style.top;
  const clickedSquareCurrentLeft = clickedSquare.style.left;

  clickedSquare.style.top = emptySquare.style.top;
  clickedSquare.style.left = emptySquare.style.left;

  emptySquare.style.top = clickedSquareCurrentTop;
  emptySquare.style.left = clickedSquareCurrentLeft;
};

const changeSquarePosition = (evt) => {
  const clickedSquare = evt.target;
  const win_array = [];

  let posX = 0;
  let posY = 0;
  let emptySquarePosX = 0;
  let emptySquarePosY = 0;

  gameBoard.forEach((row, rowIndex) =>
    row.forEach((column, columnIndex) => {
      if (column === clickedSquare) {
        posX = rowIndex;
        posY = columnIndex;
      }

      if (!column.textContent) {
        emptySquarePosX = rowIndex;
        emptySquarePosY = columnIndex;
      }
    })
  );

  if (
    (posX === emptySquarePosX &&
      (posY + 1 === emptySquarePosY || posY - 1 === emptySquarePosY)) ||
    (posY === emptySquarePosY &&
      (posX + 1 === emptySquarePosX || posX - 1 === emptySquarePosX))
  ) {
    moveSquare(clickedSquare, gameBoard[emptySquarePosX][emptySquarePosY]);

    const clickedSquareCurrentPosition = gameBoard[posX][posY];
    gameBoard[posX][posY] = gameBoard[emptySquarePosX][emptySquarePosY];
    gameBoard[emptySquarePosX][emptySquarePosY] = clickedSquareCurrentPosition;
  }

  gameBoard.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      win_array.push(+gameBoard[rowIndex][columnIndex].textContent);
    });
  });

  if (
    win_array.length === WIN_SITUATION.length &&
    win_array.every((el, index) => el === WIN_SITUATION[index])
  ) {
    alert("You win");
  }
};

area.addEventListener("click", changeSquarePosition);
