import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  title: {
    ...mixins.font(18, 26, 700),
    paddingRight: 40,
    marginBottom: 9,

    [breakpoints.down('sm')]: {
      paddingRight: 34,
    },
  },
  message: {
    ...mixins.font(16, 21, 400),

    '& p': {
      fontSize: 'inherit',
      lineHeight: 1.25,
      marginBottom: 0,

      '&:empty': {
        minHeight: '1em',
      },
    },

    '& ul, ol': {
      paddingInlineStart: 40,
    },

    '& ul': {
      listStyle: 'initial',
    },

    '& ol': {
      listStyle: 'decimal',
    },
  },
  contacts: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px 18px',
    marginTop: 17,

    '& > div': {
      [breakpoints.down('sm')]: {
        width: '100%',
      },
    },
  },
}));
