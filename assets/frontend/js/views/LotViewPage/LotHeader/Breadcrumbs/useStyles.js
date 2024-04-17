import { makeStyles } from '@material-ui/core/styles';

const quoteSym = '\\005C';

export default makeStyles(({ breakpoints }) => ({
  root: {
    position: 'relative',

    [breakpoints.down('sm')]: {
      '&.is-overflow::after': {
        content: '""',
        top: 8,
        right: -1,
        width: 25,
        height: 26,
        position: 'absolute',
        pointerEvents: 'none',
        background: ({ isAbmInventory, isNpaInventory }) => {
          if (isAbmInventory) {
            return 'linear-gradient(270deg, rgba(33, 126, 0, 1) 0%, rgba(33, 126, 0, 0) 100%)';
          }

          if (isNpaInventory) {
            return 'linear-gradient(270deg, #606060 0%, rgba(0, 0, 0, 0) 100%)';
          }

          return 'linear-gradient(270deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)';
        },
      },
    },
  },
  nav: {
    paddingTop: 7,

    [breakpoints.down('sm')]: {
      maxWidth: 'calc(100vw - 28px)',
      overflow: 'auto',
      paddingTop: 8,
      paddingBottom: 6,
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomColor: ({ isSelect, isAbmInventory, isNpaInventory }) =>
        isSelect || isAbmInventory || isNpaInventory ? 'rgba(255, 255, 255, .15)' : '#DFE1E3',
    },
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: '0',
    margin: '0',

    [breakpoints.down('sm')]: {
      flexWrap: 'nowrap',
    },
  },
  listItem: {
    display: 'inline-flex',
    alignItems: 'center',

    '&:not(:last-child)::after': {
      content: `'${quoteSym}'`,
      display: 'inline-block',
      padding: [[0, 5]],
      color: '#B7B5B3',
    },

    '& a, & span': {
      display: 'block',
      fontSize: '14px',
      lineHeight: '20px',
      color: ({ isSelect, isAbmInventory, isNpaInventory }) => {
        if (isSelect) {
          return '#B7D0F6';
        }
        if (isAbmInventory) {
          return '#B3CFAE';
        }
        if (isNpaInventory) {
          return '#BDBDC1';
        }

        return '#2158F5';
      },

      [breakpoints.down('sm')]: {
        whiteSpace: 'nowrap',
        fontSize: 11,
        lineHeight: '14px',
      },
    },

    '& > a > span': {
      color: ({ isSelect, isAbmInventory, isNpaInventory }) => {
        if (isSelect) {
          return '#B7D0F6';
        }
        if (isAbmInventory) {
          return '#B3CFAE';
        }
        if (isNpaInventory) {
          return '#BDBDC1';
        }

        return '#2158F5';
      },
    },

    '& > span': {
      color: ({ isSelect, isAbmInventory, isNpaInventory }) => {
        if (isSelect) {
          return '#B7D0F6';
        }
        if (isAbmInventory) {
          return '#B3CFAE';
        }
        if (isNpaInventory) {
          return '#BDBDC1';
        }

        return '#000';
      },
    },
  },
}));
