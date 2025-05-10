const getFirstTwoChar = (name: string) => {
  const firstTwoChar = name.substring(0, 2).toUpperCase();
  return firstTwoChar;
};

export default getFirstTwoChar;
