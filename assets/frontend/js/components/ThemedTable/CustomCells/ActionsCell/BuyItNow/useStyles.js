import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: 8,
    textAlign: 'center',
    paddingTop: 10,
  },
  buyItNowLink: {
    ...mixins.font(13, 16, 400),
    color: '#226900',
    textAlign: 'center',
  },
  buyItNowButton: {
    paddingLeft: '10px !important',
    paddingRight: '10px !important',
  },
}));
