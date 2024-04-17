import React, { useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import classnames from 'classnames';
import useIntl from 'frontend/js/hooks/useIntl';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import ModalWindowFooter from 'frontend/js/components/ModalWindow/Footer';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import Tickbox from 'frontend/js/components/Form/Tickbox';
import Button from 'frontend/js/components/Button';
import useMembershipRenewalContext from '../../_Context/useMembershipRenewalContext';

function Survey() {
  const { modal, form } = useMembershipRenewalContext();
  const { survey, onSurveySubmit, surveySubmitting, surveyLoading, surveyError } = form;

  const [otherCancelReason, setOtherCancelReason] = useState('');
  const [competitor, setCompetitor] = useState('');
  const [cancellationReasons, setCancellationReasons] = useState([]);

  const isSurveyAvailable = Object.keys(survey).length > 0;
  const hasLoadingError = !isSurveyAvailable && !surveyLoading;

  const otherInputRef = useRef(null);
  const competitorRef = useRef(null);
  const intl = useIntl();

  async function submitCancellationSurvey() {
    const { id: questionId } = survey;
    const answers = [];
    cancellationReasons.forEach((cancellationReason) => {
      const reason = {
        questionId,
        optionId: cancellationReason.id,
        answer: cancellationReason.optionValue,
      };

      if (cancellationReason.optionKey === 'other' && otherCancelReason) {
        reason.answer = otherCancelReason;
      }

      if (cancellationReason.optionKey === 'competitor' && competitor) {
        reason.answer = competitor;
      }

      answers.push(reason);
    });

    const isSuccess = await onSurveySubmit({ answers });
    if (isSuccess) {
      setCompetitor('');
      setOtherCancelReason('');
    }

    return isSuccess;
  }

  async function onConfirmCancel() {
    const surveySuccess = await submitCancellationSurvey();
    if (!surveySuccess) {
      return;
    }

    form.onSubmit(false);
    modal.close();
  }

  function updateOtherCancelReason({ target: { value } }) {
    setOtherCancelReason(value);
  }

  function updateCompetitor({ target: { value } }) {
    setCompetitor(value);
  }

  function updateCancellationReasons(name, value) {
    const reasons = cancellationReasons.slice();
    const isOther = name === 'other';
    const isCompetitor = name === 'competitor';

    if (!value) {
      const answerIndex = cancellationReasons.findIndex((reason) => reason.optionKey === name);
      if (answerIndex !== -1) {
        reasons.splice(answerIndex, 1);
      }

      if (isOther) {
        setOtherCancelReason('');
      }

      if (isCompetitor) {
        setCompetitor('');
      }
    } else {
      const { questionOptions } = survey;
      const option = questionOptions.find((questionOption) => questionOption.optionKey === name);
      const existingAnswer = cancellationReasons.findIndex((reason) => reason.optionKey === name);
      if (option && existingAnswer === -1) {
        reasons.push(option);
      }

      if (isOther && otherInputRef) {
        const { current } = otherInputRef;
        current.focus();
      } else if (isCompetitor && competitorRef) {
        const { current } = competitorRef;
        current.focus();
      }
    }

    setCancellationReasons(reasons);
  }

  function isReasonChecked(reasonKey) {
    const isFound = cancellationReasons.find((reason) => reason.optionKey === reasonKey);

    return isFound !== undefined;
  }

  return (
    <>
      <ModalWindowHeader title={<FormattedMessage id="membershipSettings.modal.headerCancel" />} />

      <ModalWindowBody hasFooter>
        <>
          {hasLoadingError && <FormattedMessage id="app.loading.error" />}

          {surveyLoading && (
            <div style={{ minHeight: 315 }}>
              <SpinnerWheel size={34} thickness={3} isCentered />
            </div>
          )}

          {!surveyLoading && isSurveyAvailable && (
            <>
              <div className="survey">
                {surveyError && (
                  <div className="mb-15 text-red text-small">
                    <FormattedMessage id="form.error.general" />
                  </div>
                )}

                <div className="survey__question mb-15">
                  <strong>
                    <FormattedMessage id="membershipSettings.survey.question" />
                  </strong>
                </div>

                <div className="survey_question-description mb-15">
                  <FormattedMessage id="membershipSettings.survey.chooseAll" />:
                </div>

                <ul className="list-reset">
                  {survey.questionOptions.map((questionOption) => (
                    <li
                      key={questionOption.id}
                      className={classnames({
                        'mb-15': questionOption.optionKey !== 'other',
                        'mb-5': questionOption.optionKey === 'other',
                      })}
                    >
                      <Tickbox
                        onChange={updateCancellationReasons}
                        value={isReasonChecked(questionOption.optionKey)}
                        name={questionOption.optionKey}
                        id={questionOption.optionKey}
                      >
                        {questionOption.optionKey === 'other' ? (
                          <div className="input-hollow">
                            <input
                              placeholder={intl.formatMessage({ id: 'membershipSettings.survey.otherPlaceholder' })}
                              ref={otherInputRef}
                              onChange={updateOtherCancelReason}
                              onClick={() => updateCancellationReasons('other', true)}
                              value={otherCancelReason}
                              maxLength={200}
                              style={{ height: 30, paddingLeft: 15, fontSize: '14px' }}
                            />
                          </div>
                        ) : (
                          <>
                            <span className="text-sm">
                              <FormattedMessage
                                id={`membershipSettings.survey.${questionOption.optionKey.replace(/_/g, '')}`}
                              />
                            </span>

                            {questionOption.optionKey === 'competitor' && (
                              <div className="input-hollow mt-5">
                                <input
                                  type="text"
                                  placeholder={intl.formatMessage({ id: 'membershipSettings.survey.listCompetitors' })}
                                  ref={competitorRef}
                                  onChange={updateCompetitor}
                                  onClick={() => updateCancellationReasons('competitor', true)}
                                  value={competitor}
                                  maxLength={200}
                                  style={{ height: 30, paddingLeft: 15, fontSize: '14px' }}
                                />
                              </div>
                            )}
                          </>
                        )}
                      </Tickbox>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </>
      </ModalWindowBody>

      <ModalWindowFooter>
        <Button
          label={<FormattedMessage id="membershipSettings.ctaCancel" />}
          isDisabled={!cancellationReasons.length || surveySubmitting}
          isLoading={surveySubmitting}
          onClick={onConfirmCancel}
          isInline
        />
      </ModalWindowFooter>
    </>
  );
}

export default Survey;
