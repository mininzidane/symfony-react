import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    alignItems: 'center',

    [breakpoints.down('sm')]: {
      paddingBottom: 10,
      flexWrap: 'wrap',
    },
  },
  trigger: {
    ...mixins.font(16, 22),
    color: '#333',

    [breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  deliveryTime: {
    color: '#333',
    fontSize: 16,

    [breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  triggerTriangle: {
    width: '10px',
    height: '5px',
    marginLeft: '6px',
    top: '-1px',
  },
  price: {
    ...mixins.font(32, 50, 700),
    color: '#2158F5',

    [breakpoints.down('sm')]: {
      ...mixins.font(24, 32),
      paddingTop: 6,
      width: '100%',
    },
  },
}));
