import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto fit-content(0)',
    gridGap: 15,
    fontSize: 14,
    lineHeight: '20px',

    '& strong': {
      fontSize: 16,
      fontWeight: 700,
    },
  },
}));
