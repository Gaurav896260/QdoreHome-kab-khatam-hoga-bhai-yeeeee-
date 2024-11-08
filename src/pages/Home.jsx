import React from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import Banner from '../components/Banner/Banner';
import Footer from '../components/Footer/Footer';
import Popup from '../components/Popup/Popup';
import SliderW from '../components/Slider/SliderW'; 
import SliderM from '../components/Slider/SliderM.jsx';
import SliderF from '../components/Slider/SliderF.jsx';
import SliderS from '../components/Slider/SliderS.jsx';
import Tagline from '../components/Tagline/Tagline'; 

const Home = () => {
    const [orderPopup, setOrderPopup] = React.useState(false);

    const handleOrderPopup = () => {
        setOrderPopup(!orderPopup);
    };
    React.useEffect(() => {
        AOS.init({
            offset: 100,
            duration: 800,
            easing: "ease-in-sine",
            delay: 100,
        });
        AOS.refresh();
    }, []);
    return (
        <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
            <Navbar handleOrderPopup={handleOrderPopup} />
            <Hero handleOrderPopup={handleOrderPopup} />
            <SliderW /> 
            <SliderM />
            <SliderF/>
            <SliderS/>
            {/* <Banner /> */}
            <Footer />
            <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup} /> 
        </div>
    )
}

export default Home;
