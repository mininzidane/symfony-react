import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',

    [breakpoints.down('sm')]: {
      '&:not(:last-child)': {
        marginBottom: 40,
      },
    },
  },
  imgWrapper: {
    backgroundColor: '#f0f0f7',
    width: 128,
    height: 128,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: [[0, 'auto', 15]],
  },
  title: {
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: 1.4,
    color: '#000',
    maxWidth: 200,
    margin: [[0, 'auto', 6]],
  },
  description: {
    fontSize: '14px',
    lineHeight: 1.4,
    maxWidth: 200,
    margin: [[0, 'auto']],
    color: '#000',
  },
}));
