import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    ...mixins.extraHitbox(5, 'before'),
    flexShrink: 0,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    padding: [[7, 6, 7, 9]],
    border: '1px solid #9FA4A9',
    borderRadius: 4,
    cursor: 'pointer',

    '&:after': {
      content: '""',
      width: 0,
      height: 0,
      margin: [[1, 2, 0, 10]],
      marginLeft: 'auto',
      borderColor: 'currentColor transparent transparent',
      borderStyle: 'solid',
      borderWidth: [[3, 3, 0]],
    },

    '&:hover': {
      borderRadius: 4,
      background: 'rgba(255, 255, 255, .1)',
    },

    '&.is-active': {
      borderRadius: 4,
      background: 'rgba(255, 255, 255, .1)',

      '&:after': {
        transform: 'scaleY(-1)',
      },
    },
  },
  label: {
    marginLeft: 8,
    marginRight: 10,
    fontSize: 12,
    lineHeight: '16px',
  },
  icon: {
    width: 14,
    height: 14,
  },
  listItem: {
    fontSize: 14,
    padding: [[6, 20, 6, 12]],
    minHeight: 30,
    backgroundColor: '#FFF !important',

    [breakpoints.down('sm')]: {
      minHeight: 35,
    },

    '&:hover': {
      backgroundColor: '#EEE !important',
    },
  },
}));
