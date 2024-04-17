import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gridTemplateRows: '40px',

    [breakpoints.down('sm')]: {
      gridTemplateRows: '30px',
      marginLeft: 12,
    },
  },
  button: {
    ...mixins.font(14, 20, 700),
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #828282',
    transition: 'color .15s ease, border .15s ease',
    padding: [[0, 10]],
    color: '#828282',
    cursor: 'pointer',

    [breakpoints.down('sm')]: {
      padding: [[0, 7]],
    },

    '& path': {
      fill: '#828282',
      transition: 'fill .15s ease',
    },

    '&:hover': {
      borderColor: '#333',
      color: '#333',

      '& path': {
        fill: '#333',
      },
    },

    '&.is-active': {
      borderColor: '#2158F5 !important',
      color: '#2158F5 !important',
      zIndex: 20,
      pointerEvents: 'none',

      '& path': {
        fill: '#2158F5 !important',
      },
    },
  },
  listViewButton: {
    placeContent: 'center',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    left: 1,
  },
  gridViewButton: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  togglerMode: {
    width: 30,
    borderRadius: 4,
    padding: [[0, 7]],
    pointerEvents: 'all !important',
  },
  label: {
    marginLeft: 6,

    [breakpoints.down('sm')]: {
      marginLeft: 0,
      display: 'none',
    },
  },
}));
