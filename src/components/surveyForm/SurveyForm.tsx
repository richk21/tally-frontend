import { useEffect, useState } from 'react';
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slider,
} from '@mui/material';
import { Tooltip } from '@progress/kendo-react-tooltip';
import { TextArea } from '@progress/kendo-react-inputs';
import { Loader } from '@progress/kendo-react-indicators';
import './surveyForm.scss';
import ExpandIcon from '../../assets/icons/expand.png';
import { InputField } from '../inputField/InputField';
import { Dropdown } from '../dropdown/Dropdown';
import { ButtonComponent } from '../button/Button';
import CheckIcon from '@mui/icons-material/Check';
import { default as PersonIcon } from '@mui/icons-material/PersonOutlined';
import { default as LocationOnIcon } from '@mui/icons-material/LocationOnOutlined';
import { default as StarIcon } from '@mui/icons-material/StarRate';
import { default as StorefrontIcon } from '@mui/icons-material/Storefront';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import { Typography as KendoTypography } from '@progress/kendo-react-common';
import { Notifications } from '../notification/Notifications';
import { addSurvey } from '../../api/SurveyApi';
import { INotification } from '../../interfaces/Notification';
import { ISurvey } from '../../interfaces/Survey';
import { getAllLocalities } from '../../api/LocalitiesApis';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import { getUserLocationByIP } from '../../api/geolocationApi';

export const SurveyForm = () => {
  //dropdown options
  const occupations = ['Engineer', 'Doctor', 'Teacher', 'Business', 'Other'];
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [areas, setAreas] = useState<string[]>([]);
  const [pincodes, setPincodes] = useState<string[]>([]);
  // State for required fields
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [occupation, setOccupation] = useState('');
  const [stateVal, setStateVal] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [pincode, setPincode] = useState('');

  // Ratings state
  const [cleanliness, setCleanliness] = useState<number>(1);
  const [waterQuality, setWaterQuality] = useState<number>(1);
  const [affordability, setAffordability] = useState<number>(1);
  const [safety, setSafety] = useState<number>(1);
  const [airQuality, setAirQuality] = useState<number>(1);
  const [noiseLevel, setNoiseLevel] = useState<number>(1);
  const [roadQuality, setRoadQuality] = useState<number>(1);
  const [internetQuality, setInternetQuality] = useState<number>(1);

  const [hospitalAmenities, setHospitalAmenities] = useState<number>(1);
  const [groceryStoresAmenities, setGroceryStoresAmenities] =
    useState<number>(1);
  const [vegetableMarketAmenity, setVegetableMarketAmenity] =
    useState<number>(1);
  const [publicTransportAmenity, setPublicTransportAmenity] =
    useState<number>(1);
  const [recreationAmenity, setRecreationAmenity] = useState<number>(1);
  const [schoolsAmenity, setSchoolsAmenity] = useState<number>(1);

  //comments
  const [comments, setComments] = useState('');

  const [expandedPanel, setExpandedPanel] = useState<string | false>(
    'userInfo'
  );

  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<INotification | null>();

  // Validation → disable submit if any required field is empty
  const isFormValid =
    age.trim() !== '' &&
    occupation.trim() !== '' &&
    stateVal.trim() !== '' &&
    city.trim() !== '' &&
    area.trim() !== '' &&
    pincode.trim() !== '';

  const isUserInfoComplete = age.trim() !== '' && occupation.trim() !== '';
  const isLocalityInfoComplete =
    stateVal.trim() !== '' &&
    city.trim() !== '' &&
    area.trim() !== '' &&
    pincode.trim() !== '';
  const isRatingsComplete =
    cleanliness !== null &&
    waterQuality !== null &&
    affordability !== null &&
    safety !== null &&
    airQuality !== null &&
    noiseLevel !== null &&
    roadQuality !== null &&
    internetQuality !== null;
  const isAmenitiesComplete =
    hospitalAmenities !== null &&
    groceryStoresAmenities !== null &&
    vegetableMarketAmenity !== null &&
    publicTransportAmenity !== null &&
    recreationAmenity !== null &&
    schoolsAmenity !== null;
  const isCommentsComplete = comments !== null;

  useEffect(() => {
    getUserLocationByIP().then((loc) => {
      setCity(loc.city);
      setStateVal(loc.state);
      setPincode(loc.postcode);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    const formData: ISurvey = {
      name,
      age: Number(age),
      occupation,
      locality: {
        state: stateVal,
        city,
        area,
        pincode: pincode,
      },
      ratings: {
        cleanliness,
        waterQuality,
        affordability,
        safety,
        airQuality,
        noiseLevel,
        roadQuality,
        internetQuality,
      },
      amenities: {
        hospital: hospitalAmenities,
        groceryStore: groceryStoresAmenities,
        vegetableVendor: vegetableMarketAmenity,
        publicTransport: publicTransportAmenity,
        recreation: recreationAmenity,
        schools: schoolsAmenity,
      },
      comments,
      createdAt: new Date(),
    };

    setIsLoading(true);
    setNotification(null);

    try {
      await addSurvey(formData);
      setNotification({
        message: 'Form submitted successfully!',
        type: 'inverse',
      });
    } catch (error) {
      setNotification({
        message: 'Failed to submit form',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function fetchLocalities() {
      try {
        const data = await getAllLocalities();
        setStates(data.states);
        setCities(data.cities);
        setAreas(data.areas);
        setPincodes(data.pincodes);
      } catch (e) {
        console.error('Failed to load localities', e);
      }
    }

    fetchLocalities();
  }, []);
  const handleAccordionChange =
    (panel: string) => (_: unknown, isExpanded: boolean) => {
      if (!isExpanded) return;
      setExpandedPanel(panel);
    };

  return (
    <>
      {isLoading ? (
        <div className="loader-container">
          <Loader size="large" type="infinite-spinner" themeColor="dark" />
        </div>
      ) : (
        <Box className="survey-form">
          <Box display="flex" justifyContent="center" mb={2}>
            <AssignmentOutlinedIcon
              fontSize="large"
              sx={{ color: '#2f123d' }}
            />
          </Box>
          <Box sx={{ mt: 10, textAlign: 'center' }}>
            <KendoTypography.h4 className="form-title">
              {`How's your Neighbourhood?`}
            </KendoTypography.h4>
            <KendoTypography.h6 className="form-sub-title">
              Help us understand your neighbourhood better. Share your thoughts
              and help the community.
            </KendoTypography.h6>
          </Box>

          <form onSubmit={handleSubmit}>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
              className="form-grid"
            >
              {/* User Info Accordion */}
              <Accordion
                className={`survey-form-accordion ${
                  expandedPanel === 'userInfo' ? 'expanded' : ''
                }`}
                defaultExpanded
                expanded={expandedPanel === 'userInfo'}
                onChange={handleAccordionChange('userInfo')}
              >
                <AccordionSummary
                  expandIcon={
                    <img
                      src={ExpandIcon}
                      alt="expand"
                      className="expand-icon"
                    />
                  }
                  sx={{ backgroundColor: '#2f123d', color: '#fff' }}
                >
                  <div className="accordion-header">
                    <div className="accordion-header-title">
                      <PersonIcon
                        fontSize="small"
                        sx={{ mr: 3, color: '#2f123d' }}
                      />
                      <Tooltip
                        openDelay={100}
                        position="right"
                        anchorElement="target"
                      >
                        <div style={{ textAlign: 'center' }}>
                          <span title="Fill in your personal details. Name is optional">
                            Your Info
                          </span>
                        </div>
                      </Tooltip>
                    </div>
                    {isUserInfoComplete && (
                      <CheckIcon
                        sx={{
                          color: '#18181b',
                          ml: 1,
                          fontSize: '1.2rem',
                          marginRight: '10px',
                        }}
                      />
                    )}
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  {/* Name (optional) */}
                  <div className="accordion-container">
                    <div className="field-section-container">
                      <Box
                        sx={{ width: '100%' }}
                        className="form-field name-field"
                      >
                        <InputField
                          inputFieldLabel="Name"
                          placeholder="Enter your name"
                          value={name}
                          onChange={(e) => setName(e.value)}
                          required={false}
                        />
                      </Box>
                      {/* Age */}
                      <Box
                        sx={{ width: '100%' }}
                        className="form-field age-field"
                      >
                        <InputField
                          type="number"
                          placeholder="Enter your age"
                          inputFieldLabel="Age"
                          value={age}
                          maxValue={150}
                          onChange={(e) => setAge(e.value)}
                        />
                      </Box>
                      {/* Occupation */}
                      <Box
                        sx={{ width: '100%' }}
                        className="form-field occupation-field"
                      >
                        <Dropdown
                          alphabetic
                          name="Occupation"
                          optionsList={occupations}
                          value={occupation}
                          onChange={(e) => setOccupation(e.value)}
                          required
                          placeholder="Select Occupation"
                        />
                      </Box>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>

              {/* Locality Accordion */}
              <Accordion
                className={`survey-form-accordion ${
                  expandedPanel === 'localityInfo' ? 'expanded' : ''
                }`}
                expanded={expandedPanel === 'localityInfo'}
                onChange={handleAccordionChange('localityInfo')}
              >
                <AccordionSummary
                  expandIcon={
                    <img
                      src={ExpandIcon}
                      alt="expand"
                      className="expand-icon"
                    />
                  }
                  sx={{ backgroundColor: '#2f123d', color: '#fff' }}
                >
                  <div className="accordion-header">
                    <div className="accordion-header-title">
                      <LocationOnIcon
                        fontSize="small"
                        sx={{ mr: 3, color: '#2f123d' }}
                      />
                      <Tooltip
                        openDelay={100}
                        position="right"
                        anchorElement="target"
                      >
                        <div style={{ textAlign: 'center' }}>
                          <span title="Fill in details about where you live.">
                            About your Locality
                          </span>
                        </div>
                      </Tooltip>
                    </div>
                    {isLocalityInfoComplete && (
                      <CheckIcon
                        sx={{
                          color: '#18181b',
                          ml: 1,
                          fontSize: '1.2rem',
                          marginRight: '10px',
                        }}
                      />
                    )}
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="accordion-container">
                    <div className="field-section-container">
                      <Box
                        sx={{ width: '100%' }}
                        className="form-field state-field"
                      >
                        <Dropdown
                          alphabetic
                          name="State"
                          optionsList={states}
                          value={stateVal}
                          onChange={(e) => setStateVal(e.value)}
                          required
                          placeholder="Select your state"
                        />
                      </Box>
                      <Box
                        sx={{ width: '100%' }}
                        className="form-field city-field"
                      >
                        <Dropdown
                          alphabetic
                          name="City"
                          optionsList={cities}
                          value={city}
                          onChange={(e) => setCity(e.value)}
                          required
                          placeholder="Select your city"
                        />
                      </Box>
                      <Box
                        sx={{ width: '100%' }}
                        className="form-field area-field"
                      >
                        <Dropdown
                          alphabetic
                          name="Area"
                          optionsList={areas}
                          value={area}
                          onChange={(e) => setArea(e.value)}
                          required
                          placeholder="Select your area"
                        />
                      </Box>
                      <Box
                        sx={{ width: '100%' }}
                        className="form-field pincode-field"
                      >
                        <Dropdown
                          name="Pincode"
                          optionsList={pincodes}
                          value={pincode}
                          onChange={(e) => setPincode(e.value)}
                          required
                          placeholder="Select your pincode"
                          numeric
                          maxLength={6}
                        />
                      </Box>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>

              {/* Ratings Accordion */}
              <Accordion
                className={`survey-form-accordion ${
                  expandedPanel === 'ratings' ? 'expanded' : ''
                }`}
                expanded={expandedPanel === 'ratings'}
                onChange={handleAccordionChange('ratings')}
              >
                <AccordionSummary
                  expandIcon={
                    <img
                      src={ExpandIcon}
                      alt="expand"
                      className="expand-icon"
                    />
                  }
                  sx={{ backgroundColor: '#2f123d', color: '#fff' }}
                >
                  <div className="accordion-header">
                    <div className="accordion-header-title">
                      <StarIcon
                        fontSize="small"
                        sx={{ mr: 3, color: '#2f123d' }}
                      />
                      <Tooltip
                        openDelay={100}
                        position="right"
                        anchorElement="target"
                      >
                        <div style={{ textAlign: 'center' }}>
                          <span title="How much would you rate the following factors in your locality out of 5?">
                            Quality Factors
                          </span>
                        </div>
                      </Tooltip>
                    </div>
                    {isRatingsComplete && (
                      <CheckIcon
                        sx={{
                          color: '#18181b',
                          fontSize: '1.2rem',
                          marginRight: '10px',
                        }}
                      />
                    )}
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="accordion-container">
                    <div className="field-section-container">
                      {[
                        {
                          label: 'Cleanliness',
                          value: cleanliness,
                          setter: setCleanliness,
                        },
                        {
                          label: 'Water Quality',
                          value: waterQuality,
                          setter: setWaterQuality,
                        },
                        {
                          label: 'Affordability',
                          value: affordability,
                          setter: setAffordability,
                        },
                        { label: 'Safety', value: safety, setter: setSafety },
                        {
                          label: 'Air Quality',
                          value: airQuality,
                          setter: setAirQuality,
                        },
                        {
                          label: 'Noise Level',
                          value: noiseLevel,
                          setter: setNoiseLevel,
                        },
                        {
                          label: 'Road Quality',
                          value: roadQuality,
                          setter: setRoadQuality,
                        },
                        {
                          label: 'Internet Quality',
                          value: internetQuality,
                          setter: setInternetQuality,
                        },
                      ].map((r) => (
                        <Box
                          key={r.label}
                          sx={{ width: '100%', marginBottom: '1rem' }}
                          className="rating-field"
                        >
                          <div>{r.label}</div>
                          <Slider
                            value={r.value || 0}
                            onChange={(_, val) => r.setter(val as number)}
                            step={1}
                            min={0}
                            max={5}
                            marks
                            valueLabelDisplay="auto"
                            sx={{
                              margin: '30px',
                              color: '#2f123d',
                              width: '80%',
                            }}
                          />
                        </Box>
                      ))}
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>

              {/* Amenities Accordion */}
              <Accordion
                className={`survey-form-accordion ${
                  expandedPanel === 'amenities' ? 'expanded' : ''
                }`}
                expanded={expandedPanel === 'amenities'}
                onChange={handleAccordionChange('amenities')}
              >
                <AccordionSummary
                  expandIcon={
                    <img
                      src={ExpandIcon}
                      alt="expand"
                      className="expand-icon"
                    />
                  }
                  sx={{ backgroundColor: '#2f123d', color: '#fff' }}
                >
                  <div className="accordion-header">
                    <div className="accordion-header-title">
                      <StorefrontIcon
                        fontSize="small"
                        sx={{ mr: 3, color: '#2f123d' }}
                      />
                      <Tooltip
                        openDelay={100}
                        position="right"
                        anchorElement="target"
                      >
                        <div style={{ textAlign: 'center' }}>
                          <span title="How much would you rate the following amenities in your locality out of 5?">
                            Amenities Ratings
                          </span>
                        </div>
                      </Tooltip>
                    </div>
                    {isAmenitiesComplete && (
                      <CheckIcon
                        sx={{
                          color: '#18181b',
                          ml: 1,
                          fontSize: '1.2rem',
                          marginRight: '10px',
                        }}
                      />
                    )}
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="accordion-container">
                    <div className="field-section-container">
                      {[
                        {
                          label: 'Hospital Amenities',
                          value: hospitalAmenities,
                          setter: setHospitalAmenities,
                        },
                        {
                          label: 'Grocery Stores Amenities',
                          value: groceryStoresAmenities,
                          setter: setGroceryStoresAmenities,
                        },
                        {
                          label: 'Vegetable Market Amenity',
                          value: vegetableMarketAmenity,
                          setter: setVegetableMarketAmenity,
                        },
                        {
                          label: 'Public Transport Amenity',
                          value: publicTransportAmenity,
                          setter: setPublicTransportAmenity,
                        },
                        {
                          label: 'Recreation',
                          value: recreationAmenity,
                          setter: setRecreationAmenity,
                        },
                        {
                          label: 'Schools',
                          value: schoolsAmenity,
                          setter: setSchoolsAmenity,
                        },
                      ].map((a) => (
                        <Box
                          key={a.label}
                          sx={{ width: '100%', marginBottom: '1rem' }}
                          className="amenity-rating-field"
                        >
                          <div>{a.label}</div>
                          <Slider
                            value={a.value || 0}
                            onChange={(_, val) => a.setter(val as number)}
                            step={1}
                            min={0}
                            max={5}
                            marks
                            valueLabelDisplay="auto"
                            sx={{
                              margin: '30px',
                              color: '#2f123d',
                              width: '80%',
                            }}
                          />
                        </Box>
                      ))}
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>

              {/* Comments Accordion */}
              <Accordion
                className={`survey-form-accordion ${
                  expandedPanel === 'comments' ? 'expanded' : ''
                }`}
                expanded={expandedPanel === 'comments'}
                onChange={handleAccordionChange('comments')}
              >
                <AccordionSummary
                  expandIcon={
                    <img
                      src={ExpandIcon}
                      alt="expand"
                      className="expand-icon"
                    />
                  }
                  sx={{ backgroundColor: '#2f123d', color: '#fff' }}
                >
                  <div className="accordion-header">
                    <div className="accordion-header-title">
                      <CommentOutlinedIcon
                        fontSize="small"
                        sx={{ mr: 3, color: '#2f123d' }}
                      />
                      <Tooltip
                        openDelay={100}
                        position="right"
                        anchorElement="target"
                      >
                        <div style={{ textAlign: 'center' }}>
                          <span title="What would you like to say a few words about your locality?">
                            Any Comments?
                          </span>
                        </div>
                      </Tooltip>
                    </div>
                    {isCommentsComplete && (
                      <CheckIcon
                        sx={{
                          color: '#18181b',
                          fontSize: '1.2rem',
                          marginRight: '10px',
                        }}
                      />
                    )}
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="accordion-container">
                    <div className="field-section-container">
                      <Box sx={{ width: '100%' }} className="comments-field">
                        <div>
                          Please share a few words about your locality..
                        </div>
                        <TextArea
                          className="comments-text-area"
                          placeholder="Enter your comments here"
                          value={comments}
                          onChange={(e) => setComments(e.value)}
                          required={false}
                        />
                      </Box>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>

              {/* Submit Button */}
              <Box sx={{ width: '100%' }} className="submit-btn">
                <ButtonComponent isDisabled={!isFormValid} text="Submit" />
              </Box>
            </Box>
          </form>
          {notification && (
            <div className="notifications-container">
              <Notifications
                type={notification.type}
                notificationText={notification.message}
              />
            </div>
          )}
        </Box>
      )}
    </>
  );
};
