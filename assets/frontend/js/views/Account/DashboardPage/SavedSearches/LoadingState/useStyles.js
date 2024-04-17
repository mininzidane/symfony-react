import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  table: {
    pointerEvents: 'none',
  },
  th1: {
    width: 140,
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
    width: 100,
  },
  td2: {
    width: 50,
  },
  td3: {
    width: 80,
  },
  tdMobile1: {
    width: 100,
    display: 'inline-block',
    marginTop: 5,
  },
  tdMobile2: {
    width: 50,
    display: 'inline-block',
    marginTop: 5,
  },
  tdMobile3: {
    width: 80,
    display: 'inline-block',
    marginTop: 5,
  },
  thMobile1: {
    width: 120,
    display: 'inline-block',
    marginTop: 5,
  },
  thMobile2: {
    width: 80,
    display: 'inline-block',
    marginTop: 5,
  },
  thMobile3: {
    width: 120,
    display: 'inline-block',
    marginTop: 5,
  },
}));
