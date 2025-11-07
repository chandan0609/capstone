import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserDetails,
  clearUserDetails,
} from "../../redux/slices/userSlice";
import { useParams, Link } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userDetails, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUserDetails(id));

    return () => {
      dispatch(clearUserDetails());
    };
  }, [dispatch, id]);

  if (loading)
    return <p className="text-center mt-10">Loading user details...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!userDetails) return null;

  return (
    <div className="max-w-lg mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold text-blue-700 mb-4"> User Details</h2>
      <div className="border rounded-lg p-6 shadow-md bg-white">
        <p>
          <strong>ID:</strong> {userDetails.id}
        </p>
        <p>
          <strong>Username:</strong> {userDetails.username}
        </p>
        <p>
          <strong>Email:</strong> {userDetails.email}
        </p>
        <p>
          <strong>Role:</strong> {userDetails.role}
        </p>
        <p>
          <strong>Date Joined:</strong>{" "}
          {new Date(userDetails.date_joined).toLocaleDateString()}
        </p>
      </div>
      <Link to="/users" className="block mt-6 text-blue-600 hover:underline">
        ← Back to User List
      </Link>
    </div>
  );
};

export default UserDetails;
