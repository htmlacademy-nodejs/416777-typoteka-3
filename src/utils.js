'use strict';

const getRandomInt = (min, max) => {
  const ADDITIONAL_NUM = 1;
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + ADDITIONAL_NUM)) + min;
};

const editNums = (num) => {
  const editedNum = num.toString().padStart(2, `0`);

  return editedNum;
};

const getRandomDate = () => {
  const MONTH_IN_MS = 2592000000;
  const THREE_MONTH = MONTH_IN_MS * 3;
  const threeMonthAgo = Date.now() - THREE_MONTH;

  const randomDate = new Date(getRandomInt(threeMonthAgo, Date.now()));

  const year = editNums(randomDate.getFullYear());
  const month = editNums(randomDate.getMonth());
  const day = editNums(randomDate.getDate());

  const hours = editNums(randomDate.getHours());
  const minutes = editNums(randomDate.getMinutes());
  const seconds = editNums(randomDate.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const shuffle = (someArray) => {
  const copyOfArray = someArray.slice();

  copyOfArray.forEach((item, index) => {
    const randomPosition = Math.floor(Math.random() * index);

    [copyOfArray[index], copyOfArray[randomPosition]] = [copyOfArray[randomPosition], someArray[index]];
  });

  return copyOfArray;
};

module.exports = {
  getRandomInt,
  getRandomDate,
  shuffle
};
