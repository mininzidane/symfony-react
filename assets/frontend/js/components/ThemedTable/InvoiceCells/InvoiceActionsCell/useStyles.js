import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'grid',
    minWidth: '160px',
    placeItems: 'center',
    gridTemplateColumns: '1fr',
    gap: '4px',
  },
  mobileLabelWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  mobileLabel: {
    fontWeight: 400,
  },
  mobileActions: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(0, calc(50vw - 36px)))',
    justifyContent: 'end',
    width: '100%',
    gridGap: 16,
    padding: [[10, 0, 14]],
  },
}));
