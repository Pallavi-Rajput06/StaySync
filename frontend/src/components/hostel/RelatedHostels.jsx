import HostelCard from "../dashboard/HostelCard";
import useHostels from "../../hooks/useHostels";

function RelatedHostels({ currentHostel }) {
  const { hostels, loading } = useHostels();

  if (loading) return null;

  const related = hostels
    .filter(
      (hostel) =>
        hostel.city === currentHostel.city &&
        hostel._id !== currentHostel._id
    )
    .slice(0, 3);

  return (
    <div className="mt-16">

<div className="flex justify-between items-center mb-8">

<h2 className="text-3xl font-bold">
  Similar Hostels
</h2>

<button className="text-blue-600 font-semibold hover:underline">
  View All →
</button>

</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {related.map((hostel) => (
          <HostelCard
            key={hostel._id}
            hostel={hostel}
          />
        ))}

      </div>

    </div>
  );
}

export default RelatedHostels;