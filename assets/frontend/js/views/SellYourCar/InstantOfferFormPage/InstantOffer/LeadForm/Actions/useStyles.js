import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  content: {
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '14px',
    display: 'flex',
    padding: '16px 14px',
    borderRadius: '6px',
    backgroundColor: '#F1F1F8',
    [breakpoints.down('sm')]: {
      marginTop: '0',
    },
    '&.is-upload-car-pictures': {
      [breakpoints.down('xs')]: {
        flexWrap: 'wrap',
        justifyContent: 'center',
      },
    },
  },
  descContent: {
    width: '254px',
    display: 'flex',
    flexDirection: 'column',
  },
  uploadTitle: {
    fontSize: '16px',
    lineHeight: '24px',
    textAlign: 'left',
    color: '#333333',
    fontWeight: 700,
    margin: 0,
    [breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
  uploadDesc: {
    fontSize: '14px',
    lineHeight: '24px',
    textAlign: 'left',
    color: '#828282',
    fontWeight: 400,
    margin: 0,
    [breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
  btnBack: {
    width: '100%',
  },
  btnContinue: {
    width: '100%',
    minWidth: '318px',
    padding: '0 14px',
    [breakpoints.down('sm')]: {
      minWidth: '198px',
    },
  },
  btnSave: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  btnAddCarPhotos: {
    margin: '24px 0 12px 0',
    width: '230px',
    [breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  agreement: {
    fontSize: '11px',
    lineHeight: '16px',
    textAlign: 'center',
    color: '#828282',
    padding: '0 14px 14px',
  },
}));
