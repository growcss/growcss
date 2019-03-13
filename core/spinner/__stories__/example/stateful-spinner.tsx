import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Spinner } from '../../src';

const Container = styled.div`
  display: inline-flex;
  padding: 10px;
  border: 1px solid;
  margin-bottom: 10px;
`;
const Input = styled.input`
  margin-left: 5px;
  width: 5em;
`;
const Label = styled.label`
  margin-left: 10px;
`;

interface State {
  active: boolean;
  delay: number;
  state: 'spinning' | 'removing';
}

class StatefulSpinner extends PureComponent<{}, State> {
  public constructor(props) {
    super(props);

    this.state = {
      active: true,
      delay: 100,
      state: 'spinning',
    };

    this.handleSpinnerClick = this.handleSpinnerClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  public handleSpinnerClick = () => {
    const { active } = this.state;

    this.setState({
      active: !active,
      state: active ? 'removing' : 'spinning',
    });
  };

  public handleInputChange = e => {
    this.setState({ delay: Number.parseInt(e.target.value, 10) });
  };

  /* eslint-disable jsx-a11y/no-static-element-interactions */
  public render(): React.ReactNode {
    const { delay, active, state } = this.state;

    return (
      <div>
        <Container onClick={this.handleSpinnerClick}>
          <Spinner delay={delay} isCompleting={!active} />
          <Label htmlFor="delayInput">Delay</Label>
          <Input
            type="number"
            id="delayInput"
            value={delay}
            onChange={this.handleInputChange}
          />
        </Container>
        <div>
          Click the spinner to see it&#39;s fade in and out animations. <br /> The delay
          field will modify the delay before the spinner shows.
        </div>
        <br />
        <div>
          <strong>isCompleting</strong> is currently set to{' '}
          <code>{`${String(!active)}`}</code> <br /> <strong>state</strong> is currently
          set to <code>{`${state}`}</code>
        </div>
      </div>
    );
  }
  /* eslint-enable jsx-a11y/no-static-element-interactions */
}

export default () => <StatefulSpinner />;
