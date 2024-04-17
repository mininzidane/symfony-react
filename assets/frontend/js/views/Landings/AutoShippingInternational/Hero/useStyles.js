import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    padding: 0,

    [breakpoints.down('sm')]: {
      background: 'linear-gradient(223deg, #1d589b, #0A2F6D)',
    },
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '660px 460px',
    alignItems: 'start',
    gridGap: 20,
    padding: [[25, 0, 35]],

    [breakpoints.down('lg')]: {
      gridTemplateColumns: '4fr 3fr',
    },

    [breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      padding: [[24, 0]],
      gridGap: 14,
    },
  },
  supTitle: {
    ...mixins.font(14, 20, 400),
    display: 'grid',
    gridTemplateColumns: '72px 1fr',
    gridGap: 10,
    alignItems: 'center',
    color: '#FDB81E',
    textTransform: 'uppercase',

    [breakpoints.down('sm')]: {
      ...mixins.font(12, 16),
      gridTemplateColumns: '60px 1fr',
      gridGap: 6,
      alignItems: 'initial',

      '& img': {
        marginTop: 1,
      },
    },
  },
  title: {
    ...mixins.font(40, 48, 700),
    color: '#FFF',
    margin: [[6, 0, 0]],
    paddingBottom: 10,

    [breakpoints.down('lg')]: {
      ...mixins.font(30, 40),
    },

    [breakpoints.down('sm')]: {
      ...mixins.font(24, 32),
    },
  },
  features: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',

    [breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
  feature: {
    color: '#FFF',
    display: 'grid',
    marginTop: 20,
    gridGap: 10,
    gridTemplateColumns: '18px 1fr',
    ...mixins.font(14, 20, 400),

    [breakpoints.down('sm')]: {
      marginTop: 12,
      gridTemplateColumns: '16px 1fr',
    },

    '& strong': {
      ...mixins.font(20, 26, 700),
      display: 'block',

      [breakpoints.down('sm')]: {
        ...mixins.font(16),
        display: 'inline-block',
      },
    },

    '& img': {
      marginTop: 5,

      [breakpoints.down('sm')]: {
        marginTop: 6,
      },
    },
  },
}));
