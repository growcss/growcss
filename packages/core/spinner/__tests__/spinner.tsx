import * as React from 'react';
import { mount } from 'enzyme';
import Spinner from '../src';

describe('Spinner', () => {
  it('should be possible to create a component', () => {
    const wrapper = mount(<Spinner />);

    expect(wrapper).not.toBe(undefined);
  });

  it('should be active by default', () => {
    const wrapper = mount(<Spinner />);
    expect(wrapper.prop('isCompleting')).toBe(false);
  });

  describe('isCompleting prop', () => {
    it('should add a spinner container when not set', () => {
      const wrapper = mount(<Spinner />);
      expect(wrapper.find('div.half-circle-animation div').first().length).toBe(1);
    });

    it('should remove the spinner container when set to true', () => {
      const wrapper = mount(<Spinner isCompleting />);
      expect(wrapper.find('div.half-circle-animation div').first().length).toBe(0);
    });
  });

  describe('size prop', () => {
    it('should render the spinner with the default size if no value is provided', () => {
      const custom = mount(<Spinner animation="fingerprint" />);
      const size = custom.find('div.fingerprint-animation').prop('size');

      expect(size).toBe(24);
    });

    it('should render tee-shirt sizes with the proper heights/widths', () => {
      const small = mount(<Spinner size="small" animation="fingerprint" />);
      const medium = mount(<Spinner size="medium" animation="fingerprint" />);
      const large = mount(<Spinner size="large" animation="fingerprint" />);
      const xlarge = mount(<Spinner size="xlarge" animation="fingerprint" />);
      const xxlarge = mount(<Spinner size="xxlarge" animation="fingerprint" />);

      const smallSize = small.find('div.fingerprint-animation').prop('size');
      const mediumSize = medium.find('div.fingerprint-animation').prop('size');
      const largeSize = large.find('div.fingerprint-animation').prop('size');
      const xlargeSize = xlarge.find('div.fingerprint-animation').prop('size');
      const xxlargeSize = xxlarge.find('div.fingerprint-animation').prop('size');

      expect(smallSize).toBe(8);
      expect(mediumSize).toBe(16);
      expect(largeSize).toBe(24);
      expect(xlargeSize).toBe(48);
      expect(xxlargeSize).toBe(96);
    });

    it('should render the spinner with a custom size', () => {
      const wrapper = mount(<Spinner size={72} animation="fingerprint" />);

      expect(wrapper).not.toBe(undefined);

      const size = wrapper.find('div.fingerprint-animation').prop('size');

      expect(size).not.toBe(undefined);
      expect(size).toBe(72);
    });
  });
});
