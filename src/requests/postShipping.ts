import { Shipping } from "@/types/shipping";

export const postShipping = async (shipping: Shipping) => {
  try {
    const response = await fetch("http://localhost:3005/shipping", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shipping),
    });

    if (response.status !== 201) {
      throw new Error("Failed to POST shipping");
    }
    return "success";
  } catch (error) {
    console.error("Error:", error);
    return "error";
  }
};
