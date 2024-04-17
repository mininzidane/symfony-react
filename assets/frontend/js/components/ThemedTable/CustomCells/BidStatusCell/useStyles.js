/* eslint-disable no-dupe-keys */
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: ({ theme }) => ({
    ...mixins.font(14, 20, 700),
    display: 'inline-block',
    padding: [[0, 5]],
    borderRadius: 4,
    textTransform: 'uppercase',
    color: '#828282',
    backgroundColor: '#F1F1F8',
    textAlign: 'center',

    ...(theme === 'high_bidder' && {
      backgroundColor: '#E9F0E6',
      color: '#4A9029',
    }),

    ...(theme === 'outbid' && {
      backgroundColor: '#B00000',
      color: '#FFFFFF',
    }),

    ...(theme === 'sealed' && {
      backgroundColor: '#004979',
      color: '#FFFFFF',
    }),

    ...(theme === 'awaiting_approval' && {
      backgroundColor: '#E69F02',
      color: '#FFFFFF',
    }),

    ...(theme === 'awaiting_seller_response' && {
      backgroundColor: '#FFF8E9',
      color: '#E69F02',
    }),

    ...(theme === 'seller_countered' && {
      backgroundColor: '#F1E8E7',
      color: '#B00000',
    }),

    ...(theme === 'you_won' && {
      backgroundColor: '#4A9029',
      color: '#FFFFFF',
    }),
  }),
}));
