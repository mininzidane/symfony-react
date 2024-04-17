import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    width: '100%',
    display: 'grid',
    borderTop: '1px solid #F1F1F8',
    padding: '12px 14px 12px',
    gridGap: '14px',
    justifyContent: 'end',
    gridTemplateColumns: 'repeat(auto-fit, minmax(0, calc(50% - 7px)))',
  },
}));
