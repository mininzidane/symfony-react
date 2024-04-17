import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    alignItems: 'center',
    gridGap: 6,
    minWidth: 160,
    padding: '8px 14px',
  },
  label: {
    ...mixins.font(14, 20, 700),
    whiteSpace: 'nowrap',
    textTransform: 'uppercase',
    textAlign: 'center',

    '& span': {
      fontWeight: 400,
    },
  },
}));
