import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    color: '#337ab7',
    borderStyle: 'none',
    outline: 'none',
    border: '0',
    background: 'transparent',
    display: 'inline',
    margin: '0',
    padding: '0',

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
