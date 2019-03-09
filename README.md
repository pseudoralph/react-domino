# Double-9 Domino

#### Epicodus capstone project created in React

#### Ralph Perdomo. March 1, 2019

## Description

Note on spelling: Dominó is spelled with an accent mark over the o (indicating the o is a stressed syllable) in Spanish. Both dominó and domino (without the accent mark) may appear interchangibly within this project.

Most online domino games are based on a double-6 set. Cuban dominos, however, are played using a double-9 set Great Book of Domino Games.

This project is that domino game.

## Hierarchical overview

![Project UI-1](https://github.com/pseudoralph/domino-planning/blob/master/assets/ui-2.jpg)
![Project UI-2](https://github.com/pseudoralph/domino-planning/blob/master/assets/ui.jpeg)
![State representation](https://github.com/pseudoralph/domino-planning/blob/master/assets/state.jpeg)
![Components Tree](https://github.com/pseudoralph/domino-planning/blob/master/assets/component_tree.jpeg)

- GameLoader
  - Game
    - PlayBoard
      - PlayerStatus
        - Player
    - Hand
      - Ficha
        - Face

## Setup

- clone this repository using `git clone https://github.com/pseudoralph/react-domino`
- navigate to the newly-downloaded repo and install dependencies using: `npm install`
- launch dev environment using `npm run start`
- navigate to `localhost:8080`

## Technologies Used

JS, React 16.8

## Objectives

- [x] Includes visual representation of the capstone's planned layout/appearance.

- [x] Includes visual of project's component tree.

- [x] Project was submitted by the Friday deadline.

- [x] Project demonstrates an understanding of all React concepts. If prompted, you can discuss your code with an instructor using the correct terminology.

- [x] Lists all planned state, details how state will be structured and lifted.

### License

MIT License

Copyright (c) 2019, Ralph Perdomo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
