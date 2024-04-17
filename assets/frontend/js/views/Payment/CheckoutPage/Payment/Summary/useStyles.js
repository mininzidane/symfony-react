import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    [breakpoints.down('md')]: {
      marginTop: ({ hasInnerTitle }) => (hasInnerTitle ? 0 : 14),
    },
  },
  title: {
    fontSize: 16,
    lineHeight: '24px',
    fontWeight: 700,
    margin: 0,

    [breakpoints.down('sm')]: {
      fontSize: 14,
      lineHeight: '20px',
    },
  },
  card: {
    marginTop: ({ hasInnerTitle }) => (hasInnerTitle ? 0 : 12),
    padding: [[24, 20, 20]],
    backgroundColor: '#FCFAEC',
  },
  entry: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gridGap: 15,
    fontSize: 14,
    color: '#333',

    '&:not(:first-child)': {
      marginTop: 8,
    },
  },
  totalDueRow: {
    marginTop: 12,
    borderTop: '1px solid #E3E1D4',
    paddingTop: 8,
    fontWeight: 700,
  },
  errorMessage: {
    marginTop: 10,
  },
  innerTitle: {
    ...mixins.font(24, 32, 400),
    margin: [[1, 0, 24]],

    [breakpoints.down('sm')]: {
      ...mixins.font(16, 20),
      margin: [[-8, 0, 18]],
    },
  },
  mobileStickySubmit: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    padding: 16,
    background: '#FFFFFF',
    boxShadow: '0px -2px 2px rgba(0, 0, 0, 0.15)',
    zIndex: 4000,
    width: '100%',

    '& > div': {
      marginTop: 0,
    },
  },
}));
