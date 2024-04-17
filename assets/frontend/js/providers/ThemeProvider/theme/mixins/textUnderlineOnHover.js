function textUnderlineOnHover() {
  const styles = {
    textDecoration: 'none',

    '&:hover': {
      textDecoration: 'underline',
    },
  };

  return styles;
}

export default textUnderlineOnHover;
