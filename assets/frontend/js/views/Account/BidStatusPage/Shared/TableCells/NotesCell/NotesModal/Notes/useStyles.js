import { makeStyles } from '@material-ui/core/styles';
import IcoFileSvg from './img/ico-file.svg';

export default makeStyles(() => ({
  date: {
    color: '#828282',
    fontSize: '12px',
    lineHeight: '16px',
    marginLeft: '8px',
    marginBottom: '2px',
  },
  message: {
    fontSize: '14px',
    lineHeight: '24px',
    backgroundColor: '#219653',
    borderRadius: '4px 4px 0 4px',
    padding: '2px 8px',
    display: 'inline-block',
    position: 'relative',
    color: '#ffffff',
    maxWidth: '70%',
    '&:after': {
      content: '""',
      display: 'block',
      width: '0',
      height: '0',
      borderStyle: 'solid',
      borderWidth: '10px 0 0 10px',
      borderColor: 'transparent transparent transparent #219653',
      position: 'absolute',
      right: -5,
      bottom: 0,
    },
  },
  note: {
    marginTop: 9,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    '&:first-child': {
      marginTop: 0,
    },
    '&.is-employee-response': {
      alignItems: 'flex-start',
      '& $message': {
        backgroundColor: '#E0E0E0',
        borderRadius: '4px 4px 4px 0',
        color: '#000000',
        '&:after': {
          borderWidth: '0 0 10px 10px',
          borderColor: 'transparent transparent #E0E0E0 transparent',
          left: -5,
          right: 'auto',
        },
      },
      '& $file': {
        backgroundColor: '#828282',
        borderColor: '#737373',
      },
    },
  },
  files: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  file: {
    backgroundColor: '#04581B',
    padding: '0 6px',
    border: '1px solid #114C2A',
    boxSizing: 'border-box',
    borderRadius: '2px',
    fontSize: '12px',
    lineHeight: '22px',
    display: 'flex',
    alignItems: 'center',
    color: '#fff',
    marginBottom: '4px',
    marginRight: '4px',
    '&:before': {
      content: '""',
      width: 9,
      height: 12,
      backgroundImage: `url(${IcoFileSvg})`,
      marginRight: 5,
      display: 'block',
    },
  },
}));
