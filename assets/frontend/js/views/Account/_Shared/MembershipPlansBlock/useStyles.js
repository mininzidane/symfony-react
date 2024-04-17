import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    backgroundColor: '#F1F1F8',
    maxWidth: '100%',
    minHeight: 760,

    [breakpoints.down('md')]: {
      minHeight: 480,
    },
  },
  header: {
    paddingTop: 20,
    textAlign: 'center',

    [breakpoints.down('md')]: {
      paddingTop: 15,
    },
  },
  title: {
    ...mixins.font(28, 40, 300),
    color: '#333333',
    margin: 0,

    [breakpoints.down('md')]: {
      ...mixins.font(20, 27),
    },
  },
  subtitle: {
    ...mixins.font(16, 22),
    margin: 0,
    color: '#333333',

    [breakpoints.down('md')]: {
      ...mixins.font(14, 20),
    },
  },
  cards: {
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: [[16, 0, 18]],

    [breakpoints.down('md')]: {
      flexDirection: 'column',
      padding: [[20, 0, 0]],
    },
  },
  gap: {
    minHeight: 500,
  },
  gapMobile: {
    [breakpoints.down('md')]: {
      minHeight: 500,
    },
  },
}));
