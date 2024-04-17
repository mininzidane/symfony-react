import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    paddingTop: 22,

    [breakpoints.down('sm')]: {
      paddingTop: 14,
    },
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: [[26, 14, 14]],
    textAlign: 'center',
    maxWidth: '656px',
    marginLeft: 'auto',
    marginRight: 'auto',

    [breakpoints.down('sm')]: {
      padding: [[14]],
    },
  },
  logoWrap: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    display: 'block',
    marginTop: '-4px',
    marginBottom: '-4px',
  },
  cta: {
    marginTop: 10,
    minWidth: 256,

    [breakpoints.down('sm')]: {
      marginTop: 12,
      marginBottom: 10,
    },
  },
  title: {
    ...mixins.font(16, 20, 700),
    marginTop: 20,
    [breakpoints.down('sm')]: {
      marginTop: 12,
    },
  },
  subtitle: {
    ...mixins.font(14, 24),
    maxWidth: 800,
    marginTop: 2,
    color: '#828282',
    [breakpoints.down('sm')]: {
      ...mixins.font(12, 24),
    },
  },
  checkmark: {
    width: 42,
    height: 42,
    [breakpoints.down('sm')]: {
      width: 30,
      height: 30,
    },
  },
  highlight: {
    ...mixins.font(14, 20, 700),
    color: '#333333',
    display: 'inline-flex',
    padding: '5px 10px',
    alignItems: 'center',
    borderRadius: '6px',
    backgroundColor: '#FFF1D2',

    '& img': {
      marginRight: 8,
      width: '9px',
      height: '16px',
    },
  },
  action: {
    backgroundColor: '#FFF1D2',
    borderRadius: 6,
    padding: 14,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  desc: {
    ...mixins.font(14, 24),
  },
  rows: {
    padding: 16,
    width: '100%',
    [breakpoints.down('sm')]: {
      padding: [[1, 0, 6]],
    },
  },
  row: {
    color: '#333',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '16px',
    lineHeight: '19px',
    paddingTop: '10px',
    paddingBottom: '10px',
    width: '100%',
    textAlign: 'right',
    [breakpoints.down('sm')]: {
      fontSize: '14px',
    },
    '& div:first-child': {
      paddingRight: 14,
      textAlign: 'left',
    },
    '& + &': {
      borderTop: '1px solid #C4C4C4',
    },
  },
}));
