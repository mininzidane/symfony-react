import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    backgroundColor: '#FFF',
    padding: [[40, 0]],

    [breakpoints.down('sm')]: {
      padding: [[25, 0]],
    },
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '680px 450px',
    gridGap: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 100,

    [breakpoints.down('lg')]: {
      gridTemplateColumns: '3fr 2fr',
      paddingRight: 0,
      gridGap: 0,
    },

    [breakpoints.down('md')]: {
      gridTemplateColumns: '1fr 1fr',
    },

    [breakpoints.down('sm')]: {
      gridGap: 10,
      gridTemplateColumns: '1fr',

      '& > div:first-child': {
        display: 'flex',
        justifyContent: 'center',

        '& img': {
          maxWidth: 350,
        },
      },

      '& > div:last-child': {
        order: -1,
      },
    },
  },
  title: {
    ...mixins.font(32, 42),

    [breakpoints.down('sm')]: {
      ...mixins.font(24, 32),
    },
  },
  desc: {
    ...mixins.font(16, 22),
    marginTop: 10,
  },
  cta: {
    marginTop: 20,
  },
  list: {
    marginTop: 15,

    '& img': {
      marginRight: 8,
    },

    '& > div': {
      display: 'flex',
      alignItems: 'center',

      '&:not(:first-child)': {
        marginTop: 15,
      },
    },
  },
}));
