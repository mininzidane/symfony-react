import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    width: '93%',
    minHeight: '370px',
    backgroundColor: '#FFF1D2',
    padding: '16px 20px 20px',
    borderRadius: '0 4px 4px 0',
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    [breakpoints.down('sm')]: {
      width: '100%',
      borderRadius: '4px 4px 0 0',
      minHeight: 'inherit',
    },
  },
  title: {
    fontSize: '18px',
    lineHeight: '24px',
    fontWeight: '700',
    color: '#333',
    marginBottom: '15px',
  },
  cta: {
    marginTop: 'auto', // marginTop: 16,
    '& svg': {
      marginLeft: 9,
    },
  },
  form: {
    display: 'grid',
    gridGap: '1px',
    gridTemplateColumns: '1fr',
  },
  success: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 'auto',
    height: '100%',
    [breakpoints.down('sm')]: {
      marginTop: 6,
    },
  },
  successTitle: {
    fontSize: '18px',
    lineHeight: '29px',
    fontWeight: 700,
    color: '#333',
    marginBottom: 2,
    marginTop: 5,
    textAlign: 'center',
  },
  desc: {
    fontSize: '14px',
    lineHeight: '19px',
    color: '#333',
    textAlign: 'center',
    marginBottom: 32,
  },
  row: {
    color: '#333',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    lineHeight: '16px',
    paddingTop: '10px',
    paddingBottom: '10px',
    width: '100%',
    textAlign: 'right',
    '& div:first-child': {
      paddingRight: 14,
      textAlign: 'left',
    },
    '& + &': {
      borderTop: '1px solid #C4C4C4',
    },
  },
  visibilityToggleRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    wordBreak: 'break-word',
  },
  visibilityToggle: {
    ...mixins.extraHitbox(),
    marginLeft: '10px',
    marginTop: '2px',
    flexShrink: '0',
    width: '21px',
    height: '12px',
    cursor: 'pointer',
    position: 'relative',
    opacity: 0.5,
    '&.is-visible': {
      opacity: 1,
    },
  },
  secureServices: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '12px',
    marginBottom: '-5px',
    // marginTop: "auto",
    '& img': {
      margin: '0 7px',
      display: 'block',
    },
  },
  container: {
    marginTop: 10,
    marginBottom: 10,
    display: 'grid',
    gridGap: '10px',
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
  },
}));
