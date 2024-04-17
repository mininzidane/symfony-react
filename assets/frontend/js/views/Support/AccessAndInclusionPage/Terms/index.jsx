import React from 'react';
import CompanyService from 'frontend/js/api/CompanyService';
import Link from 'frontend/js/components/Link';
import useStyles from './useStyles';

function Terms() {
  const classes = useStyles();
  const { address, officePhone } = CompanyService;

  return (
    <div className={classes.root}>
      <h2 className="title">Web Accessibility Statement</h2>

      <p>
        We recognize the importance of ensuring our websites are accessible to those with disabilities. We are committed
        to making our information accessible to visitors with disabilities and are actively working to increase the
        accessibility and usability of our website and in doing so adhere to many of the available standards and
        guidelines.
        <br />
        <br />
        This website endeavors to conform to{' '}
        <a href="https://www.w3.org/TR/WCAG20/">Web Content Accessibility Guidelines 2.0</a>. We strive to adhere to the
        accepted guidelines and standards for accessibility and usability as comprehensively as possible on this
        website. We have procedural safeguards to proactively scan our website and identify non-compliant elements or
        documents that need to be addressed, should accessibility issues arise in the future.
      </p>

      <h2 className="title">Employment and Notification of Non-discrimination</h2>
      <p>
        {`We are an equal opportunity employer. We do not discriminate on the basis of race, color, religion (creed),
        national origin, sex (including sexual orientation, transgender status, or gender identity), disability
        (including HIV, AIDS, or sickle cell trait), pregnancy, marital status, age, military status, ancestry, genetic
        information, or any other class which is protected by State and/or Federal law (collectively, "protected
        classes"). We are committed to providing an inclusive and welcoming environment.`}
      </p>

      <h2 className="title">Notice of Reasonable Accommodations to Applicants for Employment</h2>
      <p>
        Reasonable accommodations are available for persons with disabilities to complete the application and/or
        interview process. Applicants/individuals with disabilities requesting accommodations under the Americans with
        Disabilities Act (ADA) may contact us, as indicated below.
      </p>

      <h2 className="title">Contact Us</h2>
      <p>
        Should you experience any difficulty in accessing our website; should you have questions, complaints, or
        requests for additional information regarding accessibility, discrimination or harassment; or to make a request
        for accommodations for applications and/or interviews, please contact us via any of the methods below:
      </p>

      <div className="txt mt-35 sm-mb-0">
        <address>
          AutoBidMaster.com
          <br />
          Attention: General Counsel
          <br />
          {address.street}
          <br />
          {address.city}, {address.state}, {address.zip} USA
          <br />
          {officePhone.formatted}
          <br />
          <Link href="mailto:GeneralCounsel@AutoBidMaster.com">GeneralCounsel@AutoBidMaster.com</Link>
        </address>
      </div>
    </div>
  );
}

export default Terms;
