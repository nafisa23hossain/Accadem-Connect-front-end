import axios from "axios";
import Header from "../Layout/moderatorHeader";

export default function DeleteProfile() {
  const handleDelete = async () => {
    try {
      const data = await axios.delete(
        `http://localhost:3000/moderator/deleteProfile/`,
        {
          // headers: { "Context-Type": "application/x-www-form-urlencoded" },
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Header></Header>
      <div className="flex justify-center mt-20">
        <h1 className="text-green-800 font-bold">
          You are deleting your profile
          <button
            type="submit"
            className="btn bg-green-500"
            onClick={handleDelete}
          >
            Delete Profile
          </button>
        </h1>
      </div>
    </div>
  );
}
