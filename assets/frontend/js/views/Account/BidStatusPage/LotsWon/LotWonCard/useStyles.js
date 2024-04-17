import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    position: 'relative',
    marginTop: 15,
    width: '100%',
    display: 'flex',
    flexWrap: 'nowrap',
    backgroundColor: '#FFF',
    borderRadius: 4,
    boxShadow: '0 2px 2px rgba(0, 0, 0, 0.17)',

    [breakpoints.down('md')]: {
      flexWrap: 'wrap',
    },
  },
  body: {
    display: 'flex',
    padding: 30,
    paddingRight: 15,
    width: 'calc(100% / 1.71429)',

    [breakpoints.down('md')]: {
      width: '100%',
    },

    [breakpoints.down('sm')]: {
      padding: 15,
      width: '100%',
    },
  },
  aside: {
    backgroundColor: '#FFF1D2',
    boxShadow: 'inset 30px 0px 40px -30px rgba(0, 0, 0, .15)',
    width: 'calc(100% / 2.4)',

    [breakpoints.down('md')]: {
      width: '100%',
    },
  },
  asideContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',

    [breakpoints.up('lg')]: {
      height: '100%',
    },
  },
}));
