import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    alignItems: 'center',
    gridGap: 6,
    minWidth: 160,
    paddingTop: 3,
  },
  label: {
    ...mixins.font(16, 20, 700),
    whiteSpace: 'nowrap',
    textTransform: 'uppercase',
    textAlign: 'center',

    '& span': {
      fontWeight: 400,
    },
  },
}));
