import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  ymm: {
    ...mixins.font(12, 16, 400),
    color: '#999999',
    marginBottom: -16,

    [breakpoints.down('sm')]: {
      marginBottom: 0,
    },
  },
  toggleWrap: {
    textAlign: 'right',
    padding: [[2, 0, 6]],
    position: 'absolute',
    top: -24,
    width: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 20,
    display: 'grid',
    placeItems: 'center',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    marginTop: '0 !important',
    padding: 14,
  },
  notification: {
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    maxWidth: '100%',
    width: 340,
  },
  notificationHeader: {
    backgroundColor: '#2158F5',
    display: 'flex',
    alignItems: 'center',
    padding: [[0, 20]],
    height: 42,
    fontWeight: 700,
    color: '#FFFFFF',
  },
  notificationBody: {
    padding: [[14, 20, 20]],
  },
  notificationCta: {
    marginTop: 20,
  },
  notificationMessage: {
    lineHeight: '22px',
  },
  separator: {
    margin: [[5, 0, 10]],
  },
}));
