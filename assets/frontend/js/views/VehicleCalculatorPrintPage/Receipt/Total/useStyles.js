import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    marginTop: 14,
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 16,
    lineHeight: '20px',
    padding: [[7, 20]],
    backgroundColor: '#F6F6F6',
    borderRadius: 4,
    position: 'relative',
    overflow: 'hidden',

    '& > div': {
      zIndex: 2,
    },

    '&::after': {
      content: "''",
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      borderTop: '40px solid #F6F6F6',
    },
  },
}));
