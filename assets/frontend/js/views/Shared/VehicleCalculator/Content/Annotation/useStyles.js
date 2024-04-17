import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ isLegacyView, breakpoints, isMobileView }) => {
  if (isLegacyView) {
    return {
      root: {
        backgroundColor: '#FFF1C3',
        '&:not(:empty)': {
          display: 'flex',
          padding: [[0, 30, 20]],
          [breakpoints.down(isMobileView ? 'xl' : 'sm')]: {
            padding: [[0, 14, 20]],
          },
        },
      },
    };
  }

  return {
    root: {
      '&:not(:empty)': {
        display: 'flex',
        marginTop: 14,
      },
    },
  };
});
