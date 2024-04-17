import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    color: '#2158F5',
    cursor: 'pointer',

    '&:hover': {
      textDecoration: 'underline',
    },

    '&.is-nowrap': {
      whiteSpace: 'nowrap',
    },

    '&.is-dashed': {
      textDecoration: 'none',

      '& > span': {
        borderBottom: '1px dashed currentColor',
        paddingBottom: '1px',
      },

      '&:hover > span, &.is-active > span': {
        borderBottomColor: 'transparent',
      },
    },
  },
}));
