import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  trigger: {
    ...mixins.font(14, 20, 400),
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    lineHeight: 'inherit',
    display: 'inline-flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    textDecoration: 'none !important',
    backgroundColor: '#FFFFFF',
    height: 30,
    border: '1px solid #BDBDBD',
    borderRadius: 4,
    paddingLeft: 11,
    paddingRight: 30,
    marginRight: '0 !important',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,

    '&:hover': {
      borderColor: '#757575',
    },
  },
  selectArrow: {
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 4,
    top: 13,
    right: 9,
  },
  label: {
    color: '#333333',
  },
}));
