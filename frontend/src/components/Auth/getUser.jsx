import axios from "axios";
async function GetUser(e) {
  e.preventDefault();
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/users`,
    { withCredentials: true }
  );
  return data;
}

export default GetUser;
