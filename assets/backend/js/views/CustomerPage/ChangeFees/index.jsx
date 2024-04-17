import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

function ChangeFees({ rules: defaultRules, fieldName }) {
  const [rules, setRules] = useState(defaultRules);

  useEffect(() => {
    document.getElementById(fieldName).value = JSON.stringify(rules);
  }, [rules]);

  function addRule() {
    setRules((values) => [...values, { from: 0, to: 0, fee: 0 }]);
  }

  function changeRule(index, key, value) {
    setRules((values) => {
      values[index][key] = parseFloat(value);
      return [...values];
    });
  }

  function removeRule(index) {
    setRules((values) => {
      values.splice(index, 1);
      return [...values];
    });
  }

  return (
    <div className="form-inline">
      <button type="button" className="btn btn-secondary" onClick={addRule}>
        Add rule
      </button>
      <ul className="list-group">
        {rules.map((rule, index) => (
          <li className="list-group-item" key={index}>
            If bid amount from ${' '}
            <input
              type="text"
              className="form-control"
              defaultValue={rule.from}
              onChange={(e) => changeRule(index, 'from', e.target.value)}
            />{' '}
            to ${' '}
            <input
              type="text"
              className="form-control"
              defaultValue={rule.to}
              onChange={(e) => changeRule(index, 'to', e.target.value)}
            />{' '}
            apply transaction fee &nbsp;
            <input
              type="text"
              className="form-control"
              defaultValue={rule.fee}
              onChange={(e) => changeRule(index, 'fee', e.target.value)}
            />
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            &nbsp;
            <button type="button" className="btn btn-sm btn-secondary" onClick={() => removeRule(index)}>
              <i className="glyphicon glyphicon-remove" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

ChangeFees.propTypes = {
  rules: PropTypes.array.isRequired,
  fieldName: PropTypes.string.isRequired,
};

const $el = document.getElementById('transaction-fee-rules');
if ($el) {
  const rules = JSON.parse($el.getAttribute('data-rules'));
  const fieldName = $el.getAttribute('data-field-name');
  ReactDOM.render(<ChangeFees rules={rules} fieldName={fieldName} />, $el);
}
