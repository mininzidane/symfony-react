import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    '& > *': {
      marginLeft: 12,
    },
  },
  button: {
    padding: '10px 14px 10px 12px !important',
  },
  buttonLabel: {
    fontSize: 14,
  },
  title: {
    ...mixins.font(12, 20, 700),
    color: '#333',
  },
  paper: {
    padding: 0,
    width: '100vw',
    maxWidth: 'calc(100vw - 28px)',
  },
  trigger: {
    height: 34,
    paddingLeft: 10,
    paddingRight: 10,
  },
  dropdown: {
    padding: 14,
  },
  dropdownButtons: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: 10,
    marginTop: 15,
  },
  dropdownTitle: {
    ...mixins.font(14, 20, 700),
  },
  icon: {
    display: 'grid',
    gridTemplateColumns: '20px 7px',
    alignItems: 'center',
    gridGap: '4px',
  },
}));
