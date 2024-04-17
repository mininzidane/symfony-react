import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  table: {
    '& td, & th': {
      '&:nth-child(1)': {
        width: 148,
      },
    },
    '@media(max-width: 1920px)': {
      '& td, & th': {
        '&:nth-child(2)': {
          maxWidth: 200,
        },
      },
    },
    '@media(max-width: 1300px)': {
      '& td, & th': {
        '&:nth-child(3)': {
          display: 'none',
        },
      },
    },
    '@media(max-width: 1148px)': {
      '& td, & th': {
        '&:nth-child(4)': {
          display: 'none',
        },
      },
    },
    '@media(max-width: 1024px)': {
      '& td, & th': {
        '&:nth-child(5)': {
          display: 'none',
        },
      },
    },
  },
  wrap: {
    [breakpoints.down('xs')]: {
      marginLeft: 0,
      marginRight: 0,
    },
  },
}));
