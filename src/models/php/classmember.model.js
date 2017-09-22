/**
 * Enum holding visibilities.
 * @type {Object}
 */
export const Visibility = {
  PUBLIC: 'public',
  PRIVATE: 'private',
  PROTECTED: 'protected'
};

export default class ClassMember {
  /**
   * Constructor.
   * @param  {String}     name       Name of the member.
   * @param  {String}     value      Value of the member.
   * @param  {Boolean}    isConst    If true, the member is constant.
   * @param  {Visibility} visibility Member visibility.
   * @param  {Boolean}    isStatic   If true, the member is static.
   * @param  {Boolean}    literal    If true, the literal value will be used.
   */
  constructor(
    name: string,
    value: ?any,
    isConst: ?boolean,
    visibility: ?Visibility,
    isStatic: ?boolean,
    literal: ?boolean
  ) {
    this._name = name;
    this._value = value || undefined;
    this._const = isConst || false;
    this._visibility = visibility || Visibility.PRIVATE;
    this._static = isStatic || false;
    this._literal = literal || false;
  }

  /**
   * Converts the construct to code.
   * @param  {Number} spaces Spacing in front of every line.
   * @return {String}        Construct as PHP code.
   */
  toPHP(spaces: number) {
    /**
     * Array holding all chars of the final code.
     * @type {Array}
     */
    const chars: array = [];

    /**
     * Build the spacing string.
     * @type {String}
     */
    const spacing: string = ' '.repeat(spaces);

    chars.push(`${spacing}`);

    if (!this._const) {
      chars.push(this._visibility);
      if (this._static) chars.push('static');
    } else chars.push('const');

    /**
     * Variable prefix if the member is not static.
     * @type {String}
     */
    const prefix = !this._const ? '$' : '';
    chars.push(prefix + this._name);
    chars.push('=');

    if (this.value !== undefined) {
      /**
       * Type of the member's value.
       * @type {String}
       */
      const type = this._value.constructor.name;

      /**
       * Determine the final PHP value
       */
      if (type == 'String' && !this._literal) chars.push(`'${this._value}'`);
      else chars.push(this._value);
    }

    /**
     * Return the final code.
     */
    return chars.join(' ') + ';';
  }

  /**
   * Gets the member's name.
   * @return {String} Name of the member.
   */
  get name() {
    return this._name;
  }

  /**
   * Returns the member's value.
   * @return {any} Value of the member.
   */
  get value() {
    return this._value;
  }
}
