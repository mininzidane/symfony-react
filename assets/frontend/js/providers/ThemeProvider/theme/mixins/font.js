function font(fontSize, lineHeight, fontWeight) {
  const styles = {};

  if (fontSize) {
    styles.fontSize = fontSize;
  }

  if (lineHeight) {
    styles.lineHeight = `${lineHeight}px`;
  }

  if (fontWeight) {
    styles.fontWeight = fontWeight;
  }

  return styles;
}

export default font;
