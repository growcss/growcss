// @flow
import * as React from 'react';
import styled from 'styled-components';
import { Button } from '../../src';

const Buttons = styled.div`
  padding: 10px;
`;

const BUTTON_GROUP_PER_RUN = 100;
const BUTTON_PER_GROUP = 4;
const TEST_RUNS = 5; // how many render passes to run during the test

type State = {
  count: number,
  text: string
};

class ButtonsPerformance extends React.Component<{}, State> {
  state = {
    count: 0,
    text: '',
  };

  startTest = () => {
    this.setState({text: 'Starting performance test...'});

    let runs = 0;
    let startTime;

    const run = () => {
      if (!runs) {
        startTime = Date.now();
      }

      if (runs === TEST_RUNS) {
        const time = Date.now() - startTime;

        let totalButtons = 0;

        for (let i = 1; i <= TEST_RUNS; i++) {
          totalButtons += BUTTON_PER_GROUP * BUTTON_GROUP_PER_RUN * i;
        }

        this.setState({text: `Finished performance test; Rendered ${totalButtons} buttons in ${time}ms (${TEST_RUNS} runs)`});

        return;
      }

      runs++;

      this.setState({ count: runs * BUTTON_GROUP_PER_RUN }, run);
    };

    this.setState({ count: 0 }, run);
  };

  renderButtons() {
    const { count } = this.state;
    const buttons = [];

    for (let i = 1; i <= count; i++) {
      const buttonNumber = (i - 1) * BUTTON_PER_GROUP;

      buttons.push(
        <Buttons key={`buttons-${i}`}>
          <Button appearance="default">Button {buttonNumber + 1}</Button>
          <Button appearance="danger">Button {buttonNumber + 2}</Button>
          <Button appearance="primary">Button {buttonNumber + 3}</Button>
          <Button appearance="warning">Button {buttonNumber + 4}</Button>
        </Buttons>,
      );
    }

    return buttons;
  }

  render() {
    return (
      <div>
        <div>{this.state.text}</div>
        <Buttons>
          <Button appearance="warning" onClick={this.startTest}>
            Start Test
          </Button>
        </Buttons>
        <div>{this.renderButtons()}</div>
      </div>
    );
  }
}

export default () => <ButtonsPerformance />;
