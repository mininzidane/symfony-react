import React, { useState } from 'react';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import Container from 'frontend/js/components/Container';
import ButtonLink from 'frontend/js/components/ButtonLink';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import CompanyService from 'frontend/js/api/CompanyService';
import Table from './Table';
import continents from './continents';
import useStyles from './useStyles';

function PortsTable() {
  const classes = useStyles();
  const [currentContinent, setCurrentContinent] = useState(continents[0].name);
  const { email, officePhone } = CompanyService;

  return (
    <ContainerFullScreen background={{ color: '#ECF4FA' }} className={classes.root}>
      <Container>
        <div className={classes.tabs}>
          {continents.map(({ name }) => (
            <ButtonLink
              key={name}
              className={currentContinent === name ? 'is-active' : null}
              onClick={() => setCurrentContinent(name)}
              label={name}
            />
          ))}
        </div>

        <Table {...continents.filter((obj) => obj.name === currentContinent)[0]} />

        <div className="comment ta-c text-md">
          <strong>
            <FormattedMessage id="internationalAutoShippingPage.contacts.title" />
          </strong>
          <br />
          <FormattedMessage
            id="internationalAutoShippingPage.contacts.desc"
            values={{
              phoneLink: <a href={officePhone.href}>{officePhone.formatted}</a>,
              emailLink: <a href={email.href}>{email.raw}</a>,
            }}
          />
        </div>
      </Container>
    </ContainerFullScreen>
  );
}

export default PortsTable;
