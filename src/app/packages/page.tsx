"use client";
import React, { useLayoutEffect, useState } from "react";
import { Flex, notification } from "antd";
import ParcelFormSection from "./components/ParcelFormSection/ParcelFormSection";
import StoredParcelsSection from "./components/StoredParcelsSection/StoredParcelsSection";
import { postShipping } from "@/requests/postShipping";
import { useRouter } from "next/navigation";
import { useShippingForm, useParcels } from "@/hooks/useStore";

const ParcelForm = () => {
  const router = useRouter();
  const [api, contextHolder] = notification.useNotification();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const shippingForm = useShippingForm();
  const parcels = useParcels();

  useLayoutEffect(() => {
    if (!shippingForm.recipient_email) router.push("/shipping");
  }, [router, shippingForm.recipient_email]);

  const openNotification = (type: "success" | "error") => {
    const message =
      type === "success" ? "Formulario Enviado Con Exito" : "Error";
    const description =
      type === "success"
        ? "Gracias por hacer uso de este formulario."
        : "Error en el servidor.";
    api[type]({
      message,
      description,
    });
  };

  const handlePost = async () => {
    setIsSubmitting(true);
    const response = await postShipping({ ...shippingForm, parcels });
    openNotification(response);
    setIsSubmitting(false);
  };

  return (
    <Flex flex={1} vertical>
      {contextHolder}
      <ParcelFormSection />
      <StoredParcelsSection isLoading={isSubmitting} handlePost={handlePost} />
    </Flex>
  );
};

export default ParcelForm;
