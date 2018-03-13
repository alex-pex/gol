import React from 'react';
import ReactDOM from 'react-dom';
import getNextGeneration from './getNextGeneration';

/**
 * À chaque étape, l’évolution d’une cellule est entièrement déterminée par l’état de ses huit voisines de la façon
 * suivante :
 * 
 * Une cellule morte possédant exactement trois voisines vivantes devient vivante (elle naît),
 * Une cellule vivante possédant deux ou trois voisines vivantes le reste,
 * Sinon elle meurt.
 * 
 * @link https://fr.wikipedia.org/wiki/Jeu_de_la_vie#R%C3%A8gles
 */

describe('Règles de base', () => {
  it("Si une cellule est morte et a exactement trois voisines vivantes, elle prend vie à l'étape suivante.", () => {
    const cells = [
      [0, 1, 0],
      [1, 0, 1], // <-- La cellule au centre prendre vie
      [0, 0, 0]
    ];
  
    expect(getNextGeneration(cells)[1][1]).toBe(1);
  });

  it("Si une cellule est vivante et a deux voisines vivantes, elle reste en vie à l'étape suivante.", () => {
    const cells = [
      [0, 0, 0],
      [1, 1, 1], // <-- La cellule au centre doit rester en vie
      [0, 0, 0]
    ];
  
    expect(getNextGeneration(cells)[1][1]).toBe(1);
  });

  it("Si une cellule est vivante et a trois voisines vivantes, elle reste en vie à l'étape suivante.", () => {
    const cells = [
      [1, 0, 0],
      [1, 1, 1], // <-- La cellule au centre doit rester en vie
      [0, 0, 0]
    ];
  
    expect(getNextGeneration(cells)[1][1]).toBe(1);
  });
  
  it("Dans tous les autres cas, la cellule meurt à l’étape suivante.", () => {
    const cells = [
      [1, 1, 1],
      [1, 1, 1], // <-- La cellule au centre doit mourir
      [0, 0, 0]
    ];
  
    expect(getNextGeneration(cells)[1][1]).toBe(0);
  });
})

/**
 * Les structures stables (en anglais still life) sont des ensembles de cellules ayant stoppé toute évolution : elles
 * sont dans un état stationnaire et n’évoluent plus tant qu’aucun élément perturbateur n’apparaît dans leur
 * voisinage. Un bloc de quatre cellules est la plus petite structure stable possible.
 *
 * On peut remarquer que certaines figures se stabilisent en structures florales après une succession d'itérations
 * comparables à une floraison.
 */

describe('Structures stables', () => {
  it('Le bloc de 4 cellules', () => {
    const cells = [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ];
  
    expect(getNextGeneration(cells)).toEqual([
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ]);
  });
});

/**
 * Les oscillateurs se transforment de manière cyclique, en revêtant plusieurs formes différentes avant de retrouver
 * leur état initial. Des figures de ce type sont très nombreuses : on en connaît actuellement des centaines3.
 * 
 * Le « clignotant » est le plus petit oscillateur du jeu de la vie. Composé de seulement trois cellules à chaque
 * génération, il apparaît facilement de façon quasi-spontanée.
 * 
 * La « grenouille » est aussi une structure qui se répète toutes les deux générations.
 */

describe('Oscillateurs', () => {
  it('Le clignotant', () => {
    const cells = [
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 0]
    ];
  
    expect(getNextGeneration(cells)).toEqual([
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0]
    ]);
  });

  it('La grenouille', () => {
    const cells = [
      [0, 0, 0, 0],
      [0, 1, 1, 1],
      [1, 1, 1, 0],
      [0, 0, 0, 0]
    ];
  
    expect(getNextGeneration(cells)).toEqual([
      [0, 0, 1, 0],
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [0, 1, 0, 0]
    ]);
  });
});
