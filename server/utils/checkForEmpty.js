const checkForEmpty = (arr) => {
  return arr.some((field) => {
    if (typeof field === "string") {
      return !field.trim();
    } else if (typeof field === "number") {
      return field === 0;
    } else {
      return !field;
    }
  });
};
module.exports = checkForEmpty;
