//@flow
import Color from './base/Color';

const hex2rgba = require('hex-rgba');

const disabled = {
  background: Color.grey100,
  color: Color.grey400,
};

const Button = {
  moduleName: 'button',
  gridSize: 8,
  borderRadius: 3,
  fontSize: 14,
  fallback: {
    background: Color.grey200,
    color: Color.grey400,
    textDecoration: 'none',
  },
  theme: {
    default: {
      background: {
        default: Color.grey200,
        hover: Color.grey100,
        active: hex2rgba(Color.primary, 40),
        disabled: disabled.background,
        selected: hex2rgba(Color.primary, 65),
      },
      boxShadowColor: {
        focus: hex2rgba(Color.grey200, 60),
      },
      color: {
        default: Color.grey400,
        active: Color.amber600,
        disabled: disabled.color,
        selected: Color.amber700,
      },
    },
    primary: {
      background: {
        default: Color.primary,
        hover: Color.amber300,
        active: Color.primary,
        disabled: disabled.background,
        selected: hex2rgba(Color.primary, 65),
      },
      boxShadowColor: {
        focus: hex2rgba(Color.amber300, 60),
      },
      color: {
        default: Color.white,
        hover: Color.white,
        active: Color.white,
        disabled: disabled.color,
        selected: Color.amber700,
      },
    },
    success: {
      background: {
        default: Color.success,
        hover: Color.green400,
        active: Color.success,
        disabled: disabled.background,
        selected: Color.green600,
      },
      boxShadowColor: {
        focus: hex2rgba(Color.green300, 60),
      },
      color: {
        default: Color.white,
        hover: Color.white,
        active: Color.white,
        disabled: disabled.color,
        selected: Color.white,
      },
    },
    info: {
      background: {
        default: Color.info,
        hover: Color.blue300,
        active: Color.info,
        disabled: disabled.background,
        selected: Color.blue500,
      },
      boxShadowColor: {
        focus: hex2rgba(Color.blue300, 60),
      },
      color: {
        default: Color.white,
        hover: Color.white,
        active: Color.white,
        disabled: disabled.color,
        selected: Color.white,
      },
    },
    warning: {
      background: {
        default: Color.warning,
        hover: Color.yellow400,
        active: Color.warning,
        disabled: disabled.background,
        selected: Color.yellow600,
      },
      boxShadowColor: {
        focus: '',
      },
      color: {
        default: Color.white,
        hover: Color.white,
        active: Color.white,
        disabled: disabled.color,
        selected: Color.white,
      },
    },
    danger: {
      background: {
        default: Color.danger,
        hover: Color.red400,
        active: Color.red500,
        disabled: disabled.background,
        selected: Color.red600,
      },
      boxShadowColor: {
        focus: '',
      },
      color: {
        default: Color.white,
        hover: Color.white,
        active: Color.white,
        disabled: disabled.color,
        selected: Color.white,
      },
    },
    link: {
      background: {
        default: 'none',
        hover: 'none',
        active: 'none',
        disabled: 'none',
        selected: 'none',
      },
      boxShadowColor: {
        focus: '',
      },
      color: {
        default: Color.blue400,
        hover: Color.blue300,
        active: Color.blue500,
        disabled: disabled.color,
        selected: Color.blueGrey200,
      },
      textDecoration: {
        hover: 'underline',
      },
    },
  },
};

export default Button;
