import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  searchSuggestionsWrap: {
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    zIndex: '1',
  },
  searchSuggestions: {
    padding: '13px 4px 10px',
    overflow: 'auto',
    boxShadow: '0 1px 6px rgba(0, 0, 0, .4)',
    maxHeight: 'calc(100vh - 70px)',
    borderRadius: 6,
    backgroundColor: '#FFF',
    overflowY: 'auto',
    overflowX: 'hidden',
    overscrollBehavior: 'none',
    scrollbarColor: '#C1C1C1 transparent',
    scrollbarWidth: 'thin',
    marginTop: 1,

    [breakpoints.down('sm')]: {
      scrollbarColor: '#C1C1C1 transparent',
    },

    '&::-webkit-scrollbar': {
      width: 8,

      [breakpoints.down('sm')]: {
        width: 5,
      },
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#C1C1C1',
      borderRadius: '8px',

      [breakpoints.down('sm')]: {
        borderRadius: '5px',
        backgroundColor: '#C1C1C1',
      },
    },

    '&:empty': {
      display: 'none',
    },
  },
  suggestionHighlight: {
    fontWeight: 400,
  },
  suggestionCaption: {
    color: '#BDBDBD',
    padding: '0 10px 5px 10px',
    fontSize: '11px',
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  suggestionSeparator: {
    margin: '12px 0',
    height: '1px',
    backgroundColor: '#E3E3E3',
  },
  suggestionDelete: {
    paddingLeft: '10px !important',
    paddingRight: '10px !important',
    fontSize: '12px !important',
    fontWeight: 400,
    opacity: '0',
    outline: 'none',
    color: '#2158F5',
    textTransform: 'none',
    backgroundColor: 'transparent !important',

    '&:hover': {
      textDecoration: 'underline !important',
    },

    [breakpoints.down('sm')]: {
      opacity: 1,
    },
  },
  recentSearchWrap: {
    ...mixins.flex('between', 'center'),
  },
  recentSearchIcon: {
    marginRight: 10,
    pointerEvents: 'none',
  },
  suggestionIcon: {
    marginRight: 10,
    opacity: 0.25,
    pointerEvents: 'none',
  },
  suggestionText: {
    ...mixins.font(14, 30, 700),
    ...mixins.textEllipsis(),
    color: '#333333',
    display: 'flex',
    alignItems: 'center',
    flex: '1',
    padding: '0 10px',
    borderRadius: '2px',
    cursor: 'pointer',
    textDecoration: 'none',
    outline: 'none',
  },
  recentSearchesText: {
    ...mixins.font(14, 30, 400),
    ...mixins.textEllipsis(),
    color: '#2158F5',
    display: 'flex',
    alignItems: 'center',
    flex: '1',
    padding: '0 10px',
    borderRadius: '2px',
    cursor: 'pointer',
    textDecoration: 'none',
    outline: 'none',
  },
  suggestion: {
    position: 'relative',
    outline: 'none',
    borderRadius: 6,

    '&.is-selected': {
      background: '#F0F0F6',
    },

    '&:hover': {
      background: '#F1F1F8',

      '& $suggestionDelete': {
        opacity: 1,
      },
    },
  },
}));
