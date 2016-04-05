---
layout: post
title: "Endless Jumper v0.2.0 release"
cover: 2016-04-04.jpg
date:   2016-04-04 22:49:20
categories: posts
---

## v0.2.0

En la version 0.2.0 de [Endless Jumper](http://gamejolt.com/games/endless-jumper/133143) se han introducido una serie de cambios para hacer el juego mas divertido de jugar. El detalle completo de los cambios lo pueden encontrar en el repositorio del juego en [Github](https://github.com/mammut/taller-creacion-de-videojuegos/tree/master/prototypes/1-endless-jumper).

A grandes rasgos:

- Se agregaron elementos de audio.
- Se agrego la posibilidad de salto en *mid air*, los cuales son limitados.
- Se agregaron estrellas de tres tipos de colores, los azules y rojos hacen saltar mas alto. Los rojos a su vez entregan un *mid air* mas al jugador.

En base a los cambios realizados se construyen los siguientes modelos para explicar el juego.

##  Token Based Model

Se han identificado los siguientes *Tokens* dentro del juego:


<p class="center">
<img class="responsive responsive-400" src="{{ site.baseurl }}/images/2016-04/tags.png" alt="game Tags">
</p>

los cuales interactúan en la siguiente matriz de eventos:

<p class="center">
<img class="responsive responsive-400" src="{{ site.baseurl }}/images/2016-04/tags-diagram.png" alt="game Tags">
</p>


## Game Layers

Usando los tokens identificados se puede representar el juego usando Game Layers. Se ha construido el siguiente diagrama para el juego:

<p class="center">
<img class="responsive responsive-600" src="{{ site.baseurl }}/images/2016-04/game-layers.png" alt="Game Layers">
</p>

En general la complejidad del juego no es demasiado grande, sería interesante pivotear el juego agregando elementos de enemigos móviles los que haya que esquivar, ademas de agregar nuevas habilidades al jugador para enfrentar dichos obstáculos.

### Referencias

[Game Design Tools for Collaboration by Damien Djaouti](http://www.gamasutra.com/view/feature/187777/game_design_tools_for_collaboration.php?print=1)
