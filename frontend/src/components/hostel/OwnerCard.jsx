import { Phone, Mail, User } from "lucide-react";

function OwnerCard({ hostel }) {
  return (
    <div className="mt-14 bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-3xl font-bold mb-8">
        Contact Owner
      </h2>

      <div className="space-y-6">

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="text-blue-600" size={22} />
          </div>

          <div>
            <p className="text-sm text-gray-500">Owner</p>
            <p className="font-semibold">{hostel.ownerName}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <Phone className="text-green-600" size={20} />
          </div>

          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-semibold">{hostel.ownerPhone}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <Mail className="text-red-600" size={20} />
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-semibold">{hostel.ownerEmail}</p>
          </div>
        </div>

      </div>

      <a
        href={`tel:${hostel.ownerPhone}`}
        className="block w-full mt-8 text-center bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold"
      >
        Call Owner
      </a>

    </div>
  );
}

export default OwnerCard;