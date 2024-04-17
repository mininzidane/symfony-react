import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    marginTop: 40,
    marginBottom: 40,
    [breakpoints.down('sm')]: {
      marginTop: 25,
      marginBottom: 25,
    },
  },
  contentWrap: {
    border: '1px solid #b7b7b7',
    padding: '20px',
    borderRadius: '4px',
    backgroundColor: '#FFF',
  },
  content: {
    maxWidth: '1050px',
    margin: '0 auto',
  },
  title: {
    ...mixins.font(44, 44, 300),
    textAlign: 'center',
    color: '#4B5158',
    padding: '20px 0 7px',
    margin: '0 auto 50px',
    [breakpoints.down('md')]: {
      marginBottom: '30px',
    },
    [breakpoints.down('sm')]: {
      marginBottom: '20px',
      padding: '0',
      fontSize: '28px',
      lineHeight: '28px',
    },
  },
  scrollableContent: {
    minHeight: 200,
    height: 'calc(100vh - 510px)',
    overflowY: 'scroll',
    overflowX: 'hidden',
    ...mixins.scrollbar('sm'),
    [breakpoints.down('sm')]: {
      height: 200,
    },
  },
}));
