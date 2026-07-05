function Description({ hostel }) {
	return (
	  <div className="mt-14">
  
		<h2 className="text-3xl font-bold mb-6">
		  About this Hostel
		</h2>
  
		<p className="text-gray-600 leading-8 text-lg">
		  {hostel.description}
		</p>
  
	  </div>
	);
  }
  
  export default Description;