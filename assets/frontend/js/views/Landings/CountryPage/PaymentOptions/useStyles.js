import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    backgroundColor: '#FFFFFF',
    borderBottom: '2px solid #F1F1F8',
    padding: [[32, 0, 50]],

    [breakpoints.down('sm')]: {
      padding: [[25, 0, 40]],
    },
  },
  title: {
    ...mixins.font(32, 42, 400),
    margin: [[0, 0, 50]],
    textAlign: 'center',

    [breakpoints.down('sm')]: {
      ...mixins.font(24, 32),
      marginBottom: 25,
    },
  },
  text: {
    ...mixins.font(16, 24, 400),
    marginTop: 12,
    color: '#4F4F4F',
  },
  grid: {
    marginTop: 20,
    display: 'grid',
    justifyContent: 'space-between',
    gridTemplateColumns: '1fr 1px 1fr',
    gridGap: 50,
    margin: [[0, 'auto']],

    [breakpoints.up('lg')]: {
      maxWidth: 880,
    },

    [breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      gridGap: 30,
      justifyItems: 'center',
    },
  },
  section: {
    ...mixins.font(16, 21, 400),
    textAlign: 'center',

    [breakpoints.down('sm')]: {
      maxWidth: '400px',
    },

    '& > div': {
      marginTop: 4,
    },
  },
  separator: {
    width: 1,
    height: '100%',
    background: 'linear-gradient(180deg, rgba(196, 196, 196, 0) 0%, #C4C4C4 51.04%, rgba(196, 196, 196, 0) 100%)',

    [breakpoints.down('sm')]: {
      width: '100%',
      height: 1,
      background: 'linear-gradient(90deg, rgba(196, 196, 196, 0) 0%, #C4C4C4 51.04%, rgba(196, 196, 196, 0) 100%)',
    },
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 20,
  },
}));
