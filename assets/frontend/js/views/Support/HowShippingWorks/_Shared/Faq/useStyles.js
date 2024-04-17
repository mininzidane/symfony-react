import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    backgroundColor: '#EAEAEE',
    padding: [[50, 0]],
  },
  title: {
    fontSize: '32px',
    lineHeight: 'normal',
    fontWeight: 300,
    textAlign: 'center',
    color: '#2B2D38',
    margin: 0,
  },
  subtitle: {
    fontSize: '18px',
    lineHeight: 'normal',
    fontWeight: 400,
    margin: '5px 0 0',
    color: '#8189A9',
    marginBottom: 30,
    textAlign: 'center',
  },
  bottomSubtitle: {
    fontSize: '16px',
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
  item1: {
    display: 'flex',
    flexDirection: 'column',
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
  },
  content: {
    fontSize: '14px',
    lineHeight: '24px',
    paddingBottom: 10,
    marginTop: 0,
  },
}));
