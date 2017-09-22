export default class Class {
  /**
   * Constructor.
   * @param {String}      name    Name of the class.
   * @param {ClassMember} members Members of the class.
   */
  constructor(name: string, members: ?array<ClassMember>) {
    this._name = name;
    this._members = members || [];
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
     * Push the class declaration.
     */
    lines.push(`${spacing}class ${this._name} {`);

    /**
     * Push all class members.
     */
    for (const member of this._members) lines.push(spacing + member.toPHP(2));

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
  * Returns all class members.
   * @return {Array<ClassMember>} Class members.
   */
  get members() {
    return this._members;
  }
}
