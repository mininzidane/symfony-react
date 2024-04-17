import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative',
    boxSizing: 'content-box',
    overflow: 'hidden',

    '&.spacer-xl-90': {
      height: 90,
    },

    '&.width-xl-300': {
      width: 300,
    },

    '&.width-xl-970': {
      width: 970,
    },

    '&.width-xl-728': {
      width: 728,
    },

    '&.width-xl-336': {
      width: 336,
    },

    [breakpoints.down('md')]: {
      '&.width-md-300': {
        width: 300,
      },

      '&.spacer-md-60': {
        height: 60,
      },
    },

    [breakpoints.down('sm')]: {
      '&.spacer-sm-50': {
        height: 50,
      },

      '&.width-sm-300': {
        width: 300,
      },
    },
  },
}));
