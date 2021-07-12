// add two integers
// add decimals
// add negatives
// add string
// one number?
// string of 'ten'
import sum from './add.js';

test('Add 2 Integers', () => {
    expect(sum(1,2)).toBe(3);    
})

test('Add 2 decimals', () => {
    expect(sum(1.3,1.85)).toBe(3.15);
})

test('Add 2 negatives', () => {
    expect(sum(-1,3)).toBe(2);
})

test('Add 2 strings', () => {
    expect(sum('1','2')).toBe(3);    
})

test('Add ONE', () => {
    expect(sum(8)).toBe(8);    
})

test('Add STRING 10', () => {
    expect(sum('10',1)).toBe(11);    
})