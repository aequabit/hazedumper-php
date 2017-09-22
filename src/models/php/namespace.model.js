export default class Namespace {
  /**
   * Constructor.
   * @param {String}       name    Name of the namespace.
   * @param {Array<Class>} classes Classes in the namespace.
   */
  constructor(name: string, classes: ?array<Class>) {
    this._name = name;
    this._classes = classes || [];
  }

  /**
   * Converts the construct to code.
   * @param  {Number} spaces Spacing in front of every line.
   * @return {String}        Construct as PHP code.
   */
  toPHP(spaces: number) {
    /**
     * Array holding all lines of the final code.
     * @type {Array}
     */
    const lines: array = [];

    /**
     * Build the spacing string.
     * @type {String}
     */
    const spacing: string = ' '.repeat(spaces);
    /**
     * Push the namespace declaration.
     */
    lines.push(`${spacing}namespace ${this._name} {`);

    /**
     * Push all classes.
     */
    for (const cls of this._classes) lines.push(spacing + cls.toPHP(2));

    /**
     * Push the closing.
     */
    lines.push(spacing + '}');

    /**
     * Return the final code.
     */
    return lines.join('\n');
  }

  /**
   * Gets the namespace's name.
   * @return {String} Name of the namespace.
   */
  get name() {
    return this._name;
  }

  /**
   * Returns all classes of the namespace.
   * @return {Array<Class>} Classes in the namespace.
   */
  get classes() {
    return this._classes;
  }
}
