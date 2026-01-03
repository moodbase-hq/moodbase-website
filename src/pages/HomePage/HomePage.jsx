import React from 'react'
import Header from '../../components/Header/Header'
import Hero from '../../components/Hero/Hero'
import HowItWorks from '../../components/HowItWorks/HowItWorks'
import Footer from '../../components/Footer/Footer'

const HomePage = ({ 
  headerProps, 
  heroProps, 
  howItWorksProps
}) => (
  <div className="home-page">
    <Header {...headerProps} />
    <Hero {...heroProps} />
    <HowItWorks {...howItWorksProps} />
    <Footer />
  </div>
)

export default HomePage