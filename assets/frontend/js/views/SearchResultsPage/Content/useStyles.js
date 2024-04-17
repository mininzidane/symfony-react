import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    minHeight: 'calc(100vh - 162px)', // important for avoiding layout shift

    [breakpoints.down('sm')]: {
      minHeight: 300,
    },
  },
  placeholder: {
    position: 'relative',

    '&::after': {
      content: '""',
      ...mixins.absolute(10, -5, 0, -5),
      zIndex: 99,
      background: '#F1F1F8',
      opacity: 0.95,
    },
  },
}));
