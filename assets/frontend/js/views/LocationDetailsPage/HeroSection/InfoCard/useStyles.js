import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    border: '1px solid #BDBDBD',
    borderRadius: 4,
    backgroundColor: '#fff',
    marginBottom: 30,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    overflow: 'hidden',

    [breakpoints.down('lg')]: {
      marginTop: 20,
    },

    [breakpoints.down('md')]: {
      marginTop: 15,
      gridTemplateColumns: '1fr',
    },
  },
  caption: {
    ...mixins.font(16, 24, 700),
  },
  locationInfoSection: {
    padding: [[14, 20, 25]],
    backgroundColor: '#FCFAEC',
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
  },
  locationInfoDetails: {
    display: 'flex',
    alignItems: 'center',
    gap: 15,
  },
  grid: {
    marginTop: 12,
    display: 'grid',
    gridTemplateColumns: '18px 1fr',
    gridGap: 10,
  },
  physicalAddressLabel: {
    color: '#828282',
  },
  address: {
    marginTop: 8,
  },
  mapUrl: {
    marginTop: 5,
    fontSize: 12,
    lineHeight: '18px',
    display: 'inline-block',
  },
  viewInventory: {
    marginTop: 24,
  },
  supportSection: {
    padding: [[20, 20, 12]],
    backgroundColor: '#FFF',
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
  },
  supportCta: {
    paddingLeft: '10px !important',
    paddingRight: '10px !important',
    fontSize: '14px !important',
    textTransform: 'uppercase !important',
    marginTop: 12,

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
  scrollLink: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 36,
    width: '100%',
    color: '#2058F5',

    '&:hover': {
      textDecoration: 'underline',
    },

    '&:nth-child(2)': {
      borderTop: '1px solid #E9E9E9',
    },
  },
  scrollLinks: {
    marginTop: 15,
  },
}));
