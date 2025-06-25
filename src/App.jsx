// import React from 'react'
// import { Routes, Route } from 'react-router-dom'
// import HomePage from './pages/HomePage'
// import AboutPage from './pages/AboutPage'
// import ContactUs from './pages/ContactUs'
// import ScrollToTop from './components/ScrollToTop'
// import DecodePage from './pages/DecodePage'
// import Level1 from './pages/Level1'

// function App() {
//   return (
//     <>
//       <ScrollToTop />
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/about" element={<AboutPage />} />
//         <Route path="/contact-us" element={<ContactUs />} />
//         <Route path="/decode" element={<DecodePage />} />
//         <Route path="/level-one" element={<Level1 />} />
//       </Routes>
//     </>
//   )
// }

// export default App
// tanu code

import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactUs from "./pages/ContactUs";
import ScrollToTop from "./components/ScrollToTop";
import DecodePage from "./pages/DecodePage";
import DynamicLevelPage from "./pages/Level1";
import Layout from "./components/layout/Layout";
import AllRegistration from "./pages/AllRegistration";
import ContactsTable from "./pages/ContactsTable";
import PrivacyPolicy from "./components/PrivacyPolicy";
import FamilyConstellation from "./pages/FamilyConstellation";
import ICH from "./pages/ICH";
import ICHLevels from "./pages/ICH.Levels";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/decode" element={<DecodePage />} />
        <Route path="/family-constellation" element={<FamilyConstellation />} />
        <Route path="/ich" element={<ICH />} />
        <Route path="/ich/levels" element={<ICHLevels />} />
        {/* Dynamic route for all levels */}
        <Route path="/level/:levelNumber" element={<DynamicLevelPage />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        {/* Backward compatibility routes */}
        <Route path="/level-one" element={<DynamicLevelPage />} />
        <Route path="/level-two" element={<DynamicLevelPage />} />
        <Route path="/level-three" element={<DynamicLevelPage />} />
        <Route path="/level-four" element={<DynamicLevelPage />} />
        <Route
          path="/all-registration-ekaausa.com.usa"
          element={<AllRegistration />}
        />
        <Route
          path="/all-contacts.ekaausa.com.usa"
          element={<ContactsTable />}
        />
      </Routes>
    </>
  );
}

export default App;
