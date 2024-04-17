import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  item: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',

    '&:not(:first-child)': {
      marginTop: 10,
    },
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '2fr 5fr',
    paddingTop: 6,
    paddingBottom: 15,

    [breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
  refinements: {
    paddingRight: 30,

    [breakpoints.down('sm')]: {
      padding: [[0, 0, 15]],

      '& > div': {
        width: '100% !important',
        marginTop: '15px !important ',

        '&:first-child': {
          marginTop: '5px !important ',
        },
      },
    },
  },
  receipt: {
    padding: 14,
    backgroundColor: '#FFFCDF',
    borderRadius: 4,
  },
  field1: {
    display: 'flex',
    justifyContent: 'space-between',

    '&:not(:first-child)': {
      marginTop: 20,

      [breakpoints.down('sm')]: {
        marginTop: 14,
      },
    },

    '& > div': {
      height: 18,

      '&:first-child': {
        width: '55%',

        [breakpoints.down('sm')]: {
          width: '55%',
        },
      },

      '&:last-child': {
        width: '20%',

        [breakpoints.down('sm')]: {
          width: '25%',
        },
      },
    },
  },
  field2: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 24,

    [breakpoints.down('sm')]: {
      marginTop: 14,
    },

    '& > div': {
      height: 18,

      '&:first-child': {
        width: '35%',

        [breakpoints.down('sm')]: {
          width: '45%',
        },
      },

      '&:last-child': {
        width: '15%',

        [breakpoints.down('sm')]: {
          width: '20%',
        },
      },
    },
  },
  footer: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'space-between',

    [breakpoints.down('sm')]: {
      marginTop: 15,
    },

    '& > div': {
      height: 18,

      '&:first-child': {
        marginRight: 18,
      },

      '&:last-child': {
        marginLeft: 'auto',
      },
    },
  },
  summary: {
    height: 46,
    width: '100%',
    marginTop: 24,

    [breakpoints.down('sm')]: {
      marginTop: 15,
    },
  },
}));
