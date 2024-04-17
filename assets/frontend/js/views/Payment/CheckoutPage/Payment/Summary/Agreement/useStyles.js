import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    marginTop: 15,
    ...mixins.font(12, 18),
    textAlign: 'center',
  },
  trigger: {
    whiteSpace: 'nowrap',
    color: '#2158F5',
    borderBottom: '1px dashed transparent',
    transition: 'border .2s ease',

    '&.is-active': {
      borderBottomColor: '#2158F5',
    },
  },
}));
