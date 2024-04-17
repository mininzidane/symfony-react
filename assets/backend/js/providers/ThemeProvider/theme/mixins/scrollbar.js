function scrollbar(size = 'md') {
  const color = '#9B9391';

  const width = {
    [size === 'md']: 8,
    [size === 'sm']: 5,
  }.true;

  const styles = {
    scrollbarColor: `${color} transparent`,
    scrollbarWidth: 'thin',

    '&::-webkit-scrollbar': {
      width,
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: color,
      borderRadius: width,
    },
  };

  return styles;
}

export default scrollbar;
