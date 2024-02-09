"use client";
import React, { useState } from "react";
import { Button, Col, DatePicker, Flex, Form, Input, Row, Select } from "antd";
import {
  generateRequiredRule,
  getAvailableCountries,
  initialRecollectionOptions,
} from "../../utils/form";
import { mapaElSalvador } from "../../utils/utils";
import { useShippingForm, useStoreActions } from "@/hooks/useStore";
import { useRouter } from "next/navigation";
import { EnvironmentFilled, RightOutlined } from "@ant-design/icons";
import { ShippingForm } from "@/types/shippingForm";
import styles from "./shipping.module.scss";

const ShippingInfo: React.FC = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const shippingForm = useShippingForm();
  const [countries, setCountries] = useState<any>(() =>
    getAvailableCountries(shippingForm.recipient_state)
  );
  const { addShippingForm } = useStoreActions();

  const states = Object.keys(mapaElSalvador).map((state) => {
    return { label: state, value: state };
  });

  const handleStateChange = (value: string) => {
    const availableCountries = getAvailableCountries(value);
    setCountries(availableCountries);
    form.setFieldValue("recipient_country", availableCountries[0]);
  };

  const handleFormSubmit = () => {
    form.submit();
  };

  const handleFinishSubmit = (values: ShippingForm) => {
    addShippingForm(values);
    router.push("/packages");
  };

  /**
   * Normalize property is not working well, there are a few issues on GitHub confirming this.
   * So, I used a work-around
   */

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    const countryCode = form.getFieldValue("recipient_phone_code");
    if (value.length < 4) form.setFieldValue("recipient_phone", countryCode);
  };

  const handlePhoneCodeChange = (value: string) => {
    const phoneNumber = form.getFieldValue("recipient_phone");
    const updatedPhoneNumber = value + phoneNumber.slice(4);
    form.setFieldValue("recipient_phone", updatedPhoneNumber);
  };

  return (
    <Flex flex={1} vertical>
      <Form
        name="form-general"
        form={form}
        layout="vertical"
        requiredMark={false}
        initialValues={shippingForm}
        onFinish={handleFinishSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleFormSubmit();
          }
        }}
      >
        <Row gutter={[20, 0]}>
          <Col  span={16}>
            <Form.Item
              rules={generateRequiredRule("Dirección de recolección")}
              name="recolection_address"
              label="📍 Dirección de recolección"
            >
              <Select
                className={styles.countrySelect}
                size="large"
                options={initialRecollectionOptions}
              />
            </Form.Item>
          </Col>
          <Col  span={8}>
            <Form.Item
              rules={generateRequiredRule("Fecha Programada")}
              name="arrival_date"
              className={styles.arrival_date}
              label="Fecha Programada"
            >
              <DatePicker
                format="YYYY-MM-DD"
                placeholder="Seleccione una fecha"
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[20, 0]}>
          <Col  span={8}>
            <Form.Item
              rules={generateRequiredRule("Nombres")}
              name="recipient_name"
              label="Nombres"
            >
              <Input size="large" placeholder="Juan" />
            </Form.Item>
          </Col>
          <Col  span={8}>
            <Form.Item
              rules={generateRequiredRule("Apellidos")}
              name="recipient_lastname"
              label="Apellidos"
            >
              <Input size="large" placeholder="Perez" />
            </Form.Item>
          </Col>
          <Col  span={8}>
            <Form.Item
              rules={generateRequiredRule("Correo Electrónico")}
              name="recipient_email"
              label="Correo Electrónico"
            >
              <Input size="large" placeholder="juan.perez@hotmail.com" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[20, 0]}>
          <Col  span={8}>
            <div className={styles.phoneNumberContainer}>
              <label className="ant-form-item-required">
                Numero de telefono
              </label>
              <div className={styles.phoneInputs}>
                <Form.Item
                  className={styles.countryCodeInput}
                  name="recipient_phone_code"
                >
                  <Select
                    className={styles.countrySelect}
                    size="large"
                    options={[
                      { value: "+503", label: "SLV" },
                      { value: "+502", label: "GT" },
                      { value: "+504", label: "HND" },
                    ]}
                    onChange={handlePhoneCodeChange}
                  />
                </Form.Item>
                <Form.Item
                  rules={[
                    ...generateRequiredRule("Numero de telefono"),
                    { min: 10, message: "Numero no valido" },
                  ]}
                  name="recipient_phone"
                >
                  <Input
                    onChange={handlePhoneChange}
                    size="large"
                    className={styles.numberInput}
                    placeholder="+50372202262"
                  />
                </Form.Item>
              </div>
            </div>
          </Col>
          <Col span={16}>
          <Flex flex="100%" gap={15}>
          <EnvironmentFilled style={{ fontSize: '20px', color: '#ACB3C5' }}/>
            <Form.Item
              rules={generateRequiredRule("Dirección del destinatario")}
              name="recipient_address"
              label="Dirección del destinatario"
              style={{flex: 1}}
            >
              <Input
                size="large"
                placeholder="Alameda Juan Pablo II, No. 437, San Salvador"
              />
            </Form.Item>
          </Flex>
          </Col>
        </Row>
        <Row gutter={[20, 0]}>
          <Col  span={8}>
            <Form.Item
              rules={generateRequiredRule("Departamento")}
              name="recipient_state"
              className={styles.recipient_state}
              label="Departamento"
            >
              <Select
                size="large"
                onChange={handleStateChange}
                options={states}
              />
            </Form.Item>
          </Col>
          <Col  span={8}>
            <Form.Item
              rules={generateRequiredRule("Municipio")}
              name="recipient_country"
              className={styles.recipient_city}
              label="Municipio"
            >
              <Select size="large" options={countries} />
            </Form.Item>
          </Col>
          <Col  span={8}>
            <Form.Item name="recipient_reference" label="Punto de referencia">
              <Input size="large" placeholder="Frente Tienda de Rosita" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[20, 0]}>
          <Col  span={24}>
            <Form.Item name="instructions" label="Indicaciones">
              <Input size="large" placeholder="Tocar el timbre tres veces" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Flex flex={1} justify="flex-end" align="flex-end">
        <Button
          className={styles.nextButton}
          onClick={handleFormSubmit}
          type="primary"
          icon={<RightOutlined />}
          size="large"
        >
          Siguiente
        </Button>
      </Flex>
    </Flex>
  );
};

export default ShippingInfo;
