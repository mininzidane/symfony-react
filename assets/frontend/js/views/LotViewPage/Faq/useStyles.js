import { makeStyles } from '@material-ui/core/styles';

const mediaQueryMd = '@media (max-width: 1600px)';

export default makeStyles(({ breakpoints }) => ({
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  helpCenter: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    lineHeight: '22px',
    fontWeight: 400,
    whiteSpace: 'nowrap',

    '& > img': {
      marginRight: 8,
    },
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    color: '#333333',

    '& > div': {
      '&:first-child': {
        width: '52%',
        paddingRight: 60,

        [mediaQueryMd]: {
          paddingRight: 40,
        },

        [breakpoints.down('sm')]: {
          width: '100%',
          paddingRight: 0,
        },
      },

      '&:last-child': {
        width: '48%',
        paddingRight: 20,

        [mediaQueryMd]: {
          paddingRight: 0,
        },

        [breakpoints.down('sm')]: {
          width: '100%',
        },
      },
    },
  },
  questionsWrapper: {
    '& > :last-child': {
      [breakpoints.up('md')]: {
        paddingBottom: 0,
      },
    },
  },
  question: {
    fontSize: 16,
    lineHeight: '24px',
    fontWeight: 700,
    color: '#333333',

    [breakpoints.down('sm')]: {
      fontSize: 14,
      lineHeight: '22px',
    },
  },
  answer: {
    marginTop: 12,
    paddingBottom: 25,
    fontSize: 14,
    lineHeight: '22px',
    fontWeight: 400,

    [breakpoints.down('sm')]: {
      marginTop: 10,
      paddingBottom: 20,
    },
  },
}));
