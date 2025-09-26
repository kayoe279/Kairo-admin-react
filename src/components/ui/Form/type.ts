import type { ReactNode } from "react";
import type { FormInstance, FormProps } from "antd";
import type { Rule } from "antd/es/form";

// 基础表单组件类型
export interface BaseFormProps extends Omit<FormProps, "children"> {
  children?: ReactNode;
  loading?: boolean;
  onSubmit?: (values: Record<string, any>) => void | Promise<void>;
  onReset?: () => void;
  form?: FormInstance;
}

// 搜索表单类型
export interface SearchFormProps extends Omit<FormProps, "children"> {
  children?: ReactNode | ((collapsed: boolean) => ReactNode);
  onSearch?: (values: Record<string, any>) => void;
  onReset?: () => void;
  loading?: boolean;
  showToggle?: boolean;
  form?: FormInstance;
}

// 分步表单类型
export interface StepFormProps {
  current: number;
  onChange: (step: number) => void;
  children: ReactNode[];
  className?: string;
}

export interface StepFormStepProps {
  title: string;
  description?: string;
  children: ReactNode;
}

// 表单验证规则类型
export interface FormValidationRule
  extends Omit<Rule, "required" | "message" | "pattern" | "validator"> {
  required?: boolean;
  message?: string;
  pattern?: RegExp;
  validator?: (rule: Rule, value: any) => Promise<void>;
}

// 动态表单字段类型
export interface DynamicFormField {
  name: string;
  label: string;
  type: "input" | "select" | "date" | "number" | "textarea" | "switch" | "radio" | "checkbox";
  rules?: FormValidationRule[];
  options?: Array<{ label: string; value: any }>;
  placeholder?: string;
  required?: boolean;
  allowClear?: boolean;
  mode?: "multiple" | "tags";
}

// 模态框表单类型
export interface ModalFormProps extends BaseFormProps {
  visible: boolean;
  title: string;
  width?: number;
  onOk?: (values: Record<string, any>) => void | Promise<void>;
  onCancel: () => void;
  confirmLoading?: boolean;
}

// 用户表单数据类型
export interface UserFormData {
  username: string;
  email: string;
  phone?: string;
  gender?: "male" | "female";
  birthday?: string;
  address?: string;
  role?: string;
  status?: "active" | "inactive";
}
