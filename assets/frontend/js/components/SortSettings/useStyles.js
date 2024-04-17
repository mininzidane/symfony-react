import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    display: 'inline-flex',
  },
  listItem: {
    padding: [[4, 14]],
    minHeight: 32,

    '&:hover': {
      backgroundColor: '#E4E2E0',
    },

    '&.Mui-selected': {
      backgroundColor: 'transparent',
      color: '#2158F5',
    },
  },
  option: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: 120,
    width: '100%',
    fontSize: 14,

    '& > img': {
      marginLeft: 15,
      width: 15,
      height: 11,
    },
  },
  sortButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#FFF',
    border: '1px solid #BDBDBD',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    boxShadow: '0px 1px 2px transparent, inset 0px 2px 3px transparent',
    height: 30,
    width: 30,
    marginLeft: -1,
    transition: 'all .15s ease',

    '& rect': {
      fill: '#4F4F4F',
      transition: 'all .15s ease',
    },

    '& path': {
      stroke: '#4F4F4F',
      transition: 'all .15s ease',
    },

    '&:hover': {
      background: '#F1F1F8',
      border: '1px solid #2158F5',
      boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2), inset 0px 2px 3px transparent',
      zIndex: 20,

      '& rect': {
        fill: '#2158F5',
      },

      '& path': {
        stroke: '#2158F5',
      },
    },

    '&:active': {
      boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2), inset 0px 2px 3px rgba(33, 88, 245, 0.25)',
    },

    '&.is-asc svg': {
      transform: 'scaleY(-1)',
    },

    '&:not(.is-asc) svg': {
      marginTop: 2,
    },
  },
  label: {
    ...mixins.font(16, 30, 400),
    paddingRight: 6,
    color: '#333',

    '@media(max-width: 1500px)': {
      display: 'none',
    },
  },
}));
