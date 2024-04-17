import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  title: {
    paddingTop: 0,
    paddingBottom: 0,
    display: 'flex',
  },
  content: {
    overflowY: 'auto',
    borderRadius: 3,
  },
  accordionItem: {
    marginBottom: 0,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#2158F5',
    ...mixins.font(16, 20, 700),
    paddingBottom: 9,
    paddingTop: 11,
    backgroundColor: '#F2F2F2',
  },
  headerText: {
    borderBottom: '1px dashed #2158F5',
    paddingBottom: 2,
  },
  arrow: {},
  accordionItemContent: {
    marginTop: 0,
  },
}));
