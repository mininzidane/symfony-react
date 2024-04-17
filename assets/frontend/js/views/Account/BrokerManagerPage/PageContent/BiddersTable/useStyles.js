import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    marginTop: 16,
    paddingBottom: 50,

    [breakpoints.down('sm')]: {
      marginTop: 9,
      paddingBottom: 40,
    },
  },
  titleWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 21,

    [breakpoints.down('sm')]: {
      marginTop: 16,
    },
  },
  email: {
    wordBreak: 'break-all',
  },
  modalTriggerButton: {
    textAlign: 'left',

    [breakpoints.down('sm')]: {
      textAlign: 'right',
    },
  },
  buyerPower: {
    whiteSpace: 'nowrap',
  },
}));
