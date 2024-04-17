import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, isMobileView, isLegacyView }) => {
  if (isLegacyView) {
    return {
      root: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

        [breakpoints.down(isMobileView ? 'xl' : 'sm')]: {
          flexWrap: 'wrap',
          justifyContent: 'flex-start',

          '& > $label, & > &input': {
            flexBasis: '100%',
          },
        },
      },
      label: {
        fontSize: 16,
        lineHeight: '20px',
        fontWeight: 400,
        flexBasis: '34%',
        color: '#333',

        [breakpoints.down(isMobileView ? 'xl' : 'sm')]: {
          fontSize: 14,
          marginBottom: 4,
        },
      },
      input: {
        flexBasis: '66%',
        flexShrink: 0,
        position: 'relative',

        [breakpoints.down('md')]: {
          flexBasis: '64%',
        },

        '& input': {
          fontSize: 16,
        },

        '& .select-plane__single-value': {
          fontSize: 16,
        },

        [breakpoints.down(isMobileView ? 'xl' : 'sm')]: {
          flexBasis: '100%',
        },
      },
    };
  }

  return {
    root: {
      [breakpoints.down(isMobileView ? 'xl' : 'sm')]: {
        flexWrap: 'wrap',
        justifyContent: 'flex-start',

        '& > $label, & > &input': {
          flexBasis: '100%',
        },
      },
    },
    label: {
      fontSize: 14,
      lineHeight: '20px',
      fontWeight: 400,
      marginBottom: 5,
      color: '#333',
    },
  };
});
