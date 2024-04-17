import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  container: {
    padding: [[35, 0, 52]],

    [breakpoints.down('sm')]: {
      padding: [[24, 0, 34]],
    },
  },
  title: {
    fontSize: 32,
    lineHeight: '42px',
    fontWeight: 400,
    color: '#FFF',
    textAlign: 'center',
    margin: 0,

    [breakpoints.down('md')]: {
      fontSize: 24,
      lineHeight: '32px',
    },
  },
  subtitle: {
    marginTop: 15,
    padding: [[0, 50]],
    fontSize: 18,
    lineHeight: '24px',
    fontWeight: 400,
    color: '#FFF',
    textAlign: 'center',

    '& p': {
      margin: [[12, 0]],
      fontSize: 18,
      lineHeight: '24px',
      fontWeight: 400,
      color: '#FFF',
    },

    [breakpoints.down('md')]: {
      padding: 0,
    },

    [breakpoints.down('sm')]: {
      marginTop: 10,
      fontSize: 14,
      lineHeight: '20px',

      '& p': {
        fontSize: 14,
        lineHeight: '20px',
      },
    },
  },
  form: {
    marginTop: 25,
    maxWidth: 450,
    margin: '0 auto',

    [breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
  },
  input: {
    paddingLeft: 15,
  },
  inputContainer: {
    display: 'grid',
    gridTemplateColumns: '100px 1fr',
    position: 'relative',
    borderRadius: 4,
    overflow: 'hidden',
    height: 42,
    border: '1px solid #626262',
  },
  cvLogoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#F2F2F2',
  },
  cta: {
    marginTop: 18,
  },
  footer: {
    marginTop: 18,
    display: 'grid',
    gridTemplateColumns: '1fr 111px 1fr',
    gridGap: 0,
    [breakpoints.down('sm')]: {
      gridGap: '4%',
      gridTemplateColumns: '1fr 87px 1fr',
    },
  },
  nmvtisContainer: {
    width: 111,
    cursor: 'help',
    position: 'relative',
    minHeight: 40,
    padding: [[0, 10]],

    [breakpoints.down('sm')]: {
      minHeight: 33,
      padding: [[0, 6]],
      width: 87,
    },

    '& img': {
      display: 'block',
      maxWidth: '100%',
    },
  },
  nmvtisTooltip: {
    position: 'absolute',
    width: 'max-content',
    maxWidth: 'calc(100vw - 28px)',
    top: 'calc(100% + 4px)',
    left: '50%',
    transform: 'translateX(-50%)',
    borderRadius: 4,
    backgroundColor: '#FDF1B8',
    padding: [[12, 20]],
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 400,

    [breakpoints.down('sm')]: {
      boxShadow: '0 2px 3px rgba(0, 0, 0, .25)',
    },
  },
  link: {
    display: 'flex',
    alignSelf: 'flex-start',
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 400,
    color: '#FFFFFF !important',
    textDecoration: 'underline',
    '&:hover': {
      textDecoration: 'none',
    },
    '&.is-start': {
      justifyContent: 'flex-start',
      textAlign: 'left',
      "[dir='rtl'] &": {
        textAlign: 'right',
      },
    },
    '&.is-end': {
      justifyContent: 'flex-end',
      textAlign: 'right',
      [breakpoints.down('xs')]: {
        maxWidth: '140px',
        marginLeft: 'auto',
      },
      "[dir='rtl'] &": {
        textAlign: 'left',
      },
    },
  },
  schemaImage: {
    display: 'block',
    width: '100%',
    margin: [[15, 0, 10]],
  },
  error: {
    marginTop: 5,
    textAlign: 'center',
    color: '#FFFFFF',
  },
}));
