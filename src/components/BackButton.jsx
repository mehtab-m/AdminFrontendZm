import { useNavigate } from "react-router-dom";
import '../styles/BackButton.css'

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      className="backbutton"
      onClick={() => navigate("/admin-dashboard")}
    >
      Back
    </button>
  );
}
