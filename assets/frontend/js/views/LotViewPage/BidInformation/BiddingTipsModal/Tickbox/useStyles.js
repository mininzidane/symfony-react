import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    marginBottom: '2px',
    '&:last-child': {
      marginBottom: 0,
    },
  },
  tickbox: {
    fontSize: '14px',
    lineHeight: '18px',
    background: '#FFFFFF',
    border: '1px solid #FFFFFF',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.15)',
    borderRadius: '4px',
    color: '#333',
    display: 'flex',
    alignItems: 'stretch',
    cursor: 'pointer',
    '&.is-completed': {
      backgroundColor: '#4A9029',
      border: '1px solid #4A9029',
      color: '#fff',
      cursor: 'default',
      '& $checkboxWrap': {
        backgroundColor: '#287C00',
      },
      '& $checkbox': {
        backgroundColor: 'transparent',
      },
    },
    '&.is-error': {
      backgroundColor: '#FFFFFF',
      border: '1px solid #981B1E',
      '& $checkboxWrap': {
        backgroundColor: '#E9D4D4',
      },
    },
    '&:not(.is-completed):hover': {
      border: '1px solid #4A9029',
      '& $checkboxWrap': {
        backgroundColor: '#DBE9D4',
      },
    },
  },
  error: {
    color: '#981B1E',
    fontSize: '12px',
    lineHeight: '18px',
    paddingBottom: '2px',
    paddingTop: '1px',
  },
  checkboxWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40px',
    backgroundColor: '#DBE9D4',
    borderRadius: '3px 0px 0px 3px',
    minHeight: '40px',
    flexShrink: '0',
  },
  checkbox: {
    width: 18,
    height: 18,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  emptyCheckbox: {
    border: '2px solid #707070',
    borderRadius: 2,
  },
  label: {
    padding: '10px',
    '& button[data-cta]': {
      color: 'inherit',
      borderBottom: '1px dashed currentColor',
      '&:hover': {
        textDecoration: 'none',
      },
    },
    "& div[role='button']": {
      color: 'inherit',
    },
  },
}));
