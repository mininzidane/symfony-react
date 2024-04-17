import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {},
  flag: {
    width: 30,
    height: 22,
    marginRight: 10,
  },
  name: {
    fontSize: 20,
    lineHeight: '25px',
    fontWeight: 'bold',
  },
  controls: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    alignItems: 'center',
    gridGap: 12,
    marginTop: 20,
  },
  cta: {
    paddingLeft: '10px !important',
    paddingRight: '10px !important',
    fontSize: '14px !important',
    textTransform: 'uppercase !important',

    '& svg': {
      position: 'relative',
      top: 2,
      right: 6,
    },

    '& path': {
      fill: '#2158F5',
      transition: 'all .2s ease',
    },

    '& a': {
      color: '#2158F5 !important',
      textDecoration: 'none !important',
      fontWeight: '400 !important',
      fontSize: 14,
    },

    '& span': {
      fontWeight: '700 !important',
    },

    '&:hover': {
      '& a': {
        color: '#FFF !important',
      },

      '& path': {
        fill: '#FFF',
      },
    },
  },
  socials: {
    display: 'flex',

    '& > div:not(:first-child)': {
      marginLeft: 15,
    },
  },
  socialWrap: {
    display: 'flex',
    height: 40,

    '&:empty': {
      display: 'none',
    },
  },
  address: {
    paddingTop: 16,
    marginTop: 20,
    borderTop: '1px solid #F1F1F8',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: 12,
    paddingBottom: 10,
  },
  addressSection: {
    display: 'grid',
    gridTemplateColumns: '18px 1fr',
    gridGap: 10,

    '& img': {
      position: 'relative',
      top: 1,
    },
  },
  dot: {
    width: 6,
    height: 6,
    flexShrink: 0,
    borderRadius: '50%',
    backgroundColor: '#BB2200',
    marginLeft: 6,
    marginTop: 4,

    '&.is-open': {
      backgroundColor: '#4A9029',
    },
  },
  openLabel: {
    ...mixins.font(16, 20),
    marginTop: 4,
    color: '#BB2200',

    '&.is-open': {
      color: '#4A9029',
    },
  },
  addressDesc: {
    '& *': {
      ...mixins.font(14, 20),
    },
  },
  addressLabel: {
    color: '#828282',
    paddingBottom: 3,
  },
  socialLink: {
    minWidth: 40,
    marginLeft: 12,
    transition: 'opacity .2s ease',

    '&:hover': {
      opacity: 0.8,
    },
  },
  zendeskTrigger: {
    paddingTop: '7px !important',
  },
}));
