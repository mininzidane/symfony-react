import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    marginTop: 30,

    '& ul li button': {
      color: '#333',

      "&[class*='selected']": {
        fontWeight: 700,
        pointerEvents: 'none',
      },
    },
  },
  advanced: {
    ...mixins.flex('between', 'center'),
    padding: [[8, 20]],
    minHeight: 48,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 1px 2px rgb(0 0 0 / 25%)',

    [breakpoints.down('sm')]: {
      padding: [[8, 0]],

      '& ul': {
        width: '100%',

        '& li:first-child': {
          marginRight: 'auto',
        },

        '& li:last-child': {
          marginLeft: 'auto',
        },
      },
    },

    [breakpoints.down('xs')]: {
      padding: [[8, 4]],
      borderRadius: 0,
    },
  },
  simple: {
    ...mixins.flex('center', 'center'),
    marginTop: 30,
  },
  label: {
    ...mixins.font(14, 16, 400),
    color: '#333',
  },
  itemsPerPage: {
    display: 'inline-flex',
    alignItems: 'center',
    marginLeft: 10,
  },
  separator: {
    width: 1,
    height: 14,
    backgroundColor: '#333',
    margin: [[0, 8]],
  },
}));
