import * as React from 'react';
import styled from 'styled-components';
import { Spinner } from '../../src';

interface State {
  spinners: number[];
  showSpinners: boolean;
  size: number;
}

const Container = styled.div`
  width: 400px;
`;

const SpinnerContainer = styled.li`
  width: 33%;
  display: inline-block;
`;

const Input = styled.input`
  margin: 10px 5px;
`;

export default class App extends React.Component<{}, State> {
  /**
   * @param {PropsWithDefaults} props
   */
  public constructor(props: {}) {
    super(props);

    this.state = {
      spinners: [...new Array(100).keys()],
      showSpinners: false,
      size: 20,
    };

    this.onChange = this.onChange.bind(this);
    this.toggleSpinners = this.toggleSpinners.bind(this);
  }

  public onChange(e: SyntheticInputEvent<HTMLInputElement>): void {
    this.setState({
      size: +e.target.value,
    });
  }

  public toggleSpinners(): void {
    const { showSpinners } = this.state;

    this.setState({
      showSpinners: !showSpinners,
    });
  }

  public render(): React.ReactNode {
    const { size, spinners, showSpinners } = this.state;

    return (
      <div>
        <p>
          This example tests spinner performance to ensure lots of spinners render in a
          timely fashion. Unfortunately an issue exists with our current version of
          styled-components that causes performance issues when dynamically creating
          keyframe animations. As a result, custom spinner sizes will slightly decrease
          performance.
        </p>
        <Container>
          Spinner size:
          <Input
            style={{ marginLeft: '5px' }}
            type="number"
            value={size}
            min={0}
            max={100}
            step={1}
            onChange={this.onChange}
          />
        </Container>
        <button type="button" onClick={this.toggleSpinners}>
          Toggle spinners
        </button>
        <ul>
          {spinners.map(spinner => {
            return (
              <SpinnerContainer key={spinner}>
                Spinner {spinner}{' '}
                {showSpinners ? <Spinner delay={200} size={size} /> : null}
              </SpinnerContainer>
            );
          })}
        </ul>
      </div>
    );
  }
}
