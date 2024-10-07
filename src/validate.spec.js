import { validateAddParams, validateSearchParams, validateCompleteParams } from "./validate";

describe('validateAddParams', () => {
  it('should pass and return with the original params with single string', () => {
    const params = ['Todo'];
    const expected = ['Todo'];
    
    const current = validateAddParams(params);

    expect(current).toStrictEqual(expected);
  })

  it('should pass and return with the original params with single string separated with spaces', () => {
    // Align
    const params = ['Todo Item'];
    const expected = ['Todo Item'];
    
    //Act
    const current = validateAddParams(params);

    //Assert
    expect(current).toStrictEqual(expected);
  })

  it('should throw when multiple strings given', () => {
    const params = ['Todo Item', 'Other string'];
    
    expect(() => validateAddParams(params))
      .toThrow('Give a title as the only parameter in parenthesis.');
  })

  it('should throw when no params given.', () => {
    const params = [];
    
    expect(() => validateAddParams(params))
      .toThrow('Give a title as the only parameter in parenthesis.');
  })

  it('should throw when the param is not a string', () => {
    const params = [5];
    
    expect(() => validateAddParams(params))
      .toThrow('The title must be a non zero length string.');
  })

  it('should throw when the param is a zero length string', () => {
    const params = [''];
    
    expect(() => validateAddParams(params))
      .toThrow('The title must be a non zero length string.');
  });
});

describe('validateSearchParams', () => {
  it('should pass and return with the original params, when params length at least 3 characters', () => {
    const params = ["clean"]
    const expected = ["clean"]

    const current = validateSearchParams(params)

    expect(current).toStrictEqual(expected)
  });

  it('should throw when the param is shorter then 3 characters', () => {
    const params = ["cl"]

    expect(() => validateSearchParams(params)).toThrow("You should type at least 3 characters!")
  });
});

describe('validateCompleteParams', () => {
  it('should pass and return with params in number format with numeric string', () => {
    const params = '1';
    const expected = 1;
    
    const current = validateCompleteParams(params);

    expect(current).toStrictEqual(expected);
  });

  it('should throw when multiple strings given', () => {
    const params = [3, 4];
    
    expect(() => validateCompleteParams(params))
      .toThrow('Give one, and only one ID please!');
  });

  it('should throw when no params given.', () => {
    const params = [];
    
    expect(() => validateCompleteParams(params))
      .toThrow('Give one, and only one ID please!');
  });

  it('should throw when the param is not a number', () => {
    const params = ["cica"];
    
    expect(() => validateCompleteParams(params))
      .toThrow('The ID must be a number.');
  });

  it('should throw when the param is a zero length string', () => {
    const params = [''];
    
    expect(() => validateCompleteParams(params))
      .toThrow('The ID must be a number.');
  });
});