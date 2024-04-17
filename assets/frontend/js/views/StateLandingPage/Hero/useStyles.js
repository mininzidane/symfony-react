import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    overflow: 'hidden',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    padding: [[55, 0]],

    [breakpoints.only('lg')]: {
      backgroundPosition: ({ state }) => (state === 'texas' ? '37%' : 'center'),
    },

    [breakpoints.down('md')]: {
      padding: [[40, 0, 45]],
    },

    [breakpoints.down('sm')]: {
      paddingTop: 30,
      paddingBottom: 25,
    },
  },
  statesImg: ({ state }) => {
    const states = {
      florida: {
        position: 'absolute',
        top: -880,
        right: -380,
        height: 'auto',
        maxWidth: 'none',
        [breakpoints.down('lg')]: {
          top: -900,
          right: -385,
        },
        [breakpoints.down('md')]: {
          height: 1170,
          top: -750,
          right: -300,
        },
        [breakpoints.down('sm')]: {
          height: 340,
          top: -250,
          right: -75,
        },
      },
      texas: {
        position: 'absolute',
        top: -165,
        right: -405,
        height: 'auto',
        maxWidth: 'none',
        [breakpoints.down('lg')]: {
          top: -165,
          right: -450,
        },
        [breakpoints.down('md')]: {
          height: 485,
          top: -130,
          right: -305,
        },
        [breakpoints.down('sm')]: {
          height: 222,
          top: -140,
          right: -135,
        },
      },
      california: {
        position: 'absolute',
        top: -115,
        left: 960,
        height: 'auto',
        maxWidth: 'none',
        [breakpoints.down('lg')]: {
          height: 770,
          top: 2,
          left: 803,
        },
        [breakpoints.down('md')]: {
          height: 580,
          top: -60,
          left: 540,
        },
        [breakpoints.down('sm')]: {
          top: -75,
          left: 'auto',
          right: -320,
          height: 222,
        },
      },
    };

    return states[state];
  },
  container: {
    display: 'flex',
    position: 'relative',
    alignItems: 'flex-start',
  },
  text: {
    zIndex: 1,
    color: 'white',
    lineHeight: '50px',

    [breakpoints.up('xl')]: {
      fontSize: ({ state }) => {
        const states = {
          florida: 32,
          texas: 36,
          california: 32,
        };

        return states[state];
      },
    },

    [breakpoints.down('lg')]: {
      fontSize: 30,
    },

    [breakpoints.down('md')]: {
      fontSize: 28,
      lineHeight: '44px',
    },

    [breakpoints.down('sm')]: {
      fontSize: 20,
      lineHeight: '36px',
    },

    [breakpoints.down('xs')]: {
      fontSize: 15,
      lineHeight: '30px',
    },

    '& ul': {
      margin: 0,
      padding: 0,
    },

    '& li': {
      listStyleType: 'none',
      paddingLeft: 40,
      textShadow: '1px 3px 6px rgba(0, 0, 0, 0.35)',

      [breakpoints.down('sm')]: {
        paddingLeft: 20,
      },

      '&:before': {
        content: "''",
        float: 'left',
        display: 'list-item',
        listStyleType: 'disc',
        listStylePosition: 'inside',
        width: 40,
        marginLeft: -40,

        [breakpoints.down('sm')]: {
          width: 20,
          marginLeft: -20,
        },
      },

      '&:last-child': {
        paddingRight: 100,

        [breakpoints.down('lg')]: {
          paddingRight: 0,
        },
      },

      '&:not(:last-child)': {
        marginBottom: 24,

        [breakpoints.down('md')]: {
          marginBottom: 10,
        },

        [breakpoints.down('sm')]: {
          marginBottom: 0,
        },
      },
    },
  },
  title: {
    marginBottom: 30,
    fontWeight: 700,
    textShadow: '1px 3px 6px rgba(0, 0, 0, 0.35)',

    [breakpoints.up('xl')]: {
      fontSize: ({ state }) => {
        const states = {
          florida: 44,
          texas: 50,
          california: 44,
        };

        return states[state];
      },
    },

    [breakpoints.down('lg')]: {
      fontSize: 40,
      marginBottom: 24,
    },

    [breakpoints.down('md')]: {
      fontSize: 38,
      marginBottom: 20,
    },

    [breakpoints.down('sm')]: {
      paddingRight: 100,
      fontSize: 32,
      marginBottom: 20,
    },

    [breakpoints.down('xs')]: {
      fontSize: 24,
      marginBottom: 15,
    },
  },
  form: {
    zIndex: 1,

    [breakpoints.up('lg')]: {
      maxWidth: 430,
      marginRight: 45,
    },

    [breakpoints.down('lg')]: {
      marginRight: 30,
    },

    [breakpoints.down('md')]: {
      display: 'none',
    },
  },
}));
