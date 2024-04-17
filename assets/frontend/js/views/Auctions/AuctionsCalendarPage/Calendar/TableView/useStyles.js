import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  table: {
    marginTop: 30,
    [breakpoints.down('sm')]: {
      marginTop: 16,
    },
    '& table': {
      tableLayout: 'fixed',
    },
    '& td, & th': {
      '&:nth-child(1)': {
        paddingLeft: 10,
        width: 160,
        [breakpoints.down('md')]: {
          width: 120,
        },
        [breakpoints.down('sm')]: {
          width: 148,
        },
      },
      '&:nth-child(3), &:nth-child(2)': {
        [breakpoints.up('lg')]: {
          width: '18%',
        },
      },
    },
  },
}));
