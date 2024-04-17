import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    padding: [[18, 28, 14]],
    backgroundColor: '#fff',
    borderRadius: '4px',
    minHeight: '420px',
    display: 'flex',
    flexDirection: 'column',

    [breakpoints.down('md')]: {
      padding: '14px',
      minHeight: 0,
    },
  },
  header: {
    color: '#333',
    paddingBottom: 20,

    [breakpoints.down('md')]: {
      paddingBottom: 8,
    },
  },
  title: {
    ...mixins.font(24, 32, 400),
    textAlign: 'center',

    [breakpoints.down('lg')]: {
      ...mixins.font(18, 24),
    },
  },
  stepLabel: {
    ...mixins.font(16, 20, 400),
    padding: [[5, 0]],
    textAlign: 'center',

    [breakpoints.down('lg')]: {
      ...mixins.font(14, 18),
    },
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 20,

    [breakpoints.down('md')]: {
      paddingTop: 14,
    },
  },
  actions: {
    display: 'grid',
    gridGap: '20px',
    gridAutoColumns: '1fr',
    gridAutoFlow: 'column',

    [breakpoints.down('md')]: {
      gridGap: '14px',
    },
  },
  footerDesc: {
    ...mixins.font(12, 16),
    textAlign: 'center',
    color: '#333333',
    marginTop: 10,

    [breakpoints.down('md')]: {
      marginTop: '6px',
    },
  },
  loader: {
    minHeight: 242,
    margin: 'auto',
  },
}));
