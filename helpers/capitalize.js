const capitalizeFirstLetter = (str) => {
  return str?.replace(/(^|\s)\S/g, function (t) {
    return t.toUpperCase();
  });
};

module.exports = {
  capitalizeFirstLetter,
};
