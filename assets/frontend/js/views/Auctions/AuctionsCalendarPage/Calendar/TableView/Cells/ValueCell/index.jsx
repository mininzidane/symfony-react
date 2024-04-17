function ValueCell({ value, emptyValue }) {
  const nullValue = emptyValue !== null && emptyValue !== undefined ? emptyValue : '—';

  return value !== null && value !== undefined ? value : nullValue;
}

export default ValueCell;
