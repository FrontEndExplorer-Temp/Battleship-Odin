import { Ship } from '../../src/core/ship.js';

describe('Ship', () => {
    let ship;

    beforeEach(() => {
        ship = new Ship(3);
    });

    it('should initialize with default values', () => {
        expect(ship.length).toBe(3);
        expect(ship.hits).toBe(0);
    });

    it('should get hit', () => {
        ship.hit();
        expect(ship.hits).toBe(1);
    });

    it('should sink', () => {
        ship.hit();
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBeTruthy;
    });
});