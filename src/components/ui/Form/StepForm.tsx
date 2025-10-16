import { Steps } from "antd";
import { cn } from "@/lib";
import type { StepFormProps, StepFormStepProps } from "./type";

// 分步表单组件
export function StepForm({ current, onChange, children, className }: StepFormProps) {
  const steps = children.map((child: any) => ({
    title: child.props.title,
    description: child.props.description
  }));

  return (
    <div className={cn("space-y-6", className)}>
      <Steps current={current} onChange={onChange} items={steps} className="mb-8" />
      <div className="min-h-[400px]">{children[current]}</div>
    </div>
  );
}

// 分步表单步骤组件
export function StepFormStep({ children }: StepFormStepProps) {
  return <div>{children}</div>;
}
