import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'grid',
    gridGap: 10,
    gridTemplateAreas: `
        "first"
        "last"
        "email"
      `,

    '&.with-phone-number': {
      gridTemplateAreas: `
          "first last"
          "phone phone"
          "email email"
        `,

      [breakpoints.down('xs')]: {
        gridTemplateAreas: `
          "first first"
          "last last"
          "phone phone"
          "email email"
        `,
      },
    },
  },
  firstName: {
    gridArea: 'first',
  },
  lastName: {
    gridArea: 'last',
  },
  phone: {
    gridArea: 'phone',
  },
  email: {
    gridArea: 'email',
    position: 'relative',
  },
}));
