import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    padding: [[24, 24, 28]],
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'self-start',

    [breakpoints.down('md')]: {
      padding: [[14, 12]],
    },
  },
  item: {
    ...mixins.font(18, 24, 400),
    color: '#FFF',
    marginTop: 14,
    display: 'flex',

    '&:first-child': {
      marginTop: 0,
    },

    [breakpoints.down('md')]: {
      ...mixins.font(16, 22, 400),
      marginTop: 4,
    },

    [breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));
