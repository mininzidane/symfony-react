import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    position: 'relative',
    listStyle: 'none',
    height: '100%',
    display: 'flex',
    alignItems: 'center',

    '&:hover': {
      [breakpoints.up('md')]: {
        '& $dropdownContainer': {
          visibility: 'visible',
          opacity: 1,
        },

        '& $toggle': {
          backgroundColor: '#FFF',
          color: '#333333',

          '& path': {
            fill: '#333333',
          },

          '& circle': {
            stroke: '#333333',
          },
        },
      },
    },
  },
  toggle: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#FFF',
    fontSize: 14,
    lineHeight: '22px',
    fontWeight: 400,
    border: '1px solid #FFFFFF',
    borderRadius: '6px',
    paddingLeft: 10,
    paddingRight: 10,
    cursor: 'pointer',
    transition: 'all .15s ease',

    [breakpoints.down('sm')]: {
      paddingRight: 4,
      paddingLeft: 4,
      borderColor: 'transparent',
    },

    '&.is-shown': {
      backgroundColor: '#FFF',
      color: '#333333',

      '& path': {
        fill: '#333333',
      },

      '& circle': {
        stroke: '#333333',
      },
    },

    '& *': {
      pointerEvents: 'none',
    },

    '& path': {
      transition: 'all .15s ease',
    },

    '& circle': {
      transition: 'all .15s ease',
    },

    '&::after': {
      content: "''",
      position: 'absolute',
      top: -6,
      bottom: -6,
      left: -6,
      right: -6,
    },
  },
  label: {
    margin: [[0, 6]],
    zIndex: 20,
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
  },
  questionMark: {
    '& path': {
      fill: '#FFF',
    },
    '& circle': {
      circle: '#FFF',
    },
  },
  triangle: {
    '& path': {
      fill: '#FFF',
    },
  },
  dropdownContainer: {
    visibility: 'hidden',
    opacity: 0,
    position: 'absolute',
    top: 'calc(100% + 14px)',
    right: 0,
    boxShadow: '0 2px 3px rgb(0 0 0 / 25%)',
    borderRadius: '4px',
    backgroundColor: '#1D1E20',
    padding: [[12, 14, 16]],
    color: '#FFF',
    minWidth: 300,
    transition: 'all .15s ease',

    '&.is-shown': {
      visibility: 'visible',
      opacity: 1,
    },

    [breakpoints.down('xs')]: {
      width: 'calc(100vw - 28px)',
    },

    '&::before': {
      content: '""',
      position: 'absolute',
      top: -6,
      right: 40,
      width: 12,
      height: 12,
      backgroundColor: '#1D1E20',
      transform: 'rotate(45deg)',
    },

    '&::after': {
      content: '""',
      position: 'absolute',
      top: -14,
      right: -20,
      left: -42,
      bottom: -100,

      [breakpoints.down('xs')]: {
        display: 'none',
      },
    },
  },
  containerInner: {
    position: 'relative',
    zIndex: 20,
  },
  header: {
    display: 'grid',
    gridTemplateColumns: '20px 1fr 20px',
    gridGap: 8,
  },
  title: {
    ...mixins.font(14, 18, 400),
    color: '#FFF',
    textAlign: 'center',
  },
  section: {
    marginTop: 14,
  },
  backButton: {
    ...mixins.extraHitbox(),
    display: 'flex',
    height: 14,
    position: 'relative',
    marginTop: 2,

    '&.is-hidden': {
      opacity: 0,
      pointerEvents: 'none',
    },

    '&:hover img': {
      opacity: 0.7,
    },
  },
  zendeskTrigger: {
    padding: '5px 10px 8px !important',
    marginTop: 5,
  },
}));
