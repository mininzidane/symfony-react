import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: '14px',
    marginTop: 14,
  },
  actionsCard: {
    backgroundColor: '#E6ECFD',
    borderRadius: '6px',
    marginLeft: '14px',
    marginRight: '14px',
    color: '#333',
  },
  formInputLabel: {
    paddingBottom: 6,
  },
  formContainer: {
    display: 'flex',
    padding: '6px',
    flexWrap: 'wrap',
    margin: -12,
  },
  inputWrap: {
    flexGrow: '1',
    width: '100%',
    minWidth: 150,
    flexBasis: '0',
    margin: '6px',
  },
  btnWrap: {
    flexGrow: '1',
    minWidth: 'fit-content',
    flexBasis: '0',
    margin: '6px',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: '4px !important',
    width: '100%',
    height: '40px',
    fontSize: '20px',
    lineHeight: '40px',
    fontWeight: '700',
    boxShadow: 'inset 0 0 0 1px #aeb0b5',
    display: 'block',
    textAlign: 'center',
    transition: 'box-shadow 0.2s ease',
    color: '#000',
    '&:hover': {
      boxShadow: 'inset 0 0 0 1px #5d5d5d',
    },
  },
}));
