import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  table: {
    '@media(max-width: 1920px)': {
      '& td, & th': {
        '&:nth-child(2)': {
          width: 200,
        },
      },
    },

    '& > thead th:nth-child(1)': {
      width: '10%',
    },

    '& > thead th:nth-child(3)': {
      width: '13%',
    },
    '& > thead th:nth-child(5)': {
      width: '15%',
    },
    '& > thead th:nth-child(6)': {
      width: '13%',
    },
    '& > thead th:nth-child(7)': {
      width: '13%',
    },

    '@media(max-width: 1500px)': {
      '& td, & th': {
        '&:nth-child(3)': {
          display: 'none',
        },
      },
    },

    '@media(max-width: 1400px)': {
      '& td, & th': {
        '&:nth-child(1)': {
          display: 'none',
        },
      },
    },

    '@media(max-width: 1100px)': {
      '& td, & th': {
        '&:nth-child(6)': {
          display: 'none',
        },
      },
    },
  },
}));
