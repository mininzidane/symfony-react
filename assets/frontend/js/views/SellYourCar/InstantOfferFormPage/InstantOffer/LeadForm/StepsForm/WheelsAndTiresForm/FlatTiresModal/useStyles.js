import { makeStyles } from '@material-ui/core/styles';
import CarSvg from './img/car.svg';

export default makeStyles(({ breakpoints }) => ({
  body: {
    backgroundColor: '#fff',
    padding: 0,
  },
  container: {
    backgroundImage: `url(${CarSvg})`,
    backgroundSize: 'auto 80%',
    height: 'calc(100vh - 134px)',
    maxHeight: '430px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    alignItems: 'center',
    position: 'relative',

    [breakpoints.down('sm')]: {
      height: 'calc(100vh - 132px)',
      maxHeight: '450px',
      backgroundSize: 'auto 70%',
    },

    '& > div': {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      padding: '20px',
      [breakpoints.down('sm')]: {
        alignItems: 'flex-start',
      },
      '&:nth-child(1)': {
        borderRight: '1px dashed #BDBDBD',
        borderBottom: '1px dashed #BDBDBD',
      },
      '&:nth-child(2)': {
        borderBottom: '1px dashed #BDBDBD',
      },
      '&:nth-child(3)': {
        borderRight: '1px dashed #BDBDBD',
        [breakpoints.down('sm')]: {
          alignItems: 'flex-end',
        },
      },
      '&:nth-child(4)': {
        [breakpoints.down('sm')]: {
          alignItems: 'flex-end',
        },
      },
    },
  },
  footer: {
    justifyContent: 'center',
    border: 'none',
    paddingBottom: '20px',
    paddingTop: 0,
  },
  tickbox: {
    '& label': {
      color: '#333',
      fontWeight: 700,
      [breakpoints.down('sm')]: {
        paddingLeft: 0,
        paddingTop: 24,
        maxWidth: 115,
      },
    },
    '&.is-right': {
      '& label': {
        paddingLeft: 0,
        paddingRight: 30,
        [breakpoints.down('sm')]: {
          paddingRight: 0,
          textAlign: 'right!important',
        },
      },
      '& .tickbox__icon': {
        right: 0,
        left: 'auto',
      },
    },
  },
}));
