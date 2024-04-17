import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    padding: [[0, 15]],
  },
  header: {
    borderBottom: '1px solid rgba(0,0,0, .2)',
    marginBottom: 20,
    display: 'flex',
  },
  tab: {
    fontWeight: 700,
    fontSize: 18,
    lineHeight: 1.3,
    cursor: 'pointer',
    padding: [[16, 0]],

    '&:not(:last-child)': {
      marginRight: 40,

      [breakpoints.down('md')]: {
        marginRight: 20,
      },
    },
  },
  activeTab: {
    color: '#3145FF',
    position: 'relative',

    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: -1,
      backgroundColor: '#3145FF',
      height: 2,
      left: 0,
      width: '100%',
    },
  },
  title: {
    color: '#3145FF',
    position: 'relative',
    backgroundColor: 'inherit',
  },
  groupTitle: {
    fontWeight: 700,
    marginBottom: 10,
    fontSize: 18,
    lineHeight: 1.3,
    color: '#333',
  },
  group: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: '0 20px',
    marginBottom: 20,
    backgroundColor: '#F1F1F8',

    [breakpoints.down('md')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
  groupColumn: {
    [breakpoints.down('md')]: {
      '&:nth-child(even)': {
        order: 2,
      },
    },
  },
}));
