import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    padding: '25px 25px 25px',
  },
  wrap: {
    maxWidth: '460px',
    marginLeft: 'auto',
    [breakpoints.down('md')]: {
      margin: '25px auto',
    },
  },
  title: {
    ...mixins.font(28, 39, 300),
    marginTop: '0',
    textAlign: 'center',
    marginBottom: '25px',
    marginLeft: '-10px',
    marginRight: '-10px',
    padding: 0,
  },
  login: {
    ...mixins.font(14, 19),
    fontSize: '14px',
    lineHeight: '19px',
    paddingTop: '12px',
    paddingBottom: '8px',
    textAlign: 'center',
    color: '#000',
  },
}));
