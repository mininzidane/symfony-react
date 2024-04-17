import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  table: {
    overflowX: 'initial !important',

    '& td, & th': {
      minWidth: 80,
      padding: '6px 8px !important',

      '&:nth-child(2), &:nth-child(12), &:nth-child(13), &:nth-child(15)': {
        minWidth: 110,
      },

      '&:nth-child(13), &:nth-child(18)': {
        minWidth: 125,
      },

      '&:nth-child(3)': {
        minWidth: 88,

        '& > div': {
          paddingBottom: '0 !important',
        },
      },

      '&:nth-child(4), &:nth-child(8), &:nth-child(9)': {
        minWidth: 120,
      },
    },

    '& th': {
      position: 'sticky',
      zIndex: 20,
      top: ({ headerOffset }) => headerOffset,
    },

    '& td': {
      ...mixins.font(16, 18),

      '&:nth-child(3)': {
        padding: '0 !important',
      },

      '& strong': {
        fontWeight: 700,
      },
    },
  },
}));
