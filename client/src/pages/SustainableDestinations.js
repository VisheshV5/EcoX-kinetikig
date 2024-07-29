import React, { useCallback, useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import globeImage from "./earth-dark.jpg";
import ReactDOMServer from "react-dom/server";
import {
  Box,
  Button,
  Card,
  Grid,
  MobileStepper,
  Typography,
} from "@mui/material";
import DestinationCard from "../components/DestinationCard";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { useTheme } from "@mui/material/styles";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

const SustainableDestinations = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const globeEl = useRef();

  const maxSteps = 9;
  const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  useEffect(() => {
    const countryLocation = {
      lat: destinationDetails[activeStep].lat,
      lng: destinationDetails[activeStep].lng,
      altitude: destinationDetails[activeStep].alt,
    };
    globeEl.current.pointOfView(countryLocation, 500);
  }, [activeStep]);
  const theme = useTheme();
  const destinationDetails = [
    {
      title: "Costa Rica",
      description:
        "Costa Rica attracts tourists with its natural beauty, promoting ecotourism under the slogan ‘Pura Vida’ (the ‘Pure Life’).",
      link: "idc.com",
      lat: 9.7489,
      lng: -83.7534,
      altitude: 0.1,
      alt: 1,
      image:
        "https://media.istockphoto.com/id/1417161829/photo/costa-rica-arenal-volcano.webp?b=1&s=170667a&w=0&k=20&c=aMYgysmtgGuaexUyiVGehZ2xeMLtIV9uQRrX2bOUzIk=",
    },
    {
      title: "Bhutan",
      description:
        "Bhutan, the only carbon-neutral country, focuses on gross national happiness and limits visitors to protect its pristine environment.",
      link: "idc.com",
      lat: 27.5142,
      lng: 90.4336,
      altitude: 0.1,
      alt: 1,
      image:
        "https://cdn.britannica.com/11/83411-050-217610BA/Tiger-monastery-Nest-Buddhist-Bhutan.jpg",
    },
    {
      title: "Scotland",
      description:
        "Scotland leads in combating climate change and was the first to sign the Tourism Declares a Climate Emergency initiative.",
      link: "idc.com",
      lat: 56.4907,
      lng: -4.2026,
      altitude: 0.1,
      alt: 1,
      image:
        "https://static.toiimg.com/photo/msid-102970107,width-96,height-65.cms",
    },
    {
      title: "Rwanda",
      description:
        "Rwanda protects mountain gorillas and promotes community tourism, transforming former poachers into conservation partners.",
      link: "idc.com",
      lat: -1.9403,
      lng: 29.8739,
      altitude: 0.1,
      alt: 1,
      image:
        "https://i.natgeofe.com/n/ce0a8c69-2ff4-4c2e-821a-d63bc9487e0c/lake-kivu-rwanda.jpg",
    },
    {
      title: "Slovenia",
      description:
        "Slovenia leverages its natural beauty, creating new trails and digital maps for hikers and skiers, promoting sustainable tourism.",
      link: "idc.com",
      lat: 46.1512,
      lng: 14.9955,
      altitude: 0.1,
      alt: 1,
      image:
        "https://media.istockphoto.com/id/494314515/photo/panorama-of-ljubljana-slovenia-europe.jpg?s=612x612&w=0&k=20&c=1SbeSdqwM0JSxIDcACk-9zzo3yX8f3rsTG9pJUi3M8A=",
    },
    {
      title: "Finland",
      description:
        "Finland, with 80% forest cover, offers clear air and water, promoting eco-tourism through the Sustainable Finland programme.",
      link: "idc.com",
      lat: 64,
      lng: 26,
      altitude: 0.1,
      alt: 1,
      image:
        "https://www.planetware.com/wpimages/2020/02/finland-in-pictures-beautiful-places-to-photograph-helsinki.jpg",
    },
    {
      title: "New Zealand",
      description:
        "New Zealand emphasizes sustainability, using geothermal energy and prioritizing green policies to maintain its natural beauty.",
      link: "idc.com",
      lat: -43.1571459086602,
      lng: 172.72338919659848,
      altitude: 0.1,
      alt: 1,
      image:
        "https://media.istockphoto.com/id/1490879216/photo/wanaka-tree-southern-alps-and-autumn-leaves-standing-on-lake-wanaka-in-new-zealand.webp?b=1&s=170667a&w=0&k=20&c=5M272UN4ba59GMWb4eJz8H3I49bG0UpTVhOPWAeSJMs=",
    },
    {
      title: "Barbados",
      description:
        "Barbados addresses climate change impacts by pushing for green transition and ensuring tourism businesses have sustainability resources.",
      link: "idc.com",
      lat: 13.193887,
      lng: -59.543198,
      altitude: 0.1,
      alt: 1,
      image:
        "https://media.cntraveler.com/photos/5f03e66f5a986932f31238be/16:9/w_4255,h_2393,c_limit/Barbados-2020-GettyImages-174632863.jpg",
    },
    {
      title: "Madagascar",
      description:
        "Madagascar, aware of climate change dangers, promotes its unique ecosystems and wildlife through sustainable tourism initiatives.",
      link: "idc.com",
      lat: -18.7669,
      lng: 46.8691,
      altitude: 0.1,
      alt: 1,
      image:
        "https://img.traveltriangle.com/blog/wp-content/uploads/2018/06/510.jpg",
    },
  ];

  const handleSelect = useCallback((city) => {
    setSelectedCity(city);
    alert(`You selected ${city}`);
  }, []);

  const myData = [
    {
      city: "New Orleans",
      lat: 29.953204744601763,
      lng: -90.08925929478903,
      altitude: 0.1,
      color: "#00ff33",
    },
    {
      city: "New Delhi",
      lat: 28.621322361013092,
      lng: 77.20347613099612,
      altitude: 0.1,
      color: "#ff0000",
    },
    {
      city: "New Zealand",
      lat: -43.1571459086602,
      lng: 172.72338919659848,
      altitude: 0.1,
      color: "#ffff00",
    },
  ];

  const CityMarker = ({ city }) => (
    <Card
      style={{
        borderRadius: "10px",
        boxShadow:
          "rgba(0, 0, 0, 0.2) 0px 0px 2px 0px, rgba(0, 0, 0, 0.12) 0px 12px 24px -4px",
        padding: "20px",
        backgroundColor: "#141A21",
        cursor: "pointer",
        zIndex: 0,
      }}
      onClick={() => console.log("hi")}
    >
      <strong style={{ fontSize: "15px", textAlign: "center", color: "white" }}>
        {city}
      </strong>
    </Card>
  );

  return (
    <>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: -1,
          mx: -3,
          mt: 2,
        }}
      >
        <Globe
          ref={globeEl}
          width="1600"
          height="750"
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          htmlElementsData={destinationDetails}
          htmlAltitude="altitude"
          htmlElement={(data) => {
            const { title } = data;
            const element = document.createElement("div");
            element.innerHTML = ReactDOMServer.renderToString(
              <CityMarker city={title} />
            );
            return element;
          }}
        />
      </Grid>
      <Card
        sx={{
          position: "absolute",
          top: 150,
          left: 320,
          zIndex: 10,
          p: 3,
          width: 447,
        }}
      >
        <Typography variant="h6">Sustainable Destinations</Typography>
        <Typography variant="body" fontSize="12.5px" color="text.secondary">
          Perfect travel spots for you that are known for their sustainability
        </Typography>
      </Card>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          position: "absolute",
          left: 350,
          bottom: 60,
        }}
      >
        <Button
          onClick={handleBack}
          sx={{
            color: "white",
            borderRadius: "99px",
          }}
          disabled={activeStep === 0}
        >
          <KeyboardArrowLeft fontSize="large" />
        </Button>
        <AutoPlaySwipeableViews index={activeStep}>
          {destinationDetails.map((destination, index) => (
            <div key={destination.title}>
              {Math.abs(activeStep - index) <= 2 ? (
                <DestinationCard destination={destination} />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <Button
          onClick={handleNext}
          sx={{
            position: "absolute",
            left: 420,
            color: "white",
            borderRadius: "99px",
          }}
          disabled={activeStep === maxSteps - 1}
        >
          <KeyboardArrowRight fontSize="large" />
        </Button>
      </Box>
    </>
  );
};

export default SustainableDestinations;
