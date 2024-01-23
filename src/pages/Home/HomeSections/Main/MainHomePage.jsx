import React from "react";
import HomePageHeroSection from "./sections/HomePageHeroSection.jsx";
import HomePageChannels from "./sections/HomePageChannels.jsx";
import Our_Values from "./sections/Our_Values.jsx";
import Get_To_Know from "./sections/Get_To_Know.jsx";
export default function MainHomePage({ homePageData, sectionN }) {
  return (
    <>
      <HomePageHeroSection homePageData={homePageData} sectionN={sectionN} />
      <HomePageChannels />
    </>
  );
}
