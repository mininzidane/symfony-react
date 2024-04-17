/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import classnames from 'classnames';
import StringService from 'frontend/js/lib/utils/StringService';
import RouterService from 'frontend/js/api/RouterService';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import LotService from 'frontend/js/api/LotService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import MembershipService from 'frontend/js/api/MembershipService';
import useStyles from './useStyles';

function DocType({ lot }) {
  const classes = useStyles();
  const showCopartNotes =
    lot.title.copartNotes &&
    StringService.toUppercase(lot.title.copartNotes) !== StringService.toUppercase(lot.title.name);
  const { ownershipDocsBlocked = false } = lot;
  const isDomesticNoBidding =
    ownershipDocsBlocked || lot.title.biddingType === LotService.TITLE_TYPE_NO_BIDDING_DOMESTIC;
  const isNoBidding = lot.title && lot.title.biddingType === LotService.TITLE_TYPE_NO_BIDDING;
  const isIntlNoBidding = lot.title.biddingType === LotService.TITLE_TYPE_NO_BIDDING_INTERNATIONAL;

  const {
    membershipType: { name: membershipType },
  } = useCustomerHelper();

  const shouldShowBosOnly =
    membershipType === MembershipService.TYPE.GUEST ||
    membershipType === MembershipService.TYPE.BASIC ||
    membershipType === MembershipService.TYPE.PREMIUM ||
    membershipType === MembershipService.TYPE.ADVANCED;

  return (
    <>
      {lot.title.name}
      {lot.title.description && <>&nbsp;{lot.title.description}</>}

      <TooltipOnHover
        maxWidth={380}
        badgeTop={-1}
        isFlipEnabled={false}
        triggerClassName={classnames('ga-mouseover-event-tracking', classes.tooltipTrigger)}
        triggerProps={{
          'data-ga-event-name': 'ownership_doc',
          'data-ga-event-category': 'lot_page',
          'data-ga-event-label': 'info_pop',
        }}
        content={
          <>
            {lot.titlePending && (
              <>
                <FormattedMessage id="lotPage.details.titleCode.tooltip.titleIsPending" />
                <br />
                <br />
              </>
            )}

            {showCopartNotes ? lot.title.copartNotes : lot.title.name}
            <br />
            <br />

            <FormattedMessage
              id="lotPage.details.titleCode.tooltip.description"
              values={{
                TermsLink: (chunks) => (
                  <a key="terms-link" href={RouterService.getRoute('terms')}>
                    {chunks}
                  </a>
                ),
                RulesLink: (chunks) => (
                  <a key="rules-link" href={RouterService.getLocalizedHcRoute('hcRulesAndPolicies')}>
                    {chunks}
                  </a>
                ),
              }}
            />
          </>
        }
      />

      {lot.titlePending && (
        <div>
          <span className={classes.badge}>
            <span className={classes.badgePendingForNDaysLabel}>
              <FormattedMessage id="lotPage.details.titleCode.titleIsPending" values={{ count: 30 }} />
            </span>
            <TooltipOnHover
              maxWidth={380}
              badgeTop={-1}
              isFlipEnabled={false}
              triggerClassName={classnames('ga-mouseover-event-tracking', classes.tooltipTrigger)}
              triggerProps={{
                'data-ga-event-name': 'doctype_pending_title',
                'data-ga-event-category': 'lot_page',
                'data-ga-event-label': 'info_pop',
              }}
              content={<FormattedMessage id="lotPage.details.titleCode.tooltip.titleIsPendingForNDays" />}
            />
          </span>
        </div>
      )}

      {lot.ca2CaPhysicalLocation && (
        <div>
          <span className={classes.badge}>
            <FormattedMessage id="lotPage.details.titleCode.noTitle" />
          </span>
        </div>
      )}

      {shouldShowBosOnly && (isDomesticNoBidding || isNoBidding) && (
        <div className={classnames(classes.badge, classes.badgeDark)}>
          <FormattedMessage id="lotPage.details.titleCode.bosOnly" />
        </div>
      )}

      {isIntlNoBidding && (
        <div className={classnames(classes.badge, classes.badgeDark)}>
          <FormattedMessage id="lotPage.details.titleCode.requireExportDoc" />
        </div>
      )}
    </>
  );
}

export default DocType;
