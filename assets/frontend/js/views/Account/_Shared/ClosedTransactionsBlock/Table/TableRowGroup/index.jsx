import React, { Fragment, useState } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TableBody from 'frontend/js/components/Table/TableBody';
import TableRow from 'frontend/js/components/Table/TableRow';
import TableCell from 'frontend/js/components/Table/TableCell';
import Table from 'frontend/js/components/Table/Table';
import TableContainer from 'frontend/js/components/Table/TableContainer';
import useStyles from './useStyles';

function RowGroup({ rowData, cellCount }) {
  const [isDetailsRowShown, setDetailsRowShown] = useState(false);
  const classes = useStyles();

  function handleClick() {
    setDetailsRowShown(!isDetailsRowShown);
  }

  return (
    <>
      <TableRow
        hoverable
        onClick={handleClick}
        className={classnames(classes.triggerRow, { 'is-active': isDetailsRowShown })}
      >
        {rowData.map((cell, cellIndex) => (
          <Fragment key={cellIndex}>
            {cellIndex < cellCount && (
              <TableCell align={cell.align} style={cell.style}>
                {cellIndex === 0 && (
                  <svg
                    className={classnames(classes.chevron, { 'is-active': isDetailsRowShown })}
                    viewBox="0 0 7.41 12"
                    style={{ width: 8, marginRight: 15 }}
                  >
                    <path
                      d="M16.59,8.59,12,13.17,7.41,8.59,6,10l6,6,6-6Z"
                      transform="translate(-8.59 18) rotate(-90)"
                    />
                  </svg>
                )}
                {cell.content}
              </TableCell>
            )}
          </Fragment>
        ))}
      </TableRow>

      {isDetailsRowShown && (
        <TableRow>
          <TableCell colSpan={cellCount} className={classes.detailsRowTableCell}>
            <TableContainer>
              <Table>
                <TableBody>
                  {rowData[cellCount].content.map((subTableRow, rowIndex) => (
                    <TableRow className={classes.subTableRow} key={rowIndex}>
                      {subTableRow.map((subTableCell, cellIndex) => {
                        const isSummaryRow = rowData[cellCount].content[rowIndex].length === 1;

                        return (
                          <TableCell
                            align={subTableCell.align}
                            style={subTableCell.style}
                            colSpan={isSummaryRow ? cellCount : 1}
                            className={classes.subTableCell}
                            key={cellIndex}
                          >
                            {isSummaryRow ? (
                              <div className={classes.subTableSummary}>
                                <span>
                                  <FormattedMessage id="depositsPage.transactions.balance" />:
                                </span>
                                <span>{subTableCell.content}</span>
                              </div>
                            ) : (
                              <span>{subTableCell.content}</span>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

RowGroup.propTypes = {
  cellCount: PropTypes.number.isRequired,
  rowData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default RowGroup;
