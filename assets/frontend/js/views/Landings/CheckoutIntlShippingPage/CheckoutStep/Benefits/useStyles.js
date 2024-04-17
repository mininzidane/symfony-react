import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    display: 'grid',
    padding: [[30, 60]],
    gridGap: 50,
    gridTemplateColumns: '1fr 1fr 1fr',
    alignItems: 'flex-start',

    [breakpoints.down('lg')]: {
      padding: 30,
      gridGap: 30,
    },

    [breakpoints.down('md')]: {
      padding: 20,
      gridGap: 20,
      gridTemplateColumns: '1fr',
    },

    [breakpoints.down('sm')]: {
      padding: [[20, 12]],
      gridGap: '23px',
      gridTemplateColumns: '1fr',
    },
  },
  benefit: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  icon: {
    marginRight: '12px',
    backgroundColor: '#1A4277',
    border: '1px solid #2D75E9',
    borderRadius: '50%',
    width: '42px',
    height: '42px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: '0',
    '& img': {
      display: 'block',
    },
  },
  timeIcon: {
    marginLeft: 2,
    marginTop: -2,
  },
  trackingServiceIcon: {
    marginLeft: -1,
  },
  warehouseIcon: {
    marginTop: -4,
  },
  title: {
    ...mixins.font(16, 21, 400),
    color: '#333',
    marginTop: 2,

    [breakpoints.down('md')]: {
      marginTop: 0,
      alignSelf: 'center',
    },
  },
}));
