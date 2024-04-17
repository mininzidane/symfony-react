import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    position: 'relative',
    borderTop: '1px solid #E1E1E1',

    '&:hover': {
      backgroundColor: '#EEF2FF',
      boxShadow: 'inset 0 0 0 3px #FFF',

      '& $methodCaption': {
        color: '#2158F5',
      },
    },

    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      border: '2px solid transparent',
      transition: 'all .1s ease',
      pointerEvents: 'none',
      zIndex: 20,
    },

    '&.is-active': {
      backgroundColor: '#FCFAEC',

      '& $methodCaption': {
        color: '#2158F5',
      },

      '&::before': {
        borderColor: '#2158F5',
      },
    },

    '&:first-child::before': {
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
    },

    '&:first-child': {
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,

      '&::before': {
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
      },
    },
  },
  trigger: {
    paddingLeft: 24,
    paddingRight: 24,
    minHeight: 60,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    position: 'relative',

    '&.is-active': {
      pointerEvents: 'none',
    },

    '& div': {
      '&:first-child': {
        marginRight: 16,

        [breakpoints.down('sm')]: {
          marginRight: 8,
        },

        '& svg': {
          display: 'block',
        },
      },

      '&:last-child': {
        marginLeft: 'auto',
      },
    },

    '&:hover': {
      '& $radioButton rect': {
        stroke: '#2158F5',
      },
    },

    [breakpoints.down('sm')]: {
      minHeight: 48,
      paddingLeft: 14,
      paddingRight: 14,
    },
  },
  radioButton: {
    '& rect': {
      stroke: '#CECFD0',
      transition: 'all .1s ease',
    },
    '& circle': {
      stroke: '#CECFD0',
      fill: '#CECFD0',
      opacity: 0,
      transition: 'all .1s ease',
    },

    '&.is-active': {
      '& rect': {
        stroke: '#2158F5',
      },
      '& circle': {
        stroke: '#2158F5',
        fill: '#2158F5',
        opacity: 1,
      },
    },
  },
  cardFormWrap: {
    marginTop: 0,
    borderRadius: 0,
    padding: [[0, 24, 24]],
    boxShadow: 'none !important',
    backgroundColor: '#FCFAEC',

    [breakpoints.down('sm')]: {
      padding: [[0, 14, 18]],
    },
  },
  cardForm: {
    [breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      gridGap: 12,
    },
  },
  wtDescription: {
    padding: [[0, 14, 18]],
    lineHeight: '20px',
  },
  methodCaption: {
    color: '#333',
    ...mixins.font(18, 24, 400),
    transition: 'all .1s ease',
    textAlign: 'left',

    [breakpoints.down('sm')]: {
      ...mixins.font(14, 20),
    },
  },
  multiLogo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    '& > img:first-child': {
      margin: [[0, 15, 0]],
    },
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-end',
      '& > img:first-child': {
        margin: [[0, 0, 6]],
      },
    },
  },
  logo: {
    marginLeft: 'auto',
  },
}));
