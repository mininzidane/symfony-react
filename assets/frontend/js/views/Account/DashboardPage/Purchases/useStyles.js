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
          width: 200,
        },
      },
    },

    '@media(max-width: 1700px)': {
      '& td, & th': {
        '&:nth-child(4)': {
          display: 'none',
        },
      },
    },

    '@media(max-width: 1600px)': {
      '& td, & th': {
        '&:nth-child(5)': {
          display: 'none',
        },
      },
    },

    '@media(max-width: 1400px)': {
      '& td, & th': {
        '&:nth-child(6)': {
          display: 'none',
        },
      },
    },

    [breakpoints.down('md')]: {
      '& td, & th': {
        '&:nth-child(5)': {
          display: 'none',
        },
      },
    },
  },
}));
