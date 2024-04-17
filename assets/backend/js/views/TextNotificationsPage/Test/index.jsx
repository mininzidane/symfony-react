import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import TextNotificationService from 'backend/js/api/TextNotificationService';

function TestTemplates({ checkboxName, checked, localeSelectorName }) {
  const selector = document.querySelector(`[name='${localeSelectorName}']`);
  const [showMessages, setShowMessages] = useState([]);
  const [messages, setMessages] = useState({});
  const [locale, setLocale] = useState(selector.value);
  const textNotificationService = new TextNotificationService();
  const [templates, setTemplates] = useState([
    {
      group: 'General',
      items: [
        'Start Text',
        'Stop Text',
        'Generic Reply',
        'Basic members without ID or BP',
        'All members registered recently',
        'Deposit placed',
        'Similar Vehicle Alert Notification',
        'Live Auction Notification',
      ],
    },
    {
      group: 'Pre-Sale',
      items: ['Bid placed', 'Bid - outbid', 'Bid - Lost Prebid', 'Bid - counterbid', 'Bid - won'],
    },
    {
      group: 'Post-Sale',
      items: [
        'LotPurchase - full payment received',
        'Carrier Label - ownerships documents has been mailed',
        'Lot purchase picked up',
      ],
    },
    {
      group: 'Shipping',
      items: [
        'International Warehouse Pictures Uploaded',
        'International Pick Up Pictures Uploaded',
        'International Delivered To Warehouse',
        'International Loaded Into Container',
        'International Pickup Scheduled',
        'Title Sent To Customer',
        'Title Sent To Agent',
        'Title Received At Warehouse',
        'International Picked Up',
        'International Delivered To Customer',
        'Title received at office',
        'Storage fee billed',
      ],
    },
    {
      group: 'Membership Renewal',
      items: ['Membership renewal coming up', 'Membership renewal failed', 'Membership renewed'],
    },
  ]);

  useEffect(() => {
    selector.addEventListener('change', (e) => {
      setLocale(e.target.value);
    });
  }, [selector]);

  useEffect(() => {
    textNotificationService.getTextNotifications(locale).then((response) => {
      setMessages(response);

      const messagesWithoutGroup = { ...response };
      Object.keys(response).forEach((templateName) => {
        templates.forEach((template) => {
          if (template.items.includes(templateName)) {
            delete messagesWithoutGroup[templateName];
          }
        });
      });
      templates[0].items = [...templates[0].items, ...Object.keys(messagesWithoutGroup)];
      setTemplates([...templates]);
    });
  }, [locale]);

  function isChecked(template) {
    return checked.includes(template);
  }

  function showMessage(template) {
    setShowMessages((values) => values.concat([template]));
  }

  function hideMessage(template) {
    setShowMessages((values) => values.filter((item) => item !== template));
  }

  function toggleAllMessages() {
    let messagesList = [];
    if (showMessages.length === 0) {
      templates.forEach((item) => {
        messagesList = messagesList.concat(item.items);
      });
    }
    setShowMessages(messagesList);
  }

  return (
    <>
      <table className="table table-hover">
        <tbody>
          {templates.map((item, index) => (
            <>
              <tr>
                <th>{item.group}</th>
                <th>
                  {index === 0 && (
                    <>
                      {showMessages.length === 0 ? (
                        <button type="button" className="btn btn-sm btn-primary" onClick={toggleAllMessages}>
                          Show all
                        </button>
                      ) : (
                        <button type="button" className="btn btn-sm btn-secondary" onClick={toggleAllMessages}>
                          Hide all
                        </button>
                      )}
                    </>
                  )}
                </th>
              </tr>
              {item.items.map((template) => (
                <tr key={template}>
                  <td width="25%">
                    <div className="checkbox">
                      <label>
                        <input
                          type="checkbox"
                          name={checkboxName}
                          value={template}
                          defaultChecked={isChecked(template)}
                        />
                        {template}
                      </label>
                    </div>
                  </td>
                  <td>
                    {showMessages.includes(template) ? (
                      <>
                        <div
                          role="button"
                          tabIndex={0}
                          className="btn btn-sm btn-secondary"
                          onClick={() => hideMessage(template)}
                          onKeyPress={() => hideMessage(template)}
                        >
                          <i className="glyphicon glyphicon-minus" />
                        </div>
                        &nbsp;&nbsp;
                        {messages[template]}
                      </>
                    ) : (
                      <div
                        role="button"
                        tabIndex={0}
                        className="btn btn-sm btn-secondary"
                        onClick={() => showMessage(template)}
                        onKeyPress={() => showMessage(template)}
                      >
                        <i className="glyphicon glyphicon-plus" />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </>
  );
}

TestTemplates.propTypes = {
  checkboxName: PropTypes.string.isRequired,
  checked: PropTypes.array.isRequired,
  localeSelectorName: PropTypes.string.isRequired,
};

const $el = document.getElementById('test-templates');
if ($el) {
  const checkboxName = $el.getAttribute('data-checkbox-name');
  const checked = JSON.parse($el.getAttribute('data-checked'));
  const localeSelectorName = $el.getAttribute('data-locale-selector-name');

  ReactDOM.render(
    <TestTemplates checkboxName={checkboxName} checked={checked} localeSelectorName={localeSelectorName} />,
    $el,
  );
}
