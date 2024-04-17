import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    paddingBottom: 50,

    [breakpoints.down('xs')]: {
      padding: [[0, 0, 15]],
    },
  },
  toolbar: ({ loading }) => ({
    marginTop: 20,
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    minHeight: 36,
    pointerEvents: loading ? 'none' : 'all',

    [breakpoints.down('sm')]: {
      marginTop: 14,
      flexDirection: 'row',
    },

    [breakpoints.down('xs')]: {
      padding: [[0, 14]],
    },
  }),
  grid: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) 360px',
    alignItems: 'start',
    gridGap: 30,
    marginTop: 20,

    '@media(max-width: 1425px)': {
      gridTemplateColumns: 'minmax(0, 1fr) 280px',
      gridGap: '20px !important',
    },

    [breakpoints.up('lg')]: {
      gridGap: '30px !important',

      '& > div:only-child': {
        gridColumn: 'span 2',
      },
    },

    [breakpoints.down('md')]: {
      gridTemplateColumns: 'minmax(0, 1fr)',
    },

    [breakpoints.down('sm')]: {
      marginTop: 15,
    },
  },
  filtersLeft: {
    display: 'flex',
    justifyContent: 'space-between',
    marginRight: 'auto',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  filtersRight: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    '& > div:last-child': {
      [breakpoints.up('sm')]: {
        marginLeft: 20,
      },
    },
  },
}));
