import * as React from 'react';
import styled from 'styled-components';
import Spinner from '../../src';

const Button = styled.button`
  margin-bottom: 10px;
  margin-top: 10px;
`;

class SpinnerBaseUse extends React.Component<
  { animation?: string; delay?: number },
  { isCompleting: boolean }
> {
  /**
   * @param {PropsWithDefaults} props
   */
  public constructor(props: {}) {
    super(props);

    this.state = {
      isCompleting: false,
    };
    this.completeSpinner = this.completeSpinner.bind(this);
  }

  public completeSpinner() {
    const { isCompleting } = this.state;

    this.setState({ isCompleting: !isCompleting });
  }

  public render() {
    const { animation, delay } = this.props;
    const { isCompleting } = this.state;

    return (
      <div>
        <div>
          <Button onClick={this.completeSpinner}>Toggle Spinners</Button>
        </div>
        <Spinner
          size="xlarge"
          delay={delay || 1000}
          isCompleting={isCompleting}
          animation={animation}
        />
        <Spinner size="xlarge" isCompleting={isCompleting} animation={animation} />
      </div>
    );
  }
}

export default SpinnerBaseUse;
