import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  title: {
    ...mixins.font(16, 20, 700),
    display: 'grid',
    gridTemplateColumns: '28px 1fr',
    gridGap: 12,
    alignItems: 'center',
  },
  titleLabel: {
    display: 'flex',
    alignItems: 'center',
  },
  buttons: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: 10,
    padding: [[20, 0]],

    '&.has-border': {
      borderTop: '1px solid #F1F1F8',
      marginTop: 18,
    },
  },
  cta: {
    '& svg': {
      position: 'relative',
      top: 2,
      right: 6,
    },

    '& path, & rect': {
      transition: 'all .2s ease',
    },

    '& path': {
      fill: '#2158F5',
    },

    '& a': {
      color: '#2158F5 !important',
      textDecoration: 'none !important',
      fontWeight: '400 !important',
    },

    '& span': {
      fontWeight: '700 !important',
    },

    '&:hover': {
      '& a': {
        color: '#FFF !important',
      },

      '& path': {
        fill: '#FFF',
      },

      '& rect': {
        '&:first-child': {
          stroke: '#FFF',
        },

        '&:not(:first-child)': {
          fill: '#FFF',
        },
      },
    },
  },
  address: {
    paddingTop: 20,
    borderTop: '1px solid #F1F1F8',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: 15,
  },
  addressSection: {
    display: 'grid',
    gridTemplateColumns: '18px 1fr',
    gridGap: 10,

    '& img': {
      position: 'relative',
      top: 1,
    },
  },
  dot: {
    width: 6,
    height: 6,
    flexShrink: 0,
    borderRadius: '50%',
    backgroundColor: '#BB2200',
    marginLeft: 6,
    marginTop: 3,

    '&.is-open': {
      backgroundColor: '#4A9029',
    },
  },
  addressDesc: {
    '& *': {
      ...mixins.font(14, 20),
    },
  },
  addressLabel: {
    color: '#828282',
    paddingBottom: 3,
  },
  addressSmallText: {
    paddingTop: 4,
    ...mixins.font(12, 16),

    '& *': {
      ...mixins.font(12, 16),
    },

    '&:empty': {
      display: 'none',
    },
  },
}));
