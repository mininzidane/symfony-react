import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    '@media(max-width: 1919px)': {
      '& th, td': {
        '&:nth-child(10)': {
          display: 'none',
        },
      },
    },

    '@media(max-width: 1850px)': {
      '& th, td': {
        '&:nth-child(6)': {
          display: 'none',
        },
      },
    },

    '@media(max-width: 1725px)': {
      '& th, td': {
        '&:nth-child(11)': {
          display: 'none',
        },
      },
    },

    '@media(max-width: 1600px)': {
      '& th, td': {
        '&:nth-child(7)': {
          display: 'none',
        },
      },
    },

    '@media(max-width: 1500px)': {
      '& th, td': {
        '&:nth-child(9)': {
          display: 'none',
        },
      },
    },

    '@media(max-width: 1360px)': {
      '& th, td': {
        '&:nth-child(7)': {
          display: 'none',
        },
      },
    },

    '@media(max-width: 1280px)': {
      '& th, td': {
        '&:nth-child(5)': {
          display: 'none',
        },
      },
    },
  },
}));
