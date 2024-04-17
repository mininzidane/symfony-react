import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  container: {
    display: 'flex',
    maxWidth: '100%',
    backgroundColor: '#E5E5E5',
    padding: [[26, 30]],

    [breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  tabs: {
    paddingRight: 30,
    paddingBottom: 23,
    minWidth: 390,
    width: 390,
    position: 'relative',

    [breakpoints.down('md')]: {
      padding: [[28, 0]],
      minWidth: 330,
      width: 330,
    },

    [breakpoints.down('sm')]: {
      padding: [[20, 14]],
      width: 'auto',
    },
  },
  tabsWrapper: {
    backgroundColor: '#fff',
    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
    paddingTop: 21,
    paddingBottom: 21,
  },
}));
