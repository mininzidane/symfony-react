import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridGap: 14,

    [breakpoints.down('lg')]: {
      gridTemplateColumns: '1fr',
    },
  },
  card: {
    overflow: 'hidden',
    boxShadow: '0 0 0 1px #e0e0e0 !important',
  },
  stepLabel: {
    ...mixins.font(24, 32, 700),
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    color: '#2158F5',
    textTransform: 'uppercase',
    marginTop: 51,
    height: 40,

    [breakpoints.down('md')]: {
      ...mixins.font(18, 24),
      marginTop: 14,
    },
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    textAlign: 'center',
    padding: [[0, 22, 16]],
    overflow: 'hidden',

    [breakpoints.down('sm')]: {
      padding: [[0, 14, 14]],
    },
  },
  formContainer: {
    padding: [[14, 14, 16]],
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    textAlign: 'center',

    [breakpoints.down('sm')]: {
      paddingBottom: 14,
    },
  },
  desc: {
    ...mixins.font(18, 24, 400),
    color: '#333',
    minHeight: 103,
    padding: [[15, 0, 10]],

    [breakpoints.down('lg')]: {
      minHeight: 50,
      padding: [[8, 0, 16]],

      '& br': {
        display: 'none',
      },
    },

    [breakpoints.down('sm')]: {
      minHeight: 0,
      fontSize: 14,
      lineHeight: '20px',
      paddingBottom: 16,
    },
  },
  uploadCta: {
    minWidth: 250,
    width: 'auto',
  },
  img: {
    marginRight: 10,

    [breakpoints.down('sm')]: {
      marginRight: 7,
    },
  },
  cards: {
    height: 40,
    border: '2px solid #E0E0E0',
    borderRadius: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    width: '100%',
    maxWidth: 440,
  },
  dropArea: {
    width: '100%',
    height: 255,
    justifyContent: 'center',
    padding: 14,

    [breakpoints.down('sm')]: {
      height: 'auto',
    },
  },
  form: {
    width: '100%',
  },
  files: {
    display: 'flex',
  },
  fileWrap: {
    flexDirection: 'row !important',
    width: '100%',
    paddingRight: 8,

    '& > *': {
      marginBottom: '0 !important',

      '&:nth-child(1)': {
        maxWidth: 64,
        height: 'auto',
      },

      '&:nth-child(2)': {
        margin: [[0, 14]],
        textAlign: 'left',
        maxWidth: 235,

        [breakpoints.down('sm')]: {
          maxWidth: 180,
        },
      },

      '&:nth-child(3)': {
        marginLeft: 'auto',
      },
    },
  },
  submitCta: {
    marginTop: 14,
    width: '100% !important',
    maxWidth: 440,
  },
  filesContainer: {
    marginRight: 0,
    paddingRight: 0,
    height: 44,
    marginBottom: 0,
    marginTop: 8,

    [breakpoints.down('sm')]: {
      height: 'auto',
      minHeight: 60,
    },
  },
  error: {
    color: '#981B1E',
  },
}));
