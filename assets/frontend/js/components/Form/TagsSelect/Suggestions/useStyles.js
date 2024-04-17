import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    position: 'absolute',
    padding: [[6, 0]],
    top: 'calc(100% + 8px)',
    width: 'calc(100% + 2px)',
    left: -1,
    background: '#FFFFFF',
    boxShadow: '0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.31)',
    borderRadius: 4,
    maxHeight: 300,
    overflow: 'auto',
    scrollbarColor: '#9B9391 transparent',
    scrollbarWidth: 'thin',

    [breakpoints.down('sm')]: {
      maxHeight: 232,
      scrollbarColor: '#F06B00 transparent',
    },

    '&::-webkit-scrollbar': {
      width: 8,

      [breakpoints.down('sm')]: {
        width: 5,
      },
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#9B9391',
      borderRadius: '8px',

      [breakpoints.down('sm')]: {
        borderRadius: '5px',
        backgroundColor: '#F06B00',
      },
    },
  },
  button: {
    display: 'block',
    width: '100%',
    textAlign: 'left',
    padding: [[4, 10]],

    '&:hover': {
      backgroundColor: '#E4EDF4',
    },
  },
  suggestion: {
    ...mixins.textEllipsis(14, 20, 400),
  },
}));
