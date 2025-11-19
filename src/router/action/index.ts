import api, { authApi } from "@/api";
import { queryClient } from "@/api/query";
import { Status, useAuthStore } from "@/store/authStore";
import { AxiosError } from "axios";
import { redirect, type ActionFunctionArgs } from "react-router";

export const loginAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);
  console.log({ credentials });
  // const authData = {
  //   phone: formData.get("phone"),
  //   password: formData.get("password"),
  // };
  try {
    const response = await authApi.post("login", credentials);
    // const response = await fetch(import.meta.env.VITE_API_URL + "/login",
    // await fetch(import.meta.env.VITE_API_URL + "login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(credentials),
    //   credentials: "include",
    // });

    if (response.status !== 200) {
      return { error: response?.data || "Login Failed!" };
    }

    const redirectTo = new URL(request.url).searchParams.get("redirect") || "/";

    return redirect(redirectTo);
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || { error: "Login Failed!" };
    } else throw error;
  }
};

export const logoutAction = async () => {
  try {
    await api.post("logout");

    return redirect("/login");
  } catch (error) {
    console.error("logout failed!", error);
  }
};

export const registerAction = async ({ request }: ActionFunctionArgs) => {
  const authStore = useAuthStore.getState();
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);
  console.log("registerAction credentials >>>", credentials);

  try {
    const response = await authApi.post("register", credentials);

    if (response.status !== 200) {
      return { error: response?.data || "Sending OTP failed!" };
    }

    // client state management
    authStore.setAuth(response.data.phone, response.data.token, Status.otp);

    return redirect("/register/otp");
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || { error: "Sending OTP failed!" };
    } else throw error;
  }
};

export const otpAction = async ({ request }: ActionFunctionArgs) => {
  const authStore = useAuthStore.getState();

  const formData = await request.formData();
  const credentials = {
    phone: authStore.phone,
    otp: formData.get("otp"),
    token: authStore.token,
  };

  try {
    const response = await authApi.post("verify-otp", credentials);

    if (response.status !== 200) {
      return { error: response?.data || "Verifying OTP failed!" };
    }

    // client state management
    authStore.setAuth(response.data.phone, response.data.token, Status.confirm);

    return redirect("/register/confirm-password");
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || { error: "Verifying OTP failed!" };
    } else throw error;
  }
};

export const confirmAction = async ({ request }: ActionFunctionArgs) => {
  const authStore = useAuthStore.getState();

  const formData = await request.formData();

  const credentials = {
    phone: authStore.phone,
    password: formData.get("password"),
    token: authStore.token,
  };

  try {
    const response = await authApi.post("confirm-password", credentials);

    if (response.status !== 201) {
      return { error: response?.data || "Registration failed!" };
    }

    // client state management
    authStore.clearAuth();

    return redirect("/");
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || { error: "Registration failed!" };
    } else throw error;
  }
};

export const favouriteAction = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  const formData = await request.formData();

  if (!params.productId) {
    throw new Error("No Product ID provided");
  }

  // console.log({ favourite: formData.get("favourite") });

  const data = {
    productId: Number(params.productId),
    favourite: formData.get("favourite") === "true",
  };

  try {
    const response = await api.patch("users/products/toggle-favourite", data);

    if (response.status !== 200) {
      return { error: response?.data || "Setting favourite failed!" };
    }

    await queryClient.invalidateQueries({
      queryKey: ["products", "detail", Number(params.productId)],
    });
    // await queryClient.invalidateQueries({
    //   queryKey: ["products", "detail", params.productId],
    // });

    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || { error: "Setting favourite failed!" };
    } else throw error;
  }
};

export const resetAction = async ({ request }: ActionFunctionArgs) => {
  const authStore = useAuthStore.getState();
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);
  console.log("resetAction credentials >>>", credentials);

  try {
    const response = await authApi.post("forget-password", credentials);

    if (response.status !== 200) {
      return { error: response?.data || "Sending OTP failed!" };
    }

    // client state management
    authStore.setAuth(response.data.phone, response.data.token, Status.verify);

    return redirect("/reset/verify");
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || { error: "Sending OTP failed!" };
    } else throw error;
  }
};

export const verifyAction = async ({ request }: ActionFunctionArgs) => {
  const authStore = useAuthStore.getState();

  const formData = await request.formData();
  const credentials = {
    phone: authStore.phone,
    otp: formData.get("otp"),
    token: authStore.token,
  };

  try {
    const response = await authApi.post("verify", credentials);

    if (response.status !== 200) {
      return { error: response?.data || "Verifying OTP failed!" };
    }

    // client state management
    authStore.setAuth(response.data.phone, response.data.token, Status.reset);

    return redirect("/reset/new-password");
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || { error: "Verifying OTP failed!" };
    } else throw error;
  }
};

export const newPasswordAction = async ({ request }: ActionFunctionArgs) => {
  const authStore = useAuthStore.getState();

  const formData = await request.formData();

  const credentials = {
    phone: authStore.phone,
    password: formData.get("password"),
    token: authStore.token,
  };

  try {
    const response = await authApi.post("reset-password", credentials);

    if (response.status !== 200) {
      return { error: response?.data || "Resetting failed!" };
    }

    // client state management
    authStore.clearAuth();

    return redirect("/");
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || { error: "Resetting failed!" };
    } else throw error;
  }
};

export const changePassword = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  // console.log("formData in changePassword action >>>", formData);

  const credentials = {
    newPassword: formData.get("newPassword"),
    currentPassword: formData.get("currentPassword"),
  };

  // console.log("credentials >>>", credentials);

  try {
    const response = await authApi.post("change-password", credentials);

    if (response.status !== 200) {
      return { error: response?.data || "Change Password failed!" };
    }

    return redirect("/");
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || { error: "Change Password failed!" };
    } else throw error;
  }
};

export const changeUserName = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  // console.log("formData in changePassword action >>>", formData);

  const credentials = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    password: formData.get("password"),
  };

  // console.log("credentials >>>", credentials);

  try {
    const response = await authApi.post("change-username", credentials);

    if (response.status !== 200) {
      return { error: response?.data || "Change User Name failed!" };
    }

    await queryClient.invalidateQueries({
      queryKey: ["user-profile-info"],
    });

    return redirect("/");
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || { error: "Change User Name failed!" };
    } else throw error;
  }
};

export const changeEmail = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  // console.log("formData in changePassword action >>>", formData);

  const credentials = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // console.log("credentials >>>", credentials);

  try {
    const response = await authApi.post("change-email", credentials);

    if (response.status !== 200) {
      return { error: response?.data || "Change User Name failed!" };
    }

    await queryClient.invalidateQueries({
      queryKey: ["user-profile-info"],
    });

    return redirect("/");
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || { error: "Change User Name failed!" };
    } else throw error;
  }
};
