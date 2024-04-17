import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, isMobileView }) => ({
  content: {
    backgroundColor: '#FFFFFF',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,

    [breakpoints.down(isMobileView ? 'xl' : 'lg')]: {
      gridTemplateColumns: '1fr',
      borderTopRightRadius: 4,
    },
  },
  form: {
    padding: [[44, 30]],

    [breakpoints.down(isMobileView ? 'xl' : 'lg')]: {
      margin: 0,
      padding: [[24, 14]],
    },
  },
  complete: {
    backgroundColor: '#FFF1C3',
    borderBottomRightRadius: 4,

    [breakpoints.down(isMobileView ? 'xl' : 'lg')]: {
      borderBottomLeftRadius: 4,
    },
  },
}));
