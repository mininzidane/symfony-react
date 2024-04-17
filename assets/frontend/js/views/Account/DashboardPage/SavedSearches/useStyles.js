import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  table: {
    '& th': {
      '&:nth-child(1)': {
        width: '100%',
      },

      '&:nth-child(2)': {
        paddingRight: 20,
      },
    },
  },
  actions: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',

    [breakpoints.down('sm')]: {
      gridGap: 12,
    },
  },
}));
