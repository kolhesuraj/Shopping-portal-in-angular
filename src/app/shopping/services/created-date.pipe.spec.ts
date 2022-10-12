import { CreatedDatePipe } from './created-date.pipe';

describe('CreatedDatePipe', () => {
  it('create an instance', () => {
    const pipe = new CreatedDatePipe();
    expect(pipe).toBeTruthy();
  });
});
