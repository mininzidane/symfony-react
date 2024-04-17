function extraHitbox(offset = 10, el = 'after') {
  const offsetsArray = Array.isArray(offset) ? offset : [offset, offset, offset, offset];

  return {
    [`&::${el}`]: {
      content: "''",
      position: 'absolute',
      top: -1 * offsetsArray[0],
      right: -1 * offsetsArray[1],
      bottom: -1 * offsetsArray[2],
      left: -1 * offsetsArray[3],
    },
  };
}

export default extraHitbox;
