import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    width: '100%',
    minWidth: 0,
    paddingLeft: 25,

    [breakpoints.down('sm')]: {
      paddingLeft: 16,
    },
  },
  caption: {
    margin: '-3px 0 0',

    '& > a': {
      ...mixins.font(20, 27, 600),
      ...mixins.textEllipsis(),
      display: 'block',
      color: '#000',
      textDecoration: 'none !important',

      '&:hover': {
        color: '#2158F5',
      },

      [breakpoints.down('sm')]: {
        ...mixins.font(16, 21),
      },
    },
  },
  stats: ({ statsMargin }) => ({
    position: 'relative',
    marginTop: statsMargin ? 15 : 0,

    [breakpoints.down('sm')]: {
      marginTop: 5,
    },
  }),
  location: {
    display: 'inline-block',
  },
}));
