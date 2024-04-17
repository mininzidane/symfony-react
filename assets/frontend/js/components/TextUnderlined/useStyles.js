import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: ({ hasInitialLine }) => ({
    color: '#2158F5',
    textDecoration: hasInitialLine ? 'underline' : 'none',

    '&:hover': {
      textDecoration: hasInitialLine ? 'none' : 'underline',
    },

    'button.is-active &': {
      textDecoration: 'underline',
    },
  }),
}));
