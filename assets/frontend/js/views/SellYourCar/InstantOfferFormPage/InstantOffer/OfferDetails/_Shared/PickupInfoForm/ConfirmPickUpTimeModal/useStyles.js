import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    overflow: 'auto',
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '11px',
    [breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
  body: {
    overflow: 'initial',
  },
  datePicker: {
    backgroundColor: '#fff',
    color: '#333',
    border: '1px solid #B7B5B3 !important',
    padding: '10px 14px',
    minHeight: '40px',
    fontWeight: '400',
    borderRadius: '4px',
    '&:hover': {
      borderColor: '#000!important',
    },
    '& svg path': {
      fill: '#828282',
    },
    '& input::placeholder': {
      color: '#828282',
      opacity: 1,
      textTransform: 'none',
    },
    '&.is-error': {
      borderColor: '#8C0C0C !important',
    },
  },
  footer: {
    backgroundColor: '#F6F6F6',
    border: 'none',
    paddingTop: 0,
    paddingBottom: 20,
  },
}));
