import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: 2,
    padding: 4,
    backgroundColor: '#D1D1D1',
    borderRadius: 8,

    '& > div:first-child > div > div': {
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
    },

    '& > button:last-child': {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
  },
  selectsWrap: {
    backgroundColor: '#FFF',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: 2,
    position: 'relative',

    '&::after': {
      content: '""',
      position: 'absolute',
      top: 10,
      left: 'calc(50% - 1px)',
      width: 1,
      height: 28,
      backgroundColor: '#B3B3B3',
    },
  },
  submitCta: {
    height: 48,
  },
}));
