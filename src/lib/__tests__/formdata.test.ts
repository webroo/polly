import { parseFormData } from '../formdata';

describe('parseFormData', () => {
  it('parses FormData into a plain object', () => {
    const formData = new FormData();

    // Test some nested form data keys commonly used in this project.
    formData.append('title', 'foo');
    formData.append('options[0].name', 'one');
    formData.append('options[1].name', 'two');
    formData.append('selectedOptions[]', 'three');
    formData.append('selectedOptions[]', 'four');

    expect(parseFormData(formData)).toEqual({
      title: 'foo',
      options: [{ name: 'one' }, { name: 'two' }],
      selectedOptions: ['three', 'four'],
    });
  });

  it('removes any keys starting with a $', () => {
    const formData = new FormData();

    formData.append('title', 'foo');
    formData.append('$NEXT', 'bar');

    expect(parseFormData(formData)).toEqual({
      title: 'foo',
    });
  });
});
