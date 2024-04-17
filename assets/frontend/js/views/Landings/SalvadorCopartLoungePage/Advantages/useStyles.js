import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    backgroundColor: '#E5E5E5',
    color: '#000000',
    padding: [[37, 0, 29]],
    textAlign: 'center',
  },
  advantages: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridGap: '14px 24px',
    maxWidth: '918px',
    margin: '0 auto',
    paddingTop: '30px',

    [breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      gridGap: '14px',
    },
  },
  title: {
    ...mixins.font(24, 36, 400),
    maxWidth: 1062,
    margin: '0 auto',
    marginBottom: '-5px',
    [breakpoints.down('sm')]: {
      ...mixins.font(18, 26, 400),
    },
  },
}));
