import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    marginTop: 13,
    display: 'grid',
    gridGap: 20,
    [breakpoints.down('sm')]: {
      gridGap: 14,
      marginTop: 18,
    },
  },
  flag: {
    display: 'inline-block',
    height: 18,
    maxWidth: 27,
    verticalAlign: 'bottom',
    margin: '0 2px',
    position: 'relative',
    top: '-4px',
    [breakpoints.down('sm')]: {
      height: '14px',
      maxWidth: '21px',
      top: '-5px',
      margin: '0 1px',
    },
  },
  nowrap: {
    whiteSpace: 'nowrap',
    display: 'inline-block',
  },
}));
