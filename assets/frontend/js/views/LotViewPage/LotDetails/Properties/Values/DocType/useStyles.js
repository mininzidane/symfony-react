import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  badge: {
    display: 'inline-block',
    textTransform: 'uppercase',
    color: 'white',
    background: '#B00000',
    fontSize: 10,
    lineHeight: '12px',
    fontWeight: 400,
    padding: [[3, 6]],
    borderRadius: 2,
    verticalAlign: 'text-top',
  },
  badgeDark: {
    display: 'block',
    background: '#B00000',
    fontSize: 12,
    lineHeight: '14px',
    textAlign: 'center',
  },
  description: {
    textTransform: 'uppercase',
    fontWeight: 400,
  },
  tooltipTrigger: {
    display: 'inline',
  },
  badgePendingForNDaysLabel: {
    marginRight: 2,
  },
}));
