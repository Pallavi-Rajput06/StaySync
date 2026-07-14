import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useHostel from "../hooks/useHostel";
import ImageGallery from "../components/hostel/ImageGallery";
import HostelInfo from "../components/hostel/HostelInfo";
import Amenities from "../components/hostel/Amenities";
import Description from "../components/hostel/Description";
import OwnerCard from "../components/hostel/OwnerCard";
import RelatedHostels from "../components/hostel/RelatedHostels";
import { ArrowLeft, Star, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DetailsSkeleton } from "../components/SkeletonLoader";
import API from "../services/axios";
import toast from "react-hot-toast";

function HostelDetails() {
  const { hostel, loading } = useHostel();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Reviews states
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    if (hostel?._id) {
      const fetchReviews = async () => {
        try {
          const response = await API.get(`/reviews/${hostel._id}`);
          if (response.data.success) {
            setReviews(response.data.reviews);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setReviewsLoading(false);
        }
      };
      fetchReviews();
    }
  }, [hostel]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Please login to write a review.", { id: "auth-review" });
      navigate("/login", { state: { from: window.location.pathname, message: "Please login to continue." } });
      return;
    }
    if (!comment.trim()) {
      return toast.error("Please enter a review comment.");
    }

    try {
      setSubmittingReview(true);
      const response = await API.post(`/reviews/${hostel._id}`, { rating, comment });
      if (response.data.success) {
        toast.success("Review added successfully!");
        setComment("");
        setRating(5);
        // Reload reviews
        const res = await API.get(`/reviews/${hostel._id}`);
        if (res.data.success) {
          setReviews(res.data.reviews);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add review");
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen flex flex-col justify-between">
      <div>
        <Navbar />
        <div className="max-w-7xl mx-auto px-8 py-10">
          
          {loading ? (
            <DetailsSkeleton />
          ) : !hostel ? (
            <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 max-w-md mx-auto mt-20">
              <h2 className="text-2xl font-bold text-gray-800">Hostel Not Found</h2>
              <p className="text-gray-500 mt-2 text-sm">The hostel details could not be found or the link has expired.</p>
              <button
                onClick={() => navigate("/hostels")}
                className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition cursor-pointer"
              >
                Back to Hostels
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => navigate("/hostels")}
                className="flex items-center gap-2 text-blue-600 font-semibold mb-8 hover:underline cursor-pointer"
              >
                <ArrowLeft size={20} />
                Back to Hostels
              </button>

              <ImageGallery hostel={hostel} />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                <div className="lg:col-span-2 space-y-8">
                  <HostelInfo hostel={hostel} />
                  <Description hostel={hostel} />
                  <Amenities hostel={hostel} />

                  {/* Reviews Section */}
                  <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-8">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 border-b border-gray-50 pb-4">
                      <MessageSquare size={22} className="text-blue-500" />
                      Reviews & Ratings ({reviews.length})
                    </h3>

                    {/* Stats summary */}
                    <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-2xl">
                      <div className="text-center shrink-0">
                        <p className="text-4xl font-black text-gray-800">
                          {reviews.length > 0
                            ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
                            : "0.0"}
                        </p>
                        <div className="flex gap-0.5 justify-center mt-1 text-amber-400">
                          <Star size={16} fill="currentColor" />
                        </div>
                      </div>
                      <div className="border-l border-gray-200 h-14"></div>
                      <div>
                        <p className="font-bold text-gray-800">Aggregated Rating</p>
                        <p className="text-sm text-gray-500 mt-0.5">Based on feedback from relocated students.</p>
                      </div>
                    </div>

                    {/* Review submission form */}
                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                      <h4 className="font-bold text-gray-800">Write a Review</h4>
                      
                      {/* Rating select stars */}
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-600 mr-2">Your Rating:</span>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="cursor-pointer transition hover:scale-110"
                          >
                            <Star
                              size={24}
                              className={star <= rating ? "text-amber-400" : "text-gray-300"}
                              fill={star <= rating ? "currentColor" : "none"}
                            />
                          </button>
                        ))}
                      </div>

                      {/* Comment input */}
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Describe your relocation experience, facilities quality, neighborhood safety, and overall landlord support..."
                        rows={4}
                        className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 outline-none transition text-gray-800 text-sm"
                      />

                      <button
                        type="submit"
                        disabled={submittingReview}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition text-sm cursor-pointer disabled:opacity-50"
                      >
                        {submittingReview ? "Submitting..." : "Submit Review"}
                      </button>
                    </form>

                    {/* Reviews List */}
                    <div className="space-y-6 pt-4 border-t border-gray-50">
                      {reviewsLoading ? (
                        <div className="text-center py-6 text-gray-400 text-sm">Loading reviews...</div>
                      ) : reviews.length === 0 ? (
                        <div className="text-center py-10 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                          <p className="text-gray-400 text-sm font-medium">No reviews written yet.</p>
                          <p className="text-gray-400 text-xs mt-1">Be the first to share your relocation feedback!</p>
                        </div>
                      ) : (
                        reviews.map((rev) => (
                          <div key={rev._id} className="space-y-3 p-5 bg-gray-50 border border-gray-100 rounded-2xl shadow-sm">
                            <div className="flex justify-between items-start gap-4">
                              <div className="flex items-center gap-3">
                                {rev.user?.avatar ? (
                                  <img
                                    src={rev.user.avatar}
                                    alt={rev.user.name}
                                    className="w-10 h-10 rounded-full object-cover border border-blue-500/20"
                                  />
                                ) : (
                                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center font-bold text-sm">
                                    {rev.user?.name ? rev.user.name.charAt(0).toUpperCase() : "U"}
                                  </div>
                                )}
                                <div>
                                  <p className="font-bold text-gray-800 text-sm">{rev.user?.name || "Anonymous Student"}</p>
                                  <p className="text-xs text-gray-400 mt-0.5">
                                    {new Date(rev.createdAt).toLocaleDateString("en-IN", {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    })}
                                  </p>
                                </div>
                              </div>

                              {/* Star rating preview */}
                              <div className="flex gap-0.5 text-amber-400">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    size={14}
                                    fill={star <= rev.rating ? "currentColor" : "none"}
                                    className={star <= rev.rating ? "text-amber-400" : "text-gray-200"}
                                  />
                                ))}
                              </div>
                            </div>

                            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                              {rev.comment}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                </div>
                <div>
                  <OwnerCard hostel={hostel} />
                </div>
              </div>

              <RelatedHostels currentHostel={hostel} />
            </>
          )}

        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HostelDetails;