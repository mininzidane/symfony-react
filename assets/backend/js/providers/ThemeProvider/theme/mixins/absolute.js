function absolute(top = 'auto', right = 'auto', bottom = 'auto', left = 'auto') {
  return {
    position: 'absolute',
    top,
    bottom,
    left,
    right,
  };
}

export default absolute;
