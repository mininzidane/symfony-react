import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  table: {
    overflowX: 'initial !important',

    '& th': {
      ...mixins.font(12, 18, 700),
      padding: '4px !important',
      whiteSpace: 'nowrap',
      verticalAlign: 'middle',
      height: 48,

      '&:nth-child(1)': {
        width: 92,
      },
    },

    '& td': {
      ...mixins.font(12, 18, 400),
      verticalAlign: 'middle',
      padding: 4,
      paddingRight: 12,

      '&:nth-child(1)': {
        width: 92,
      },

      '& strong': {
        fontWeight: 700,
      },
    },
  },
}));
