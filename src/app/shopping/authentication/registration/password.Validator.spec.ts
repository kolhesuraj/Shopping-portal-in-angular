import { AbstractControl, FormControl } from '@angular/forms';
import { passwordValidator } from '../registration/password.Validator';

describe('maxTextLength', () => {
  const maxTextLengthValidator = passwordValidator(new FormControl());
  const control = new FormControl('Password');

  it('should return null if input string length is less than max', () => {
    control.setValue('12345');
    expect(passwordValidator(control as AbstractControl)).toBeNull();
  });
});
