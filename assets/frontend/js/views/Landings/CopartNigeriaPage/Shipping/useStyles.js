import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    height: 550,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#FFF',

    [breakpoints.down('lg')]: {
      height: 480,
    },

    [breakpoints.down('md')]: {
      padding: [[30, 0, 50]],
      height: 'auto',
      overflow: 'hidden',
    },

    [breakpoints.down('sm')]: {
      padding: [[30, 0, 35]],
    },
  },
  desctopGrid: {
    display: 'grid',
    gridTemplateColumns: '64% 36%',
    gridGap: 15,
  },
}));
