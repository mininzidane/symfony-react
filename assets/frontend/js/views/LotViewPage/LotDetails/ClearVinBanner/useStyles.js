import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    borderBottom: '1px solid #E0E0E0',
    paddingBottom: 6,
    gap: '8px',
  },
  copyButton: {
    ...mixins.extraHitbox(7),
    position: 'relative',
    top: 2,
    marginLeft: 5,

    '&:hover': {
      '& svg path': {
        fill: '#999',
      },
    },

    '& svg path': {
      fill: '#BDBDBD',
    },
  },
  copiedTooltip: {
    bottom: -3,
  },
  placeholder: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    borderBottom: '1px solid #E0E0E0',
    paddingBottom: 6,
  },
  button: {
    zIndex: 20,
    flexGrow: 1,
  },
  vinLabel: {
    marginRight: 'auto',
  },
  vin: {
    marginLeft: 7,
    fontWeight: 700,

    '& span': {
      borderBottom: '1px dashed currentColor',
    },
  },
  vinWrap: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 999,
  },
  vinComponent: {
    display: 'flex',
    alignItems: 'center',
  },
}));
