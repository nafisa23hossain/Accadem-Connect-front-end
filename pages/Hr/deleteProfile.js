import axios from "axios";
import Header from "../Layout/header";

export default function DeleteProfile() {
  const handleDelete = async () => {
    try {
      const data = await axios.delete(`http://localhost:3000/Hr/delete/`, {
        // headers: { "Context-Type": "application/x-www-form-urlencoded" },
        withCredentials: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Header></Header>
      <div className="flex justify-center mt-20">
        <h1 className="text-green-800 font-bold">
          Are you willing to delete your Profile{" "}
          <button
            type="submit"
            className="btn btn-error"
            onClick={handleDelete}
          >
            Delete Profile
          </button>
        </h1>
      </div>
    </div>
  );
}
