import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    '&.is-gray-style': {
      border: '1px solid #e0e0e0',
      boxShadow: 'none',

      '& th': {
        backgroundColor: '#E0E0E0',
        color: '#333333',
        borderBottom: '1px solid #B3B3B3',
        padding: '14px !important',
        position: 'relative',

        '&:not(:last-child):after': {
          content: '""',
          position: 'absolute',
          top: 0,
          bottom: -1,
          right: 0,
          width: 1,
          backgroundColor: '#FFFFFF',
        },
      },
      '& td': {
        padding: '14px !important',
        fontSize: 14,
        verticalAlign: 'middle',
      },
    },

    '&.is-striped': {
      '& tr:nth-child(even) td': {
        backgroundColor: '#F6F9FD',
      },
    },
  },
}));
