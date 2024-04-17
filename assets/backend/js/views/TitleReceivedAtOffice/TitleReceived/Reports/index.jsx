import React from 'react';
import PropTypes from 'prop-types';
import Table from 'backend/js/components/Table/Table';
import TableHead from 'backend/js/components/Table/TableHead';
import { TableRow } from '@material-ui/core';
import TableCell from 'backend/js/components/Table/TableCell';
import TableBody from 'frontend/js/components/Table/TableBody';
import DateTimeService from 'backend/js/lib/utils/DateTimeService';
import TableContainer from 'frontend/js/components/Table/TableContainer';
import Notes from 'backend/js/views/TitleReceivedAtOffice/TitleReceived/Notes';

function getFormattedTime(seconds) {
  if (!seconds) {
    return '';
  }
  const levels = [
    [Math.floor(seconds / 31536000), 'years'],
    [Math.floor((seconds % 31536000) / 86400), 'days'],
    [Math.floor(((seconds % 31536000) % 86400) / 3600), 'hours'],
    [Math.floor((((seconds % 31536000) % 86400) % 3600) / 60), 'minutes'],
    [(((seconds % 31536000) % 86400) % 3600) % 60, 'seconds'],
  ];
  let returntext = '';

  for (let i = 0, max = levels.length; i < max; i++) {
    if (levels[i][0] !== 0) {
      returntext += ` ${levels[i][0]} ${
        levels[i][0] === 1 ? levels[i][1].substr(0, levels[i][1].length - 1) : levels[i][1]
      }`;
    }
  }

  return returntext.trim();
}

function Reports({ reports }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Processing time</TableCell>
            <TableCell>Envelopes</TableCell>
            <TableCell>Titles</TableCell>
            <TableCell>Regular titles</TableCell>
            <TableCell>CA2CA</TableCell>
            <TableCell>FL2FL</TableCell>
            <TableCell>EH</TableCell>
            <TableCell>Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.map((report) => (
            <TableRow key={report.id}>
              <TableCell>
                <a href={`/abm-acp/title-receive/${report.id}/report`}>{report.id}</a>
              </TableCell>
              <TableCell>{DateTimeService.formatFromISOString(report.createdAt, 'MM/dd/yyyy H:mmaaa')}</TableCell>
              <TableCell>
                {report.createdBy.firstName} {report.createdBy.lastName}
              </TableCell>
              <TableCell>{getFormattedTime(report.statistics?.processingTime)}</TableCell>
              <TableCell>{report.statistics?.envelopes}</TableCell>
              <TableCell>{report.statistics?.titles}</TableCell>
              <TableCell>{report.statistics?.regularTitles}</TableCell>
              <TableCell>{report.statistics?.ca2ca}</TableCell>
              <TableCell>{report.statistics?.fl2fl}</TableCell>
              <TableCell>{report.statistics?.eh}</TableCell>
              <TableCell>
                <Notes id={report.id} notes={report.notes} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

Reports.propTypes = {
  reports: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Reports;
