import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    padding: [[0, 10, 4]],

    '&:not(:first-child) $caption': {
      borderTop: '1px solid #F1F1F8',
      marginTop: 4,
      paddingTop: 11,
    },
  },
  caption: {
    paddingLeft: '0 !important',
  },
  searchesList: {
    display: 'flex',
    gap: 9,
  },
  searchesListWrap: {
    position: 'relative',
  },
  search: {
    ...mixins.font(14, 20, 400),
    padding: [[5, 10]],
    whiteSpace: 'nowrap',
    borderRadius: 15,
    color: '#2158F5',
    backgroundColor: '#F1F1F8',
    cursor: 'pointer',
    transition: 'background-color .15s ease, color .15s ease',

    '&:hover': {
      background: '#4878FF',
      color: '#FFF',
    },
  },
  fade: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: 20,
    backgroundColor: '#FFF',
    pointerEvents: 'none',
    transition: 'opacity .25s ease',

    '&.is-left': {
      left: 0,
      background: 'linear-gradient(90deg, #FFF, transparent)',
    },

    '&.is-right': {
      right: 0,
      background: 'linear-gradient(270deg, #FFF, transparent)',
    },
  },
}));
