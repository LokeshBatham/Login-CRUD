import React, { useEffect, useState } from "react";

const UserCard = ({ userData }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userData) {
      setUser(userData);
      setLoading(false);
    }
  }, [userData]);

  if (loading) {
    return <div>Loading user details...</div>;
  }

  if (!user) {
    return <div>No user details available</div>;
  }

  return (
    <div className="user-card">
      <h3>User Details</h3>
      <p>
        <strong>Name:</strong> {user.Name}
      </p>
      <p>
        <strong>Email:</strong> {user.ConfirmEmail}
      </p>
    </div>
  );
};

export default UserCard;
