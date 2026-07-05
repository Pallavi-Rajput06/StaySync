import { useState } from "react";

function ImageGallery({ hostel }) {
  const [selectedImage, setSelectedImage] = useState(hostel.images[0]);

  return (
    <div>

      <img
        src={selectedImage}
        alt={hostel.hostelName}
        className="w-full h-[520px] object-cover rounded-2xl shadow-lg"
      />

      <div className="flex gap-4 mt-5">

        {hostel.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt=""
            onClick={() => setSelectedImage(image)}
            className={`w-52 h-32 object-cover rounded-2xl cursor-pointer transition-all duration-300 flex-shrink-0

				${
				  selectedImage === image
					? "ring-4 ring-blue-600"
					: "hover:opacity-80"
				}`}
          />
        ))}

      </div>

    </div>
  );
}

export default ImageGallery;