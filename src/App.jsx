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
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactUs from "./pages/ContactUs";
import ScrollToTop from "./components/ScrollToTop";
import DecodePage from "./pages/DecodePage";
import DynamicLevelPage from "./pages/Level1";
import DecodeLevel from "./pages/DecodeLevel";
import Layout from "./components/layout/Layout";
import AllRegistration from "./pages/AllRegistration";
import ContactsTable from "./pages/ContactsTable";
import PrivacyPolicy from "./components/PrivacyPolicy";
import FamilyConstellation from "./pages/FamilyConstellation";
import ICH from "./pages/ICH";
import ICHLevels from "./pages/ICH.Levels";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import AdminLayout from "./components/layouts/AdminLayout";
import FamilyConsultationTable from "./pages/FamilyConsultationTable";
import IchRegistration from "./pages/ICHTable";
import Schedule from "./pages/Schedule";
import Tasso from "./pages/Tasso";
import FamilyConstellationPage from "./pages/AdminPages/FamilyConstellation";
import HypnotherapyPage from "./pages/AdminPages/HypnotherapyPage";
import DecodeAdminPage from "./pages/AdminPages/DecodePage";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/decode" element={<DecodePage />} />
        <Route path="/decode/level/:id" element={<DecodeLevel />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/practitioner" element={<Navigate to="/schedule" replace />} />
        <Route path="/tasso" element={<Tasso />} />
        <Route path="/family-constellation" element={<FamilyConstellation />} />
        <Route path="/ich" element={<ICH />} />
        <Route path="/ich/levels" element={<ICHLevels />} />
        <Route path="/ich/level/:id" element={<ICHLevels />} />
        {/* <Route path="/ich" element={<ICH />} /> */}
        <Route path="/admin/login" element={<AdminLogin />} />
        {/* Dynamic route for all levels */}
        <Route path="/level/:levelNumber" element={<DynamicLevelPage />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        {/* Backward compatibility routes */}
        <Route path="/level-one" element={<DynamicLevelPage />} />
        <Route path="/level-two" element={<DynamicLevelPage />} />
        <Route path="/level-three" element={<DynamicLevelPage />} />
        <Route path="/level-four" element={<DynamicLevelPage />} />
        {/* <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        > */}
        <Route
          path="all-registration-ekaausa.com.usa"
          element={<AllRegistration />}
        />
        <Route
          path="all-contacts.ekaausa.com.usa"
          element={<ContactsTable />}
        />{" "}
        <Route
          path="all-FamilyConsultationTable.usa"
          element={<FamilyConsultationTable />}
        />{" "}
        <Route path="all-ICTable.usa" element={<IchRegistration />} />{" "}
        <Route path="admin-familyconstellation" element={<FamilyConstellationPage />} />
        <Route path="admin-Hypnotherapy" element={<HypnotherapyPage />} />
        <Route path="admin-decode" element={<DecodeAdminPage />} />
        {/* </Route> */}
      </Routes>
    </>
  );
}

export default App;
