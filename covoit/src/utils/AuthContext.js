import { ref } from "vue";
import Cookies from "js-cookie";

const isLoggedIn = ref(false);
const accessToken = ref(null);
const refreshToken = ref(null);

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
        isLoggedIn.value = true;

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

    accessToken.value = null;
    refreshToken.value = null;
    isLoggedIn.value = false;
};

export { isLoggedIn, accessToken, refreshToken, loginUser, logoutUser, refreshAccessToken };
