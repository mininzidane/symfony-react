import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    padding: [[0, 30]],
    backgroundColor: '#2158F5',

    [breakpoints.down('md')]: {
      padding: [[0, 14]],
      height: 50,
    },
  },
  logos: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerText: {
    ...mixins.font(16, 20, 700),
    color: '#FFF',

    [breakpoints.down('md')]: {
      display: 'none',
    },
  },
  securedArea: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    width: 'auto',
    alignItems: 'center',
    paddingLeft: 140,

    [breakpoints.down('md')]: {
      paddingLeft: 0,
    },
  },
  securedAreaText: {
    color: 'white',
    fontSize: 16,
    lineHeight: '20px',
    marginLeft: 10,

    [breakpoints.down('md')]: {
      fontSize: 14,
    },

    [breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  securedAreaIcon: {
    width: 10,
    height: 14,
  },
}));
