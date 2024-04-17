import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  form: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridGap: '20px',
    alignItems: 'flex-start',
    paddingBottom: '4px',
    [breakpoints.down(1480)]: {
      gridTemplateColumns: '1fr 1fr 1fr',
    },
    [breakpoints.down('lg')]: {
      gridTemplateColumns: '1fr 1fr',
    },
  },
  column: {
    display: 'grid',
    gridAutoColumns: '1fr',
    gridGap: '10px',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '19px',
    color: '#333333',
  },
  fieldGroup: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '10px',
  },
  tickbox: {
    minHeight: '40px',
    paddingTop: 4,
    [breakpoints.down('sm')]: {
      minHeight: 'auto',
    },
    '& .tickbox label': {
      fontSize: '14px',
    },
  },
  tickboxInline: {
    paddingTop: 4,
    '& .tickbox label': {
      fontSize: '14px',
    },
  },
  inputLabel: {
    ...mixins.font(14, 19),
    paddingBottom: '6px',
    color: '#4b5158',
  },
  contactInformation: {
    [breakpoints.down(1480)]: {
      gridRow: '1/3',
    },
  },
  address: {},
  mailingAddress: {
    [breakpoints.down(1480)]: {
      gridColumn: 2,
    },
  },
  acpSettings: {
    [breakpoints.down(1480)]: {
      gridColumn: 3,
      gridRow: 1,
    },
    [breakpoints.down('lg')]: {
      gridColumn: 2,
      gridRow: 'auto',
    },
  },
}));
