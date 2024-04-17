import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    '@media(max-width: 1920px)': {
      '& th, td': {
        '&:nth-child(12)': {
          display: 'none',
        },
      },
    },

    '@media(max-width: 1800px)': {
      '& th, td': {
        '&:nth-child(10)': {
          display: 'none',
        },
      },
    },

    '@media(max-width: 1700px)': {
      '& th, td': {
        '&:nth-child(6)': {
          display: 'none',
        },
      },
    },

    '@media(max-width: 1600px)': {
      '& th, td': {
        '&:nth-child(11)': {
          display: 'none',
        },
      },
    },

    '@media(max-width: 1500px)': {
      '& th, td': {
        '&:nth-child(8)': {
          display: 'none',
        },
      },
    },

    '@media(max-width: 1400px)': {
      '& th, td': {
        '&:nth-child(9)': {
          display: 'none',
        },
      },
    },

    '@media(max-width: 1300px)': {
      '& th, td': {
        '&:nth-child(7)': {
          display: 'none',
        },
      },
    },

    '@media (max-width: 1100px) and (min-width: 992px)': {
      '& th, td': {
        '&:nth-child(1)': {
          display: 'none',
        },
      },
    },
  },
}));
