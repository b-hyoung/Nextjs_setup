import Header from "@/components/header";
import Footer from "@/components/footer";
import Hero from "@/components/sections/hero";
import Slogan from "@/components/sections/slogan";
import Business from "@/components/sections/business";
import Fields from "@/components/sections/fields";
import TechStack from "@/components/sections/tech-stack";
import History from "@/components/sections/history";
import Partners from "@/components/sections/partners";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Slogan />
        <Business />
        <Fields />
        <TechStack />
        <History />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
