import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: ({ total }) => {
    const basis = 100 / (total - 1);

    return {
      position: 'relative',
      ...mixins.flex('between'),

      '& > div': {
        textAlign: 'center',
        padding: [[0, 8]],
        flexBasis: `${basis}%`,
      },

      '& > div:first-child': {
        textAlign: 'left',
        paddingLeft: 0,
        flexBasis: `${basis / 2}%`,
      },

      '& > div:last-child': {
        textAlign: 'right',
        paddingRight: 0,
        flexBasis: `${basis / 2}%`,
      },
    };
  },
}));
