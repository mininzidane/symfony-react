import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  header: {
    padding: [[10, 20]],
    minHeight: 50,

    [breakpoints.down('sm')]: {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
  },
  controls: {
    flexShrink: 0,
    marginLeft: 15,
    marginRight: -8,
    display: 'flex',
    alignItems: 'center',

    '& > *:not(:last-child)': {
      marginRight: 14,
    },
  },
  body: {
    padding: 0,
  },
  title: {
    ...mixins.font(16, 20),

    [breakpoints.down('sm')]: {
      ...mixins.font(14),
    },
  },
}));
