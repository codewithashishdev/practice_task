import { useNavigate } from "react-router-dom";

export const UserSelection = () => {
  const navigate = useNavigate();

  const handleCustomerRegistration = () => {
    navigate("/register", { state: { role: "customer" } });
  };

  const handleAdminRegistration = () => {
    navigate("/register", { state: { role: "admin" } });
  };

  return (
    <div className="user-selection">
      <h1>Select Registration Type</h1>
      <button onClick={handleCustomerRegistration}>Register as Customer</button>
      <button onClick={handleAdminRegistration}>Register as Admin</button>
    </div>
  );
};
