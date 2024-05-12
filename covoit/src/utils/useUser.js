import { ref, onMounted } from "vue";
import Cookies from "js-cookie";

export const useUser = () => {
  const user = ref(null);
  const loading = ref(true);
  const accessToken = ref(Cookies.get("accessToken"));
  const refreshToken = ref(Cookies.get("refreshToken"));

  const loginUser = async (formLogin) => {
    try {
      const res = await fetch(`${process.env.VUE_APP_API_ADDRESS}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formLogin)
      });

      const data = await res.json(); 

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data; 

      Cookies.set("accessToken", newAccessToken);
      Cookies.set("refreshToken", newRefreshToken);

      accessToken.value = newAccessToken;
      refreshToken.value = newRefreshToken;

      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, error: err.response };
    }
  };

  const refreshAccessToken = async () => {
    try {
      const refreshTokenValue = Cookies.get("refreshToken");

      if (!refreshTokenValue) {
        logoutUser();
        return;
      }

      const res = await fetch(`${process.env.VUE_APP_API_ADDRESS}/users/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ refreshToken: refreshTokenValue })
      });

      const { accessToken: newAccessToken } = await res.json();

      Cookies.set("accessToken", newAccessToken);
      accessToken.value = newAccessToken;
    }
    catch (err) {
      console.error(err);
      logoutUser();
    }
  };

  const logoutUser = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("isLoggedIn");
  };

  onMounted(async () => {
    try {
      const res = await fetch(`${process.env.VUE_APP_API_ADDRESS}/users/me`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ accessToken: accessToken.value })
      });
      
      if (res.ok) {
        const userData = await res.json();
        user.value = userData;
      } else {
        console.error("Failed to fetch user data:", res.statusText);
      }
    } catch (err) {
      console.error(err);
    } finally {
      loading.value = false;
    }
  });

  return { user, loading, loginUser, logoutUser, refreshAccessToken };
};