import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'backend/js/components/Form/Select';
import InstantOfferService from 'backend/js/api/InstantOfferService';
import BaseApiService from 'backend/js/api/BaseApiService';
import { useSnackbar } from 'notistack';

function InstantOfferAgent({ instantOffer, agents, setInstantOffer, setInstantOfferChangeLogs }) {
  const { enqueueSnackbar } = useSnackbar();
  const [submitting, setSubmitting] = useState(false);

  async function assignAgent(instantOfferRef, agentId) {
    setSubmitting(true);

    try {
      const instantOfferService = new InstantOfferService();
      const response = await instantOfferService.assignAgent(instantOfferRef, {
        agent: agentId,
      });
      enqueueSnackbar('The agent was assigned successfully', { variant: 'success' });
      setInstantOffer(response.instantOffer);
      setInstantOfferChangeLogs(response.instantOffer.instantOfferChangeLogs);
    } catch (e) {
      const message = BaseApiService.parseErrorResponse(e);
      enqueueSnackbar(message, { variant: 'error' });
    }

    setSubmitting(false);
  }

  return (
    <>
      <Select
        id="agent"
        name="agent"
        className="react-select-hollow"
        placeholder="Agent"
        value={instantOffer.agent?.id}
        options={agents}
        styles={{
          control: (styles) => ({
            ...styles,
            border: 'none',
            borderRadius: '2px',
            background: 'none',
            minHeight: '34px',
            '&:hover': {
              background: '#dbdbdb',
            },
          }),
          valueContainer: (styles) => ({
            ...styles,
            padding: '2px',
            lineHeight: 1,
            minHeight: '30px',
          }),
          singleValue: (styles) => ({
            ...styles,
            color: '#337ab7',
            whiteSpace: 'normal',
          }),
          menu: (styles) => ({
            ...styles,
            minWidth: '150px',
          }),
          indicatorSeparator: () => ({ display: 'none' }),
          indicatorsContainer: () => ({ display: 'none' }),
        }}
        onChange={(name, value) => assignAgent(instantOffer.ref, value)}
        onBlur={() => {}}
        onChangeAttribute="id"
        disabled={submitting}
        formatOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
      />
    </>
  );
}

InstantOfferAgent.propTypes = {
  instantOffer: PropTypes.object.isRequired,
  agents: PropTypes.array,
  setInstantOffer: PropTypes.func.isRequired,
  setInstantOfferChangeLogs: PropTypes.func.isRequired,
};

InstantOfferAgent.defaultProps = {
  agents: [],
};

export default InstantOfferAgent;
