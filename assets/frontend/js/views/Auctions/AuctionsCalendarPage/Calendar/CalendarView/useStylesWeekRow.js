import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  table: {
    display: 'table',
    border: '1px solid #E0E0E0',
    borderRadius: '4px',
    backgroundColor: '#fff',
    borderCollapse: 'collapse',
    width: '100%',
    tableLayout: 'fixed',
    '& + $table': {
      marginTop: 15,
    },
  },
  th: {
    display: 'table-row',
    backgroundColor: '#E0E0E0',
    height: 48,
    position: 'sticky',
    top: 91,
    '& > div': {
      padding: '1px 10px 2px',
      borderRight: '1px solid #F1F1F8',
      display: 'table-cell',
      verticalAlign: 'middle',
      '&:last-child': {
        borderRight: 'none',
      },
    },
  },
  tr: {
    display: 'table-row',
    borderBottom: '1px solid #D9D9D9',
    '&:last-child': {
      borderBottom: 'none',
    },
    '& > div': {
      display: 'table-cell',
      borderRight: '1px solid #D9D9D9',
      padding: '8px 10px',
      verticalAlign: 'top',
      '&:last-child': {
        borderRight: 'none',
      },
    },
  },
  time: {
    width: 110,
  },
  active: {
    backgroundColor: '#D5DEFA',
    boxShadow: '0px -1px 0px 0px #2158f5 inset',
  },
}));
