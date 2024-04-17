import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '425px 1fr',
    gridGap: 40,
    paddingTop: 25,

    [breakpoints.down('lg')]: {
      gridGap: 25,
    },

    [breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
      paddingTop: 20,
    },
  },
  form: {
    [breakpoints.down('md')]: {
      order: 2,
    },
  },
  caption: {
    fontSize: 24,
    lineHeight: 1.5,
    paddingBottom: 15,

    [breakpoints.down('sm')]: {
      fontSize: 18,
      paddingBottom: 10,
    },
  },
  subCaption: {
    ...mixins.font(18, 24, 700),

    [breakpoints.down('sm')]: {
      ...mixins.font(14, 20),
    },
  },
  tables: {
    display: 'grid',
    gridGap: 20,
    marginTop: -5,
  },
  mobileWrap: {
    '& > div': {
      boxShadow: 'none !important',
      border: '1px solid #E0E0E0',
    },
  },
  tableButton: {
    [breakpoints.down('sm')]: {
      minWidth: 170,
      margin: [[4, 0]],
    },
  },
  captionGrid: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  captionToggle: {
    fontSize: 16,

    [breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
}));
