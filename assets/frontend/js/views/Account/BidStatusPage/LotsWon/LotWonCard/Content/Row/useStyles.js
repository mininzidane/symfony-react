import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: ({ isFlex }) => ({
    ...mixins.textEllipsis(),
    display: isFlex ? 'flex' : 'block',
    flexWrap: 'wrap',
    fontSize: 14,
    lineHeight: '22px',
    fontWeight: 400,

    [breakpoints.down('sm')]: {
      lineHeight: '20px',

      '& .btn-link.is-dashed > span': {
        paddingBottom: 0,
      },
    },
  }),
  label: ({ isFlex }) => ({
    color: '#4F4F4F',
    paddingRight: isFlex ? 5 : 0,
  }),
}));
