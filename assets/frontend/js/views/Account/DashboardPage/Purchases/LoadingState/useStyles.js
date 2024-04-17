import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  th1: {
    width: 80,
    backgroundColor: '#c6c6c6',

    '&::after': {
      backgroundColor: '#dcdcdc',
    },
  },
  th2: {
    width: 90,
    backgroundColor: '#c6c6c6',

    '&::after': {
      backgroundColor: '#dcdcdc',
    },
  },
  th3: {
    width: 80,
    backgroundColor: '#c6c6c6',

    '&::after': {
      backgroundColor: '#dcdcdc',
    },
  },
  td1: {
    width: 200,
  },
  td2: {
    width: 150,
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
  table: {
    pointerEvents: 'none',

    '& td, & th': {
      '&:nth-child(1)': {
        width: 134,
      },

      '&:nth-child(2)': {
        width: 200,
      },

      '&:nth-child(5)': {
        width: 150,
      },
    },
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
