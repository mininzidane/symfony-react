/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import t from 'frontend/js/api/TranslatorService';
import BootstrapService from 'frontend/js/api/BootstrapService';
import Button from 'frontend/js/components/Button';
import ChatSvg from './img/chat.svg';
import useStyles from './useStyles';

function ZendeskTrigger({ className, label }) {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);

  function loadWidget() {
    const script = document.createElement('script');

    script.type = 'text/javascript';
    script.id = 'ze-snippet';
    script.async = true;
    script.src = `https://static.zdassets.com/ekr/snippet.js?key=${BootstrapService.getAppValue('zenDeskApiKey')}`;
    script.onload = () => {
      window.zE('messenger:set', 'zIndex', 123456777);
      window.zE('messenger', 'open');
      setIsLoading(false);
    };
    document.getElementsByTagName('head')[0].appendChild(script);
    setIsLoading(true);
  }

  function handleChatToggle() {
    if (!window.zE && !isLoading) {
      loadWidget();
      return;
    }

    window.zE('messenger', 'open');
  }

  return (
    <Button
      className={className}
      label={
        <div className={classes.label}>
          <img src={ChatSvg} alt="chat" />
          {label || t('shared.cta.startChat')}
        </div>
      }
      onClick={handleChatToggle}
    />
  );
}

export default ZendeskTrigger;
