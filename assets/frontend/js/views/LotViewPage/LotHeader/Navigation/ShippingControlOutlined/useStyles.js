import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    ...mixins.extraHitbox(5),
    ...mixins.flex('center', 'center'),
    position: 'relative',
    display: 'flex',
    height: 40,
    border: '1px solid #2158F5',
    borderRadius: 25,
    userSelect: 'none',
    cursor: 'pointer',
    transition: 'all .2s ease',
    alignItems: 'center',
    padding: [[5, 12]],
    width: 'auto',
    whiteSpace: 'nowrap',
    backgroundColor: '#FFF',

    '&.is-select, &.is-abm-inventory, &.is-npa-inventory': {
      borderColor: '#FFF',
    },

    [breakpoints.down('lg')]: {
      height: 30,
    },

    '& img': {
      [breakpoints.down('sm')]: {
        width: 18,
        height: 'auto',
      },
    },

    '&:hover': {
      backgroundColor: '#E6EEF8',

      '&.is-select': {
        borderColor: '#E6EEF8',
      },
    },
  },
  label: {
    ...mixins.font(14, 20, 400),
    marginLeft: 9,
    color: '#2158F5',

    [breakpoints.down('lg')]: {
      marginLeft: 6,
    },
  },
  domesticIcon: {
    width: 27,
    height: 16,

    [breakpoints.down('lg')]: {
      transform: 'scale(0.9)',
    },
  },
  oceanIcon: {
    width: 20,

    [breakpoints.down('lg')]: {
      width: 18,
    },
  },
}));
