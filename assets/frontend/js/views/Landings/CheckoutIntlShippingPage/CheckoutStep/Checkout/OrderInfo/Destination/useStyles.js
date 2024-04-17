import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  title: {
    margin: '0 0 23px',
    color: '#333333',

    '& span': {
      display: 'block',

      '&:first-child': {
        ...mixins.font(38, 50, 400),
        [breakpoints.down('lg')]: {
          ...mixins.font(32, 42),
        },
      },

      '&:last-child': {
        ...mixins.font(38, 50, 700),

        [breakpoints.down('lg')]: {
          ...mixins.font(32, 42),
        },
      },
    },
  },
  promo: {
    flexWrap: 'nowrap',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  promoIcon: {
    marginRight: '14px',
    backgroundColor: '#1A4277',
    border: '1px solid #2D75E9',
    borderRadius: '50%',
    width: 42,
    height: 42,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: '0',

    '& img': {
      display: 'block',
      marginLeft: 1,
      marginTop: 1,
    },
  },
  promoTitle: {
    ...mixins.font(18, 24, 700),
    color: '#333333',
    opacity: '0.9',
    paddingRight: 30,
  },
  mobileTitle: {
    ...mixins.font(20, 26, 700),
    textAlign: 'center',

    '& span': {
      fontWeight: 400,
    },
  },
}));
