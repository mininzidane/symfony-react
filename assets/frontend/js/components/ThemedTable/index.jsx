import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Table from './Table';
import TableBody from './TableBody';
import TableHead from './TableHead';
import TableRow from './TableRow';
import TableCell from './TableCell';
import useStyles from './useStyles';

function ThemedTable({ headData, bodyData, hasShadow, hasHoverEffect, className }) {
  const classes = useStyles({ hasShadow });

  return (
    <div className={classnames(classes.root, hasShadow && classes.shadow, className)}>
      <Table hasShadow={hasShadow} hasHoverEffect={hasHoverEffect}>
        <TableHead>
          <TableRow>
            {headData.map((cell, cellIndex) => (
              <TableCell align={cell.align} style={cell.style} key={cellIndex}>
                {cell.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {bodyData.map((row, rowIndex) => {
            const Row = row.map((cell, cellIndex) => (
              <TableCell align={cell.align} style={cell.style} key={cellIndex} colSpan={cell.colSpan}>
                {cell.content}
              </TableCell>
            ));
            return (
              <TableRow key={row.id || rowIndex} className={row.className} id={row.id}>
                {row.wrapper ? <row.wrapper {...row.wrapperProps}>{Row}</row.wrapper> : Row}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

ThemedTable.propTypes = {
  headData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  bodyData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  pagination: PropTypes.shape({
    rowsPerPage: PropTypes.number,
    total: PropTypes.number,
  }),
  hasShadow: PropTypes.bool,
  hasHoverEffect: PropTypes.bool,
  className: PropTypes.string,
};

ThemedTable.defaultProps = {
  pagination: undefined,
  hasShadow: false,
  hasHoverEffect: false,
  className: '',
};

export default ThemedTable;
