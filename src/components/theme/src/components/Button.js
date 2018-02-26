// @flow
import Color from './base/Color';

const Button = {
  moduleName: 'button',
  gridSize: 8,
  borderRadius: 3,
  fontSize: 14,
  fallback: {
    background: Color.white,
    color: Color.grey,
    textDecoration: 'none',
  },
  theme: {
    default: {
      background: {
        default: '',
        hover: '',
        active: '',
        disabled: '',
        selected: '',
      },
      boxShadowColor: {
        focus: '',
      },
      color: {
        default: '',
        active: '',
        disabled: '',
        selected: '',
      },
    },
    primary: {
      background: {
        default: '',
        hover: '',
        active: '',
        disabled: '',
        selected: '',
      },
      boxShadowColor: {
        focus: '',
      },
      color: {
        default: '',
        disabled: '',
        selected: '',
      },
    },
    success: {
      background: {
        default: Color.success,
        hover: '',
        active: '',
        disabled: '',
        selected: '',
      },
      boxShadowColor: {
        focus: '',
      },
      color: {
        default: '',
        active: '',
        disabled: '',
        selected: '',
      },
    },
    info: {
      background: {
        default: '',
        hover: '',
        active: '',
        disabled: '',
        selected: '',
      },
      boxShadowColor: {
        focus: '',
      },
      color: {
        default: '',
        active: '',
        disabled: '',
        selected: '',
      },
    },
    warning: {
      background: {
        default: Color.warning,
        hover: '',
        active: '',
        disabled: '',
        selected: '',
      },
      boxShadowColor: {
        focus: '',
      },
      color: {
        default: '',
        disabled: '',
        selected: '',
      },
    },
    danger: {
      background: {
        default: Color.alert,
        hover: '',
        active: '',
        disabled: '',
        selected: '',
      },
      boxShadowColor: {
        focus: '',
      },
      color: {
        default: Color.white,
        disabled: '',
        selected: '',
      },
    },
    link: {
      background: {
        default: '',
        selected: '',
      },
      boxShadowColor: {
        focus: '',
      },
      color: {
        default: '',
        hover: '',
        active: '',
        disabled: '',
        selected: '',
      },
      textDecoration: {
        hover: '',
      },
    },
    subtle: {
      background: {
        default: '',
        hover: '',
        active: '',
        disabled: '',
        selected: '',
      },
      boxShadowColor: {
        focus: '',
      },
      color: {
        default: '',
        active: '',
        disabled: '',
        selected: '',
      },
    },
    'subtle-link': {
      background: {
        default: '',
        selected: '',
      },
      boxShadowColor: {
        focus: '',
      },
      color: {
        default: '',
        hover: '',
        active: '',
        disabled: '',
        selected: '',
      },
      textDecoration: {
        hover: '',
      },
    },
  },
};

export default Button;
