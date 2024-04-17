/* eslint-disable no-nested-ternary */
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    position: 'relative',
    backgroundColor: '#F6F6F6',
    boxShadow: '0 1px 1px rgba(0, 0, 0, 0.16)',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    minHeight: 48,
  },
  title: {
    ...mixins.font(16, '20px', 400),
    display: 'inline-flex',
    alignItems: 'center',
    minHeight: 48,

    '&:not(:only-child)': {
      marginRight: 30,
    },

    '& img': {
      marginRight: 10,
    },
  },
  extra: {
    [breakpoints.down('xs')]: {
      marginTop: -8,
    },
  },
  footer: {
    marginTop: -8,
  },
}));
