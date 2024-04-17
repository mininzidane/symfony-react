import React from 'react';
import classnames from 'classnames';
import BuyerPowerService from 'frontend/js/api/BuyerPowerService';
import useRevealOnScroll from 'frontend/js/hooks/useRevealOnScroll';
import Step from './Step';
import Card from './Card';
import Image from './Image';
import Step1Png from './img/Step_1@2x.png';
import Step2Png from './img/Step_2-1@2x.png';
import Step2Svg from './img/Step_2-2@2x.svg';
import Step3Png from './img/Step_3-3@2x.png';
import Step3Svg from './img/Step_3-1.svg';
import Step4Png from './img/Step_4-1@2x.png';
import Step5Png from './img/Step_5-1@2x.png';
import Step6Png from './img/Step_6-1@2x.png';
import Step7Png from './img/Step_7-1@2x.png';
import Step8Png from './img/Step_8-1@2x.png';
import Step9Png from './img/Step_9-1@2x.png';
import Step10Png from './img/Step_10-1@2x.png';
import CameraIconSvg from './img/Step_3-2.svg';
import useStyle from './useStyles';

function Steps() {
  const classes = useStyle();
  const ref = useRevealOnScroll();
  const minDeposit = `$${BuyerPowerService.minDepositAmount}`;
  return (
    <div ref={ref}>
      <Step
        title="How To Buy"
        isFirst
        content1={
          <Card
            className="with-right-tri"
            label="STEP 1"
            caption="Register at AutoBidMaster.com"
            description="First, you’ll need to register to bid. It’s free and you can click on any “Register Now” button to do so."
          />
        }
        content2={<Image className={classnames(classes.image, 'is-right', 'is-step1')} image={Step1Png} alt="STEP 1" />}
      />

      <Step
        content1={
          <Image className={classnames(classes.image, 'is-left', 'is-step2-left')} image={Step2Png} alt="STEP 2" />
        }
        content2={
          <>
            <Card
              className="with-left-tri"
              label="STEP 2"
              caption="Set Buyer Power"
              description={`Increase your security deposit at any time by logging in and going to Buyer Power in the main navigation. The minimum deposit is ${minDeposit}, or 10% (Depends on what is bigger) of the desired maximum bid.`}
            />
            <Image
              className={classnames(classes.image, 'is-step2-right')}
              image={Step2Svg}
              alt="STEP 2"
              width="392px"
            />
          </>
        }
      />

      <Step
        content1={
          <>
            <Card
              className="with-right-tri"
              label="STEP 3"
              caption="Upload your ID"
              description="To upload a government-issued photo ID: Log in and go to the “Documents and IDs” tab in the main menu and drag and drop the photograph of the government-issued photo ID or click “Upload File”."
            />
            <Image className={classnames(classes.image, 'is-step3')} image={Step3Svg} alt="STEP 3" width="490px" />
            <p className={classes.textPassport}>
              <img src={CameraIconSvg} alt="Camera" /> Take a picture of your passport and upload it.
            </p>
          </>
        }
        content2={<Image className={classnames(classes.image, 'is-right')} image={Step3Png} alt="STEP 3" />}
      />

      <Step
        content1={<Image className={classnames(classes.image, 'is-left')} image={Step4Png} alt="STEP 4" />}
        content2={
          <Card
            className="with-left-tri"
            label="STEP 4"
            caption="Check to see if the vehicle is eligible for export from the U.S."
            description="Vehicles are not eligible for export if the lot page “Ownership Doc Type” field shows: BOS / BILL OF SALE / JUNK / PARTS / SCRAP / LIEN. If the field shows “P” (Pending Title), it could take 30 days to receive your documents which in turn can delay your shipment for 30 days."
          />
        }
      />

      <Step
        content1={
          <Card
            className="with-right-tri"
            label="STEP 5"
            caption="Check the full price including fees"
            description="To see the price breakdown click on “Fees Calculator” in the Bid Information block on the Lot page. For Nigerian users, we have a special fee - $299 that doesn’t depend on the final bid amount."
          />
        }
        content2={
          <Image className={classnames(classes.image, 'is-step5')} image={Step5Png} alt="STEP 5" width="594px" />
        }
      />

      <Step
        content1={<Image className={classnames(classes.image, 'is-left')} image={Step6Png} alt="STEP 6" />}
        content2={
          <Card
            className="with-left-tri"
            label="STEP 6"
            caption="Check the price for shipping to Nigeria"
            description="This can be done in the Location and Shipping block on the lot page. The best shipping rates and options for Nigeria will be Georgia and New Jersey."
          />
        }
      />

      <Step
        content1={
          <Card
            className="with-right-tri"
            label="STEP 7"
            caption="Bid on a car and win it"
            description={
              <>
                To take part in a live auction you must submit an acceptable preliminary bid. Once the live auction
                begins, wait for your vehicle to go up for auction and bid. Good luck!
                <br />
                <br />
                Please Note: AutoBidMaster is registered as doing business in the State of Oregon, therefore all user
                bidding in the live auction will show as originating from the State of Oregon.
              </>
            }
          />
        }
        content2={<Image className={classnames(classes.image, 'is-right')} image={Step7Png} alt="STEP 7" />}
      />

      <Step
        content1={<Image className={classnames(classes.image, 'is-left')} image={Step8Png} alt="STEP 8" />}
        content2={
          <Card
            className="with-left-tri"
            label="STEP 8"
            caption="Pay for a lot you’ve won"
            description='If you are the High Bidder at auction end, you will receive an email notification for next steps, and an invoice attached. To see the final auction results; Log in go to “Bid Status” , and click "Lots Won" tab in the main menu.'
          />
        }
      />

      <Step
        content1={
          <Card
            className="with-right-tri"
            label="STEP 9"
            caption="Sign your documents to begin ownership transfer"
            description="Select the ownership document to be signed in the “Documents to Sign” section and provide all required electronic signatures."
          />
        }
        content2={<Image className={classnames(classes.image, 'is-right')} image={Step9Png} alt="STEP 9" />}
      />

      <Step
        content1={
          <Image className={classnames(classes.image, 'is-step10')} image={Step10Png} alt="STEP 10" width="562px" />
        }
        content2={
          <Card
            className="with-left-tri"
            label="STEP 10"
            caption="Order shipping"
            description="AutoBidMaster recommends customers to arrange to pick up with an experienced shipper. You can order shipping by clicking the “Place Order” button on the “Lots Won” tab on the ”Bid Status” page. See more info about Shipping on a dedicated page."
          />
        }
        isLast
      />
    </div>
  );
}

export default Steps;
