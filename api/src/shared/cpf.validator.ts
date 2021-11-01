import {
  ValidatorConstraint,
  ValidationArguments,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'cpfValidator', async: false })
export class CpfValidator implements ValidatorConstraintInterface {
  validate(cpf: string | undefined, _args: ValidationArguments) {
    if (!cpf) {
      return false;
    }

    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) {
      return false;
    }

    const cpfArray = cpf.split('');

    const validator = cpfArray
      .filter((digit, index, array) => index >= array.length - 2 && digit)
      .map((el) => +el);
    const toValidate = (pop) =>
      cpfArray
        .filter((digit, index, array) => index < array.length - pop && digit)
        .map((el) => +el);
    const rest = (count, pop) =>
      ((toValidate(pop).reduce((soma, el, i) => soma + el * (count - i), 0) *
        10) %
        11) %
      10;
    return !(rest(10, 2) !== validator[0] || rest(11, 1) !== validator[1]);
  }

  defaultMessage(_args: ValidationArguments) {
    return 'cpf is invalid!';
  }
}
