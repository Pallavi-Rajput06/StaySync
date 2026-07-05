import hero from "../../assets/hero.jpg";
import SearchBar from "./SearchBar";

function HeroSection({ search, setSearch }) {
  return (
    <section className="relative h-[760px] overflow-hidden">

      {/* Background Image */}

      <img
        src={hero}
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover object-center"      />

      {/* Dark Overlay */}

      <div className="absolute inset-0 bg-black/45"></div>

      {/* Content */}

      <div className="relative z-10 max-w-7xl mx-auto h-full px-8 flex flex-col justify-center ">
        <h1 className="text-4xl font-bold text-white leading-tight">

          Welcome back, Pallavi! 👋

        </h1>

        <p className="mt-6 text-xl text-gray-200 max-w-2xl leading-10">

          Find your perfect stay, explore new cities
          and make yourself at home.

        </p>
        <div className="mt-12 w-[900px]">
  <SearchBar
    search={search}
    setSearch={setSearch}
  />
</div>
        

      </div>

    </section>
  );
}

export default HeroSection;