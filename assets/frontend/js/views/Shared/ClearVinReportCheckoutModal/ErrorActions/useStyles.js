import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: 14,
    paddingTop: 22,
    paddingBottom: 22,
    background: '#FFF',

    [breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr',
      gridGap: 12,
      flexWrap: 'wrap',
      flexDirection: 'column-reverse',
    },
  },
}));
