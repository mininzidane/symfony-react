import React from 'react';
import classnames from 'classnames';
import Container from 'frontend/js/components/Container';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import StepTitle from './StepTitle';
import StepPin from './StepPin';
import Step1CarsSvg from './img/step1_cars.svg';
import Step1AlertsSvg from './img/step1_alerts.svg';
import Step1MapSvg from './img/step1_map.svg';
import Step1MapSmSvg from './img/step1_map-sm.svg';
import Step2PicsSvg from './img/step2_pics.svg';
import Step3TruckSvg from './img/step3_truck.svg';
import Step4CarsSvg from './img/step4_cars.svg';
import Step5GarageSvg from './img/step5_garage.svg';
import Step5GarageSmSvg from './img/step5_garage-sm.svg';
import Step6ShipSvg from './img/step6_ship.svg';
import Step7CarsSvg from './img/step7_cars.svg';
import Step7CarsSmSvg from './img/step7_cars-sm.svg';
import Image20ftContainerSvg from './img/20-ft-container.svg';
import Image20ftContainerSmSvg from './img/20-ft-container-sm.svg';
import Image40ftContainerSvg from './img/40-ft-container.svg';
import Image40ftContainerSmSvg from './img/40-ft-container-sm.svg';
import useStyles from './useStyles';

function Detail() {
  const classes = useStyles();

  return (
    <ContainerFullScreen background={{ color: '#ECF4FA' }}>
      <Container className={classes.root}>
        <h3 className={classes.title}>Here Is How The Shipping Process Works</h3>

        <StepTitle title="STEP 1" subtitle="Before You Buy" />

        <div className={classnames(classes.stepWrapper, 'is-step1-section1')}>
          <div className={classes.stepContainer}>
            <img width="458px" height="257px" src={Step1CarsSvg} alt="Cars" />
          </div>
          <div className={classnames(classes.stepContainer, 'is-step-start')}>
            <StepPin className={classes.stepPin} />
            Check with the Nigerian Customs Service <br />
            about what you can or cannot import.
          </div>
        </div>
        <div className={classnames(classes.stepWrapper, 'is-step1-section2')}>
          <div className={classes.stepContainer}>
            Confirm the vehicle you buy has valid documentation for export. Do not buy a vehicle if the lot page
            “Ownership Doc Type” field shows: BOS/ BILL OF SALE / JUNK / PARTS / SCRAP / LIEN as those vehicles cannot
            be exported from the U.S. If you purchase a car with a “Pending” (P) title, there will be a 30-day delay on
            your shipment until the pending title is processed. Customs clearance and vessel loading will proceed only
            after title is received at the loading warehouse.
          </div>
          <div className={classnames(classes.stepContainer, 'is-step-mid')}>
            <StepPin className={classes.stepPin} />
            <img width="424px" height="286px" src={Step1AlertsSvg} alt="Alerts" />
          </div>
        </div>

        <div className={classnames(classes.stepWrapper, 'is-step1-section3')}>
          <div className={classes.stepContainer}>
            <div className="pb-25 md-up-hide" />
            <img className="md-hide" width="489px" height="271px" src={Step1MapSvg} alt="Map" />
            <img className="md-up-hide wide" src={Step1MapSmSvg} alt="Map" />
            <div className="pb-20 md-up-hide" />
          </div>
          <div className={classnames(classes.stepContainer, 'is-step-end')}>
            <StepPin className={classes.stepPin} />
            You can reduce the cost of shipping by looking for a vehicle close to the port of export.
          </div>
        </div>

        <StepTitle title="STEP 2" subtitle="Pay For Your Vehicle" />
        <div className={classnames(classes.stepWrapper, 'is-step2-section1')}>
          <div className={classnames(classes.stepContainer, 'grid-x ai-ct')}>
            <div>
              Payment must be received by the end of the 2nd business day from the auction end date. You must pay for
              your vehicle via bank wire as soon as possible to avoid late fees.
            </div>
          </div>
          <div className={classnames(classes.stepContainer, 'grid-x ai-ct', 'is-step-single')}>
            <StepPin className={classes.stepPin} />
            <img width="467px" height="106px" src={Step2PicsSvg} alt="Step 2 Pics" />
          </div>
        </div>

        <StepTitle title="STEP 3" subtitle="Vehicle Pick up" />
        <div className={classnames(classes.stepWrapper, 'is-step3-section1')}>
          <div className={classnames(classes.stepContainer, 'grid-x ai-ct jc-fe')}>
            <img
              style={{ margin: '-50px 35px 0 0' }}
              width="419px"
              height="260px"
              src={Step3TruckSvg}
              alt="Step 3 Truck"
            />
          </div>
          <div className={classnames(classes.stepContainer, 'is-step-single', 'grid-x ai-ct')}>
            <div>
              <StepPin className={classes.stepPin} />
              The invoice for your vehicle, and any outstanding fees, must be paid in full before we will arrange a
              driver to pick up your vehicle from the auction yard. Payment for shipping should be made together with
              vehicle payment or must be made by bank wire transfer within a week of your vehicle being picked up. Pick
              up can take 1- 7 days, the average pick up window is 2- 5 days.
            </div>
          </div>
        </div>

        <StepTitle title="STEP 4" subtitle="Delivery to Warehouse" />
        <div className={classnames(classes.stepWrapper, 'is-step4-section1')}>
          <div className={classnames(classes.stepContainer, 'grid-x ai-ct')}>
            <div>
              Delivery time from the auction yard to the export warehouse takes 7-10 days depending on route. When your
              vehicle arrives at the warehouse, additional photos of the vehicle will be taken and uploaded to your
              account, within 2 or 3 days.
              <br />
              <br />
              The carrier does not provide full insurance for your vehicle when shipping overseas. Contact us to
              purchase insurance for your vehicle during international shipping.
            </div>
          </div>
          <div className={classnames(classes.stepContainer, 'is-step-single', 'grid-x ai-ct')}>
            <img width="347px" style={{ marginLeft: 50 }} height="261px" src={Step4CarsSvg} alt="Step 4 Cars" />
            <StepPin className={classes.stepPin} />
          </div>
        </div>

        <StepTitle title="STEP 5" subtitle="Loading" />
        <div className={classnames(classes.stepWrapper, 'is-step5-section1')}>
          <div className={classnames(classes.stepContainer, 'grid-x ai-ct')}>
            <img className="md-hide" width="470px" height="271px" src={Step5GarageSvg} alt="Step 5 Garage" />
            <img className="md-up-hide" src={Step5GarageSmSvg} alt="Step 5 Garage" />
          </div>
          <div className={classnames(classes.stepContainer, 'is-step-single', 'grid-x ai-ct')}>
            <StepPin className={classes.stepPin} />
            <div>
              It will take 13-18 days from the time it is delivered to the export warehouse to loading the vehicle on
              the vessel. In most cases RORO will take your vehicle directly from the auction yard to the vessel for
              loading in about 5 days.
              <br />
              <br />
              We will work with customs to clear your vehicle for export, book shipping, load and onboard the container
              onto the shipping vessel. Once completed you will be notified by email and your account updated.
            </div>
          </div>
        </div>

        <div className={classnames(classes.stepWrapper, 'is-two-ways')}>
          <div className={classnames(classes.twoWaysCaption, 'pb-35 md-pb-15')}>
            Two Ways to Ship Your Car with AutoBidMaster
          </div>
          <div className="grid-x pb-45">
            <div className="xl-6 md-wide">
              <div className={classnames(classes.twoWaysTitle, 'pb-15 md-pb-0')}>Container Shipping</div>
              LCL (Less Container Load)
              <br />
              <span style={{ color: '#999999', fontSize: '14px' }}>“shared container space”</span>
              <br />
              Ports: California, Georgia, New Jersey
              <br />
              <br />
              FCL (Full Container Load)
              <br />
              Ports: California, Texas, Georgia, New Jersey
            </div>
            <div className="xl-6 md-wide">
              <div className={classnames(classes.twoWaysTitle, 'pb-15 md-pb-0 md-pt-15')}>RORO</div>
              Ports: Texas, Georgia, New Jersey
              <br />
              <br className="md-hide" />
              <div className="pb-10 md-up-hide" />
              <strong>Stipulations:</strong>
              <br />
              The car must run and drive, steer, and brake.
              <br />
              The car cannot: have any broken glass, deflated tires, sharp edges,
              <br />
              deployed airbags, or have anything inside the car (not even a bumper).
            </div>
          </div>
          <div className={classnames(classes.twoWaysCaption)}>40 FT Container</div>
          <div className="pb-35 md-wide">
            <img
              width="1040px"
              className="md-hide"
              style={{ margin: '25px 0 0 -45px' }}
              src={Image40ftContainerSvg}
              alt="40 FT container"
            />
            <img
              style={{ margin: '24px 0 0 -5px', width: '100%', maxWidth: '340px' }}
              className="md-up-hide"
              src={Image40ftContainerSmSvg}
              alt="40 FT container"
            />
          </div>
          <div className={classnames(classes.twoWaysCaption)}>20 FT Container</div>
          <div className="pb-35 md-wide md-pb-40">
            <img
              width="1040px"
              className="md-hide"
              style={{ margin: '25px 0 0 -45px' }}
              src={Image20ftContainerSvg}
              alt="20 FT container"
            />
            <img
              style={{ margin: '24px 0 0 -5px', width: '100%', maxWidth: '340px' }}
              className="md-up-hide"
              src={Image20ftContainerSmSvg}
              alt="20 FT container"
            />
          </div>
        </div>

        <StepTitle title="STEP 6" subtitle="Sailing" />
        <div className={classnames(classes.stepWrapper, 'is-step6-section1')}>
          <div className={classnames(classes.stepContainer, 'grid-x ai-ct')}>
            <div>
              Once your vehicle is loaded on the shipping vessel, we will provide a container or booking number to track
              your shipment. We will also update your account with estimated times of departure and arrival at the
              destination port.
              <br />
              <br />
              Sailing time varies by U.S. port of departure:
              <br />
              16 - 20 days from New Jersey and Savannah
              <br />
              40 - 45 days from Los Angeles
            </div>
          </div>
          <div className={classnames(classes.stepContainer, 'is-step-single', 'grid-x ai-ct')}>
            <img
              width="500px"
              height="219px"
              style={{ margin: '50px 0 0 -10px' }}
              src={Step6ShipSvg}
              alt="Step 6 Ship"
            />
            <StepPin className={classes.stepPin} />
          </div>
        </div>

        <StepTitle title="STEP 7" subtitle="Arrival at Destination Port" />
        <div className={classnames(classes.stepWrapper, 'is-step7-section1')}>
          <div className={classnames(classes.stepContainer, 'grid-x ai-ct')}>
            <img
              className="md-hide"
              style={{ marginTop: '-60px' }}
              width="464px"
              height="271px"
              src={Step7CarsSvg}
              alt="Step 7 Ship"
            />
            <img
              className="md-up-hide"
              style={{ margin: '10px 0 15px !important' }}
              src={Step7CarsSmSvg}
              alt="Step 7 Ship"
            />
          </div>
          <div className={classnames(classes.stepContainer, 'is-step-start', 'grid-x ai-ct')}>
            <StepPin className={classes.stepPin} />
            <div>
              When your vehicle arrives at the destination, an agent will contact your designated consignee to clear
              customs and pickup your shipment. Local customs and unloading fees will be charged at the destination
              port.
            </div>
          </div>
        </div>
      </Container>
    </ContainerFullScreen>
  );
}

export default Detail;
