import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  section: {
    backgroundColor: '#FFFFFF',
    paddingTop: 45,
    paddingBottom: 45,

    [breakpoints.down('sm')]: {
      paddingTop: 36,
    },
  },
  root: {
    display: 'grid',
    gridTemplateColumns: '420px 1fr',
    gridGap: 30,
    paddingLeft: 80,

    [breakpoints.down('lg')]: {
      paddingLeft: 0,
    },

    [breakpoints.down('md')]: {
      gridTemplateColumns: '1fr 1fr',
      gridGap: 20,
    },

    [breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    justifyContent: 'space-between',
    paddingLeft: 60,
    columnGap: 60,
    marginTop: -18,

    [breakpoints.down('sm')]: {
      padding: 0,
      gridTemplateColumns: '1fr',
      paddingTop: 20,
    },
  },
  feature: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    lineHeight: '17px',
    textAlign: 'left',

    [breakpoints.down('sm')]: {
      flexDirection: 'row',
      alignItems: 'center',
      minHeight: 70,
      padding: 0,

      '& strong': {
        fontSize: 16,
        maxWidth: '100% !important',
      },
    },

    '& > div': {
      minHeight: 80,
      display: 'flex',
      alignItems: 'flex-end',

      [breakpoints.down('sm')]: {
        minHeight: 70,
        width: 105,
        justifyContent: 'center',
        alignItems: 'center',
      },
    },

    '& img': {
      marginBottom: 16,
      transform: 'scale(0.8)',
      transformOrigin: 'bottom left',

      [breakpoints.down('sm')]: {
        marginBottom: 0,
        transformOrigin: 'center left',
      },
    },

    '& strong': {
      maxWidth: 120,
    },
  },
  title: {
    fontSize: 32,
    lineHeight: '42px',
    color: '#333333',

    [breakpoints.down('sm')]: {
      ...mixins.font(24, 32),
    },
  },
  desc: {
    fontSize: 16,
    lineHeight: '24px',
    color: '#333333',
    marginTop: 30,
    paddingBottom: 12,

    [breakpoints.down('sm')]: {
      marginTop: 20,
      paddingBottom: 0,
    },
  },
  cta: {
    marginTop: 42,

    [breakpoints.down('sm')]: {
      marginTop: 0,
    },
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom: 15,

    [breakpoints.down('sm')]: {
      paddingBottom: 0,
    },
  },
}));
