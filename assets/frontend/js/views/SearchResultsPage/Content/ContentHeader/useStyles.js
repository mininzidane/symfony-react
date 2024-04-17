import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    paddingTop: 8,
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    ...mixins.font(16, 24, 400),

    '&.is-firefox': {
      alignItems: 'center',
    },

    [breakpoints.down('sm')]: {
      ...mixins.font(14, 24, 400),
      paddingTop: 5,
    },

    [breakpoints.down('xs')]: {
      padding: [[5, 14, 0]],
    },
  },
  loading: {
    minHeight: 44,

    [breakpoints.down('sm')]: {
      minHeight: 68,
    },

    [breakpoints.down('xs')]: {
      minHeight: 60,
    },
  },
  count: {
    whiteSpace: 'nowrap',
    marginRight: 15,

    [breakpoints.down('sm')]: {
      ...mixins.font(12, 16),
      color: '#828282',
      marginRight: 10,
    },
  },
  wrap: {
    display: 'flex !important',
    alignItems: 'center',
    flexGrow: 1,
    flexWrap: 'wrap !important',

    '&.is-firefox': {
      [breakpoints.up('md')]: {
        paddingTop: 8,
      },
    },
  },
  title: {
    marginRight: 15,

    [breakpoints.down('sm')]: {
      marginRight: 10,
    },
  },
  titleSectionFilters: {
    display: 'flex',
    alignItems: 'center',

    '& > *:not(:last-child)': {
      marginRight: 14,
    },
  },
}));
