import { makeStyles } from '@material-ui/core/styles';

const colorsMap = {
  pureSale: '#2158F5',
  buyNow: '#226900',
  minimumBid: '#333333',
  onApproval: '#6F130B',
};

const backgroundColorsMap = {
  pureSale: '#E6F1F9',
  buyNow: '#E9F0E6',
  minimumBid: '#FFF1D2',
  onApproval: '#FFE8E8',
};

export default makeStyles(({ mixins }) => ({
  title: ({ type }) => ({
    ...mixins.font(18, 24, 600),

    '& span': {
      display: 'inline-block',
      padding: [[2, 10]],
      borderRadius: 4,
      color: colorsMap[type],
      backgroundColor: backgroundColorsMap[type],
    },
  }),
  subtitle: {
    ...mixins.font(16, 24, 400),
    marginTop: 5,
    color: '#4F4F4F',
  },
}));
