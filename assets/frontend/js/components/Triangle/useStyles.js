import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: ({ size, color }) => ({
    '&.is-vertical': {
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderWidth: `${size}px ${size}px 0 ${size}px`,
      borderColor: `${color} transparent transparent transparent`,

      '&.is-flipped': {
        transform: 'scaleY(-1)',
      },
    },
  }),
}));
