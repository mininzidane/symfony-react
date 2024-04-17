import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  table: {
    pointerEvents: 'none',

    '& td, & th': {
      '&:nth-child(2)': {
        width: 200,
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
  th1: {
    width: 70,
  },
  th2: {
    width: 90,
  },
  th3: {
    width: 80,
  },
  th4: {
    width: 70,
  },
  th5: {
    width: 90,
  },
  th6: {
    width: 70,
  },
  th7: {
    width: 50,
  },
  td1: {
    width: 90,
  },
  td2: {
    width: 180,
  },
  td3: {
    width: 90,
  },
  td4: {
    width: 70,
  },
  td5: {
    width: 120,
  },
  td6: {
    width: 80,
  },
  td7: {
    width: 140,
  },
  thMobile1: {
    width: 70,
    display: 'inline-block',
    marginTop: 5,
  },
  thMobile2: {
    width: 90,
    display: 'inline-block',
    marginTop: 5,
  },
  thMobile3: {
    width: 100,
    display: 'inline-block',
    marginTop: 5,
  },
  thMobile4: {
    width: 70,
    display: 'inline-block',
    marginTop: 5,
  },
  thMobile5: {
    width: 80,
    display: 'inline-block',
    marginTop: 5,
  },
  thMobile6: {
    width: 70,
    display: 'inline-block',
    marginTop: 5,
  },
  tdMobile1: {
    width: 100,
    display: 'inline-block',
    marginTop: 5,
  },
  tdMobile2: {
    width: 120,
    display: 'inline-block',
    marginTop: 5,
  },
  tdMobile7: {
    width: 200,
    display: 'block',
    margin: [[5, 'auto']],
  },
}));
