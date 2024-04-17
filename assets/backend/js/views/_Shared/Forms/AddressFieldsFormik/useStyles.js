import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateAreas: `
      'Address Address'
      'City City'
      'Apartment Apartment'
      'State Zip'
      'Country Country'
      `,
    margin: -5,
    '& > div': {
      margin: 5,
    },
  },
  address: {
    gridArea: 'Address',
  },
  apartment: {
    gridArea: 'Apartment',
  },
  city: {
    gridArea: 'City',
  },
  state: {
    gridArea: 'State',
  },
  zip: {
    gridArea: 'Zip',
  },
  country: {
    gridArea: 'Country',
  },
}));
