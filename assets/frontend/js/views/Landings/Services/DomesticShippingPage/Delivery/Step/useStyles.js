import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    backgroundColor: '#0277b3',
    boxShadow: '0 0 20px rgb(0 0 0 / 40%)',
    display: 'flex',
    borderRadius: 4,
    '& + $root': {
      marginTop: 35,
      [breakpoints.down('sm')]: {
        marginTop: 30,
      },
    },
  },
  icon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 132,
    backgroundColor: '#33A4DE',
    borderRadius: 4,

    [breakpoints.down('sm')]: {
      width: 70,
    },
    '& img': {
      width: 50,
      maxHeight: 60,
      [breakpoints.down('sm')]: {
        width: 35,
      },
    },
  },
  wrapText: {
    padding: '20px 15px 25px 50px',
    [breakpoints.down('lg')]: {
      paddingLeft: '40px',
    },
    [breakpoints.down('sm')]: {
      padding: '16px 15px 20px 25px',
    },
  },
  title: {
    ...mixins.font(24, 32, 700),
    margin: 0,
    color: '#fff',
    [breakpoints.down('sm')]: {
      ...mixins.font(20, 28),
    },
  },
  desc: {
    ...mixins.font(16, 21),
    color: '#FFF',
    margin: '2px 0 0',
    [breakpoints.down('sm')]: {
      ...mixins.font(14, 19),
    },
  },
}));
