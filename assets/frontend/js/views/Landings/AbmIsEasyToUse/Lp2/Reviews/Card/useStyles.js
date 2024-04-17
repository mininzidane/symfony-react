import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    background: 'white',
    borderRadius: '4px',
    padding: '36px 40px 40px',

    [breakpoints.down('md')]: {
      padding: 20,
    },
  },
  name: {
    display: 'grid',
    gridTemplateColumns: '15px 1fr',
    gridGap: 8,
    fontSize: 16,
    lineHeight: '20px',
    fontWeight: 700,
    alignItems: 'center',
  },
  date: {
    color: '#95989A',
    fontSize: '14px',
    margin: '2px 0px 5px',
    lineHeight: '20px',
  },
  stars: {
    width: 80,
  },
  text: {
    margin: '25px 0 0',
    color: '#000',
    fontSize: '16px',
    lineHeight: '21px',

    [breakpoints.down('md')]: {
      marginTop: 25,
    },
  },
}));
