import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    margin: [[1, -20]],
    fontSize: 16,
    lineHeight: '24px',
    transition: 'all .15s ease',
    backgroundColor: 'transparent',
    boxShadow: '0px 3px 6px transparent',

    [breakpoints.down('sm')]: {
      margin: [[1, -14]],
    },

    '&.is-open, &:hover': {
      backgroundColor: '#FFF',
      boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.15)',
      borderRadius: 4,
      borderBottomColor: 'transparent',

      '& path': {
        fill: '#2158F5',
      },
    },

    '& a': {
      color: '#2158F5 !important',
    },
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: 20,
  },
  title: {
    display: 'flex',
    alignItems: 'center',

    '& a, & span': {
      lineHeight: '20px !important',
    },
  },
  name: {
    lineHeight: '25px',
    overflowWrap: 'anywhere',
  },
  flag: {
    width: 34,
    height: 25,
    marginRight: 10,
  },
  officeHours: {
    color: '#828282',
  },
  contactInfo: {
    overflowWrap: 'anywhere',
  },
  location: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    '& button': {
      color: '#2158F5',

      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
  blackText: {
    color: '#000 !important',
  },
  head: {
    alignItems: 'center',
    cursor: 'pointer',
    padding: [[26, 20, 24]],
    margin: [[0]],

    [breakpoints.down('sm')]: {
      padding: [[22, 20]],
      gridTemplateColumns: '1fr 12px',
    },
  },
  details: {
    padding: [[24, 20, 26]],
    borderTop: '1px solid #E1E1E1',

    [breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      padding: [[20, 20, 24]],

      '& > div:empty': {
        display: 'none',
      },
    },
  },
  socials: {
    '& > div:not(:first-child)': {
      marginTop: 14,
    },

    [breakpoints.down('sm')]: {
      paddingBottom: 2,
    },
  },
  icon: {
    width: 12,
    height: 12,
    display: 'inline-flex',
    marginLeft: 'auto',

    '& path': {
      fill: '#999',
    },
  },
  separator: {
    height: 1,
    backgroundColor: '#E1E1E1',
  },
  socialChats: {
    display: 'flex',

    '& > div:not(:last-child)': {
      marginRight: 25,
    },
  },
  googleMapsLink: {
    display: 'flex',

    '& img': {
      marginRight: 10,
    },
  },
  caption: {
    fontSize: 14,
    fontWeight: 700,
  },
  dot: {
    width: 6,
    height: 6,
    flexShrink: 0,
    borderRadius: '50%',
    backgroundColor: '#BB2200',
    marginLeft: 7,
    marginTop: 3,

    '&.is-open': {
      backgroundColor: '#4A9029',
    },
  },
  openLabel: {
    ...mixins.font(16, 20),
    color: '#BB2200',

    '&.is-open': {
      color: '#4A9029',
    },
  },
  viewContactInfo: {
    color: '#2158F5',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));
