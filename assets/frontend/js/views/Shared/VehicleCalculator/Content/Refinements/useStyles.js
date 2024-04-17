import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, isMobileView, isLegacyView }) => {
  if (isLegacyView) {
    return {
      root: {
        padding: [[44, 30, 24]],
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',

        [breakpoints.down(isMobileView ? 'xl' : 'sm')]: {
          padding: [[22, 14, 28]],
        },

        '& > div:not(:first-child)': {
          marginTop: 24,

          [breakpoints.down(isMobileView ? 'xl' : 'sm')]: {
            marginTop: 14,
          },
        },
      },
    };
  }

  return {
    root: {
      paddingRight: 24,
      paddingBottom: 24,

      [breakpoints.down('sm')]: {
        paddingRight: 20,
      },

      [breakpoints.down(isMobileView ? 'xl' : 'xs')]: {
        paddingRight: 0,
        paddingBottom: 0,
      },

      '& > div:not(:first-child)': {
        marginTop: 18,

        [breakpoints.down(isMobileView ? 'xl' : 'sm')]: {
          marginTop: 8,
        },
      },
    },
  };
});
