import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    ...mixins.extraHitbox(5, 'before'),
    flexShrink: 0,
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    color: 'white',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    padding: [[6, 6, 6, 8]],
    cursor: 'pointer',
    border: '1px solid #9FA4A9',
    borderRadius: 4,

    '&:hover': {
      border: '1px solid #FFF',
      background: 'rgba(255, 255, 255, .1)',
    },

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

    '&.is-active': {
      borderRadius: 4,
      background: 'rgba(255, 255, 255, .1)',

      '&:after': {
        transform: 'scaleY(-1)',
      },
    },
  },
  label: {
    marginLeft: 6,
    marginRight: 10,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: '18px',
  },
  icon: {
    width: 20,
    height: 16,
    borderRadius: 2,
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
