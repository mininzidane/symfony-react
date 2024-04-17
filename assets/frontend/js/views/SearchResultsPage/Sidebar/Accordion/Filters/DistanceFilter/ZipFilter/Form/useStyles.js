import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  '@global': {
    '.pac-container': {
      zIndex: 999999999,
    },
  },
  root: {
    display: 'grid',
    gridGap: 10,

    [breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr 30px',
      gridGap: 0,
      display: 'inline-grid',
      width: '100%',
    },
  },
  grid: {
    display: 'flex',
  },
  zipInput: {
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    width: '100%',

    '&.is-focused': {
      zIndex: 20,
    },

    '& input': {
      ...mixins.font(14, 20, 400),
      padding: '0 11px !important',
      position: 'relative',
    },

    [breakpoints.down('sm')]: {
      height: 30,
      width: '50%',

      '& input': {
        padding: '0 9px !important',
      },
    },
  },
  mobileButton: {
    border: '1px solid #BDBDBD',
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    marginLeft: -2,
    zIndex: 20,

    '&.is-disabled': {
      pointerEvents: 'none',

      '& path': {
        fill: '#CCC',
      },
    },

    '&:hover': {
      backgroundColor: '#F1F1F8',
      borderColor: '#4B5158',
    },

    '& svg': {
      [breakpoints.down('sm')]: {
        marginTop: 2,
      },
    },
  },
  error: {
    marginTop: -7,
    color: '#8C0C0C',
    fontSize: 12,
    lineHeight: '18px',
    fontWeight: 400,
  },
}));
