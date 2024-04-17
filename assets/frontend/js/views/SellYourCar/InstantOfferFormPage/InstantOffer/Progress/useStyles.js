import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    height: 18,
    backgroundColor: '#333333',
    boxShadow: 'inset 0px 1px 2px rgba(0, 0, 0, 0.25)',
    padding: 2,
    '& div': {
      height: '100%',
      background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%), #4A9029',
      borderRadius: '1px',
      transition: 'width 250ms ease 0ms',
    },
    [breakpoints.down('sm')]: {
      height: 10,
    },
  },
}));
