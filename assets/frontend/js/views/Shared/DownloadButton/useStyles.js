import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  label: {
    display: 'grid',
    gridTemplateColumns: '17px 1fr',
    alignItems: 'center',
    gridGap: '6px',
    '& svg': {
      width: 17,
      height: 18,
      marginRight: 6,
      marginBottom: -3,
      marginTop: -3,
    },
  },
}));
