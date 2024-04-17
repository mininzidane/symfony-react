import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  flexContainer: {
    width: '100%',
    borderBottom: '1px solid rgba(196,196,196,0.3)',
  },
  tab: {
    width: '100%',
    padding: '12px 8px 13px',
    fontSize: '14px',
    margin: '0',
    flexBasis: 'auto',

    '&:not(:last-child)': {
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 12,
        right: 0,
        height: 'calc(100% - 24px)',
        width: 1,
        backgroundColor: '#E7E7E7',
      },
    },
  },
  indicator: {
    height: '3px',
  },
  tabsWrap: {
    margin: [[-14, -14, 14]],
  },
}));
