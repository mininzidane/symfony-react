import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    alignItems: 'center',
    gridGap: 8,
    cursor: 'pointer',
  },
  icon: ({ isNext }) => ({
    height: 12,
    width: 12,
    transform: isNext ? 'scaleX(-1)' : null,
  }),
  label: {
    ...mixins.font(14, 20, 400),
    color: '#FFF',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));
