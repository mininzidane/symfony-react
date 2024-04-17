function flex(justifyContent, alignItems) {
  const styles = {
    display: 'flex',
  };

  const map = {
    start: 'flex-start',
    end: 'flex-end',
    between: 'space-between',
  };

  if (justifyContent) {
    styles.justifyContent = map[justifyContent] || justifyContent;
  }

  if (alignItems) {
    styles.alignItems = map[alignItems] || alignItems;
  }

  return styles;
}

export default flex;
