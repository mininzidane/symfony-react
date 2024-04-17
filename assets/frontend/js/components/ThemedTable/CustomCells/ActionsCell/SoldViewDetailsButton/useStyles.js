import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: 6,
    minWidth: 160,
    paddingTop: 3,
    fontSize: 14,
    justifyItems: 'center',
  },
  label: {
    ...mixins.font(16, 20, 400),
    whiteSpace: 'nowrap',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
}));
