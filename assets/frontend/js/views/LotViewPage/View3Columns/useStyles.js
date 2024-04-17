import { makeStyles } from '@material-ui/core/styles';

const MIN_COLUMN_WIDTH = 500;

export default makeStyles(() => ({
  root: () => ({
    display: 'grid',
    gridTemplateRows: 'repeat(2, minmax(0px, max-content))',
    gridTemplateColumns: `minmax(${MIN_COLUMN_WIDTH}px, 1.5fr) 1fr 1fr`,

    gridTemplateAreas: `
      'Ads Ads Ads'
      'Vehic SaHis SaHis'
      'Vehic Detai Actio'
      'Faq Faq Actio'
      '. . Actio'
      'RelVeh RelVeh RelVeh'
      'MoreAds MoreAds MoreAds'
      `,

    margin: -10,
  }),
  salesHistory: {
    gridArea: 'SaHis',
  },
  vehicle: {
    gridArea: 'Vehic',
    display: 'flex',
    flexDirection: 'column',
  },
  details: {
    gridArea: 'Detai',
    display: 'flex',
    flexDirection: 'column',
  },
  actions: {
    gridArea: 'Actio',
    display: 'flex',
    flexDirection: 'column',
  },
  faq: {
    gridArea: 'Faq',
  },
  ads: {
    gridArea: 'Ads',
  },
  relatedVehicles: {
    gridArea: 'RelVeh',
    maxWidth: '100%',
  },
  moreAds: {
    gridArea: 'MoreAds',
  },
}));
