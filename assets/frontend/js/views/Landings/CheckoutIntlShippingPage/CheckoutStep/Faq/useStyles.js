import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    padding: [[12, 20, 14]],

    [breakpoints.down('sm')]: {
      padding: [[12, 12, 14]],
    },
  },
  accordionItem: {
    marginBottom: '0px',

    '&:not(:last-child)': {
      borderBottom: '1px solid #C4C4C4',
    },
  },
  header: {
    ...mixins.font(16, 21, 600),
    color: '#2158F5',
    justifyContent: 'space-between',
    paddingTop: 5,
    paddingBottom: 6,
    userSelect: 'none',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
  content: {
    ...mixins.font(16, 21, 400),
    marginTop: -3,
    paddingBottom: 12,
    paddingRight: 25,
    color: '#333',
  },
  arrow: {
    height: 12,
    color: '#2158F5',
    marginRight: 3,
    '& path': {
      strokeWidth: '2',
    },
  },
}));
