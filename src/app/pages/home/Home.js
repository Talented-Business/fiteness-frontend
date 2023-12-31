import React,{ useEffect } from "react";
import { withRouter } from "react-router";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { connect, useDispatch, useSelector } from "react-redux";
import MetaTags from "react-meta-tags";
import classnames from "classnames";

import SectionBanner from "./sections/SectionBanner";
import SectionStep from "./sections/SectionStep";
import SectionGuide from "./sections/SectionGuide";
import SectionPricing from "./sections/SectionPricing";
import SectionTestimonial from "./sections/SectionTestimonial";
import SectionInstagram from "./sections/SectionInstagram";
import TwoColumn from "./layouts/Two";
import { findWorkouts,initialBlock, fetchSurvey } from "./redux/done/actions";
import Header from "./sections/Workout/Header";
import Body from "./sections/Workout/Body";

import "./assets/scss/theme/style.scss";
import "./assets/scss/theme/mbr-additional.css";
import "./assets/scss/dropdown/style.css";
import "./assets/scss/theme/common.scss";
import "./assets/scss/theme/login.scss";
import "./assets/scss/theme/signup.scss";

const Home = ({ auth,history }) => {
  if(auth.currentUser && auth.currentUser.has_active_workout_subscription===false){
    history.push('/pricing');
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findWorkouts());
    dispatch(initialBlock());
    dispatch(fetchSurvey());
    window.scrollTo(0,1);
  },[]);// eslint-disable-line react-hooks/exhaustive-deps
  // const tagLine = useSelector(({done})=>done.tagLine);
  const step = useSelector(({done})=>done.step);
  return (
  <>
    {auth.currentUser&&auth.logOuting===false ? (
      auth.currentUser.has_workout_subscription?(
      <>
        <MetaTags>
        <title>Workout -Fitemos </title>
        <meta
          name="description"
          content="Workout -Fitemos"
        />
        </MetaTags>
        <TwoColumn>
          {/* <PageHeader title={`Hola ${auth.currentUser.customer.first_name}`} tagLine={tagLine}/> */}
          <div className={classnames("workout",{timer:step!==0})}>
            <Header/>
            <Body/>
          </div>
        </TwoColumn>
      </>
      ):(
        <>
        </>
      )
    ) : (
      <>
        <MetaTags>
          <title>
            Workout Intensos y Personalizados a tus objetivos.
            -Fitemos{" "}
          </title>
          <meta
            name="description"
            content="Entrenamientos Funcionales 100% Personalizados, Orientado a tus Objetivos, Guiados por Experto. Realízala en tu hogar o gimnasio preferido, en el momento que gustes."
          />
        </MetaTags>
        <NavBar transparent={auth.currentUser ? false : true} />
        
        <SectionBanner />

        <SectionStep />

        <SectionGuide />

        <SectionPricing />

        <SectionTestimonial />

        <SectionInstagram />

        <Footer />
      </>
    )}

  </>
  )
};
const mapStateToProps = state => ({
  auth: state.auth
});


const HomePage = connect(mapStateToProps, null)(withRouter(Home));

export default HomePage;
