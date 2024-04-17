import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Card from 'frontend/js/components/Card';
import useStyles from './useStyles';

function Table({ name, time, color, countries }) {
  const classes = useStyles();

  return (
    <Card elevation={2} className={classes.root}>
      <div className={classes.header} style={{ backgroundColor: color }}>
        <div className={classes.title}>{name}</div>
        <div className={classes.desc}>{time}</div>
      </div>

      <div className={classes.wrap}>
        <table className={classnames(classes.table, 'is-react')}>
          <thead>
            <tr>
              <th>COUNTRY</th>
              <th>PORT</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country, index) => (
              <tr key={index}>
                <td>{country.name}</td>
                <td>{country.port}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

Table.propTypes = {
  name: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      port: PropTypes.string,
    }),
  ).isRequired,
};

export default Table;
