import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, isMobileView }) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  price: {
    color: '#333',
    whiteSpace: 'nowrap',

    '& *': {
      fontSize: '24px',
      lineHeight: '28px',
    },

    [breakpoints.down(isMobileView ? 'xl' : 'lg')]: {
      '& *': {
        fontSize: '18px',
        lineHeight: '20px',
      },
    },
  },
  trigger: {
    color: '#333',
    fontSize: '24px',
    transition: 'all .2s ease',
    textAlign: 'left',

    [breakpoints.down(isMobileView ? 'xl' : 'lg')]: {
      fontSize: '18px',
    },

    '&.is-active': {
      '& > svg': {
        transform: 'scaleY(-1)',
      },
    },
  },
  triggerTriangle: {
    position: 'relative',

    '& path': {
      transition: 'fill .2s ease',
      fill: '#2158F5',
    },
  },
  popover: {
    [breakpoints.up('sm')]: {
      maxWidth: 335,
    },
  },
  shippingCost: {
    display: 'grid',
    gridTemplateColumns: '1fr 90px',
    gridRowGap: '8px',
    fontSize: '14px',
    lineHeight: '18px',
    '& hr': {
      gridColumn: '1 / -1',
      height: '1px',
      backgroundColor: '#4C4C4C',
      display: 'block',
      margin: '4px 0',
      border: 'none',
    },
    '& .is-amount': {
      textAlign: 'right',
    },
  },
  deliveryTime: {
    fontSize: '12px',
    lineHeight: '22px',
    color: '#99927B',
  },
  currency: {
    display: 'inline-flex',
    alignItems: 'center',
  },
}));
