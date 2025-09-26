// src/shared/helpers/common.helper.ts

export class CommonHelper {
  /**
   * Verifica se um valor não é null, undefined ou string vazia
   */
  static isNotEmpty(value: any): boolean {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string' && value.trim() === '') return false;
    return true;
  }

  /**
   * Verifica se um valor é null, undefined ou string vazia
   */
  static isEmpty(value: any): boolean {
    return !this.isNotEmpty(value);
  }

  /**
   * Verifica se um array não está vazio
   */
  static isNotEmptyArray(value: any[]): boolean {
    return this.isNotEmpty(value) && Array.isArray(value) && value.length > 0;
  }

  /**
   * Verifica se um objeto não está vazio
   */
  static isNotEmptyObject(value: object): boolean {
    return this.isNotEmpty(value) &&
           typeof value === 'object' &&
           !Array.isArray(value) &&
           Object.keys(value).length > 0;
  }

  /**
   * Retorna o valor ou um valor padrão se estiver vazio
   */
  static defaultValue<T>(value: T, defaultValue: T): T {
    return this.isNotEmpty(value) ? value : defaultValue;
  }

  /**
   * Remove valores vazios de um objeto
   */
  static removeEmptyValues(obj: any): any {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, value]) => this.isNotEmpty(value))
    );
  }
}
