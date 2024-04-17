import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    position: 'relative',
    background: '#FFFFFF',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
    borderRadius: 6,
    paddingTop: 64,
    paddingBottom: 16,
    textAlign: 'center',
    width: 'calc((100% - 40px) / 3)',

    [breakpoints.down('md')]: {
      width: 'calc((100% - 20px) / 2)',
    },

    [breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  icon: {
    position: 'absolute',
    left: 'calc(50% - 45px)',
    top: -45,
    borderRadius: '50%',
  },
  position: {
    ...mixins.font(16, 22, 700),
  },
  name: {
    color: '#828282',
    ...mixins.font(14, 20, 400),
  },
  contacts: {
    marginTop: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  phone: {
    ...mixins.font(16, 22, 400),
    paddingRight: 20,
  },
  socials: {
    position: 'relative',
    paddingLeft: 21,
    display: 'flex',
    gap: 10,

    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      width: 1,
      height: '100%',
      background:
        'linear-gradient(180.05deg, rgba(196, 196, 196, 0) 0%, #C4C4C4 53.62%, rgba(196, 196, 196, 0) 99.96%)',
    },
  },
  hours: {
    ...mixins.font(12, 18, 400),
    color: '#666666',
    marginTop: 4,
  },
}));
