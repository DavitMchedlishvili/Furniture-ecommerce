import CategoryDivs from "./components/CategoryDivs/CategoryDivs";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";

export default function Home() {
  return (
   <div className="mx-auto dark:bg-slate-700">
    <Hero/>
    <CategoryDivs/>
    <Footer/>
   </div>
    
  );
}