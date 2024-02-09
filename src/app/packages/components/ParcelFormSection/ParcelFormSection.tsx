import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Form, Input, Row, Space } from "antd";
import { generateRequiredRule } from "@/utils/form";
import { useStoreActions } from "@/hooks/useStore";
import styles from "./parcel-form-section.module.scss";

const ParcelFormSection = () => {
  const { addParcel } = useStoreActions();
  const [form] = Form.useForm();

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      addParcel(values);
      form.resetFields();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Space
      style={{
        backgroundColor: "#f3f5f9",
        padding: "20px 25px 20px 20px",
        borderRadius: "8px",
      }}
    >
      <Form
        form={form}
        layout="horizontal"
        requiredMark={false}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleFormSubmit();
          }
        }}
      >
        <Row gutter={[24, 0]}>
          <Col span={9}>
            <Flex>
              <Form.Item
                rules={generateRequiredRule("Largo")}
                name="parcel_length"
                label="Largo"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input
                  className={`${styles.unifiedInput} ${styles.noRightBorder}`}
                  size="large"
                  addonAfter="cm"
                  placeholder="5"
                />
              </Form.Item>
              <Form.Item
                rules={generateRequiredRule("height")}
                name="parcel_height"
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
                rules={generateRequiredRule("width")}
                name="parcel_width"
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
          <Col span={3}>
            <Form.Item
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={generateRequiredRule("weight")}
              name="parcel_weight"
              label="Peso"
            >
              <Input
                className={styles.unifiedInput}
                size="large"
                placeholder="2"
                addonAfter="lb"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={generateRequiredRule("parcel_content")}
              name="parcel_content"
              label="Contenido"
            >
              <Input size="large" placeholder="Iphone 15 Pro Max (256Gb)" />
            </Form.Item>
          </Col>
        </Row>
        <Flex justify="flex-end" align="flex-end">
          <Button
            className={styles.addButton}
            type="primary"
            shape="round"
            icon={<PlusOutlined />}
            size="large"
            onClick={handleFormSubmit}
          >
            Agregar
          </Button>
        </Flex>
      </Form>
    </Space>
  );
};

export default ParcelFormSection;
