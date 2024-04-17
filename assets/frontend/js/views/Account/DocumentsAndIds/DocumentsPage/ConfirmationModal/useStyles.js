import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: 14,
  },
  phone: {
    whiteSpace: 'nowrap',
  },
  warningText: {
    marginBottom: 5,
    color: '#981B1E',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: 'minmax(75px, auto) 1fr',
    gridGap: 10,
    backgroundColor: '#FFFFFF',
    padding: 14,
    border: '1px solid #B9B9B9',

    '&:first-child': {
      borderTopLeftRadius: 2,
      borderTopRightRadius: 2,
    },

    '&:last-child': {
      borderBottomLeftRadius: 2,
      borderBottomRightRadius: 2,
    },

    '&:not(:first-child)': {
      borderTop: 'none',
    },
  },
  radioButtonWrap: {
    paddingTop: 12,

    '& label': {
      ...mixins.font(14, 20),

      '& > div': {
        top: 1,
      },
    },
  },
}));
