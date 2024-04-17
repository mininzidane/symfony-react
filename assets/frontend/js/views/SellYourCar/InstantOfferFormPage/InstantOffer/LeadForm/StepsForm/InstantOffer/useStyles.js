import { makeStyles } from '@material-ui/core/styles';
import TruckSvg from './img/truck.svg';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingTop: '33px',
    paddingBottom: '19px',
  },
  checkmarkIcon: {
    marginBottom: '14px',
    marginTop: '10px',
    [breakpoints.down('sm')]: {
      width: '32px',
      height: '32px',
      marginBottom: '8px',
    },
  },
  detailsIcon: {
    marginTop: '0px',
    marginBottom: '14px',
  },
  title: {
    ...mixins.font(28, 39, 700),
    color: '#333333',
    textAlign: 'center',
    maxWidth: '440px',
    paddingLeft: '24px',
    paddingRight: '24px',
    [breakpoints.down('sm')]: {
      ...mixins.font(20, 32),
      marginBottom: '6px',
    },
  },
  desc: {
    ...mixins.font(16, 24),
    fontWeight: '400',
    color: '#828282',
    textAlign: 'center',
    marginTop: '2px',
    maxWidth: '580px',
    paddingLeft: '24px',
    paddingRight: '24px',
    [breakpoints.down('sm')]: {
      ...mixins.font(14, 18),
    },
  },
  truck: {
    backgroundImage: `url(${TruckSvg})`,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center bottom',
    height: '124px',
    backgroundSize: 'auto',
    borderBottom: '1px solid rgba(74,144,41,.1)',
    marginBottom: '10px',
    marginTop: '-29px',
    [breakpoints.down('sm')]: {
      marginTop: -15,
      height: 100,
      backgroundSize: 'contain',
    },
  },
  pickUp: {
    width: '100%',
    padding: '30px 14px 0',
    [breakpoints.down('sm')]: {
      paddingTop: '10px',
    },
  },
  pickUpFields: {
    display: 'grid',
    gridTemplateColumns: '1fr 160px 160px',
    width: '100%',
    gridGap: '10px',
    paddingTop: '10px',
    [breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr 1fr',
    },
  },
  actions: {
    marginTop: 'auto',
    backgroundColor: '#fff',
    borderRadius: '0 0 4px 4px',
    [breakpoints.down('sm')]: {
      borderRadius: '0',
    },
  },
  datePicker: {
    backgroundColor: '#fff',
    color: '#333',
    border: '1px solid #B7B5B3 !important',
    padding: '10px 14px',
    minHeight: '40px',
    fontWeight: '400',
    borderRadius: '4px',
    '&:hover': {
      borderColor: '#000!important',
    },
    '& svg path': {
      fill: '#828282',
    },
    '& input::placeholder': {
      color: '#828282',
      opacity: 1,
      textTransform: 'none',
    },
    '&.is-error': {
      borderColor: '#8C0C0C !important',
    },
  },
  tickbox: {
    '& label': {
      fontSize: '18px',
      paddingLeft: '25px',
    },
  },
  pickupAddress: {
    [breakpoints.down('sm')]: {
      gridColumn: '1/3',
    },
  },
}));
