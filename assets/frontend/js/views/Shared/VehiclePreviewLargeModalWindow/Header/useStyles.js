import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: -8,
  },
  details: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 5,
    flexGrow: 1,
  },
  controls: {
    flexGrow: 1,
    display: 'grid',
    gridGap: 14,
    gridTemplateColumns: 'auto auto',
    justifyContent: 'end',

    [breakpoints.down('md')]: {
      width: '100%',
      gridTemplateColumns: '1fr 1fr',
      marginTop: 10,

      '& button': {
        width: '100% !important',
      },
    },
  },
  main: {
    [breakpoints.up('lg')]: {
      paddingRight: 20,
    },
  },
}));
