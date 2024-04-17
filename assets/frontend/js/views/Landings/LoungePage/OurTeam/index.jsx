/* eslint-disable react/prop-types */
import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import TeamMemberCard from './TeamMemberCard';
import data from './data';
import useStyles from './useStyles';

function OurTeam({ iso2 }) {
  const classes = useStyles();

  const teamMembers = data[iso2];

  if (!teamMembers) {
    return <div className={classes.separator} />;
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <h2 className={classes.title}>
          <FormattedMessage id="loungePage.ourPage.title" />
        </h2>

        <p className={classes.description}>
          <FormattedMessage id="loungePage.ourPage.description" />
        </p>

        <div className={classes.grid}>
          {teamMembers.map((v, index) => (
            <TeamMemberCard data={v} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default OurTeam;
