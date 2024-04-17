import React from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import classnames from 'classnames';
import useStyles from './useStyles';
import TableMobileCard from '../../TableMobileCard';
import Table from '../Table';
import TableContainer from '../TableContainer';
import TableBody from '../TableBody';
import TableHead from '../TableHead';
import TableRow from '../TableRow';
import TableCell from '../TableCell';

function AdaptiveTable({
  headData,
  bodyData,
  breakpoint,
  className,
  mobileClassName,
  isHoverable,
  isGrayStyle,
  isStriped,
}) {
  const classes = useStyles();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down(breakpoint));

  if (isMobile) {
    return (
      <div className={mobileClassName}>
        {bodyData.map((row, cardIndex) => (
          <TableMobileCard
            cardData={row.cells || row}
            headData={headData}
            key={row.id || cardIndex}
            isHoverable={isHoverable}
          />
        ))}
      </div>
    );
  }

  return (
    <TableContainer>
      <Table className={classnames(classes.root, isGrayStyle && 'is-gray-style', isStriped && 'is-striped', className)}>
        <TableHead>
          <TableRow>
            {headData.map((cell, cellIndex) => (
              <TableCell align={cell.align} style={cell.style} key={cellIndex}>
                {cell.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody shadow data={bodyData}>
          {(rows) =>
            rows.map((row, rowIndex) => (
              <TableRow hoverable={isHoverable} key={row.id || rowIndex}>
                {(row.cells || row).map((cell, cellIndex) => (
                  <TableCell align={cell.align} style={cell.style} key={cellIndex} colSpan={cell.colSpan}>
                    {cell.content}
                  </TableCell>
                ))}
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

AdaptiveTable.propTypes = {
  headData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  bodyData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  breakpoint: PropTypes.string,
  isHoverable: PropTypes.bool,
  isGrayStyle: PropTypes.bool,
  className: PropTypes.string,
  mobileClassName: PropTypes.string,
  isStriped: PropTypes.bool,
};

AdaptiveTable.defaultProps = {
  breakpoint: 'sm',
  className: '',
  mobileClassName: '',
  isHoverable: true,
  isGrayStyle: false,
  isStriped: false,
};

export default AdaptiveTable;
