import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  border: {
    '& tbody tr': {
      '& td::before': {
        content: '""',
        ...mixins.coverer(),
        pointerEvents: 'none',
      },

      '& td:first-child': {
        '&::before': {
          borderLeft: '1px solid #E0E0E0',
        },
      },

      '& td:last-child': {
        '&::before': {
          borderRight: '1px solid #E0E0E0',
        },
      },

      '&:last-child': {
        '& td::before': {
          borderBottom: '1px solid #E0E0E0',
        },
      },
    },
  },
  hover: {
    '& tbody tr:hover > td': {
      backgroundColor: '#f1f1f1',

      '&::after': {
        opacity: 1,
      },
    },

    '& tbody tr td': {
      '&::after': {
        content: '""',
        ...mixins.coverer(),
        borderTop: '2px solid #2158F5',
        borderBottom: '2px solid #2158F5',
        opacity: 0,
        pointerEvents: 'none',
        transition: 'opacity .15s ease',
      },

      '&:first-child': {
        '&::after': {
          borderLeft: '2px solid #2158F5',
        },
      },

      '&:last-child': {
        '&::after': {
          borderRight: '2px solid #2158F5',
        },
      },
    },
  },
}));
