import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    backgroundColor: '#FFFFFF',
    boxShadow: '0px -1px 1px rgba(0, 0, 0, 0.05)',
  },
  grid: {
    minHeight: 56,
    display: 'flex',
    alignItems: 'center',

    '& > div': {
      '&:first-child, &:last-child': {
        paddingLeft: 30,
        paddingRight: 30,

        [breakpoints.down('md')]: {
          paddingLeft: 14,
          paddingRight: 14,
        },
      },
    },
  },
  hours: {
    ...mixins.font(16, 20, 400),
    width: 'auto',
    minWidth: '34%',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 32,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#828282',
    whiteSpace: 'nowrap',
  },
  dot: {
    width: 6,
    height: 6,
    flexShrink: 0,
    borderRadius: '50%',
    backgroundColor: '#BB2200',
    marginRight: 6,
    marginTop: 2,

    '&.is-open': {
      backgroundColor: '#4A9029',
    },
  },
  title: {
    ...mixins.font(16, 20, 700),
    display: 'grid',
    gridTemplateColumns: '28px 1fr',
    gridGap: 12,
    alignItems: 'center',
  },
  flag: {
    borderRadius: 2,
  },
  officeInfo: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  line: {
    width: 1,
    height: 32,
    backgroundColor: '#C4C4C4',
    flexShrink: 0,

    '&:first-child': {
      marginRight: 20,
    },

    '&:last-child': {
      marginLeft: 20,
    },

    [breakpoints.down('md')]: {
      display: 'none',
    },
  },
  hoursText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    display: 'grid',
    gridTemplateColumns: '1fr 10px',
    gridGap: 8,
    alignItems: 'center',
    marginLeft: 40,
    marginTop: 2,
  },
  label: {
    ...mixins.font(14, 20, 400),
    borderBottom: '1px dashed #90ACFA',
    color: '#2158F5',
  },
  arrow: {
    marginTop: 2,

    '&.is-open': {
      transform: 'scaleY(-1)',
    },
  },
  mobileBar: {
    padding: [[18, 14]],
  },
}));
