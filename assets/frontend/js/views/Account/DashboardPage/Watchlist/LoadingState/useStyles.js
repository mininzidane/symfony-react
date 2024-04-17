import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  table: {
    pointerEvents: 'none',

    '& td:nth-child(1), & th:nth-child(1)': {
      width: 134,
    },

    '& td:nth-child(2), & th:nth-child(2)': {
      width: 200,
    },

    '& td:nth-child(5), & th:nth-child(5)': {
      width: 150,
    },

    '& td, & th': {
      '&:nth-child(1)': {
        width: 148,
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
  th1: {
    width: 80,
  },
  th2: {
    width: 90,
  },
  th3: {
    width: 80,
  },
  th4: {
    width: 80,
  },
  th5: {
    width: 90,
  },
  th6: {
    width: 70,
  },
  th7: {
    width: 120,
  },
  td1: {
    width: 144,
  },
  td2: {
    width: 180,
  },
  td3: {
    width: 100,
  },
  td4: {
    width: 100,
  },
  td5: {
    width: 120,
  },
  td6: {
    width: 120,
  },
  td7: {
    width: 120,
  },
  imageWrap: {
    backgroundColor: '#E0E0E0',
    width: 144,
    height: 108,
    display: 'grid',
    placeContent: 'center',

    '& img': {
      width: 40,
    },
  },
}));
