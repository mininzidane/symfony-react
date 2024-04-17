import React from 'react';
import CompanyService from 'frontend/js/api/CompanyService';
import RouterService from 'frontend/js/api/RouterService';
import Link from 'frontend/js/components/Link';
import useStyles from './useStyles';

function Terms() {
  const classes = useStyles();
  const { address, companyName, email } = CompanyService;

  return (
    <div className={classes.root}>
      <p className="last-update">Last updated on: March 25, 2020</p>
      <p>
        <strong>Welcome!</strong> Thanks for using {RouterService.getFullRoute('home')}. By using our website, products,
        and services, you accept and agree to our terms and conditions, so please take some time to read and review the
        Website Terms of Service below. If you have any questions, please{' '}
        <Link routeParams={['contactUs']}>contact us</Link>.
      </p>
      <h2>1. Acceptance of Terms of Use</h2>
      <p>
        <strong>You are entering into a binding legal agreement</strong>. These Terms of Use (“<strong>Terms</strong>”),
        the <Link routeParams={['terms']}>Member Terms and Conditions</Link>, the{' '}
        <Link routeParams={['privacy']}>Privacy Policy</Link>, and all{' '}
        <Link href={RouterService.getLocalizedHcRoute('hcRulesAndPolicies')}>Rules & Policies</Link> posted on our
        website (“
        <strong>Website</strong>
        ”) set out the terms on which {companyName}, LLC (&quot;<strong>we</strong>&quot; or &quot;<strong>us</strong>
        &quot; or &quot;
        <strong>our</strong>&quot; or &quot;<strong>{companyName}</strong>&quot;) offers you access to and use of our
        Website, applications, tools, and services (collectively &quot;<strong>Services</strong>&quot;). The{' '}
        <Link routeParams={['terms']}>Member Terms and Conditions</Link>, the{' '}
        <Link routeParams={['privacy']}>Privacy Policy</Link>, and all{' '}
        <Link href={RouterService.getLocalizedHcRoute('hcRulesAndPolicies')}>Rules & Policies</Link> posted on our
        Website are expressly incorporated into these Terms.
      </p>
      <p>
        Please be advised that these Terms affect your legal rights and contain provisions that govern how claims you
        and {companyName} have against each other are resolved (see{' '}
        <a href={`${RouterService.getRoute('terms')}#section10`}>Section 10</a> (Dispute Resolution)). You should read
        this entire agreement carefully before accepting it.{' '}
        <strong>
          If you object to anything in these Terms, or otherwise do not understand or agree to be bound by these Terms,
          do not use {companyName}’s Website
        </strong>
        . If you use {companyName}’s Website in any way, you agree to and are bound by these Terms. You may print a copy
        of these Terms by using the print button or feature in the browser. {companyName} suggests retaining a copy for
        future reference.
      </p>
      <p>
        {companyName} may change these Terms at any time. {companyName} will provide you with notice of such changes,
        and it is your responsibility to review any changes to these Terms. If you object to any of the changes to these
        Terms, or otherwise do not understand or agree to any of the changes to these Terms, do not use {companyName}’s
        Services. By continuing to access or use {companyName}’s Services following notice of any change to these Terms,
        you agree to and are bound by these Terms as changed.
      </p>
      <h2>2. Your Responsibilities and Rights</h2>
      <h3>2.1. License</h3>
      <p>
        During the term of these Terms, {companyName} grants you a limited, non-exclusive, non-transferable license to
        access the Website for your personal and non-commercial use in accordance with these Terms. {companyName} may
        terminate this license without notice at any time for any reason.
      </p>
      <h3>2.2. Intellectual Property Rights</h3>
      <p>
        The design, trademarks, service marks, and logos of the Website (“<strong>Marks</strong>”) are owned by or
        licensed to {companyName} and subject to copyright and other intellectual property rights under United States,
        foreign laws, and international conventions. {companyName} reserves all rights not expressly granted in and to
        the Website. You agree to not engage in the use, copying, or distribution of any of the Website other than
        expressly permitted.
      </p>
      <h3>2.3. Your Conduct</h3>
      <p>
        Except as otherwise specifically provided herein, you may not engage in any of the following prohibited
        activities: (a) reproducing pictures, descriptions, quote calculator, range and mileage estimator, or other
        aspects of the Website on any other site; (b) &quot;framing&quot; or &quot;mirroring&quot; of the Website or any
        material contained on or accessible from the Website on any other server or Internet-based device without the
        advanced written authorization of {companyName}; (c) copying, distributing, or disclosing any part of the
        Website in any medium, including without limitation by any automated or non-automated “scraping”; (d) using any
        automated system, including without limitation “robots,” “spiders,” “offline readers,” etc. to access the
        Website; (e) transmitting spam, chain letters, or other unsolicited email; (f) attempting to interfere with,
        compromise the system integrity or security, or decipher any transmissions to or from the servers running the
        Website; (g) taking any action that imposes or may impose at our sole discretion an unreasonable or
        disproportionately large load on Website infrastructure; (h) uploading invalid data, viruses, worms, or other
        software agents through the Website; (i) collecting or harvesting any personally identifiable information,
        including account names, from the Website; (j) using the Website for any commercial solicitation purposes; (k)
        impersonating another person or otherwise misrepresenting your affiliation with a person or entity, conducting
        fraud, hiding or attempting to hide your identity; (l) interfering with the proper working of the Website; (m)
        accessing any content on the Website through any technology or means other than those provided or authorized by
        the Website; or (n) bypassing the measures we may use to prevent or restrict access to the Website, including
        without limitation features that prevent or restrict use or copying of any content or enforce limitations on use
        of the Service or the content therein.
      </p>
      <h3>2.4. Your Access</h3>
      <p>
        You must be at least 18 years old to access or use the Website. By accessing or using the Website in any way,
        you represent that you are at least 18 years of age.
      </p>
      <h3>2.5. Your Use</h3>
      <p>
        You agree that (a) your use of the Website will be in strict compliance with these Terms and with all applicable
        laws and regulations (including without limitation any local laws or regulations in your country, state, city,
        or other governmental area, regarding online conduct and acceptable content, and including all applicable laws
        regarding the transmission of technical data exported from the United States or the country in which you
        reside), and (b) your use of the Website will not infringe or misappropriate the intellectual property rights of
        any third-party.
      </p>
      <h3>2.6. Your Member Account</h3>
      <p>
        If you complete the registration process, you will receive an email from us with the login credentials
        associated with your account with {companyName} (“<strong>Member Account</strong>”). You are responsible for
        maintaining the confidentiality of your login credentials and are fully responsible for all activities that
        occur under your Member Account. You agree to (a) immediately notify {companyName} of any unauthorized use of
        your login credentials or Member Account or any other breach of security and (b) ensure that you exit from your
        Member Account at the end of each session. {companyName} cannot and will not be liable for any loss or damage
        arising from your failure to comply with this section.
      </p>
      <h2>3. Intellectual Property Rights</h2>
      <h3>3.1. No Transfer</h3>
      <p>
        These Terms do not transfer from us to you or to any third-party any rights in or to any of our intellectual
        property, and all right, title, and interest in and to such property will remain (as between the parties) solely
        with {companyName}. {companyName}, the {companyName} and {RouterService.getFullRoute('home')} logos, and all
        other trademarks, service marks, graphics, and logos used in connection with the Website are trademarks or
        registered trademarks of {companyName}. Other trademarks, service marks, graphics and logos used in connection
        with the Website may be the trademarks of other third-parties. Your use of the Website grants you no right or
        license to reproduce or otherwise use any of our or third-party trademarks.
      </p>
      <h3>3.2. Copyright Policy</h3>
      <p>
        {companyName} respects the intellectual property rights of others and expects you to do the same. {companyName}{' '}
        will respond to notices of alleged copyright infringement that comply with applicable law and are properly
        provided to {companyName}. If you believe that your content has been copied in a way that constitutes copyright
        infringement, please provide us with the following information in accordance with the Digital Millennium
        Copyright Act: (a) a physical or electronic signature of the copyright owner or a person authorized to act on
        their behalf; (b) identification of the copyrighted work claimed to have been infringed; (c) identification of
        the material that is claimed to be infringing or to be the subject of infringing activity and that is to be
        removed or access to which is to be disabled, and information reasonably sufficient to permit us to locate the
        material; (d) your contact information, including your address, telephone number, and email address; (e) a
        statement by you that you have a good faith belief that use of the material in the manner complained of is not
        authorized by the copyright owner, its agent, or the law; and (f) a statement that the information in the
        notification is accurate, and, under penalty of perjury, that you are authorized to act on behalf of the
        copyright owner.
      </p>
      <h2>4. Third-Party Content</h2>
      <p>
        Through the Website, you will have the ability to access and/or use content, material, including computer
        software, provided by or made available through the third-party websites and services (“
        <strong>Third-Party Content</strong>”). {companyName} cannot guarantee that such Third-Party Content will be
        free of material you may find objectionable or otherwise inappropriate. By operating the Website, {companyName}{' '}
        does not represent or imply that {companyName} endorses any Third-Party Content or believes such Third-Party
        Content to be accurate, useful, or non-harmful. Your access to and use of any Third-Party Content is at your own
        risk. You are responsible for taking precautions as necessary to protect yourself and your computer systems from
        viruses, worms, Trojan horses, and other harmful or destructive content. {companyName} disclaims any and all
        responsibility or liability for any harm resulting from your use of the Third-Party Content.
      </p>
      <h2>5. General Disclaimer of Warranties</h2>
      <p>
        <strong>The Website is provided “AS IS” without any warranties of any kind</strong>. To the fullest extent
        permissible under applicable law, {companyName} expressly disclaims all warranties, express or implied,
        including without limitation warranties of merchantability, fitness for a particular purpose, non-infringement,
        accuracy, freedom from errors, suitability of content, or availability. You expressly acknowledge and agree
        that: (a) {companyName} makes no warranty that (i) the Website will meet your requirements, (ii) the Website
        will be uninterrupted, timely, secure, or error-free, (iii) the results obtained from the use of the Website
        will be accurate, reliable, complete, or current (iv) the quality of any products, services, information, or
        other material purchased or obtained by you through the Website will meet your expectations, and (v) any errors
        in the Website will be corrected; (b) any material downloaded or otherwise obtained through the use of the
        Website is done at your own risk and that you will be solely responsible for any damage to your computer system
        or loss of data that results from the download of any such material; (c) no advice or information, whether oral
        or written, obtained by you from {companyName}, or through or from the Website, shall create any warranty not
        expressly stated in these Terms; and (d) {companyName} is not responsible for incorrect or inaccurate entry of
        information, human error, technical malfunctions, lost/delayed data transmission, omission, interruption,
        deletion, defect, failures of any telephone network, computer equipment, software, or any combination thereof,
        or inability to access the Website.
      </p>
      <h2>6. General Release and Waiver of Liability</h2>
      <p>
        <strong>You acknowledge and agree that your access to and use of the Website is at your own risk</strong>. In
        consideration for providing you with access to the Website, you hereby absolutely and unconditionally release
        and waive from any and all claims, demands, or causes of action of any kind, nature, or description, whether
        arising in law or equity or upon contract or tort or under any state or federal law or otherwise, which you had,
        now have, or claim to have against us for or by reason of any act, omission, matter, cause, or thing whatsoever
        arising out of or in any way related to your access to or use of the Website, whether such claims, demands, and
        causes of action are matured or unmatured, known or unknown, liquidated, fixed or contingent, or direct or
        indirect.
      </p>
      <h2>7. General Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by applicable law, in no event shall {companyName} be liable for: (a) any
        direct, special, indirect, or consequential damages, or (b) any other damages of any kind, including without
        limitation loss of use, loss of profits or loss of data, whether in an action in contract, tort (including
        without limitation negligence) or otherwise, arising out of or in any way connected with your use of or
        inability to use the Website, including without limitation any damages caused by or resulting from reliance by
        you on any information obtained from Website (including without limitation Third-Party Content), or that results
        from mistakes, omissions, interruptions, deletion of files or email, errors, defects, viruses, delays in
        operation or transmission, or any failure of performance of the Website.
      </p>
      <h2>8. Indemnification</h2>
      <p>
        To the maximum extent permitted by applicable law, you agree to defend and indemnify {companyName} against any
        and all claims, losses, liabilities, damages, fines, penalties, costs and expenses (including without limitation
        interest which may be imposed in connection therewith), expenses of investigation, reasonable fees, costs and
        disbursements of attorneys, counsel, and other experts (at trial and on any appeal), and cost to {companyName}{' '}
        of any funds expended arising out of, resulting from, or related to any claim brought by a third-party arising
        from or relating to your access to or use of the Website.
      </p>
      <h2>9. Local Laws</h2>
      <p>
        {companyName} controls and operates this Website from its headquarters in the state of Oregon, USA, and makes no
        representation that the Website is appropriate, applicable, or will be available for use in other locations.
        Except as otherwise specifically provided herein, all marketing or promotional materials on this Website are
        solely directed to persons and entities located in the United States. If you use this Website from outside the
        United States, you are entirely responsible for compliance with applicable laws, including but not limited to
        the export and import regulations.
      </p>
      <h2>10. Dispute Resolution</h2>
      <p>
        You and {companyName} agree that any claim or cause of action arising out of or in any way related to these
        Terms, your relationship with {companyName}, your use of (or inability to use) {companyName}’s Website, or your
        use of the Website will be resolved in accordance with the provisions set forth in Section 9 of the{' '}
        {companyName} <Link routeParams={['terms']}>Member Terms and Conditions</Link>. Please read this section
        carefully.{' '}
        <strong>
          This section affects your rights and will have a substantial impact on how any Claim you may have against{' '}
          {companyName} is resolved
        </strong>
        .
      </p>
      <h2>11. General Provisions</h2>
      <h3>11.1. Survival</h3>
      <p>Any rights and obligations which arise from these Terms shall survive its termination.</p>
      <h3>11.2. References to Parties</h3>
      <p>
        Any reference in these Terms to any individual or entity (including you and {companyName}) shall include a
        reference to its respective directors, officers, shareholders, members, employees, representatives, agents,
        subsidiaries, partners, affiliates, and assigns.
      </p>
      <h3>11.3. Construction and Interpretation</h3>
      <p>
        The captions used in these Terms are provided for convenience only and will not affect the meaning or
        interpretation of any provision of these Terms. All references in these Terms to “section” or “sections” without
        additional identification refer to the section or sections of these Terms. The singular shall include the
        plural, and the plural the singular, and the masculine and neuter shall each include the masculine, feminine,
        and neuter, as the context requires. Whenever the words “include” or “including” are used in these Terms, they
        will be deemed to be followed by the words “without limitation.”
      </p>
      <h3>11.4. Time is of the Essence</h3>
      <p>Time is of the essence with respect to all dates and time periods set forth or referred to in these Terms.</p>
      <h3>11.5. Notices</h3>
      <p>
        You agree that we may provide notices to you in the following ways: (a) a banner or other notice on our Website,
        or (b) an email sent to an address you provided, or (c) through other means including mobile number, telephone,
        or mail. It is your responsibility to keep your account information updated via your{' '}
        <Link routeParams={['contactInfo']}>My Account</Link> page (if applicable).
      </p>
      <h3>11.6. Translations</h3>
      <p>
        We may offer translated versions of our Website or these Terms. Any such translations are offered solely for
        convenience. You should not rely on any translated version of our Website or these Terms. If any questions arise
        concerning the accuracy or completeness of any translated version of our Website or these Terms, please refer to
        the English version, which is the official and authoritative version.
      </p>
      <h3>11.7. No Third-Party Beneficiaries</h3>
      <p>
        You understand and agree that, except as otherwise expressly stated in these Terms, these Terms create no
        third-party beneficiary rights.
      </p>
      <h3>11.8. No Joint Venture</h3>
      <p>
        You acknowledge and agree that no independent contractor, partnership, joint venture, employer-employee,
        principal-agent, or franchiser-franchisee relationship is intended or created by these Terms or your use of{' '}
        {companyName}’s Website. As such, you shall not have, or hold out to any third-party as having any authority to
        make any statements, representations, or commitments of any kind, or to take any action that shall be binding on{' '}
        {companyName}, except as provided herein or authorized in writing by {companyName}.
      </p>
      <h3>11.9. Waiver</h3>
      <p>
        {companyName}’s failure to enforce a provision of these Terms is not a waiver of its right to do so later. No
        waiver shall be binding on any party unless signed by the waiving party.
      </p>
      <h3>11.10. Severability</h3>
      <p>
        If any provision (or portion thereof) of these Terms is found by an arbitrator or a court of competent
        jurisdiction to be unenforceable, such provision (or portion thereof) will be modified so as to render it
        enforceable and effective to the maximum extent possible in order to effect the intention of the provision. If
        an arbitrator or a court finds the modified provision to be unenforceable, the enforceability of the remaining
        provisions of these Terms will not be affected in any way.
      </p>
      <h3>11.11. Entire Agreement</h3>
      <p>
        Except as otherwise specifically provided herein, these Terms constitute the entire agreement between you and{' '}
        {companyName} with respect to your use of the Website and replace and supersede any other prior or
        contemporaneous agreements or terms and conditions applicable to the subject matter of these Terms. There have
        been no representations, warranties, or promises outside of these Terms.
      </p>
      <h3>11.12. Contacting {companyName}</h3>
      <p>
        You may contact {companyName} in any of the following ways: <br />
        <br />
        <address className="mt-5">
          {companyName} <br />
          {address.street} <br />
          {address.city}, {address.state} {address.zip}
          <br />
          <a href={email.href}>{email.raw}</a>
          <br />
        </address>
      </p>
    </div>
  );
}

export default Terms;
