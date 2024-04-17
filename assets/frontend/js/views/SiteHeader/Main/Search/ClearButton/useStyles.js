import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    ...mixins.flex('center', 'center'),
    ...mixins.extraHitbox(),
    position: 'absolute',
    top: '14px',
    right: '60px',
    zIndex: '20',
    userSelect: 'none',
    outline: 'none',
    cursor: 'pointer',
    opacity: '0.2',
    transition: 'opacity 0.15s ease',

    [breakpoints.down('sm')]: {
      top: 11,
      right: 63,
    },

    '&:hover': {
      opacity: '1 !important',
    },

    '& svg': {
      width: 14,
      height: 14,
    },
  },
}));
