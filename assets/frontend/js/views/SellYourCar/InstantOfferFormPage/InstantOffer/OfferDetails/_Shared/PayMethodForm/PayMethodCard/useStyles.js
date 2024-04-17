import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    border: '2px solid rgba(255, 255, 255, 0.25)',
    height: '48px',
    display: 'flex',
    position: 'relative',
    boxShadow: '0px 1px 2px rgb(0 0 0 / 20%)',
    alignItems: 'center',
    borderRadius: '4px',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: '0 10px 0 8px',
    '&:hover:not(.is-checked)': {
      borderColor: '#fff',
    },
    '&.is-checked': {
      borderColor: '#2158F5',
      backgroundColor: '#fff',
      '& $circle': {
        borderColor: '#2158F5',
        '&:after': {
          content: '""',
          width: 8,
          height: 8,
          backgroundColor: '#2158F5',
          display: 'block',
          borderRadius: '50%',
        },
      },
      '& $label': {
        color: '#333333',
      },
    },
  },
  label: {
    fontSize: '14px',
    lineHeight: '14px',
    color: '#333',
  },
  circle: {
    width: '16px',
    border: '2px solid #BDBDBD',
    height: '16px',
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    borderRadius: '50%',
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: '10px',
  },
  logo: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
  },
  zelle: {
    width: 51,
    height: 22,
    marginBottom: '-2px',
  },
  ach: {
    width: 48,
    height: 24,
    marginBottom: '-1px',
  },
  wireTransfer: {
    width: '57px',
    height: '23px',
    marginRight: '-4px',
    marginBottom: '-3px',
  },
  fedex: {
    width: '51px',
    height: '15px',
    marginRight: '-2px',
  },
}));
