import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  currentMembershipLabel: {
    margin: 0,
    padding: [[24, 24, 0]],
    ...mixins.font(16, 21, 400),
  },
  header: {
    padding: '16px 24px',
    background: '#A70000',
    color: '#fff',
    marginTop: '50px',
    ...mixins.font(16, 21, 400),

    '&.is-renew': {
      background: '#50BE08',
    },
  },
  radioWrapper: {
    padding: '15px 0',
  },
  content: {
    padding: [[0, 24, 24]],
    marginTop: 9,
  },
}));
