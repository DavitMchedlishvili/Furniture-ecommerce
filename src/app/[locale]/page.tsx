import CategoryDivs from "./components/CategoryDivs/CategoryDivs";

import Hero from "./components/Hero/Hero";

export default function Home() {
  return (
   <div className="mx-auto dark:bg-slate-700">
    <Hero/>
    <CategoryDivs/>
   </div>
    
  );
}