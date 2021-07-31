import { ElementUIComponent } from "element-ui/types/component";

export declare class ElNumberRange extends ElementUIComponent {
  value: number[];
  disabled: boolean;
  min: number;
  max: number;
  startPlaceholder: string;
  endPlaceholder: string;
  rangeSeparator: string;
  focus(): void;
}
