declare type LabelValueOptions = {
  label: string;
  value: any;
  disabled: boolean;
  [key: string]: string | number | boolean;
}[];

declare type EmitType = (event: string, ...args: any[]) => void;

declare namespace Tabs {
  type DropdownKey =
    | "closeCurrent"
    | "closeOther"
    | "closeLeft"
    | "closeRight"
    | "closeAll"
    | "reloadCurrent";
}

declare const AMap: any;
declare const BMap: any;
