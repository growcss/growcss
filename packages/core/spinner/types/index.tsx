export interface AnimationProps {
  /**
   * The spinner color.
   */
  color: string;
  /**
   * Size of the spinner.
   */
  size: number;
  /**
   * Will skip rendering the component if true and write to the dom directly.
   *
   * @default true
   */
  native: boolean;
  /**
   * Animation start delay, optional.
   */
  delay?: number;
  /**
   * Whether the process is complete and the spinner should leave
   */
  isCompleting: boolean;
}

export interface SpinnerProps {
  /**
   * Configure a new animation style.
   */
  animation?: string;
  /**
   * The spinner color.
   */
  color?: string;
  /**
   * Time in milliseconds after component mount before spinner is visible.
   */
  delay?: number;
  /**
   * Size of the spinner.
   */
  size?: number | string;
  /**
   * Whether the process is complete and the spinner should leave
   */
  isCompleting: boolean;
}

export interface SpinnerState {
  flip: boolean;
}
