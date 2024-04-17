import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    padding: [[14, 30]],
    background: '#fff',
    marginLeft: 'calc(50vw - 50%)',
    marginTop: -20,
    zIndex: 2,
    borderTop: '1px solid #C4C4C4',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)',
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gridGap: 40,

    [breakpoints.down('md')]: {
      padding: [[10, 14]],
    },

    [breakpoints.down('sm')]: {
      marginTop: -16,
      gridGap: 15,
    },
  },
  right: {
    display: 'flex',
    gap: '15px',
  },
}));
