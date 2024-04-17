import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
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
