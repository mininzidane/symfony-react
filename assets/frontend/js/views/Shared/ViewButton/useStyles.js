import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  label: {
    display: 'grid',
    gridTemplateColumns: '17px 1fr',
    alignItems: 'center',
    gridGap: '8px',
    marginLeft: -8,
    textTransform: 'uppercase',

    '& svg': {
      width: 17,
      height: 10,
    },
  },
}));
