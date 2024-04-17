import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    padding: '13px 4px 10px',
    overflow: 'auto',
    boxShadow: '0 1px 6px rgba(0, 0, 0, .4)',
    maxHeight: 300,
    borderRadius: 6,
    backgroundColor: '#FFF',
    overflowY: 'auto',
    overflowX: 'hidden',
    overscrollBehavior: 'none',
    scrollbarColor: '#C1C1C1 transparent',
    scrollbarWidth: 'thin',
    marginTop: 1,
    position: 'absolute',
    right: 0,
    left: 0,

    [breakpoints.down('sm')]: {
      scrollbarColor: '#C1C1C1 transparent',
    },

    '&::-webkit-scrollbar': {
      width: 8,

      [breakpoints.down('sm')]: {
        width: 5,
      },
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#C1C1C1',
      borderRadius: '8px',

      [breakpoints.down('sm')]: {
        borderRadius: '5px',
        backgroundColor: '#C1C1C1',
      },
    },
  },
  suggestion: {
    position: 'relative',
    outline: 'none',
    borderRadius: 6,
    display: 'block',
    width: '100%',
    textAlign: 'left',
    padding: [[5]],

    '&:hover': {
      background: '#F1F1F8',
    },
  },
}));
