function circle(size, background = 'inherit') {
  return {
    width: size,
    minWidth: size,
    height: size,
    minHeight: size,
    borderRadius: '50%',
    background,
  };
}

export default circle;
