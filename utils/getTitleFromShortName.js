// utility function to get title from short name
const getTitleFromShortName = (shortName, data) => {
  const item = data.find((item) => item.shortName === shortName);
  return item.title;
};

export default getTitleFromShortName;
