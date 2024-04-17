import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    ...mixins.font(14, 20, 700),
    background: '#F2F9FF',
    borderRadius: '4px',
    color: '#6C7C8A',
    textTransform: 'uppercase',
    padding: [[4, 6]],
    marginBottom: 5,

    [breakpoints.down('md')]: {
      display: 'inline-block',
      marginLeft: 10,
    },

    [breakpoints.down('sm')]: {
      ...mixins.font(12, 16),
      marginLeft: 0,
      marginTop: 5,
      whiteSpace: 'nowrap',
    },
  },
  cta: {
    display: 'block',

    [breakpoints.down('md')]: {
      display: 'none',
    },
  },
}));
