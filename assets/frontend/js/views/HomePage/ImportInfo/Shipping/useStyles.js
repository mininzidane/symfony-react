import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    paddingBottom: 25,

    [breakpoints.down('sm')]: {
      paddingBottom: 30,
    },
  },
  subtilte: {
    maxWidth: 820,
    textAlign: 'center',
    fontSize: 18,
    lineHeight: '24px',
    fontWeight: 400,
    margin: [[10, 'auto', 0]],

    [breakpoints.down('sm')]: {
      fontSize: 16,
      lineHeight: '21px',
    },
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginTop: 25,
    minHeight: 286,

    [breakpoints.down('md')]: {
      justifyContent: 'center',
      minHeight: 0,
    },
  },
  card: {
    width: 410,
    padding: [[18, 30, 30, 30]],

    [breakpoints.down('sm')]: {
      width: '100%',
    },

    [breakpoints.down('xs')]: {
      padding: [[18, 14, 22, 14]],
    },
  },
  cardTitle: {
    display: 'flex',
    color: '#7F7F80',
    justifyContent: 'space-between',
    fontSize: 12,
    fontWeight: 700,
    lineHeight: '18px',
    paddingBottom: 15,
    borderBottom: '1px solid #c4c4c4',
  },
  arrow: {
    width: 32,
  },
  cardRow: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 32px 1fr 90px',
    alignItems: 'center',
    marginTop: 21,
    color: '#000',
  },
  price: {
    whiteSpace: 'nowrap',
    textAlign: 'right',
  },
  city: {
    paddingRight: '16%',
  },
  port: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    paddingLeft: '16%',
  },
}));
