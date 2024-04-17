function getThemeStyles(hasSelectedoption) {
  const textStyles = {
    color: '#000',
    fontSize: 16,
    lineHeight: '20px',
    fontWeight: '400',
  };

  const styles = {
    control: (defaultStyles, { isDisabled }) => ({
      ...defaultStyles,
      backgroundColor: isDisabled ? '#DDD' : '#FFF',
      height: 48,
      boxShadow: 'none',
      cursor: 'pointer',
      border: 'none',
      borderRadius: 0,
    }),
    valueContainer: {
      padding: '0 30px 0 12px',
      marginTop: hasSelectedoption ? 12 : 0,
    },
    input: {
      ...textStyles,
      padding: 0,
      margin: 0,

      '& input': {
        height: 20,
        display: 'block',
        zIndex: 3,
      },
    },
    placeholder: (defaultStyles, { isDisabled }) => ({
      ...defaultStyles,
      ...textStyles,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      margin: 0,
      maxWidth: 'calc(100% - 40px)',
      color: isDisabled ? '#999' : '#000',
    }),
    singleValue: (defaultStyles, { isDisabled }) => ({
      ...defaultStyles,
      ...textStyles,
      margin: 0,
      color: isDisabled ? '#999' : '#000',
      maxWidth: 'calc(100% - 40px)',
      fontSize: 15,
    }),
    dropdownIndicator: {
      position: 'absolute',
      top: '50%',
      right: 13,
      width: 0,
      marginTop: -1,
      height: '5px',
      borderLeft: '5px solid transparent',
      borderRight: '5px solid transparent',
      borderTop: '5px solid #626262',
    },
    menu: {
      marginTop: -4,
      borderRadius: '0 0 4px 4px',
      overflow: 'hidden',
      minHeight: 4,
      backgroundColor: 'transparent',
      boxShadow: '0 2px 2px 1px rgba(0, 0, 0, .3)',
    },
    menuList: {
      paddingTop: 0,
      paddingBottom: 0,
      backgroundColor: '#FFF',
      scrollbarColor: '#aaa transparent',
      scrollbarWidth: 'thin',

      '&:empty': {
        display: 'none',
      },

      '&::-webkit-scrollbar': {
        width: 4,
      },

      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#aaa',
        borderRadius: '4px',
      },
    },
    option: {
      padding: '5px 12px',
      fontSize: 14,
      lineHeight: '20px',
      fontWeight: '400',
      color: '#000 !important',
      backgroundColor: '#FFF !important',
      cursor: 'pointer',

      '&:hover': {
        backgroundColor: '#e4e2e0 !important',
      },
    },
    groupHeading: {
      color: '#c4c4c4',
      fontSize: 14,
      fontWeight: 400,
    },
  };

  const themeStyles = {};
  Object.entries(styles).forEach(([componentName, prop]) => {
    if (typeof prop === 'function') {
      themeStyles[componentName] = prop;
    } else {
      themeStyles[componentName] = (defaultStyles) => ({ ...defaultStyles, ...prop });
    }
  });

  return themeStyles;
}

export default getThemeStyles;
