import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'inline-block',
    alignSelf: 'center',
    verticalAlign: 'middle',
    position: 'relative',

    '&::before': {
      content: "''",
      cursot: 'pointer',
      position: 'absolute',
      top: -5,
      bottom: -5,
      right: -10,
      left: -10,
    },

    '&:hover, &.is-active': {
      '& circle': {
        stroke: '#3270B6',
        fill: '#3270B6',
      },

      '& path': {
        fill: '#ffffff',
      },
    },

    '& circle': {
      stroke: '#787878',
      transition: 'all .15s ease',
    },

    '& path': {
      fill: '#787878',
      transition: 'all .15s ease',
    },
  },
}));
