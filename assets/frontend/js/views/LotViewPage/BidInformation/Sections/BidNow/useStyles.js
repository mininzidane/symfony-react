import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    backgroundColor: '#E6ECFD',
    borderRadius: 6,
    padding: 14,
    color: '#333333',
  },
  formInputLabel: {
    paddingBottom: 7,
  },
  formContainer: {
    display: 'flex',
    padding: '6px',
    flexWrap: 'wrap',
    margin: -12,
  },
  bidInformationInput: {
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
  inputWrap: {
    marginBottom: '22px',
  },
  link: {
    marginTop: '7px',
  },
  mistypedBid: {
    marginTop: '7px',
    textAlign: 'center',
  },
}));
