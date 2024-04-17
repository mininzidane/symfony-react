import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    borderRadius: 4,
    backgroundColor: '#F6F6F6',
    boxShadow: '0 0 50px rgba(0, 0, 0, 0.35)',

    [breakpoints.down('sm')]: {
      width: '100% !important',
      maxWidth: '100vw',
      padding: 0,
      borderRadius: 0,
    },
  },
  header: {
    padding: [[10, 20]],
    minHeight: 48,

    [breakpoints.down('sm')]: {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
  },
  body: {
    padding: 0,

    [breakpoints.down('sm')]: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
  },
  controls: {
    paddingRight: 6,
  },
  title: {
    ...mixins.font(16, 20),

    [breakpoints.down('sm')]: {
      ...mixins.font(14),
    },
  },
}));
