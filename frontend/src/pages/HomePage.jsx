import CategoriesSection from "@/components/CategoriesSection";
import CtaSection from "@/components/CtaSection";
import FaqSection from "@/components/FaqSection";
import FeaturedDeals from "@/components/FeaturedDeals";
import FeaturedStores from "@/components/FeaturedStores";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import ImpactSection from "@/components/ImpactSection";
import Testimonials from "@/components/Testimonials";

export default function HomePage(){
    return (
        
        <>
         <Hero />
      <FeaturedDeals />
      <HowItWorks />
       <FeaturedStores /> 
             <CategoriesSection /> {/* ✨ ADD THE NEW SECTION HERE */}
      <ImpactSection />
      <Testimonials />
      <FaqSection />
      <CtaSection />

        </>
    );
}