import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    height: 18,
    backgroundColor: ({ isHighlighted }) => (isHighlighted ? '#E9E3B5' : '#E0E0E0'),
    borderRadius: 4,
    position: 'relative',
    overflow: 'hidden',

    '&::after': {
      content: "''",
      position: 'absolute',
      top: '50%',
      marginTop: -25,
      width: 150,
      height: 150,
      animation: 'loadingContent 1.5s infinite linear',
      backgroundColor: ({ isHighlighted }) => (isHighlighted ? '#f7f3d9' : '#F8F8F8'),
      filter: 'blur(50px)',
    },
  },
}));
