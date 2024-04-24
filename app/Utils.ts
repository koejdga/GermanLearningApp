export const shuffle = <T>(inputArray: T[]): T[] => {
  let outputArray = [...inputArray];
  for (let i = outputArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [outputArray[i], outputArray[j]] = [outputArray[j], outputArray[i]];
  }
  return outputArray;
};
