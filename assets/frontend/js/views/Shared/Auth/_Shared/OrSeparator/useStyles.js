import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    ...mixins.flex('center', 'center'),
    margin: [[20, 0]],

    '& > span': {
      ...mixins.font(10, 14),
      color: '#999999',
      margin: [[0, 12]],
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
    },

    '&::after, &::before': {
      content: '""',
      width: '100%',
      height: 1,
      background: '#C4C4C4',
    },
  },
}));
