import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    borderRadius: 20,
    height: 30,
    paddingLeft: 14,
    paddingRight: 14,
    display: 'inline-flex',
    gridTemplateColumns: '14px 1fr',
    gridGap: 6,
    alignItems: 'center',
    border: '1px solid #89A5F7',
    backgroundColor: '#2158F5',
    color: '#FFFFFF',
    transition: 'all .2s ease',

    '& path': {
      transition: 'all .2s ease',
    },

    '&.is-watched': {
      borderColor: '#FFFFFF',
      backgroundColor: '#FFFFFF',
      color: '#2158F5',

      '&:hover': {
        borderColor: '#89A5F7',
        backgroundColor: '#2158F5',
        color: '#FFFFFF',

        '& path': {
          fill: '#FFFFFF',
        },
      },
    },

    '&:not(.is-watched)': {
      '&:hover': {
        borderColor: '#FFFFFF',
        backgroundColor: '#FFFFFF',
        color: '#2158F5',

        '& path': {
          fill: '#2158F5',
        },
      },
    },
  },
}));
