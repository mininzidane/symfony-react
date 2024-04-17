import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  icon: {
    ...mixins.flex('', 'center'),
    flexShrink: 0,
    marginRight: ({ gap }) => gap,

    '&:before': {
      content: "'A'",
      visibility: 'hidden',
      width: 0,
    },
  },
}));
