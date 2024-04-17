import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  ul: {
    display: 'inline-block',
    paddingLeft: 0,
    margin: '20px 0',
    borderRadius: '4px',
  },
  li: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #DDDDDD',
    color: 'inherit',
    float: 'left',
    lineHeight: 1.42857,
    marginLeft: '-1px',
    position: 'relative',

    '&:hover': {
      backgroundColor: '#f4f4f4',
      borderColor: '#DDDDDD',
    },

    '&.active': {
      backgroundColor: '#f4f4f4',
      borderColor: '#DDDDDD',
      color: 'inherit',
      cursor: 'default',
      zIndex: 2,
    },
  },
  button: {
    background: 'inherit',
    boxShadow: 'none',
    border: 'none',
    margin: 0,
    marginBottom: '0 !important',
    padding: '4px 10px',

    '&:hover': {
      boxShadow: 'none',
    },
  },
}));
