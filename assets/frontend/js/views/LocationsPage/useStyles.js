import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  formContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 40,

    [breakpoints.down('md')]: {
      height: 175,
      backgroundColor: '#C4DAFF',
      position: 'static',
    },
  },

  searchFormContainer: {
    maxWidth: 450,
    position: 'relative',
    zIndex: 1,
  },

  title: {
    fontWeight: 400,
    fontSize: 38,
    lineHeight: 1.3,
    marginBottom: 20,

    [breakpoints.down('md')]: {
      fontSize: 24,
      lineHeight: 1.25,
      marginTop: 0,
      paddingTop: 20,
    },
  },

  form: {
    marginBottom: 10,
  },

  formGroup: {
    position: 'relative',
  },

  formInput: {
    '& input': {
      paddingLeft: 32,
    },
    '& input::placeholder': {
      [breakpoints.down('md')]: {
        fontSize: 12,
      },
    },
  },

  searchIcon: {
    position: 'absolute',
    zIndex: 2,
    top: '50%',
    left: 12,
    transform: 'translateY(-50%)',
  },

  formDesc: {
    fontSize: 14,
    color: '#333',
  },

  desc: {
    fontSize: 20,
    fontWeight: 400,
    lineHeight: 1.5,
    textAlign: 'center',
    marginTop: 40,

    [breakpoints.down('md')]: {
      marginTop: 20,
      fontSize: 14,
      lineHeight: 1.4,
      textAlign: 'left',
    },
  },

  btnGroup: {
    display: 'flex',
    maxWidth: 520,
    margin: [[40, 'auto', 25]],

    [breakpoints.down('md')]: {
      margin: [[20, 'auto', 10]],
    },

    '& > *:first-child': {
      borderRadius: '90px 0px 0px 90px',

      [breakpoints.down('md')]: {
        fontSize: 12,
      },
    },

    '& > *:last-child': {
      borderRadius: '0px 90px  90px 0px',

      [breakpoints.down('md')]: {
        fontSize: 12,
      },
    },
  },

  btnInverse: {
    backgroundColor: 'transparent !important',
    color: '#2158F5 !important',
    boxShadow: 'none !important',
    border: '1px solid #2158F5 !important',
  },

  subTitle: {
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 18,
    lineHeight: 1.3,
  },

  button: {
    color: '#2158F5',
  },

  h2: {
    fontSize: 24,
    lineHeight: 1.75,

    [breakpoints.down('md')]: {
      fontSize: 18,
    },
  },

  p: {
    fontSize: 18,
    lineHeight: 1.75,
  },

  notFound: {
    backgroundColor: '#fff',
    padding: [[24, 0]],
  },
  directory: {
    maxWidth: '100%',
    paddingTop: 15,
  },
  directoryHead: {
    marginTop: 3,
    paddingBottom: 14,
  },
}));
