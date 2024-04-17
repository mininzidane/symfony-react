import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: ({ isNext }) => ({
    position: 'absolute',
    top: 'calc(50% - 25px)',
    width: 50,
    height: 50,
    left: isNext ? 'auto' : 20,
    right: isNext ? 20 : 'auto',
    transform: isNext ? 'rotate(180deg)' : 'none',
    outline: 'none',
    cursor: 'pointer',
    transition: 'background .15s ease',
    zIndex: 2,
    background: 'rgba(51, 51, 51, .5)',
    borderRadius: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    [breakpoints.down('sm')]: {
      width: 34,
      height: 34,
      left: isNext ? 'auto' : 10,
      right: isNext ? 10 : 'auto',
      top: 'calc(50% - 17px)',
    },

    '&:hover': {
      background: '#4F4F4F',
    },

    '& > img': {
      width: 7,
      height: 12,
    },
  }),
}));
