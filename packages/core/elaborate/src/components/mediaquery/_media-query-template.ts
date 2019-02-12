import _mapNext from './_map-next';
import _mapNextNumber from './_map-next-number';
import _stringBreakpointJoin from './_string-breakpoint-join';
import stripUnit from '../strip-unit';
import {
  BreakpointsProps,
  HidpiBreakpointsProps,
  MediaQueryOptionsProps,
} from '../../../types';
import em from '../em';
import getValueAndUnit from '../get-value-and-unit';

const warning = require('warning');

export default class MediaQueryTemplate {
  public static allowedTypes = [
    'all', // Suitable for all devices.
    'print', // Intended for paged, opaque material and for documents viewed on screen in print preview mode. Please consult the section on paged media.
    'screen', // Intended primarily for color computer screens. (Matches all devices that aren’t matched by print or speech.)
    'speech', // Matches screenreaders and similar devices that “read out” a page.
    // deprecated
    'aural', // Intended for speech synthesizers.
    'braille', // Intended for braille tactile feedback devices.
    'embossed', // Intended for paged braille printers.
    'handheld', // Intended for handheld devices (typically small screen, monochrome, limited bandwidth).
    'projection', // Intended for projected presentations, for example projectors or print to transparencies. Please consult the section on paged media.
    'tty', // Intended for media using a fixed-pitch character grid, such as teletypes, terminals, or portable devices with limited display capabilities.
    'tv', // Intended for television-type devices.
  ];

  /**
   *
   */
  protected options: MediaQueryOptionsProps;

  /**
   *
   * @param {MediaQueryOptionsProps} options
   */
  public constructor(options: MediaQueryOptionsProps) {
    this.options = options;
  }

  /**
   *
   * @param options
   */
  public setOption = (options: MediaQueryOptionsProps) => {
    this.options = options;
  };

  /**
   * Generates a media query template string matching the input value.
   *
   * @param {string} value
   *
   * @return {string}
   */
  public render = (value: string): string => {
    if (value === 'retina') {
      return 'only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi)';
    }

    if (['landscape', 'portrait'].includes(value)) {
      return `(orientation: ${value})`;
    }

    // @see https://www.w3.org/TR/css3-mediaqueries/#syntax
    // @see https://www.w3.org/TR/css3-mediaqueries/#media1
    const level3Regex = new RegExp(
      `(not |only )?(${MediaQueryTemplate.allowedTypes.join(
        '|',
      )})|\\(((?:device-)?(?:max-|min-)?)?(width|height|orientation|(?:device-)?aspect-ratio|color(?:-index)?|monochrome|resolution|scan|grid):? ?(-?\\d+\\/?\\w+?|\\w+)?\\)`,
      's',
    );
    const breakpointRegex = new RegExp(
      `(${this.joinObjectKeys(this.options.breakpoints)}|\\d+\\w+) ?(up|down|only)?`,
      'ys',
    );
    const hiDPIRegex = new RegExp(
      `(${this.joinObjectKeys(this.options.hidpiBreakpoints)}) ?(up|down|only)?`,
      'ys',
    );
    const motionRegex = new RegExp(
      '(prefers-reduced-motion:?s?(no-preference|reduce)?)',
      's',
    );
    const mediaQueries = value.split(',');

    let query = '';

    mediaQueries.forEach((queryRule, index) => {
      if (queryRule.split('and(').length > 1) {
        throw new Error(
          'Having no space between "and" and the expression is not allowed.',
        );
      }

      const andSplit = queryRule.split(' and ');
      const delimiter =
        mediaQueries.length >= 2 && mediaQueries.length !== index + 1 ? ',' : '';

      andSplit.forEach((expression, expressionIndex) => {
        const breakpointRegexMatches = breakpointRegex.exec(expression);
        const hiDPIRegexMatches = hiDPIRegex.exec(expression);
        const level3RegexMatches = level3Regex.exec(expression);

        if (
          breakpointRegexMatches !== null &&
          (breakpointRegexMatches[1] !== undefined ||
            breakpointRegexMatches[5] !== undefined)
        ) {
          query += this.generateBreakpointQuery(breakpointRegexMatches, this.options);
        } else if (hiDPIRegexMatches !== null && hiDPIRegexMatches[1] !== undefined) {
          query += this.generateDpiMediaQuery(hiDPIRegexMatches, this.options);
        } else if (level3RegexMatches !== null) {
          if (level3RegexMatches[5] !== undefined) {
            const [unit, type] = getValueAndUnit(level3RegexMatches[5]);

            if (
              level3RegexMatches[4] !== undefined &&
              level3RegexMatches[4] === 'resolution'
            ) {
              // @see https://developer.mozilla.org/de/docs/Web/CSS/resolution
              if (type !== undefined && !['dpi', 'dpcm', 'dppx'].includes(type)) {
                throw new Error(
                  'The resolution value must be followed by a unit identifier ("dpi", "dpcm" or "dppx").',
                );
              }
            } else if (unit < 0) {
              throw new Error(
                `Negative lengths "${unit}${type ||
                  ''}" are not allowed for the "width", "height" or "color" media feature.`,
              );
            }

            if (['width', 'height'].includes(level3RegexMatches[4])) {
              query += `(${level3RegexMatches[3] || ''}${level3RegexMatches[4]}${
                level3RegexMatches[5] ? `: ${em(level3RegexMatches[5])}` : ''
              })`;
            } else {
              query += expression;
            }
          } else {
            query += expression;
          }
        } else if (motionRegex.exec(expression) !== null) {
          query += expression;
        }

        query +=
          andSplit.length >= 2 && andSplit.length !== expressionIndex + 1 ? ' and ' : '';
      });

      query += delimiter;
    });

    return query;
  };

  /**
   * User Defined Type Guard!
   */
  private isHidpi = (arg: any): arg is HidpiBreakpointsProps => {
    return arg['hidpi-1'] !== undefined;
  };

  /**
   * Calculates the size of the min or max with or height of the media query.'(' S* media_feature S* [ ':' S* expr ]? ')' S*.
   *
   * @param {string|number}                          bp
   * @param {string}                                 direction   - Direction of media query (up, down, or only).
   * @param {BreakpointsProps|HidpiBreakpointsProps} breakpoints
   * @param {number}                                 stdWebDpi
   *
   * @return {Array<string|number|null>}
   */
  private calculatedSizes = (
    bp: string | number,
    direction: string,
    breakpoints: BreakpointsProps | HidpiBreakpointsProps,
    stdWebDpi: number,
  ): (string | number | null)[] => {
    // Size or keyword
    let breakpoint = bp;
    // Value of the following breakpoint
    let bpNext: null | number = null;
    // Value for min-width media queries
    let bpMin: null | number | string = null;
    // Value for max-width media queries
    let bpMax: null | number | string = null;
    // If named, name of the breakpoint
    let name: null | string | number = null;
    // If the breakpoint is a HiDPI breakpoint
    let isHidpi = false;

    if (breakpoint in breakpoints) {
      name = breakpoint;
      breakpoint = breakpoints[name];

      if (this.isHidpi(breakpoints)) {
        isHidpi = true;
        bpNext = _mapNextNumber(breakpoints, +breakpoint);
      } else {
        bpNext = _mapNext(breakpoints, `${name}`);
      }
    } else {
      warning(
        true,
        `media-query: ${breakpoint} is not defined in your "breakpoints" settings.`,
      );
    }

    if (name === null && direction === 'only') {
      throw new Error('breakpoint: Only named media queries can have an "only" range.');
    }

    // Conditions to skip media query creation
    // - It's a named breakpoint that resolved to "0 down" or "0 up"
    // - It's a numeric breakpoint that resolved to "0 " + anything

    // Only 'only' and 'up' have a min limit.
    if (direction === 'only' || direction === 'up') {
      if (isHidpi) {
        bpMin = typeof breakpoint === 'string' ? stripUnit(breakpoint) : breakpoint;
      } else {
        bpMin = em(breakpoint);
      }
    }

    // Only 'only' and 'down' have a max limit.
    if (direction === 'only' || direction === 'down') {
      if (name === null) {
        bpMax = isHidpi ? stripUnit(breakpoint) : em(breakpoint);
      } else if (bpNext !== null) {
        // If the breakpoint is named, the max limit is the following breakpoint - 1px.
        if (isHidpi) {
          bpMax = bpNext - 1 / stdWebDpi;
        } else {
          bpMax = bpNext - 1 <= 0 ? '0' : `${+stripUnit(em(bpNext)) - 1 / 16}em`;
        }
      }
    }

    if (+breakpoint < 0) {
      throw new Error(
        `Negative lengths "${breakpoint}" are not allowed for the "width" or "height" media feature.`,
      );
    }

    return [bpMin, bpMax];
  };

  /**
   * Generates a media query for dpi.
   *
   * @param {Array<string>}          matches
   * @param {MediaQueryOptionsProps} options
   *
   * @return {string}
   */
  private generateDpiMediaQuery = (
    matches: string[],
    options: MediaQueryOptionsProps,
  ): string => {
    const sizes = this.calculatedSizes(
      matches[1],
      matches[2] !== undefined ? matches[2] : 'up',
      options.hidpiBreakpoints,
      options.stdWebDpi,
    );

    let bpMinSize: string | number | null = sizes[0];
    let bpMaxSize: string | number | null = sizes[1];

    if (typeof bpMinSize === 'string') {
      bpMinSize = stripUnit(bpMinSize);
    }

    if (typeof bpMaxSize === 'string') {
      bpMaxSize = stripUnit(bpMaxSize);
    }

    // Generate values in DPI instead of DPPX for an IE9-11/Opera mini compatibility.
    // See https://caniuse.com/#feat=css-media-resolution
    const bpMinDpi =
      bpMinSize !== null
        ? `${Math.round(+bpMinSize * options.stdWebDpi)}dpi`
        : bpMinSize;
    const bpMaxDpi =
      bpMaxSize !== null
        ? `${parseFloat(`${Math.round(+bpMaxSize * options.stdWebDpi)}`).toFixed(0)}dpi`
        : bpMaxSize;

    const onlyScreen = 'only screen and ';

    if (bpMaxSize !== null) {
      bpMaxSize = parseFloat(`${bpMaxSize}`).toFixed(5);
    }

    let template = '';
    let query = _stringBreakpointJoin(
      bpMinSize,
      bpMaxSize,
      '-webkit-min-device-pixel-ratio',
      '-webkit-max-device-pixel-ratio',
    );

    if (query !== '') {
      template += `${onlyScreen}${query}, `;
    }

    query = _stringBreakpointJoin(
      bpMinSize,
      bpMaxSize,
      'min--moz-device-pixel-ratio',
      'max--moz-device-pixel-ratio',
    );

    if (query !== '') {
      template += `${onlyScreen}${query}, `;
    }

    if (
      (bpMinSize !== null && +bpMinSize > 1) ||
      (bpMaxSize !== null && +bpMaxSize > 1)
    ) {
      query = _stringBreakpointJoin(
        bpMinSize !== null ? `${+bpMinSize * 2}/2` : null,
        bpMaxSize !== null ? `${+bpMaxSize * 2}/2` : null,
        '-o-min-device-pixel-ratio',
        '-o-max-device-pixel-ratio',
      );

      if (query !== '') {
        template += `${onlyScreen}${query}, `;
      }
    }

    query = _stringBreakpointJoin(
      bpMinDpi,
      bpMaxDpi,
      'min-resolution',
      'max-resolution',
    );

    if (query !== '') {
      template += `${onlyScreen}${query}, `;
    }

    query = _stringBreakpointJoin(
      bpMinSize !== null ? `${bpMinSize}dppx` : null,
      bpMaxSize !== null ? `${bpMaxSize}dppx` : null,
      'min-resolution',
      'max-resolution',
    );

    if (query !== '') {
      template += `${onlyScreen}${query}`;
    }

    return template;
  };

  /**
   * Generates a level 3 media query template string matching the input value.
   *
   * @param {Array<string>}          matches
   * @param {MediaQueryOptionsProps} options
   *
   * @return {string}
   */
  private generateBreakpointQuery = (
    matches: string[],
    options: MediaQueryOptionsProps,
  ): string => {
    const breakpoint = matches[1] !== undefined ? matches[1] : matches[5];
    const direction = matches[2] !== undefined ? matches[2] : 'up';

    const sizes = this.calculatedSizes(breakpoint, direction, options.breakpoints, 0);

    let query = _stringBreakpointJoin(sizes[0], sizes[1]);
    // const breakpointValue: number | null = options.breakpoints[breakpoint] !== undefined ? options.breakpoints[breakpoint] : null;

    if (query !== '') {
      query = `only screen and ${query}`;
      // // For named breakpoints less than or equal to printBreakpoint, add print to the media types
      // if ((breakpointValue !== null && breakpointValue <= options.breakpoints[options.printBreakpoint]) || direction === 'down') {
      //   query = `print, ${query}`;
      // }
    }

    return query;
  };

  /**
   * Joints object keys together.
   *
   * @param {Object} object
   *
   * @return {string}
   */
  private joinObjectKeys = (object: object): string => {
    return Object.keys(object)
      .sort(
        (a: string, b: string): number => {
          return b.localeCompare(a);
        },
      )
      .join('|')
      .replace(new RegExp('_', 'g'), '\\_')
      .replace(new RegExp('-', 'g'), '\\-');
  };
}
