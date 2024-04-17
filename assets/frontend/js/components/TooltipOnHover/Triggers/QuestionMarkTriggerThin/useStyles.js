import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'inline-block',
    alignSelf: 'center',
    verticalAlign: 'middle',
    position: 'relative',

    '&::before': {
      content: "''",
      cursor: 'pointer',
      position: 'absolute',
      top: -5,
      bottom: -5,
      right: -10,
      left: -10,
    },

    '&:hover, button.is-active &': {
      '& circle': {
        stroke: '#2158F5',
        fill: '#2158F5',
      },

      '& path': {
        fill: '#fff',
      },
    },

    '& circle': {
      stroke: '#757575',
      transition: 'all .15s ease',
    },

    '& path': {
      fill: '#757575',
      transition: 'all .15s ease',
    },
  },
}));
