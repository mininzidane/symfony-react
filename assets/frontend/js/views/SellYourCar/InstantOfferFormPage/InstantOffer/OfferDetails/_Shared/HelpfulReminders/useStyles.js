import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    padding: [[22, 14]],
    maxWidth: 988,
    margin: '0 auto',
    borderTop: '1px solid rgba(130,130,130,0.21)',
  },
  title: {
    fontSize: '28px',
    lineHeight: 'normal',
    fontWeight: 400,
    textAlign: 'center',
    color: '#333333',
    margin: 0,
  },
  subtitle: {
    fontSize: '16px',
    lineHeight: '21px',
    fontWeight: 400,
    margin: '5px 0 0',
    color: '#828282',
    marginBottom: 30,
    textAlign: 'center',
  },
  bottomSubtitle: {
    fontSize: '14px',
    lineHeight: '18px',
    marginBottom: 0,
  },
  accordionItem: {
    position: 'relative',
    padding: '20px 50px 10px 20px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px rgba(0, 0, 0, 0.25)',
    border: '1px solid rgba(13, 102, 204, 0.05)',
    borderRadius: 4,
    textAlign: 'left',
    marginLeft: 'auto',
    marginRight: 'auto',
    cursor: 'pointer',
    userSelect: 'none',
  },
  expanded: {
    '& $arrow': {
      color: '#2158F5',
    },
  },
  arrow: {
    position: 'absolute',
    right: 20,
    color: '#C4C4C4',
  },
  header: {
    fontSize: '18px',
    lineHeight: 'normal',
    fontWeight: 700,
    marginBottom: 9,
    color: '#333',
  },
  content: {
    fontSize: '14px',
    lineHeight: '24px',
    paddingBottom: 10,
    marginTop: 0,
    color: '#333',
  },
}));
