import ContactCtaSection from "./(components)/ContactCtaSection";
import CustomerFeedback from "./(components)/CustomerFeedback";
import Gallery from "./(components)/Gallrey";
import HeightLight from "./(components)/HeightLight";
import Hero from "./(components)/Hero";
import EventsPage from "./(components)/UpComming";

export default function Home() {
  return (
    <div className="w-full max-w-7xl m-auto">
      <Hero />
      <HeightLight />
      <CustomerFeedback />
      <Gallery />
      <EventsPage />
      <ContactCtaSection />
    </div>
  );
}
