import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: 20,
    [breakpoints.down('sm')]: {
      gridGap: 10,
    },
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    width: '100% !important',
    height: 48,
    padding: [[13, 20, 13, 14]],
    backgroundColor: '#FFFFFF',
    textDecoration: 'none !important',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.15)',
    transition: 'all ease .2s',
    borderRadius: 25,

    '&.is-md': {
      height: 40,
    },

    '&.is-facebook, &.is-google': {
      color: '#2158F5',
      border: '1px solid #2158F5',

      '&:hover': {
        color: '#FFFFFF',
        background: '#2158F5',

        '& path': {
          fill: '#FFFFFF',
        },
      },

      '&:active': {
        border: '1px solid #0058CA',
        backgroundColor: '#0058CA',
      },
    },

    '& svg': {
      width: 20,
      height: 20,
      marginRight: 10,
    },

    '&>span': {
      ...mixins.font(11, 17, 700),
      width: '100%',
      textAlign: 'center',
    },

    '& path': {
      transition: 'fill ease .2s',
    },

    '&.is-disabled': {
      background: '#E0E0E0 !important',
      borderColor: '#E0E0E0 !important',
      boxShadow: 'none !important',
      color: '#BDBDBD !important',
      pointerEvents: 'none !important',
      '& svg path': {
        fill: '#BDBDBD !important',
      },
    },
  },
}));
