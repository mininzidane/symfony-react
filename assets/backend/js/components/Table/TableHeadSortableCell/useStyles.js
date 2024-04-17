import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  sortable: {
    display: 'inline-flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    outline: 'none',

    '&:hover': {
      '& $arrow': {
        opacity: '.5 !important',
      },
    },
  },
  arrow: {
    width: 10,
    marginLeft: 5,
    opacity: 0,
    transition: 'opacity 250ms ease',
  },
  arrowDisplay: {
    opacity: 1,
  },
  arrowRotate: {
    transform: 'rotate(180deg)',
  },
}));
