import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    position: 'relative',
    listStyle: 'none',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',

    '&::after': {
      content: "''",
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: -6,
      right: -6,
    },

    '&:hover, &.is-active': {
      '& $toggle': {
        color: '#333333',

        '& path': {
          fill: '#333333',
        },

        '&::before': {
          display: 'block',
        },
      },
    },
    '&.is-active': {
      pointerEvents: 'none',
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

    '&:hover': {
      textDecoration: 'none',
    },

    '&::before': {
      display: 'none',
      content: "''",
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#F2F2F2',
      margin: [[-2, -6]],
      borderRadius: 4,
    },
  },
  label: {
    zIndex: 20,
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
  },
  abmInventory: {
    '&:hover': {
      '& a': {
        color: '#FFF1D3',
      },

      '& span': {
        backgroundColor: '#FFF1D3',
      },
    },

    '&:active': {
      '& a': {
        color: '#E69F03',
      },

      '& span': {
        backgroundColor: '#E69F03',
      },
    },

    '& a': {
      color: '#FDB81D',
      fontWeight: 700,
      textDecoration: 'none',
      whiteSpace: 'nowrap',
      display: 'inline-flex',
      alignItems: 'center',
    },

    '& span': {
      backgroundColor: '#FDB81D',
      borderRadius: 20,
      color: '#000000',
      padding: [[1, 4]],
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      fontSize: 10,
      marginLeft: 5,
    },
  },
}));
