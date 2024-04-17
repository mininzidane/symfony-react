import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    padding: [[14, 0, 60]],
    backgroundColor: '#0F0F0F',

    [breakpoints.down('sm')]: {
      paddingLeft: 15,
      paddingRight: 15,
      paddingBottom: 48,
    },
  },
  title: {
    textAlign: 'center',
  },
  titleText: {
    ...mixins.font(24, 32, 400),
    margin: 0,
    color: '#FFF',
  },
  subtitleText: {
    ...mixins.font(16, 20, 400),
    margin: [[8, 0, 0]],
    color: '#FFF',
  },
  steps: {
    columnCount: 3,
    marginTop: 40,
    columnGap: 40,

    [breakpoints.down('lg')]: {
      columnCount: 2,
      columnGap: 30,
    },

    [breakpoints.down('sm')]: {
      columnCount: 'initial',
      maxHeight: 'calc(100vh - 225px)',
      overflowY: 'scroll',
      marginTop: 25,
    },
  },
}));
