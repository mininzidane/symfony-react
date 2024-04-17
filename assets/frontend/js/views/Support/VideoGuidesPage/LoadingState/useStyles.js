import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  row: {
    display: 'flex',
    justifyContent: 'space-between',

    '&:not(:first-child)': {
      marginTop: 16,
    },
  },
  item: {
    borderRadius: 2,
    height: 15,
    backgroundColor: '#EEE2A1',
    overflow: 'hidden',
    position: 'relative',

    '&.is-circle': {
      borderRadius: '50%',
    },

    '&.is-progress': {
      marginTop: 15,
      height: 12,
      backgroundColor: '#FFF2B1',
      border: '1px solid #EEE2A1',

      '&::after': {
        display: 'none',
      },
    },

    '&::after': {
      content: "''",
      position: 'absolute',
      top: '50%',
      marginTop: -25,
      width: 150,
      height: 150,
      animation: 'loadingContent 1.5s infinite linear',
      backgroundColor: '#7b734b',
      filter: 'blur(50px)',
    },
  },
}));
