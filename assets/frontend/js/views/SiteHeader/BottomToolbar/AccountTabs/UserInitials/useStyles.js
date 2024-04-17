import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: ({ isActive }) => ({
    position: 'relative',
    bottom: 1,
    width: 22,
    height: 22,
    borderWidth: 1.5,
    borderStyle: 'solid',
    borderColor: isActive ? '#2158F5' : '#333',
    borderRadius: '50%',
    fontSize: 10,
    lineHeight: '20px',
    fontWeight: 700,
    color: isActive ? '#FFFFFF' : '#333',
    textAlign: 'center',
    backgroundColor: isActive ? '#2158F5' : 'transparent',
    marginBottom: '0 !important',
  }),
}));
