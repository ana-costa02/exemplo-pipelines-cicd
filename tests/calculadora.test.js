const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

let dom;
let document;
let window;

beforeEach(() => {
  dom = new JSDOM(html);
  document = dom.window.document;
  window = dom.window;
  global.document = document;
  global.window = window;
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Calculadora Simples', () => {
  test('Deve somar corretamente', () => {
    document.getElementById('display').value = '2+2';
    calculate();
    expect(document.getElementById('display').value).toBe('4');
  });

  test('Deve subtrair corretamente', () => {
    document.getElementById('display').value = '5-3';
    calculate();
    expect(document.getElementById('display').value).toBe('2');
  });

  test('Deve multiplicar corretamente', () => {
    document.getElementById('display').value = '3*4';
    calculate();
    expect(document.getElementById('display').value).toBe('12');
  });

  test('Deve dividir corretamente', () => {
    document.getElementById('display').value = '10/2';
    calculate();
    expect(document.getElementById('display').value).toBe('5');
  });

  test('Deve lidar com erros de cálculo', () => {
    document.getElementById('display').value = '10/0';
    calculate();
    expect(document.getElementById('display').value).toBe('Error');
  });
});
