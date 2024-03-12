import axios from "axios";
async function useGoogleAuthentication(e) {
  e.preventDefault();
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/auth/status`,
    { withCredentials: true }
  );
  return data;
}

export default useGoogleAuthentication;
