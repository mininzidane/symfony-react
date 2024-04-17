import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    padding: '65px 0 80px',
    [breakpoints.down('sm')]: {
      padding: '45px 0 55px',
    },
  },
  tabs: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    ...mixins.font(30, 40, 300),
    color: '#2158F5',
    '& button': {
      borderBottom: '5px solid transparent',
      '&:hover': {
        opacity: '0.7',
        textDecoration: 'none',
      },
      '&.is-active': {
        opacity: 1,
        pointerEvents: 'none',
        borderBottomColor: '#2158F5',
      },
    },
    [breakpoints.down('lg')]: {
      fontSize: '26px',
    },
    [breakpoints.down('md')]: {
      ...mixins.font(20, 32),
      '& button': {
        borderBottomWidth: '3px',
      },
    },
    [breakpoints.down('sm')]: {
      justifyContent: 'flex-start',
      '& button': {
        marginRight: '30px',
        marginBottom: '5px',
      },
    },
  },
}));
