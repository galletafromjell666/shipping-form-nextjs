"use client";
import React, { useEffect, useState } from "react";
import { Button, Col, Flex, Form, Input, InputNumber, Row } from "antd";
import { useParcels, useStoreActions } from "@/hooks/useStore";
import { DeleteOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { generateRequiredRule } from "@/utils/form";
import { useRouter } from "next/navigation";
import { Parcel } from "@/types/parcel";
import styles from "./stored-parcel-section.module.scss";

interface Props {
  isLoading: boolean;
  handlePost: () => Promise<void>;
}

const StoredParcelsSection = ({ isLoading, handlePost }: Props) => {
  const router = useRouter();
  const [prevForm, setPrevForm] = useState<any>([]);
  const [form] = Form.useForm();
  const parcels = useParcels();
  const { removeParcel, addParcelBulk } = useStoreActions();

  useEffect(() => {
    const getAndResetFormValues = () => {
      form.resetFields();
      const filteredParcels = parcels.filter(
        (parcel) =>
          !prevForm.some((prevParcel: any) => prevParcel.id === parcel.id)
      );
      const mergedParcels = [...prevForm, ...filteredParcels];
      form.setFieldsValue({ items: mergedParcels });
    };

    getAndResetFormValues();
    // This allow us to prevent unnecessary re-renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parcels]);

  const saveForm = () => {
    const { items } = form.getFieldsValue();
    addParcelBulk(items);
  };
  const handleGoBack = () => {
    saveForm();
    router.push("/shipping");
  };

  const handleSubmit = () => {
    saveForm();
    handlePost();
  };

  const handleValueChange = async (
    _changedValues: unknown,
    allValues: { items: Parcel[] }
  ) => {
    setPrevForm(allValues.items);
  };

  return (
    <>
      <Flex vertical>
        <Form
          style={{
            overflowY: "auto",
            overflowX: "hidden",
            height: "400px",
          }}
          form={form}
          name="dynamic_form_nest_item"
          requiredMark={false}
          onValuesChange={handleValueChange}
          initialValues={{
            items: parcels,
          }}
        >
          <Form.List name="items">
            {(data, { add, remove }) => (
              <>
                {data.map(({ key, name }) => (
                  <Row
                    style={{ padding: "12px 20px 10px 20px" }}
                    key={key}
                    gutter={[24, 0]}
                  >
                    <Col span={3}>
                      <Form.Item
                        name={[name, "id"]}
                        style={{ display: "none" }}
                      >
                        <InputNumber type="number" min={1} />
                      </Form.Item>
                      <Form.Item
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        rules={generateRequiredRule("Peso")}
                        name={[name, "parcel_weight"]}
                        label="Peso"
                      >
                        <InputNumber
                          type="number"
                          min={1}
                          className={styles.unifiedInput}
                          size="large"
                          placeholder="2"
                          addonAfter="lb"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={11}>
                      <Form.Item
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        rules={generateRequiredRule("Contenido")}
                        name={[name, "parcel_content"]}
                        label="Contenido"
                      >
                        <Input
                          size="large"
                          placeholder="Iphone 15 Pro Max (256Gb)"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={9}>
                      <Flex>
                        <Form.Item
                          rules={generateRequiredRule("Largo")}
                          name={[name, "parcel_length"]}
                          label="Largo"
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                        >
                          <Input
                            min={1}
                            className={`${styles.unifiedInput} ${styles.noRightBorder}`}
                            size="large"
                            addonAfter="cm"
                            placeholder="5"
                          />
                        </Form.Item>
                        <Form.Item
                          rules={generateRequiredRule("Alto")}
                          name={[name, "parcel_height"]}
                          label="Alto"
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                        >
                          <Input
                            className={`${styles.unifiedInput} ${styles.noRightBorder} ${styles.noLeftBorder}`}
                            size="large"
                            addonAfter="cm"
                            placeholder="10"
                          />
                        </Form.Item>
                        <Form.Item
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          rules={generateRequiredRule("Ancho")}
                          name={[name, "parcel_width"]}
                          label="Ancho"
                        >
                          <Input
                            className={`${styles.unifiedInput} ${styles.noLeftBorder}`}
                            size="large"
                            addonAfter="cm"
                            placeholder="5"
                          />
                        </Form.Item>
                      </Flex>
                    </Col>
                    <Col
                      span={1}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        type="dashed"
                        size="large"
                        danger
                        shape="circle"
                        icon={<DeleteOutlined className={styles.deleteIcon} />}
                        onClick={() => {
                          const idToDelete = form.getFieldValue([
                            "items",
                            name,
                            "id",
                          ]);
                          removeParcel(idToDelete);
                          remove(name);
                        }}
                      />
                    </Col>
                  </Row>
                ))}
              </>
            )}
          </Form.List>
        </Form>
      </Flex>
      <Flex vertical={false} justify="space-between" align="flex-end">
        <Button
          onClick={handleGoBack}
          type="default"
          className={styles.footerButton}
          icon={<LeftOutlined />}
          size="large"
        >
          Regresar
        </Button>
        <Button
          disabled={parcels.length < 1 || isLoading}
          className={styles.footerButton}
          onClick={handleSubmit}
          type="primary"
          icon={<RightOutlined />}
          size="large"
        >
          Enviar
        </Button>
      </Flex>
    </>
  );
};

export default StoredParcelsSection;
