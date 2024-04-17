import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: '#FFF',
    padding: [[5, 0, 35]],

    [breakpoints.down('sm')]: {
      padding: [[24, 0, 32]],
    },
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '430px 1fr',
    gridGap: 80,

    [breakpoints.down('lg')]: {
      gridGap: 48,
    },

    [breakpoints.down('md')]: {
      gridGap: 30,
    },

    [breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
  title: {
    textAlign: 'left',

    [breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  subtitle: {
    margin: [[12, 0, 15]],
    fontSize: 18,
    lineHeight: '24px',
    fontWeight: 400,

    [breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  imageContainer: {
    position: 'relative',
    height: 303,
    maxWidth: 580,
    width: '100%',
  },
  image: {
    position: 'absolute',
    top: 45,
    left: 0,
  },
  formControl: {
    marginTop: 12,
  },
  successMessage: {
    marginTop: 20,
    fontSize: 16,
    lineHeight: '21px',
    fontWeight: 400,

    [breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
}));
