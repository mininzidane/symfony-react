import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    ...mixins.extraHitbox(5),
    ...mixins.flex('center', 'center'),
    position: 'relative',
    display: 'flex',
    width: 30,
    height: 30,
    border: '1px solid #2158F5',
    borderRadius: 25,
    userSelect: 'none',
    cursor: 'pointer',
    transition: 'background-color .2s ease, border-color .2s ease',

    '&.is-md': {
      height: 40,
    },

    '&.has-label': {
      padding: [[5, 10]],
      width: 'auto',
      whiteSpace: 'nowrap',
    },

    '&:hover': {
      backgroundColor: '#E6EEF8',
    },

    '& svg': {
      marginTop: 1,
    },

    '& path': {
      fill: '#2158F5',
    },
  },
  active: {
    backgroundColor: '#2158F5',

    '&:hover': {
      backgroundColor: '#5681F7',
      borderColor: '#5681F7',

      '& path': {
        fill: '#FFFFFF',
      },
    },

    '& path': {
      fill: '#FFFFFF',
    },

    '& $label': {
      color: '#FFFFFF',
    },
  },
  label: {
    ...mixins.font(14, 20, 400),
    marginLeft: 6,
    color: '#2158F5',

    '&.is-md': {
      ...mixins.font(16, 20, 400),
    },
  },
}));
