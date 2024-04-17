import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontWeight: 700,
    fontSize: 14,
    lineHeight: '20px',
    color: '#FFFFFF',
    flexBasis: '42%',

    '& span': {
      fontWeight: 400,

      [breakpoints.down('sm')]: {
        whiteSpace: 'nowrap',
      },
    },

    [breakpoints.down('sm')]: {
      flexBasis: '100%',
      paddingRight: 25,
      whiteSpace: 'normal',
    },
  },
}));
