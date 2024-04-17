import React from 'react';
import CompanyService from 'frontend/js/api/CompanyService';
import Link from 'frontend/js/components/Link';
import useStyles from './useStyles';

function Terms() {
  const classes = useStyles();
  const { address, companyName, email, officePhone, officePhoneText } = CompanyService;

  return (
    <div className={classes.root}>
      <p className="last-update">Updated and Effective: February 21, 2020</p>
      <p>
        <strong>
          WELCOME! THANKS FOR USING AUTOBIDMASTER. BY USING AUTOBIDMASTER’S WEBSITE, MESSAGING PLATFORM, OR OTHER ONLINE
          PRODUCTS AND SERVICES (COLLECTIVELY “SERVICES”), YOU ACCEPT AND AGREE TO THE TERMS OF AUTOBIDMASTER’S PRIVACY
          POLICY. PLEASE READ AND REVIEW THE TERMS BELOW
        </strong>
      </p>
      <p>Definitions</p>
      <ul>
        <li>
          California Consumer Privacy Act (“CCPA”) means the California statute (Cal.Civ. Code Section 1798.100, et
          seq.) intended to enhance privacy rights and consumer protection for residents of California, United States.
        </li>
        <li>
          Personal Information means information that identifies, relates to, describes, is reasonably capable of being
          associated with, or could reasonably be linked, directly or indirection, with a particular consumer or
          household.
        </li>
        <li>You/Your/Yourself means Customers or Visitors.</li>
        <li>We/Us means AutoBidMaster, LLC.</li>
      </ul>

      <h2>1. Introduction</h2>
      <p>
        AutoBidMaster, LLC (“AutoBidMaster”) takes Your privacy seriously. This Privacy Policy covers how AutoBidMaster
        collects, uses, discloses, retains, and protects Your Personal Information.{' '}
        <strong>
          If You object to anything in this Privacy Policy, or otherwise do not understand or agree to be bound by the
          terms of this Privacy Policy, do not use AutoBidMaster’s Services.
        </strong>{' '}
        By using AutoBidMaster’s Services, You agree consent to this Privacy Policy, including the collection, use,
        disclosure, and sharing of Your Personal Information as further outlined in this Privacy Policy. You may print a
        copy of this Privacy Policy by using the print button or feature in Your browser. AutoBidMaster suggests
        retaining a copy for future reference.
      </p>
      <p>
        AutoBidMaster may change this Privacy Policy at any time without prior notice to You. You agree that
        AutoBidMaster may provide You with notice of such changes in any of the following ways: by requiring You to
        acknowledge and accept the revised version at Your next login, via email from AutoBidMaster, and/or by posting a
        change notice on AutoBidMaster’s Website for a reasonably limited time.{' '}
        <strong>
          It is Your responsibility to review any changes to this Privacy Policy. If You object to any of the changes to
          this Privacy Policy, or otherwise do not understand or agree to any of the changes to this Privacy Policy, do
          not use AutoBidMaster’s Services.
        </strong>{' '}
        By continuing to access or use AutoBidMaster’s Services following notice of any change to this Privacy Policy,
        You agree to and are bound by this Privacy Policy as changed.
      </p>
      <p>
        This Privacy Policy is incorporated into and is part of the AutoBidMaster{' '}
        <Link routeParams={['termsOfService']}>Terms of Service</Link>. Any terms not specifically defined herein shall
        have the meanings set forth in the Terms of Use. For the purposes of this Privacy Policy, “AutoBidMaster” means
        and includes AutoBidMaster and its affiliates, subsidiaries, investors, owners, members, shareholders, officers,
        directors, employees, agents, representatives, and assigns.
      </p>
      <h2>2. Information Collection and Use</h2>
      <h3>2.1. Generally</h3>
      <p>
        This Privacy Policy covers how AutoBidMaster collects, uses, discloses, retains, processes and protects Your
        Personal Information. The provision of Your Personal Information is a requirement necessary to enter into a
        contract. If You fail to provide Your Personal Information, we are unable to provide You with our Services.
        AutoBidMaster collects Personal Information from You and the devices (including mobile devices) You use to
        access AutoBidMaster’s Services. Categories of Personal Information that AutoBidMaster collects includes without
        limitation: (a) identifying information such as Your name, address, email address, phone number, and driver’s
        license; (b) bidding, buying, selling, and other transaction information; (c) financial information such as
        credit card or bank account numbers; (d) other information You provide to AutoBidMaster through Your use of
        AutoBidMaster’s Services; and (e) other information AutoBidMaster is required or authorized by applicable law to
        collect to identify You or verify other information collected.
      </p>
      <p>
        AutoBidMaster collects Your Personal Information to (a) provide You with access to and use of AutoBidMaster’s
        Services, (b) operate, improve, and personalize AutoBidMaster’s Services, (c) contact You regarding Your use of
        the Services, (d) provide You with customer service and support, (e) customize AutoBidMaster’s advertising and
        marketing, (f) facilitate interaction with third-party widgets on our Site, (g) monitor and analyze trends,
        usage, and activities in connection with the Site and or Services, (h)() to detect, prevent, and mitigate
        fraudulent or illegal activities, and (i) carry out any other purpose described to you at the time the
        information as collected.
      </p>
      <p>We process Your Personal Information on the following lawful bases:</p>
      <ul>
        <li>
          your consent, which You provide when You register at our website to use AutoBidMaster’s Services. You may
          withdraw Your consent by contacting us; however, if You do so, we might not be able to provide You
          AutoBidMaster’s Services further. Please note that this does not affect the lawfulness of processing based on
          consent before its withdrawal, and that we may have other lawful bases for processing Your Personal
          Information;
        </li>
        <li>processing is necessary for the performance of the contract between you and us;</li>
        <li>processing is necessary for compliance with a legal obligation to which we are subject</li>
        <li>
          processing is necessary for the purposes of our legitimate interests to develop our business, except where
          such interests are overridden by your interests or fundamental rights and freedoms.
        </li>
      </ul>
      <p>We do not use automated processing or profiling in processing Your Personal Information.</p>
      <p>
        AutoBidMaster is the data controller of Your Personal Information, our details are listed at the end of this
        Privacy Policy
      </p>
      <h3>2.2. Tracking Technologies and Cookies</h3>
      <p>
        As is true of most websites, AutoBidMaster automatically collects certain Personal Information from You and Your
        devices (including mobile devices) and stores it in log files. Categories of Personal Information that
        AutoBidMaster collects in this manner include without limitation: (a) internet protocol (IP) addresses, (b)
        browser type, (c) internet service provider (ISP), (d) referring/exit pages, (e) operating system, (f) date/time
        stamp, and (g) clickstream data. AutoBidMaster uses this Personal Information and technologies such as beacons,
        tags and scripts to analyze trends, to administer AutoBidMaster’s Services, to track Your movements around the
        Website, and to gather demographic information about AutoBidMaster’s member base as a whole.
      </p>
      <p>
        We may also obtain Personal Information from other sources and combine that with information we collect through
        our Services. For example, we may collect information about You from third parties, including but not limited to
        affiliated entities, our vendors, identification verification services, mailing list providers, marketing
        agencies, and publicly available sources
      </p>
      <p>
        AutoBidMaster may place a text file called a “cookie” in the browser files of Your computer. The cookie itself
        does not contain Personal Information, but it will enable AutoBidMaster to relate Your use of AutoBidMaster’s
        Website to Personal Information that You have specifically, voluntarily, and knowingly provided to
        AutoBidMaster. But the only Personal Information a cookie can contain is information that You supply Yourself. A
        cookie cannot read data off Your hard disk or read other cookie files created by other websites. AutoBidMaster
        may use cookies to track Your traffic patterns (as described above). In addition, AutoBidMaster uses encrypted
        cookies to authenticate Your identify on each page after You log on to the Website. You can refuse cookies by
        turning them off in Your browser. If You have set Your browser to warn You before accepting cookies, You will
        receive the warning message with each cookie. Some of AutoBidMaster’s Services may not function properly if Your
        cookies are disabled. We may also web beacons, which are electronic images that maybe be used in our Services or
        emails and they help deliver cookies, count visits and help Us understand usage and campaign effectiveness.
      </p>
      <p>
        The use of cookies by third-parties is not covered by this Privacy Policy. AutoBidMaster does not have access or
        control over these third-party cookies. These third-parties use session ID cookies to make it easier for You to
        navigate AutoBidMaster’s Website.
      </p>
      <p>
        Our third-party partners employ clear gifs (a.k.a. Web Beacons/Web Bugs), images, tags, and scripts that help
        them better manage content on AutoBidMaster’s Website. AutoBidMaster ties the information gathered by these
        third-party partners to Your Personal Information.
      </p>
      <h3>2.3. Google AdSense</h3>
      <p>
        AutoBidMaster may use Google AdSense to publish ads on the Website. When You view or click on an ad, a cookie
        will be set to help better provide advertisements that may be of interest to You on AutoBidMaster’s Website and
        other websites. You may opt-out of the use of this cookie by visiting{' '}
        <a href="http://www.google.com/privacy_ads.html">Google’s Advertising and Privacy page</a>.
      </p>
      <h3>2.4. Facebook Connect or Other OpenID Providers</h3>
      <p>
        You can register and log in to AutoBidMaster’s Website using third-party sign-in services such as Facebook
        Connect or an Open ID provider. These services will authenticate Your identity and provide You the option to
        share certain Personal Information with AutoBidMaster to pre-populate AutoBidMaster’s registration form.
        Services like Facebook Connect give You the option to post information about Your activities on this Website to
        Your profile page to share with others within Your network.
      </p>
      <h3>2.5. Social Media Widgets</h3>
      <p>
        AutoBidMaster’s Website may include social media features and other widgets, such as the Facebook “Like” button,
        the “Share This” button, and other interactive mini-programs that run on AutoBidMaster’s Website. These features
        may collect Your Personal Information including without limitation Your IP address and which page(s) You are
        visiting on the Website, and may set a cookie to enable the feature(s) to function properly. Social media
        features and widgets are either hosted by a third-party or hosted directly on the Website. Your interactions
        with these features are governed by the privacy policy of the company providing it and not by this Privacy
        Policy.
      </p>
      <h3>2.6. AddThis Bookmark</h3>
      <p>
        When You use “AddThis” to bookmark and share AutoBidMaster’s Services or Website, You will be taken to a
        third-party website. Please note that the third-party’s privacy policy governs the collection and use of the
        Personal Information collected on those third-party websites. If You use the AddThis widget to tell Your friends
        about AutoBidMaster’s Services or Website, You will need to provide Your friend’s email address. AutoBidMaster
        has no access to this third-party information.
        <br />
        Please read the <a href="http://www.addthis.com/privacy/privacy-policy">AddThis privacy policy</a> to learn more
        about its privacy practices.
      </p>
      <h3>2.7. Links to Other Sites</h3>
      <p>
        AutoBidMaster’s Website may contain links to other third-party websites that are not owned or controlled by
        AutoBidMaster. Please be aware that AutoBidMaster is not responsible for the privacy practices of these
        third-party websites. AutoBidMaster encourages You to be aware when You leave AutoBidMaster’s Website and to
        read the privacy policies of each and every third-party website that collects and/or uses Your Personal
        Information.
      </p>
      <h3>2.8 Advertising and Analytics Provided by Others</h3>
      <p>
        We may also allow others to provide analytic services and serve advertisements on our behalf across the internet
        and in applications. These entities may use cookies, beacons, device identifiers, etc. This information may be
        used by AutoBidMaster and others to, among other things, analyze and track data, determine the popularity of
        certain content, deliver advertising and content targeted to your interests on the Services and other websites
        and better understand your online activity.
      </p>
      <h2>3. Information Storage, Sharing and Disclosure</h2>
      <p>
        Your Personal Information is stored and processed on computers and servers in the United States and through Your
        use of the Site and or Services, you consent to the processing, transfer, and storage of your Personal
        Information. We are based in the United States and the information we collect is governed by United States law.
        You understand that Your Personal Information may be transferred to or maintained on, computers located outside
        of your state, province, country or other governmental jurisdiction. If you are located outside the United
        States and choose to provide Personal Information to us, note that we transfer your Personal Information to the
        United States and process and store it in the United States.
      </p>
      <p>
        AutoBidMaster does not share Your Personal Information with third-parties or nonaffiliated entities except in
        the following circumstances: (a) when AutoBidMaster has Your permission or pursuant to Your request; (b) to
        process or facilitate Your shipment of any vehicle through AutoBidMaster’s Services; (c) to state, federal, or
        other administrative and/or regulatory agencies as part of the title or ownership transfer process; (d) in
        response to subpoenas, court orders, or other legal, administrative, regulatory, arbitration or similar process;
        (e) to establish or exercise AutoBidMaster’s, or an affiliate of AutoBidMaster’s, rights and/or defend against
        claims; (f) or if AutoBidMaster believes that doing so is required or is in AutoBidMaster’s best interest to
        protect its rights or the rights of others affiliated with AutoBidMaster.
      </p>
      <p>
        If AutoBidMaster is acquired by or merges with another company, to the extent permitted by applicable law, You
        agree that AutoBidMaster may transfer Your Personal Information to such company. In this event, AutoBidMaster
        will notify You by email/or a prominent notice on the Website of any choices You may have regarding Your
        Personal Information before Your Personal Information is transferred and becomes subject to a different privacy
        policy.
      </p>
      <p>The categories of third parties with whom we may share Your Personal Information are:</p>
      <ul>
        <li>Service providers which we use to monitor and analyze the use of our Services;</li>
        <li>
          Our affiliates, include any subsidiaries, joint venture partners or other companies that we control or that
          are under common control;
        </li>
        <li>Our business partners to offer You certain products, services or promotions.</li>
      </ul>
      <p>
        Some of the parties with whom we share Your Personal Information, may be located outside the United States, in
        the European Union, or outside the European Union. The privacy protections and rights of authorities to access
        Your Personal Information in these countries may not be equivalent to those in the jurisdiction where You are
        located. We will only transfer Your Personal Information to these countries where permitted to do so by law and
        we will take steps intended to ensure that Your Personal Information continues to receive appropriate
        protections. Through Your use of the Site and / or Services, you consent to such transfers of Your Personal
        Information.
      </p>
      <h2>4. Data Retention</h2>
      <p>
        AutoBidMaster will retain Your Personal Information as long as the legal basis for processing is applicable. For
        example, we will do so as long as it is necessary and relevant to provide You with AutoBidMaster’s Services.
        Additionally, AutoBidMaster will retain Personal Information from closed or cancelled member accounts to comply
        with legal and regulatory obligations, resolve disputes and claims, prevent fraud, collect any fees owed, assist
        with any investigation, and enforce this Privacy Policy and the AutoBidMaster Terms of Use and take any other
        actions permitted by law.
      </p>
      <h2>5. Confidentiality and Security</h2>
      <p>
        AutoBidMaster takes Your security seriously and takes reasonable steps to protect Your Personal Information.
        AutoBidMaster uses Secure Socket Layer (“SSL”) encryption when transmitting certain kinds of Personal
        Information, such as financial and other sensitive information. An icon resembling a padlock is displayed on the
        bottom of most browser windows during SSL transactions that involve credit cards and other forms of payment. Any
        time AutoBidMaster asks You for driver’s license number or a credit card number for payment or for verification
        purposes, it will be SSL encrypted. The Personal Information You provide will be stored securely on
        AutoBidMaster’s servers. However, no method of transmission over the internet or method of electronic storage is
        100% secure. Therefore, AutoBidMaster cannot guarantee its absolute security.
      </p>
      <p>
        If AutoBidMaster learns of a security systems breach, AutoBidMaster may attempt to notify You electronically so
        that You can take appropriate protective steps. By using AutoBidMaster’s Services or otherwise providing
        Personal Information to AutoBidMaster, You agree that AutoBidMaster can communicate with You electronically
        regarding security, privacy, and administrative issues relating to Your use of AutoBidMaster’s Services.
        AutoBidMaster may post a notice on the Website if a security breach occurs. AutoBidMaster may also send an email
        to You at the email address You have provided in these circumstances. Depending on where You live, You may have
        a legal right to receive notice of a security breach in writing. To receive free written notice of a security
        breach (or to withdraw Your consent from receiving electronic notice) You should notify AutoBidMaster at{' '}
        {email.raw}.
      </p>
      <h2>6. Communications</h2>
      <p>
        If You no longer wish to receive AutoBidMaster’s newsletter and other promotional communications, You may
        opt-out by following the instructions included in each communication. AutoBidMaster reserves the right to send
        You certain communications relating to AutoBidMaster’s Services, including without limitation notifications,
        service announcements administrative messages, and other messages regarding our ongoing business relations.
        Generally, You may not opt-out of these communications, which are not promotional in nature. If an opt-out
        option is available, You may opt-out by following the instructions included in each communication.
      </p>

      <h2>7. Your Rights</h2>
      <p>
        Under applicable personal data protection laws, You may have certain statutory rights in regards to Your
        Personal Information. Such rights include:
      </p>
      <ul>
        <li>The right to be informed about how we process your Personal Information;</li>
        <li>
          The right to access your Personal Information and information about how your Personal Information is being
          processed;
        </li>
        <li>The right to have your Personal Information rectified if it is inaccurate or incomplete;</li>
        <li>The right to object to certain activities in relation to your Personal Information;</li>
        <li>
          The right to obtain (in a machine-readable format) under certain conditions and use your Personal Information
          for your own purposes;
        </li>
        <li>The right to request that your data be erased under certain conditions and all dissemination ceased;</li>
        <li>The right to restrict the processing of your Personal Information in specific cases;</li>
        <li>
          The right to not be subjected to a decision when it is based on automated processing or profiling, and it
          produces a legal or a similarly significant effect on the user.
        </li>
      </ul>
      <p>To exercise any of these rights, please write to us at hello@autobidmaster.com.</p>
      <p>
        Additionally, You have the right to lodge a complaint with a relevant supervisory authority; However, we would
        appreciate the chance to deal with Your concern before You approach a supervisory authority so please contact us
        in the first instance.
      </p>
      <p>
        Please note that the specific list and scope of your rights depends on your jurisdiction. Please consult your
        local data protection laws to determine what rights may be available to You and when access to these rights is
        limited.
      </p>

      <h2>8. California residents Privacy Rights Under CCPA</h2>
      <p>Under the CCPA, California residents have the following rights:</p>
      <p>
        <strong>8.1 Right to know how Personal Information is Collected, Disclosed, or Sold.</strong> You have the right
        to request that AutoBidMaster disclose Personal Information of Yours that We collected, used, disclosed, and
        sold over the last twelve (12) months.
      </p>
      <p>
        <strong>8.2 Right to have Personal Information Deleted.</strong> You have the right to request that
        AutoBidMaster delete any of your Personal Information that we collected from you, once all transactions between
        the parties are complete.
      </p>
      <p>
        <strong>8.3 Right to Opt-Out of Sale of Personal Information.</strong> AutoBidMaster does not sell Personal
        Information, therefore it is not necessary to opt-out of the sale of Personal Information.
      </p>
      <p>
        <strong>8.4 Right to Non-Discrimination.</strong> AutoBidMaster does not discriminate against California
        residents for exercising their rights under the CCPA.
      </p>
      <p>
        <strong>8.5 How to exercise Your rights under the CCPA.</strong> To exercise your rights under the CCPA, You
        must submit a request to AutoBidMaster by contacting us at {email.raw}. When exercising Your rights under the
        CCPA, We will verify Your identity either directly or using a third-party verification service.{' '}
      </p>
      <p>
        <strong>8.6 California Shine the Light Law.</strong> Under California’s “Shine the Light Law” California
        residents have identifies any third-party companies or individuals that AutoBidMaster has shared your Personal
        Information with in the previous calendar year, as well as a description of the categories of Personal
        Information disclosed to that third party. You may obtain this information once a year and free of charge by
        contacting AutoBidMaster in writing at the address below.
      </p>
      <h2>9. Children’s Online Privacy Protection Act</h2>
      <p>
        The Site and Services are not intended for or directed to users under the age of 18. You must be at least 18
        years old to become a member of our Services. We do not knowingly or intentionally collect Personal Information
        from children under the age of 13 or other minors. Where appropriate, AutoBidMaster takes reasonable measures to
        determine that users are adults of legal age and to inform minors not to submit such information to the Website
        or in response to advertisements. If you are concerned that Personal Information may have been inadvertently
        provided to or collected by AutoBidMaster, please contact us immediately so appropriate steps may be taken to
        remove such information from AutoBidMaster’s database.
      </p>
      <h2>10. Contacting AutoBidMaster</h2>
      <p>
        If You have questions or concerns regarding this Privacy Policy, please contact AutoBidMaster using the contact
        information:
      </p>
      <address style={{ marginTop: 20 }}>
        {companyName} <br />
        {address.street} <br />
        {address.city}, {address.state} {address.zip}
        <br />
        {officePhone.formatted} phone
        <br />
        {officePhoneText.formatted} text
        <br />
        <a href={email.href}>{email.raw}</a>
        <br />
      </address>
    </div>
  );
}

export default Terms;
