import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  '@global': {
    '.page-header': {
      position: 'sticky',
      top: 0,
      zIndex: 4002,
    },
  },
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    padding: [[0, 30]],
    backgroundColor: '#2158F5',
    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',

    [breakpoints.down('md')]: {
      padding: [[0, 25]],
      '&.is-default-paddings': {
        padding: [[0, 14]],
      },
    },
    [breakpoints.down('sm')]: {
      '&.is-default-paddings': {
        height: 52,
      },
    },
  },
  securedArea: {
    marginLeft: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    width: 'auto',
    alignItems: 'center',
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
