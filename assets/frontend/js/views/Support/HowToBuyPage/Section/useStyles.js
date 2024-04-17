import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    ...mixins.font(16, 24),
    '& ul': {
      ...mixins.font(14, 22),
      margin: '8px 0 0',
      paddingLeft: '14px',
      listStyle: 'none',
      '& li': {
        marginTop: '9px',
        '&:first-child': {
          marginTop: 0,
        },
        '&:before': {
          content: '"\\2022"',
          color: '#2158F5',
          fontWeight: 'bold',
          display: 'inline-block',
          width: '1em',
          marginLeft: '-1em',
        },
      },
    },
  },
}));
