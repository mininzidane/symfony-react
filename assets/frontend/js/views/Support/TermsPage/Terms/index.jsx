import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import RouterService from 'frontend/js/api/RouterService';
import CompanyService from 'frontend/js/api/CompanyService';
import Link from 'frontend/js/components/Link';
import AdaptiveTable from 'frontend/js/components/Table/AdaptiveTable';
import useStyles from './useStyles';

function Terms({ className }) {
  const classes = useStyles();
  const { getRoute } = RouterService;
  const { companyNameLegal, address, officePhone, officePhoneText, email } = CompanyService;

  return (
    <div className={classnames(classes.root, className)}>
      <div className={classes.lastUpdate}>Last updated on: August 31, 2022</div>
      <p>
        <strong>Welcome!</strong> Thanks for your interest in AutoBidMaster. By using our Website, products, and
        services, you represent that you are at least 18 years old, and that you have the ability to form legally
        binding contracts. By using our Website, products and services you represent that you accept and agree to our
        Terms and Conditions, outlined below. If you have any questions, please{' '}
        <Link href={getRoute('contactUs')}>contact us</Link>.
      </p>

      <h2>1. MEMBERSHIP</h2>
      <p>
        <strong>You are entering into a legally binding agreement</strong>. These Member Terms and Conditions, the{' '}
        <Link href={getRoute('termsOfService')}>Website Terms of Service</Link>, the{' '}
        <Link href={getRoute('privacy')}>Privacy Policy</Link>, and all{' '}
        <Link href={RouterService.getLocalizedHcRoute('hcRulesAndPolicies')}>Rules &amp; Policies</Link> posted on our
        Website (collectively the “Agreement” or “Contract”) sets out the terms and conditions that govern your access
        to and use of our Membership Services and our affiliated dealers and dismantlers (“Dealers”) Services, as
        defined below This Agreement is between our applicable Contracting Party (“we”, “us”, “our”, “AutoBidMaster”),
        as defined in Section 2 below, and you or the entity you represent (“you, “You”, “Your”). Membership Services
        include access to and use of our Websites, applications, tools, and services (collectively &quot;Membership{' '}
        <strong>Services</strong>&quot;). Services provided by Dealers include the purchase and sale of items via third
        party auctions. The <Link href={getRoute('termsOfService')}>Website Terms of Service</Link>, the{' '}
        <Link href={getRoute('privacy')}>Privacy Policy</Link>, and all{' '}
        <Link href={RouterService.getLocalizedHcRoute('hcRulesAndPolicies')}>Rules &amp; Policies</Link> posted on our
        Website are expressly incorporated into this Agreement.
      </p>
      <p>
        Please be advised that this Agreement affects your legal rights and contains provisions that govern how claims
        you and AutoBidMaster and or the Dealers have against each other are resolved (see Section 9 (Dispute
        Resolution)). You should read this entire Agreement carefully before accepting it.{' '}
        <strong>
          If you object to anything in this Agreement, or otherwise do not understand or agree to be bound by this
          Agreement, do not use our Services
        </strong>
        . If you use our Membership Services in any way, you agree to and are bound by this Agreement. You may print a
        copy of this Agreement by using the print button or feature in your browser. We suggest retaining a copy for
        future reference.
      </p>
      <p>
        We may change this Agreement at any time. We will provide you with notice of such changes, and it is your
        responsibility to review any changes to this Agreement.{' '}
        <strong>
          If you object to any of the changes to this Agreement, or otherwise do not understand or agree to any of the
          changes to this Agreement, do not use our Services
        </strong>
        . By continuing to use our Membership Services following notice of any change to this Agreement, you agree to
        and are bound by this Agreement as changed.
      </p>
      <p>
        By using our Website, Membership Services, and Services, you agree that we are authorized to charge any credit
        card on file for fees, payments, and or any other amount due under this Agreement.
      </p>
      <p>
        AutoBidMaster has priced its Membership Services and other Services based on your agreed validity of the
        disclaimers, waivers, and allocation of risks as assigned, as provided in this Agreement. You agree that our
        Dealers are intended third party beneficiaries of this Agreement. You understand and agree that all disclaimers,
        waivers, and allocation of risks provided herein are essential to the basis of the bargain between you and us,
        and that without such our Dealers would not provide the Services at the prices outlined in our Rules and
        Policies.
      </p>

      <h2>2. About AutoBidMaster</h2>
      <p>
        We are a membership service providing access to an online auto auction marketplace that provides you with access
        to the largest auto auction inventory in North America, operated by Copart, Inc. (&quot;<strong>Copart</strong>
        &quot;). We do not operate the auctions and we are not a seller or purchaser at the auctions. Instead, we
        provide an online platform that allows you to purchase vehicles (as used herein, a &quot;
        <strong>vehicle</strong>&quot; means any available for purchase using AutoBidMaster&apos;s Services, including
        cars, trucks, SUVs, motorcycles, boats, jet skis, industrial equipment, trailers, RVs, and other similar and
        dissimilar vehicles) offered for sale by independent third-party sellers through Copart auto auctions ( from one
        of our affiliated motor vehicle dealers and or dismantlers (“Affiliated Dealers”).
      </p>
      <p>
        Subject to the terms of this Agreement, one of our Dealers will fulfill your purchase of the itemyou identify
        and select from our Website. A security deposit may be required before you are allowed to bid on and purchase
        any item (see Security Deposit Rules & Policies). You must pay us a fee for any Services that are provided to
        you. The specific amount of the fee and the way in which the fee is collected is set forth in our{' '}
        <Link href={RouterService.getLocalizedHcRoute('hcRulesAndPolicies')}>Rules & Policies</Link>. You must cooperate
        with us and our Dealers, including responding to our calls and emails, and providing information and documents
        that may be required to process your purchase, the transfer, and or the registration of any vehicle purchased.
      </p>
      <p>
        Our &quot;Contracting Party&quot; means the party identified in the table below, which is based on your Account
        Country. Your “Account Country” means is the country associated with your membership account. If you have
        provided a valid tax registration number for your account, then your Account Country is the country associated
        with your tax registration. If you have not provided a valid tax registration, then your Account Country is the
        country where your billing address is located, except if you have a credit card associated with your account
        that is issued in a different country and your contact address is also in that country, then your Account
        Country is that different country. If you change your Account Country to one identified to a different
        Contracting Party below, you agree that this Agreement is then assigned to the new Contracting Party without any
        further action required by either party.
      </p>

      <AdaptiveTable
        headData={[
          {
            label: 'Account Country',
          },
          {
            label: 'Contracting Party',
          },
          {
            label: 'Mailing address',
          },
        ]}
        bodyData={[
          [
            { content: 'USA, Canada, Mexico and Central America' },
            { content: 'AutoBidMaster, LLC' },
            { content: '8 The Grn, Ste. A Dover, DE 19901' },
          ],
          [
            { content: 'Any country that is not listed in this table above' },
            { content: 'AutoBidGlobal Limited' },
            { content: '165 LORDOS WATERFRONT COURT, 4th floor, Flat/Office 402 3036 Limassol, Cyprus' },
          ],
        ]}
        isHoverable={false}
        className={classes.contractingPartyTable}
        mobileClassName={classes.contractingPartyTable}
        isGrayStyle
      />

      <p>
        <strong>
          By registering with AutoBidMaster, you acknowledge and understand that you are registering for Membership
          Services with the above relevant entity, and that you will be purchasing items from one of our Dealers and not
          registering with or purchasing vehicles from Copart or us. You understand and agree that our Dealers have the
          right to assign some or all of the rights under this Agreement to any of our affiliated entities. You
          explicitly consent to such assignment.
        </strong>
      </p>
      <p>
        Please note that the Contracting Parties as listed above, only sell Membership Services. They do not sell
        vehicles or products of any kind, other than memberships. All other products are sold by, and all other services
        provided by, our Dealers.
      </p>
      <p className="mb-10">
        If you have a question about your membership, please contact the appropriate entity listed above based on your
        location. If you have a question about any vehicle you wish to purchase, any vehicle you have purchased, the
        ownership documents related to the vehicle purchased, or anything related to the Services, please contact our
        Buyer Services Center. Their contact information is as follows:
      </p>
      <address>
        <p>
          AutoBidMaster Buyer Services Center <br />
          {address.street} <br />
          {address.city}, {address.state} {address.zip}
          <br />
          {officePhone.formatted} (phone)
          <br />
          {officePhoneText.formatted} (text/SMS)
          <br />
          Email: <Link href={email.href}>{email.raw}</Link>
        </p>
      </address>
      <p>
        We are a registered member (and Broker and Market Maker) with Copart but are not owned or controlled by Copart
        or otherwise affiliated with or endorsed or recommended by Copart. Copart is not responsible for the content of
        our Website or the provision of the Services. However, because you are using our Services to purchase vehicles
        sold at auctions operated by Copart and we are one of Copart&apos;s Brokers and Market Makers, all transactions
        conducted using our Membership Services, or any website or facility maintained by Copart or otherwise
        facilitated by Copart, are also subject to the Copart Member Terms and Conditions and Terms of Service (which
        are expressly incorporated into this Agreement), as set forth on{' '}
        <Link href="https://www.copart.com/" isNofollow>
          Copart&apos;s website
        </Link>{' '}
        and as amended from time to time, including the &quot;Disclaimers&quot; pertaining to vehicles sold through
        Copart.
      </p>
      <p>
        While we may provide information and other guidance as part of our Services, such information and guidance are
        for informational purposes only and you may decide whether or not to follow it. By using our Services, you
        understand and agree that neither we nor our Dealers (a) own, control, employ, recommend, or endorse any of the
        independent third-party sellers who own the vehicles available for purchase using our Services; (b) own or
        possess the vehicles available for purchase using our Services (unless we are listed as the seller); (c)
        research, verify, confirm, guarantee, or warrant the accuracy or completeness of any Vehicle Information (as
        defined in Section 7.2 (Vehicle Information Disclaimer)) for any vehicle available for purchase using our
        Services; and (d) make any representations, warranties or guarantees of any kind regarding the quality or
        condition of the vehicles available for purchase through our Membership Services.
      </p>
      <p>
        <strong>
          You are solely responsible for any warranty service work on any vehicle you purchase using our Services
        </strong>{' '}
        (see Section 7 (Disclaimers)).
      </p>
      <p>
        <strong>
          Purchasing a used or salvage vehicle from an online auto auction marketplace presents many risks. It is your
          sole responsibility to inspect any vehicle prior to placing any bid.
        </strong>
      </p>

      <h2>3. Your Use of AutoBidMaster&apos;s Website</h2>
      <p>
        Please review our <Link href={getRoute('termsOfService')}>Website Terms of Service</Link> for additional terms
        and conditions related to your access to and use of our website.
      </p>

      <br />
      <br />
      <br />

      <h2>4. Your Privacy</h2>
      <p>
        Your privacy is important to us. Please review our <Link href={getRoute('privacy')}>Privacy Policy</Link> for
        information about how we collect, use, disclose, retain, and protect your personal information.
      </p>

      <h2>5. Rules & Policies</h2>
      <p>
        Due to various state and federal regulations, not all vehicles listed on our Website are available for purchase
        by all members. In some cases, according to your state regulations you might not be allowed to directly purchase
        vehicles located in the state in which you reside. Before bidding on any vehicle, you must verify with your DMV
        that the location of the vehicle is not the same as your state of residence, as provided to AutoBidMaster and or
        as indicated on your driver’s license uploaded to AutoBidMaster.
      </p>
      <p>
        Purchases of vehicles which are located in the same state as a member’s address, as indicated in their
        membership account records, require delivery by one of our Dealers or their affiliated entities. There is an
        additional fee for delivery. In the event that you want to bid on a vehicle located in your state, please
        contact the Buyer Services Center, listed above to discuss your options and additional costs.
      </p>
      <p>
        By bidding on a vehicle through our Services, you confirm that you have confirmed that you can buy such vehicles
        and have met necessary requirements with your state regulations.
      </p>
      <p>
        Payments must indicate member name, and the name and address of the person or business sending the payment, if
        the payment is sent by anyone other than the member. In the event payments are made by third parties on behalf
        of a member’s account, and an overage occurs, or amounts are due back for any reason, the appropriate funds will
        be returned to the third-party payor and not the member.
      </p>
      <p>
        Please review our <Link href={RouterService.getLocalizedHcRoute('hcRulesAndPolicies')}>Rules & Policies</Link>{' '}
        for additional terms and conditions that apply to your use of our Services.
      </p>

      <h2>6. Your Member Account</h2>
      <p>
        In order to access certain features of our Website and to use our Services, you must register to create an
        account (&quot;<strong>Member Account</strong>&quot;) and accept this Agreement. If later revisions are made,
        you must agree to such revisions to continue to access Membership Services. Each induvial or organization may
        only have one membership. Memberships are not transferable. In addition, state, and country specific
        registration requirements, applicable laws, regulations, and restrictions may further limit Member registration
        and vehicle purchasing eligibility. We reserve the right to deny Membership Services to any individual or
        entity, in our sole and absolute discretion.
      </p>

      <h2>7. Disclaimers</h2>
      <h3>7.1. General Vehicle Condition and History Disclaimer</h3>
      <p className="td-u">
        All vehicles are &quot;AS-IS&quot; and &quot;WHERE IS&quot; and &quot;WITH ALL FAULTS&quot;
      </p>
      <p className="td-u">All vehicles are sold from by our Dealers. We do not buy or sell vehicles.</p>
      <p>
        You agree that vehicles sold via our Services are sold{' '}
        <strong>
          without any warranty, express or implied, including but not limited to any warranty of fitness for a
          particular purpose or warranty of merchantability.
        </strong>
      </p>
      <p>
        You agree that vehicles sold via our Services are{' '}
        <strong>not represented as being in road-worthy condition or mechanically sound</strong>.
      </p>
      <p>
        You agree that vehicles sold via our Services may have{' '}
        <strong>
          latent, hidden, or undisclosed damage or other conditions that are not immediately apparent or discoverable
        </strong>
        .
      </p>
      <p>
        You agree that vehicles sold via our Services may{' '}
        <strong>
          not be fit for use as a means of transportation, may not comply with local, state, or federal emissions
          standards, and may require substantial repairs at your expense
        </strong>
        .
      </p>
      <p>
        You agree that it is{' '}
        <strong>
          your sole responsibility to ascertain, confirm, research, inspect, and/or investigate any vehicle and all
          related Vehicle Information
        </strong>{' '}
        (as defined in Section 7.2 (Vehicle Information Disclaimer)) before placing any bid or purchasing any vehicle
        using our Services
      </p>

      <h3>7.2. Information Disclaimer</h3>
      <p>
        <strong>
          Vehicle Information is provided for convenience only. Neither AutoBidMaster nor our Dealers guarantee that the
          information provided is accurate or complete.
        </strong>
      </p>
      <p>
        <strong>&quot;Vehicle Information&quot;</strong> means any and all information related to a vehicle listed on
        our Website, whether provided in written, oral, or digital form, including: year, make, model, body style,
        color, drive type, engine type, cylinders, fuel type, condition, damage amount, damage type, primary damage,
        secondary damage, mileage, odometer, odometer descriptions, runs and drives status, vehicle identification
        number (<strong>&quot;VIN&quot;</strong>) or serial number, title or ownership document type, title or ownership
        document state, title or ownership document history, estimated retail value, actual cash value, repair estimate,
        estimated repair cost, repair history, total loss history, airbag deployment, keys, any Auction Highlights, and
        any and all other information (including images) listed on any lot listing page and the &quot;Lot Details&quot;
        or &quot;Copart Auto Auction Lot Details&quot; for any vehicle.
      </p>
      <p>
        The vehicles listed on our Website are not owned by us or our Dealers. As a result, all items of Vehicle
        Information are provided by the auction seller (via Copart as the operator of the auction). This information is
        not reviewed or confirmed. Please be advised that the Vehicle Information may contain inaccuracies, errors, and
        omissions.{' '}
        <strong>
          We and our Dealers expressly disclaim all representations, warranties, or guarantees regarding the accuracy or
          completeness of any Vehicle Information, Auction Highlights and Copart Auto Auction Lot Details.
        </strong>{' '}
        Vehicle Information is provided for convenience only. We strongly encourage you to inspect any vehicle prior to
        placing any bid or agreeing to purchase any vehicle.
      </p>
      <p>
        <strong>
          You agree <span className="td-u">not to rely</span> on any Vehicle Information, Auction Highlights, or Copart
          Auto Auction Lot Details in deciding whether or how much to bid on a vehicle.
        </strong>
      </p>

      <h3>7.3. Not Professional Advice; Information Only</h3>
      <p>
        Any information, guidance, or advice obtained through our Membership Services and Services, including our
        Website and our phone, email, and chat support services, is for informational purposes only. Our Dealer Service
        Center is available to assist you and answer your questions, but they are not mechanics, experts, or otherwise
        trained or qualified professionals in any vehicle-related field. They have not viewed the vehicle in person, nor
        do they have the ability to do so. If you have specific concerns or questions that may require professional
        advice, you should consult with an appropriately-trained and qualified professional before placing any bid or
        making any purchase.
      </p>
      <p>
        <strong>
          You agree <span className="td-u">not to rely</span> on any information, guidance, or advice obtained from the
          Website or Copart’s website, in deciding whether or how much to bid on a vehicle.
        </strong>
      </p>

      <h3>7.4. VIN Disclaimer</h3>
      <p>
        Certain jurisdictions permit vehicles to be sold with missing VIN plates. We do not represent that vehicles sold
        via our Membership Services are equipped with any or all VIN plates.
      </p>

      <h3>7.5. Emissions Laws and Standards Disclaimer</h3>
      <p>
        Vehicles purchase via our Services are not represented, warrantied, or guaranteed to meet, or are able to be
        modified, altered, or repaired to meet local emissions or safety laws and requirements. Vehicles purchased via
        our Services are not represented, warrantied, or guaranteed to have a catalytic converter.
      </p>

      <h3>7.6. Keys Disclaimer</h3>
      <p>
        Vehicles purchased via our Services are not represented, warrantied, or guaranteed to have keys or that keys
        will be available for any vehicle purchased using our Services, regardless of whether the auction listing
        indicated the vehicle comes with keys, keys are present in images, or keys were present in the vehicle prior to
        the time of purchase.
      </p>

      <h3>7.7. Title and Registration Laws Disclaimer</h3>
      <p>
        Due to variations in applicable laws and regulations, a vehicle listed with a &quot;clean&quot; or
        &quot;clear&quot; or other similar title or ownership document type may have a salvage history. Regardless of
        whether the title or ownership document type is listed as &quot;clean&quot; or &quot;clear&quot; or does not
        otherwise indicate a salvage history on the auction listing, the title or ownership document may become a
        salvage, reconstructed, or an otherwise branded title or ownership document upon registration in your state or
        any other jurisdiction. (For example, a vehicle legally purchased by you with a clean title in State A may be
        required to be sold on a salvage title if you transport and register or resell the vehicle in State B.
      </p>
      <p>
        Additionally, due to variations in applicable laws and regulations, you may receive a title or ownership
        document which is different than (but similar to) the title or ownership document that is listed on the lot
        listing page. Processing times for titles or ownership documents may take 5-7 weeks and result in additional
        fees. (See Payment Rules & Policies and AutoBidMaster Member Fees for more information.)
      </p>
      <p>
        Buyers of vehicles titled as “Certificates of Destruction,” “Non-Repairable Vehicle Certificates,” “Junk
        Certificates,” or a title with other brands that indicate the vehicle cannot be retitled, or that the vehicle
        has no resale value except as a source of parts or scrap, will only receive Purchase Agreement Documents for the
        parts or scrap purchase and not a physical title. Buyers wishing to export such a vehicle must contact our Buyer
        Services Center with their intention to export prior to sale. In order to export a vehicle with such title,
        there is an additional processing fee, and the processing time is two to six weeks.
      </p>
      <p>
        Registration laws vary by state and are subject to change. Vehicles purchased via our Services are not
        represented, warrantied, or guaranteed to be able to be legally registered in any state or other jurisdiction.
        Nor is there are representation, warranty, or guarantee that you will receive the specific title or ownership
        document that is listed on the lot listing page.{' '}
        <strong>
          It is your sole responsibility to determine whether you will be able to register the vehicle or receive a
          &quot;clean&quot; or &quot;clear&quot; title in your state or any other jurisdiction prior to placing any bid
          or purchasing any vehicle using our Services
        </strong>
        , and you accept all risks associated with variations in vehicle title and registration laws and regulations
        between states and other jurisdictions that may prevent you from titling or registering your vehicle or may
        negatively impact the marketability of your vehicle purchased using our Services.
      </p>

      <h3>7.8. Paperwork Processing Disclaimer</h3>
      <p>
        Neither we nor our Affiliated Dealers are liable or responsible for defects, errors, or omissions (a) related to
        any paperwork not processed by us, (b) made by any governmental agency or entity, or (c) made by title
        processing clerk. We are not liable or responsible for titles or ownership documents lost in the mail. Duplicate
        title or ownership document requests may result in delays and additional processing fees.
      </p>

      <h3>7.9. NMVTIS Reporting Disclaimer</h3>
      <p>
        Vehicles available for purchase using our Services may have been reported to the National Motor Vehicle Title
        Information System (&quot;<strong>NMVTIS</strong>&quot;), and transaction data related to vehicles purchased
        using our Services may be reported to NMVTIS. You accept all risks associated with purchasing vehicles using our
        Services resulting from the reporting of the vehicle or the purchase transaction data to NMVTIS by us or others.
        Please be advised that you may be subject to NMVTIS reporting requirements if you purchase a vehicle using our
        Services. For more information on the NMVTIS, please visit{' '}
        <Link href="https://www.vehiclehistory.gov/" isNofollow>
          www.vehiclehistory.gov
        </Link>
        .
      </p>

      <h2>8. Limitation of Damages, Release of Liability, and Indemnification</h2>
      <p>
        Any release, disclaimer, indemnification, or limitation stated elsewhere in this Agreement is in addition to{' '}
        <strong>
          this Section and is part of the basis of the bargain between you and AutoBidMaster and shall apply to all
          Claims (as defined in Section 9 (Dispute Resolution)), even if AutoBidMaster has been advised of the
          possibility of any such liability or damage and even if these remedies fail their essential purpose.
        </strong>
        <br />
        Some states or jurisdictions do not allow the types of limitations in this section, so they may not apply to
        you.
      </p>
      <h3>8.1. Limitation of Damages</h3>
      <p>
        You agree that, to the extent permitted by applicable law, neither AutoBidMaster nor their{' '}
        <strong>Dealers shall, under any circumstances, have any liability whatsoever to you or any third-party</strong>{' '}
        (whether jointly, severally, or individually) for any damages or losses of any kind (known or unknown, foreseen
        or unforeseen, direct or indirect) arising out of or in any way related to any disclaimer provided in this
        agreement (including Section 7 (Disclaimers)) or on AutoBidMaster&apos;s Website.
      </p>
      <p>
        You agree that, to the extent permitted by applicable law, neither{' '}
        <strong>
          AutoBidMaster nor their Dealers shall ,under any circumstances, have any liability whatsoever to you or any
          third-party
        </strong>{' '}
        (whether jointly, severally, or individually) for any (a) indirect, incidental, special, consequential, or
        punitive damages, (b) loss of use, data, opportunity, goodwill, reputation, profit, or revenue, or (c) costs or
        expenses (including attorney fees), for any Claim (as defined in Section 9 (Dispute Resolution)) not amounting
        to a willful or intentional wrong.
      </p>
      <p>
        Regardless of the previous paragraphs, you agree that, to the extent permitted by applicable law, if
        AutoBidMaster or their Dealers are found liable in any Claim (as defined in Section 9 (Dispute Resolution)),
        <strong>
          AutoBidMaster&apos;s and the Dealers total liability to you or to any third-party (whether jointly, severally,
          or individually) shall not exceed the amount of any fees
        </strong>{' '}
        (excluding any{' '}
        <Link href="https://www.copart.com/login/?redirectUrl=%2FmemberFees" isNofollow>
          Copart Fees
        </Link>
        , the purchase price of any vehicle, or any other fees charged by any third-party) paid by you to AutoBidMaster
        related to the transaction or vehicle giving rise to the liability. If no such fees were paid by you{' '}
        <strong>
          to AutoBidMaster or the Dealers, AutoBidMaster&apos;s total liability to you or any third-party (whether
          jointly, severally, or individually)
        </strong>{' '}
        for any Claim (as defined in Section 9 (Dispute Resolution){' '}
        <strong>shall not exceed Five Hundred ($500) USD</strong>.
      </p>

      <h3>8.2. General Release of Copart</h3>
      <p>
        You acknowledge and agree that Copart is not a party to this Agreement or to any transaction you enter into
        using our Membership Services or Services. Accordingly, you hereby release Copart from any and all liability
        whatsoever for any losses or damages (whether direct or indirect, kno unknown, foreseen or unforeseen, and
        including attorney fees) arising out of or in any way related to any Claim (as defined in Section 9 (Dispute
        Resolution)). You further acknowledge and agree that under this general release of Copart, you expressly waive
        any protections (whether statutory or otherwise) that would otherwise limit the scope of this general release to
        include only those claims that you may know or suspect to exist at the time you agree to this release.
        Additionally, you hereby agree to pay all reasonable costs and expenses (including court fees, attorney fees,
        travel expenses, and other related costs and expenses) incurred by Copart (or Copart’s indemnitor) in connection
        with its efforts to obtain a stay or dismissal of any Claim (as defined in Section 9 (Dispute Resolution))
        against Copart pursuant to this general release. For the limited purposes of this general release, you
        acknowledge and agree that Copart is an intended third-party beneficiary of this Agreement.
      </p>
      <h3>8.3. Liability to, and General Release of, AutoBidMaster</h3>
      <p>
        You hereby agree that you will be liable to AutoBidMaster for any breach of the Agreement, including but not
        limited to the items listed below, and you unconditionally release AutoBidMaster and their Dealers from any and
        all liability whatsoever for any losses or damages (whether direct or indirect, known or unknown, foreseen or
        unforeseen, and including attorney fees) arising out of or in any way related to any of the following:
      </p>
      <p>
        Your failure or refusal to strictly comply with our{' '}
        <Link href={RouterService.getLocalizedHcRoute('hcRulesAndPolicies')}>Rules & Policies</Link>.
      </p>
      <p>Any action taken or not taken our Dealers.</p>
      <p>
        Your failure or refusal to notify the Buyer Services Center of any problem with or condition of any vehicle
        before it is removed from the Copart facility (or other location where vehicle is awaiting pickup).
      </p>
      <p>Your failure or refusal to keep your Member Account login information confidential.</p>
      <p>Any bids, purchases, and or payments made via your Member Account.</p>
      <p>Our termination or suspension of your Member Account.</p>
      <p>Your cancelation of your Member Account.</p>
      <p>
        Our decision to use or not to use all or any portion of your Security Deposit to pay any unpaid account balance.
      </p>
      <p>Any rejection or cancelation of any bid by Copart.</p>
      <p>Any postponement, cancelation, or withdrawal of a vehicle from a sale by Copart.</p>
      <p>The acceptance or rejection of any bid for any “On Approval” or “On Minimum Bid” vehicle.</p>
      <p>
        Your failure or refusal to know the type and amount of applicable fees and charges (including Membership Fees,
        Auction Fees, Storage Fees, Late Fees, Relist Fees, and other applicable fees and charges related to your use of
        our Services).
      </p>
      <p>
        Your failure or refusal to pay any amount due within the time period specified (including any vehicle purchase
        price, Membership Fees, Auction Fees, Storage Fees, Late Fees, Relist Fees, and other applicable fees and
        charges related to your use of our Services).
      </p>
      <p>
        Your failure or refusal to arrange proper and timely removal any vehicle from the applicable Copart facility (or
        other location where vehicle is awaiting pickup) within the time period specified.
      </p>
      <p>
        Our Dealers’ refusal to release any vehicle or vehicle title or ownership documents or otherwise transfer
        possession or ownership of any vehicle to you due to any unpaid account balance or your violation of this
        Agreement.
      </p>
      <p>
        Our Dealers’ refusal to release or transfer possession or ownership of any vehicle to anyone other than you.
      </p>
      <p>Your failure or refusal to transfer ownership or register any vehicle in your name (as applicable).</p>
      <p>Your failure to name the correct party, with whom you may have a dispute.</p>
      <p>Our and or our Dealers’ refusal to issue you a refund for any reason.</p>
      <p>
        Our Dealers’ declaration that any vehicle is “abandoned” due to your failure or refusal to remove the vehicle
        from the applicable Copart facility (or other location where vehicle is awaiting pickup) within the time
        specified.
      </p>
      <p>Our Dealers’ sale or other disposition of any abandoned vehicle.</p>
      <p>Your failure to inspect a vehicle prior to placing a bid.</p>
      <p>
        Any damage to or loss of your vehicle (or any portion or parts thereof) due to operational procedures in place
        at the Copart facility (or other location where vehicle is awaiting pickup), acts of theft or vandalism,
        weather, acts of God, or any other reason that occurs after the end of an auction but before the vehicle is
        removed from the applicable Copart facility (or other location where vehicle is awaiting pickup).
      </p>
      <p>
        Your failure or refusal to comply with this Agreement or any applicable law or regulation when removing your
        vehicle from the applicable Copart facility (or other location where vehicle is awaiting pickup).
      </p>
      <p>
        Your failure to cooperate with us and our Dealers, to specifically include timely completion of your
        responsibilities, as indicated herein and in the Rules and Policies.
      </p>
      <p>
        Your vehicle after it is removed from the applicable Copart facility (or other location where vehicle is
        awaiting pickup).
      </p>
      <p>Your use of any service provided by any third party (including any of our recommended service providers).</p>
      <p>
        Any bodily injury, property damage, or other occurrence which occurs on Copart&apos;s or AutoBidMaster’s
        premises, whether caused in whole or in part by the negligence of AutoBidMaster or Copart.{' '}
        <strong>
          It is specifically understood that this release shall be interpreted as releasing AutoBidMaster, our Dealers,
          and Copart for their own sole and/or partial negligence
        </strong>
        .
      </p>
      <p>Our denial or rejection of any request or demand by you that does not comply with this Agreement.</p>
      <p>
        You acknowledge and agree that under this general release, you expressly waive any protections (whether
        statutory or otherwise) that would otherwise limit the scope of this general release to include only those
        claims that you may know or suspect to exist at the time you agree to this release.
      </p>

      <h3>8.4. General Indemnification of AutoBidMaster and Copart</h3>
      <p>
        Members irrevocably and unconditionally waive and release their rights (if any) to recover from AutoBidMaster
        and our Dealers, and their directors, officers, employees, representatives, agents, subsidiaries, partners, and
        affiliates(“AutoBidMaster Indemnities”) any and all damages, losses, liabilities, costs, expenses, or claims,
        whether direct or indirect, known or unknown, or foreseen or unforeseen, which may arise from or be related to
        bodily injury, property damage, Member’s noncompliance or alleged noncompliance with law or regulations, and or
        Member’s violation of this Agreement or any other agreement between the parties. Members agree to indemnify,
        defend, and hold AutoBidMaster Indemnitees harmless from any and all damages, losses, liabilities, costs or
        expenses (including attorneys’ fees) arising from claims made by the Member or related to: 1) bodily injury or
        property damage related to the provision of the services contemplated here in and or any vehicles sold via our
        Membership Services 2) the Member’s failure to comply with applicable laws or regulations, 3) the Member’s sale
        or transfer of vehicles to third parties, 4) claims made against AutoBidMaster Indemnitees by the third parties
        related to Member, 5) Member’s noncompliance with any portion of this Agreement, including the nonpayment for
        Services, including but not limited to all Storage Fees, Late Fees, Relist Fees, and all other related costs,
        fees, and charges; and or those damages, losses, liabilities, costs or expenses (including attorney fees)
        incurred in enforcing and or defending the provisions of this Agreement, including but not limited to expenses
        related to investigation; any and all attorney, expert, and or collection fees, costs, disbursements or other
        expenses,; and interest which may be imposed in connection therewith, as provided in this Agreement.
      </p>
      <p>
        <strong>8.4.1 Scope of Indemnification</strong>. To the maximum extent permitted by law, you, hereby agree to
        indemnify AutoBidMaster Indemnities against any and all Losses arising out of, resulting from, or related to any
        claim brought by a third-party related to your membership with us and or to any transaction(s) with you,
        including but not limited to the items listed in Section 8.3 (Liability to, and General Release of,
        AutoBidMaster) (collectively &quot;<strong>Third-Party Claim</strong>&quot;). Your indemnification obligations
        shall be subject to the following limitations:
      </p>
      <p>
        <strong>(1) Notice.</strong> If an AutoBidMaster Indemnity seeks indemnification for a Third-Party Claim, we
        shall give you written notice promptly after we become aware of the facts giving rise to such claim for
        indemnification (an “<strong>Indemnified Claim</strong>”), and in any event within 90 days, specifying in
        reasonable detail the factual basis of the Indemnified Claim and stating the amount of the damages (or if not
        known, a good faith estimate of the amount of damages).
      </p>
      <p>
        <strong>(2) Control</strong>. In the event of receipt of notice of a Third-Party Claim, you shall have the right
        to control and defend such Third-Party Claim, provided such control and defense fully protects the interests of
        AutoBidMaster and our Dealers, in AutoBidMaster’s sole subject determination. Should you decline to control and
        defend the Third-Party Claim or should AutoBidMaster determine that your control and defense does not fully
        protect the interest of AutoBidMaster and Dealers, we shall have the right, at any time, to control and defend
        the Third- Party Claim in such manner as we may deem appropriate. The controlling party shall select counsel,
        contractors, experts, and consultants of recognized standing and competence reasonably acceptable to the other
        party, shall take reasonable steps necessary in the investigation, defense or settlement thereof, and shall
        diligently and promptly pursue the resolution thereof. All parties shall cooperate fully with the party
        conducting the defense of any Third-Party Claim.
      </p>
      <p>
        <strong>(3) Settlement</strong>. The party controlling the defense of any Third-Party Claim shall be authorized
        to consent to a settlement of, or the entry of any judgment arising from, any Third-Party Claims subject to the
        following provisions. If you are controlling the litigation, you may not enter into a settlement or consent to
        an entry of judgment with respect to any Third-Party Claim without AutoBidMaster’s express written consent, not
        to be unreasonably withheld, conditioned, or delayed. If we are controlling the litigation, we may not enter
        into a settlement or consent to an entry of judgment with respect to any Third-Party Claim without your express
        written consent, not to be unreasonably withheld, conditioned, or delayed.
      </p>
      <p>
        It shall not be considered unreasonable for AutoBidMaster to withhold consent if you have not reimbursed
        AutoBidMaster and our Dealers for their Losses or made arrangements to do so which are acceptable to
        AutoBidMaster. It shall not be unreasonable for AutoBidMaster to withhold consent if the proposed settlement or
        entry of judgment could negatively impact AutoBidMaster’s professional reputation. Regardless of who assumes
        control and defense of the global Third-Party Claim, AutoBidMaster reserves the right to directly settle or
        otherwise resolve any claim against AutoBidMaster and or our Dealers.
      </p>

      <h3>
        8.5. Waiver of{' '}
        <Link href="http://www.jureeka.net/Jureeka/US.aspx?doc=CalCode&&vol=Civil&&sec=1542" isNofollow>
          California Civil Code § 1542
        </Link>
      </h3>
      <p>
        If you are a California resident, you hereby waive{' '}
        <Link href="http://www.jureeka.net/Jureeka/US.aspx?doc=CalCode&&vol=Civil&&sec=1542" isNofollow>
          California Civil Code § 1542
        </Link>
        , which reads: &quot;A general release does not extend to claims which the creditor does not know or suspect to
        exist in his favor at the time of executing the release, which if known by him must have materially affected his
        settlement with the debtor.&quot;
      </p>

      <h3>9. Dispute Resolution</h3>
      <p>
        You and AutoBidMaster agree that any claim, demand, controversy, dispute, or cause of action arising out of or
        in any way related to this Agreement, your Member Account, your relationship with us, your use of or inability
        to use our Membership Services (through our Website or otherwise), or any vehicle you bid on or purchased using
        our Services (each, a &quot;
        <strong>Claim</strong>&quot;) will be resolved in accordance with the provisions set forth in this section.{' '}
        <strong>
          <u>Please read this section carefully.</u> This section affects your legal rights and will have a substantial
          impact on how any Claim you and AutoBidMaster may have against each other is resolved.{' '}
        </strong>
      </p>

      <h3>9.1. Limitations Periods</h3>
      <p>
        Except where prohibited by applicable law, YOU AGREE THAT REGARDLESS OF ANY STATUTE OR LAW TO THE CONTRARY,{' '}
        <strong>ANY CLAIM MUST BE COMMENCED WITHIN ONE YEAR</strong> AFTER THE DATE ON WHICH SUCH CLAIM ACCRUED OR BE
        FOREVER BARRED. You agree that this limitations period is reasonable due to the nature of the transactions
        contemplated in this Agreement.
      </p>

      <h3>9.2. Applicable Law</h3>
      <p>
        You agree that the laws of the State of Delaware shall govern any Claims related to the Membership Services. You
        agree that the laws of the State of Oregon shall govern the provision of any non-Membership Services, including
        issues regarding the purchase and sale of items. You agree to be governed by these applicable States,
        notwithstanding of any conflict of laws principles and without regard to your state or country of residence,
        domicile, or origin, or where you accessed our Website or Services.
      </p>

      <h3>9.3. Notice of Dispute Form</h3>
      <p>
        We want to avoid legal action, and we hope you do, too. Therefore, if either you or we plan to pursue a Claim
        against the other, you or we must first send to the other, a completed Notice of Dispute form. The Notice of
        Dispute form is{' '}
        <Link href={getRoute('staticFiles', null, true, { fileName: 'Member-Notice-of-Dispute-Form.pdf' })}>
          available here
        </Link>
        .
      </p>
      <p className="mb-10">
        If you intend to pursue a Claim against us, you must send your completed Notice of Dispute to us via certified
        mail at the following address:
      </p>
      <address>
        <p>
          AutoBidMaster Buyer Services Center
          <br />
          {address.street}
          <br />
          {address.city}, {address.state} {address.zip}
        </p>
      </address>
      <p>
        Letters or Disputes written on Notice of Dispute forms but not sent via Certified Mail, are not Notice of
        Dispute.
      </p>
      <p>
        If a Claim is being perused against you, a completed Notice of Dispute will be sent to you at the address
        associated with your Member Account. It is your responsibility to keep your address updated via your{' '}
        <Link href={getRoute('contactInfo')}>My Account</Link> page. All information called for in the Notice must be
        provided, including a description of the nature and basis of the claims the party is asserting and the relief
        sought.
      </p>
      <p>
        If the issues outlined in the Notice of Dispute are not resolved within thirty (30) days after the Notice is
        received via Certified Mail , or if a written denial or rejection of the Claims is received by the complaining
        party, prior to the expiration of this 30-day period, either party may initiate arbitration in accordance with
        Section 9.4 (Agreement to Arbitrate). Note that neither party must complete and send a Notice of Dispute form to
        pursue any Claim as a counterclaim against the other party in any pending legal action.
      </p>

      <h3>9.4. Agreement to Arbitrate</h3>
      <p>
        You and AutoBidMaster agree that any Claim shall be resolved exclusively through final and binding arbitration,
        rather than in any court.{' '}
        <strong>
          You and AutoBidMaster agree that each waives any right to a jury trial under this Agreement to Arbitrate.
        </strong>{' '}
        You agree not to file or initiate litigation or any legal action (including arbitration or small claims actions)
        against AutoBidMaster, our Dealers, or any of AutoBidMaster’s vendors, including Copart, other than as provided
        in this Agreement. If the event you do file or initiate litigation in violations of this Agreement, no
        applicable limitations period(s) will be tolled during the pendency of any litigation or action instituted. In
        the event you file or initiate litigation (including local and or small claims actions), you hereby agree to pay
        all costs (including but not limited to court fees, attorney&apos;s fees incurred by the Company related to the
        Company&apos;s efforts to get such litigation or action dismissed and/or transferred arbitration as provided
        herein.
      </p>
      <h3>9.4.1. Prohibition of Class and Representative Actions and Non-Individualized Relief</h3>
      <p>
        <strong>
          YOU AND AUTOBIDMASTER AGREE THAT EACH MAY BRING ANY CLAIM AGAINST THE OTHER OR DEALERS ONLY ON AN INDIVIDUAL
          BASIS AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE ACTION OR PROCEEDING.
          UNLESS BOTH YOU, AUTOBIDMASTER AND THE DEALERS (IF APPLICABLE) AGREE OTHERWISE (IN WRITING), THE ARBITRATOR
          MAY NOT CONSOLIDATE OR JOIN MORE THAN ONE PERSON&apos;S OR PARTY&apos;S CLAIM AND MAY NOT OTHERWISE PRESIDE
          OVER ANY FORM OF A CONSOLIDATED, REPRESENTATIVE, OR CLASS ACTION OR PROCEEDING. ALSO, THE ARBITRATOR MAY AWARD
          RELIEF (INCLUDING MONETARY, INJUNCTIVE, AND DECLARATORY RELIEF) ONLY IN FAVOR OF THE INDIVIDUAL PARTY SEEKING
          RELIEF AND ONLY TO THE EXTENT NECESSARY TO PROVIDE RELIEF NECESSITATED BY THAT PARTY&apos;S INDIVIDUAL CLAIM.
          ANY RELIEF AWARDED CANNOT AFFECT OTHER AUTOBIDMASTER MEMBERS.
        </strong>
      </p>
      <h3>9.4.2. Arbitration Procedures</h3>
      <p>
        Arbitration is more informal than a lawsuit in court. Arbitration uses a neutral arbitrator instead of a judge
        or jury, and court review of an arbitration award is very limited. However, an arbitrator can award the same
        damages and relief on an individual basis that a court can award to an individual. An arbitrator should apply
        the applicable law and terms of this Agreement as a court would.
      </p>
      <p>
        The arbitrator, and not any federal, state, or local court or agency, shall have exclusive authority to resolve
        any dispute arising out of or in any way relating to the interpretation, applicability, enforceability, or
        formation of this Agreement to Arbitrate (or any portion thereof), or of this Agreement (or any portion
        thereof), including any claim that all or any portion of the Agreement to Arbitrate or this Agreement is
        unenforceable.
      </p>
      <p>
        The arbitrator shall not be bound by rulings in prior arbitrations involving different AutoBidMaster members but
        is bound by rulings in prior arbitrations involving the same AutoBidMaster member to the extent required by
        applicable law. The arbitrator&apos;s award shall be final and binding and judgment on the award rendered by the
        arbitrator may be entered in any court having jurisdiction thereof.
      </p>
      <p>
        Arbitration of any Claims related to Membership Services shall be held remotely through the American Arbitration
        Association, under its rule and procedures, except as provided below. The arbitration of any Claim, other than
        those related to Membership Services, shall be held in Portland, Oregon and will be conducted and governed by
        the Arbitration Services of Portland (&quot;<strong>ASP</strong>&quot;) under its rules and procedures except as
        provided below. All arbitration rules and procedures are modified as follows:
      </p>
      <ol type="A" style={{ marginLeft: '20px' }}>
        <li>The arbitration hearing shall take place no later than 120 days after arbitration is initiated.</li>
        <li>
          Where no party’s claim exceeds $10,000 (exclusive of interest, attorney fees, and arbitration costs), the
          dispute shall be resolved by submission of documents unless the arbitrator determines that an oral hearing is
          necessary. Within 14 days after appointment of the arbitrator, the arbitrator shall schedule a preliminary
          case management teleconference to establish fair and equitable procedures for the submission and review of
          documents. The final date for submissions (including any response and replies, if permitted) shall be no later
          than 120 days after arbitration is initiated.
        </li>
        <li>
          Except where no party’s claim exceeds $10,000 (exclusive of interest, attorney fees, and arbitration costs),
          each party (or each party’s representative if such party is an entity or organization) must appear in-person
          at the arbitration hearing.
        </li>
        <li>
          Discovery of documents and other tangible things shall be limited to those documents and other tangible things
          which each party intends to rely on during the arbitration.
        </li>
        <li>
          Documents presumed admissible shall include this Agreement, the applicable sale documents (including the
          Invoice, Bill of Sale, Statement of Facts, Damage Disclosure Statement, and Power of Attorney), and all emails
          sent to one party from the other party.
        </li>
        <li>
          It shall not be a requirement for a document to be presumed admissible that the party offering a document has
          made available, after request, to all other parties all other related documents from the same author or maker.
        </li>
        <li>
          Legal issues (which may be resolved without need for reliance on factual issues) shall be resolved via summary
          disposition by the arbitrator prior to the arbitration hearing.
        </li>
        <li>
          At least two business days prior to the hearing, the parties shall exchange copies of all exhibits they intend
          to submit at the hearing. The arbitrator shall resolve disputes concerning the exchange of exhibits.
        </li>
        <li>
          Unless applicable law provides otherwise, the arbitration may proceed in the absence of any party who fails to
          appear at the arbitration hearing or fails to submit documents in a dispute to be resolved by the submission
          of documents. An award may be made solely on the default of a party for failure to appear.
        </li>
        <li>
          If the total and combined relief requested is $100,000 or more (exclusive of interest, attorney fees, and
          arbitration costs), a party may appeal purely legal errors and manifestly erroneous factual findings.
        </li>
      </ol>
      <p>
        The use of the word &quot;arbitrator&quot; in this provision shall not be construed to prohibit more than one
        arbitrator from presiding over any arbitration. Rather, the AAA or ASP rules, as applicable, shall determine the
        number of arbitrators that may preside over any given arbitration conducted under this Agreement to Arbitrate.
      </p>
      <p className="mb-0">
        The form for initiating any arbitration proceeding is available on AAA’s website for Claims related to
        Membership Services and ASP’s website for all other Claims not related to Membership Services. In addition to
        filing this form with the arbitration company, you must send, by certified mail, a copy of the completed form to
        AutoBidMaster at the following address to initiate arbitration proceedings:
      </p>
      <address>
        <p>
          AutoBidMaster Buyer Services Center
          <br />
          Attn: Legal Department
          <br />
          Re: Arbitration Claim
          <br />
          6807 NE 79th Court, Suite B<br />
          Portland, OR 97218
        </p>
      </address>
      <p>Settlement discussions or offers are not admissible to the arbitrator.</p>

      <h3>9.4.3. Costs of Arbitration</h3>
      <p>
        Payment of all filing, administration, and arbitrator fees will be governed by arbitration company’s rules,
        unless otherwise stated in this Agreement to Arbitrate.
      </p>

      <h3>9.4.4. Severability</h3>
      <p>
        With the exception of any of the provisions in Section 9.4.1 (Prohibition of Class and Representative Actions
        and Non-Individualized Relief) of this Agreement to Arbitrate, if an arbitrator or court decides that any
        portion of this Agreement to Arbitrate is invalid or unenforceable, the other parts of this Agreement to
        Arbitrate shall still apply. If an arbitrator or court decides that any of the provisions in Section 9.4.1
        (Prohibition of Class and Representative Actions and Non-Individualized Relief) of this Agreement to Arbitrate
        is invalid or unenforceable, then the entirety of this Agreement to Arbitrate shall be null and void. The
        remainder of this Agreement (including all other provisions of Section 9 – Dispute Resolution) shall continue to
        apply.
      </p>
      <p>
        If an arbitrator or court decides that the requirement set forth in Section 9.4.2 (Arbitration Procedures) that
        any arbitration under this Agreement to Arbitration be held as provided above is invalid or unenforceable, the
        other parts of this Agreement to Arbitrate shall still apply and any arbitration shall instead be held remotely
        when possible, or as otherwise in accordance with the arbitration company’s rules and policies. AutoBidMaster,
        and or Dealers (if applicable) may attend by telephone, unless the arbitrator requires otherwise.
      </p>
      <h3>9.4.5. Opt-Out Procedure</h3>
      <p className="mb-10">
        <strong>
          YOU MAY CHOOSE TO REJECT THIS AGREEMENT TO ARBITRATE (&quot;OPT-OUT&quot;) BY MAILING{' '}
          {address.companyName.toUpperCase()} A WRITTEN OPT-OUT NOTICE (&quot;OPT-OUT NOTICE&quot;). THE OPT-OUT NOTICE
          MUST BE POSTMARKED NOT LATER THAN 30 DAYS AFTER THE DATE ON WHICH YOU ACCEPT THIS AGREEMENT FOR THE FIRST
          TIME, AND YOU MUST MAIL THE OPT-OUT NOTICE VIA CERTIFIED OR REGISTERED MAIL, RETURN-RECEIPT REQUESTED, TO:
        </strong>
      </p>
      <address>
        {' '}
        <p>
          AutoBidMaster Buyer Services Center <br />
          Attn: Legal Department <br />
          Re: Opt-Out Notice <br />
          {address.street} <br />
          {address.city}, {address.state} {address.zip}
        </p>
      </address>
      <p>
        For your convenience, the Opt-Out Notice form that you must complete and send via Certified or Registered Mail
        to Opt-Out of the Agreement to Arbitrate is available{' '}
        <Link href={getRoute('staticFiles', null, true, { fileName: 'Arbitration-Opt-Out-Form.pdf' })}>here</Link>. You
        must complete the Opt-Out Notice form by providing the information called for in the form, including your name,
        address (including street address, city, state and zip code), and Member Account login information and email
        address associated with your Member Account to which the Opt-Out Notice applies. You must sign the Opt-Out
        Notice for it to be effective.{' '}
        <strong>This procedure is the only way you can Opt-Out of the Agreement to Arbitrate</strong>. If you Opt-Out of
        the Agreement to Arbitrate, all other parts of this Agreement (including all other provisions of Section 9
        (Dispute Resolution)) will continue to apply to you. If you Opt-Out of this Agreement to Arbitrate, this has no
        effect on any previous, other, or future arbitration agreements that you may have with AutoBidMaster.
      </p>

      <h3>9.4.6. Future Changes to the Agreement to Arbitrate</h3>
      <p />
      <p>
        Notwithstanding any provision in this Agreement to the contrary, changes to the agreement to arbitrate, other
        than a change to any notice address or Website link provided herein, in the future, shall not apply to any Claim
        that was filed in a legal action or proceeding prior to the effective date of the change. The change shall apply
        to all other Claims governed by the Agreement that have arisen or may arise after the date of such change.
        Should this agreement to arbitrate change, you will be notified by a message when you log into the Website.{' '}
        <strong>
          If you object to any of the changes to this Agreement, or otherwise do not understand or agree to be bound by
          the changes to this, you should discontinue using our Membership Services and Services.
        </strong>
      </p>

      <h3>9.5. Judicial Forum for Claims</h3>
      <p>
        In the event that the Agreement to Arbitrate under Section 9.4 (Agreement to Arbitrate) is found not to apply to
        you or to any particular Claim, either as a result of your decision to Opt-Out of the Agreement to Arbitrate, by
        mutual written agreement, or as a result of any decision by any arbitrator or court, you agree that any Claim
        related to Membership Services must be resolved exclusively by the state or federal courts (not to include small
        claims court) located in and or for Dover, Delaware. All other Claims must be resolved in the state and federal
        courts (not to include small claims court) for Multnomah County, Oregon. .You consent to venue and personal
        jurisdiction of such courts for the purposes of litigating all such Claims.
      </p>
      <p>
        <strong>
          To the extent permitted by applicable law, you voluntarily and expressly agree to waive (and/or not exercise
          your rights under) any statute or law that provides you with the ability to revoke or otherwise invalidate
          this mandatory forum selection clause (or any portion thereof).
        </strong>
      </p>
      <p>
        It is greed that nothing under this section shall prohibit any party from enforcing or otherwise seeking to
        collect on any judgment in any jurisdiction permitted by applicable law.
      </p>

      <h3>9.6. Attorney Fees</h3>
      <p>
        Each party shall bear its own costs, expenses, and attorney fees incurred in connection with any cause or
        action, except when such is specifically provided for under Sections 8.1, 8.2, 8.3, 8.4, 9.4 and 9.6 of this
        Agreement, is related to our efforts to collect amounts due from you under this Agreement, is provided for under
        the arbitration company’s rules, and or is provided for by applicable law. Any reference in this Agreement to
        attorney fees shall specifically include an award to AutoBidMaster and Dealers for time incurred by
        AutoBidMaster’s and or Dealers in-house attorney(s), at a rate no less than Three Hundred Dollars per hour.
        Other than as specifically provided herein, there is no general right to an award of costs and expenses
        (including attorney fees), even if such party is the “prevailing party”.
      </p>

      <h3>9.7. Service of Process</h3>
      <p>
        You expressly agree to accept service of process by the Certified or Registered mailing of a copy of the summons
        and complaint to the address listed in your Member Account on the date such mailing is sent. It is your
        responsibility to keep your account information updated via your{' '}
        <Link href={getRoute('contactInfo')}>My Account</Link> page.
      </p>

      <h3>9.8. Off-Sets</h3>
      <p>
        AutoBidMaster and its Dealers have the right to offset any amount owed to you, if either are owed amounts from
        you or you are in violation of this Agreement.
      </p>

      <h2>10. General Provisions</h2>

      <h3>10.1. References to Parties</h3>
      <p>
        Any reference in this Agreement to any individual or entity (including you, AutoBidMaster, our Dealers, and
        Copart) shall include a reference to its respective directors, officers, shareholders, members, employees,
        representatives, agents, subsidiaries, partners, affiliates, and assigns.
      </p>

      <h3>10.2. Construction and Interpretation</h3>
      <p>
        The captions used in this Agreement are provided for convenience only and will not affect the meaning or
        interpretation of any provision of this Agreement. All references in this Agreement to “section” or “sections”
        without additional identification refer to the section or sections of this Agreement. The singular shall include
        the plural, and the plural the singular, and the masculine and neuter shall each include the masculine,
        feminine, and neuter, as the context requires. Whenever the words “include” or “including” are used in this
        Agreement, they will be deemed to be followed by the words “without limitation.”
      </p>

      <h3>10.3. Time is of the Essence</h3>
      <p>
        Time is of the essence with respect to all dates and time periods set forth or referred to in this Agreement.
      </p>

      <h3>10.4. Notices</h3>
      <p>
        You agree that we may provide notices to you in the following ways: (a) a banner or other notice on our Website,
        or (b) an email sent to an address you provided, or (c) through other means including mobile number, telephone,
        or mail. It is your responsibility to keep your account information updated via your{' '}
        <Link href={getRoute('contactInfo')}>My Account</Link> page.
      </p>

      <h3>10.5. Translations</h3>
      <p>
        We may offer translated versions of our Websites, Services, or this Agreement. Any such translations are offered
        solely for convenience. You should not rely on any translated version of our Websites, Services, or this
        Agreement. If any questions arise concerning the accuracy or completeness of any translated version of our
        Website, Services, or this Agreement, please refer to the English version, which is the official and
        authoritative version.
      </p>

      <h3>10.6. Third-Party Beneficiaries</h3>
      <p>
        You understand and agree that, except as otherwise expressly stated in this Agreement, AutoBidMaster Global
        Limited and our Dealers are the only Third-Party Beneficiaries of this Agreement.
      </p>

      <h3>10.7. No Joint Venture</h3>
      <p>
        You acknowledge and agree that no independent contractor, partnership, joint venture, employer-employee,
        principal-agent, or franchiser-franchisee relationship is intended or created by this Agreement or your use of
        Membership Services or Services.
      </p>

      <h3>10.8. Waiver</h3>
      <p>
        The failure to strictly or timely enforce any provision of or exercise any right under this Agreement is not a
        waiver of our or our Dealers ability or right to do so later or of our ability or right to enforce any other
        provision of or exercise any right under this Agreement. Any waiver must be in writing and signed by the waiving
        party.
      </p>

      <h3>10.9. Severability</h3>
      <p>
        Except as otherwise expressly stated in this Agreement, if any provision (or portion thereof) of this Agreement
        is found by a court or arbitrator of competent jurisdiction to be unenforceable, illegal, null, void, or against
        public policy, such provision (or portion thereof) will be modified so as to render it enforceable and effective
        to the maximum extent possible in order to affect the intention of the provision and this Agreement. If a court
        or arbitrator finds the modified provision to be unenforceable, illegal, null, void, or against public policy,
        the enforceability of the remaining provisions of this Agreement and this Agreement in general will not be
        affected in any way.
      </p>

      <h3>10.10. Survival</h3>
      <p>
        Any provision of this Agreement which imposes an obligation after termination, cancelation, or expiration of
        your Member Account or this Agreement will survive the termination, cancelation, or expiration of this
        Agreement.
      </p>

      <h3>10.11. Integration</h3>
      <p>
        This Agreement constitutes the entire agreement between you and AutoBidMaster with respect to its subject
        matter, other than Purchase Agreement Documents, when signed, and replaces and supersedes any other prior or
        contemporaneous agreements or terms and conditions applicable to the subject matter of this Agreement. There
        have been no representations, warranties, or promises outside of this Agreement.
      </p>

      <h3>10.12. Contacting AutoBidMaster</h3>
      <p className="mb-10">You may contact us at:</p>
      <address>
        <p>
          {companyNameLegal}
          <br />
          {officePhone.formatted} (phone)
          <br />
          {officePhoneText.formatted} (text/SMS)
          <br />
          Email: <Link href={email.href}>{email.raw}</Link>
        </p>
      </address>
    </div>
  );
}

Terms.propTypes = {
  className: PropTypes.string,
};

Terms.defaultProps = {
  className: '',
};

export default Terms;
