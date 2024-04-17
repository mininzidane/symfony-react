import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '24px 1fr',
    gridGap: 7,
    alignItems: 'center',
    textDecoration: 'none !important',
    borderRadius: 90,
    padding: [[5, 12, 5, 8]],
    backgroundColor: '#041160',
    marginRight: 14,
    transition: 'background-color .2s ease',

    [breakpoints.down('lg')]: {
      padding: 8,
      marginRight: 12,
      gridTemplateColumns: '1fr',
    },

    '&:hover': {
      backgroundColor: '#041EEB',
    },

    '&:active': {
      backgroundColor: '#00083A',
    },
  },
  title: {
    ...mixins.font(11, 12),
    color: '#FFF',
    marginBottom: -2,
  },
  value: {
    ...mixins.font(11, 12, 700),
    color: '#FFF',

    '& > strong': {
      ...mixins.font(12, 14, 700),
    },
  },
}));
