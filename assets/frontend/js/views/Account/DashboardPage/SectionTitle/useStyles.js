import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    ...mixins.font(24, 30, 300),
    color: '#333',
    marginBottom: 16,
    margin: 0,

    [breakpoints.down('sm')]: {
      ...mixins.font(16, 20, 700),
      display: 'flex',
      justifyContent: 'space-between',

      '& button': {
        fontWeight: 400,
      },
    },
  },
}));
