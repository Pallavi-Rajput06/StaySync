import indore from "../../assets/indore.jpg";
import bhopal from "../../assets/bhopal.jpg";
import delhi from "../../assets/delhi.jpg";
import pune from "../../assets/pune.jpg";

const cities = [
  {
    name: "All",
    image: indore,
    hostels: "All Cities",
  },
  {
    name: "Indore",
    image: indore,
    hostels: "8 Hostels",
  },
  {
    name: "Bhopal",
    image: bhopal,
    hostels: "4 Hostels",
  },
  {
    name: "Delhi",
    image: delhi,
    hostels: "4 Hostels",
  },
  {
    name: "Pune",
    image: pune,
    hostels: "4 Hostels",
  },
];

function CitySection({
   selectedCity,
  setSelectedCity,}) {
  return (
    <section className="max-w-7xl mx-auto px-8 py-16">

      <h2 className="text-4xl font-bold mb-10">
        Browse By City
      </h2>

      <div className="grid grid-cols-4 gap-6">

        {cities.map((city) => (
          <div
          key={city.name}
          onClick={() =>
            setSelectedCity(
              city.name === "All"
                ? ""
                : city.name
            )
          }
          className={`relative h-56 rounded-3xl overflow-hidden cursor-pointer group hover:-translate-y-2 transition-all

            ${
            selectedCity === city.name
            ? "ring-4 ring-blue-500"
            : ""
            }
            
            `}          >

            <img
              src={city.image}
              alt={city.name}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />

            <div className="absolute inset-0 bg-black/45"></div>

            <div className="absolute bottom-5 left-5 text-white">

              <h3 className="text-3xl font-bold">

                {city.name}

              </h3>

              <p className="text-lg mt-1">

                {city.hostels}

              </p>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}

export default CitySection;