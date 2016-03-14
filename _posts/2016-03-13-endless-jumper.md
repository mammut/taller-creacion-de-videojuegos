---
layout: post
title: Endless Jumper
cover: 2016-03-13.jpg
date:   2016-03-13 17:54:40
categories: posts
---

## El juego del día, Endless Jumper

La idea original es del juego [Winterbells](http://www.ferryhalim.com/orisinal/g3/bells.htm), un endless jumper en que solo es posible avanzar hacia arriba a medida que se van tocando las campanitas.

Para este juego decidí utilizar [Phaser](http://phaser.io/), un framework en HTML5. Lo primero fue seguir el tutorial de principiantes, donde explican a rasgos generales como utilizar el framework. Explican principalmente el funcionamiento del Preloader, Create y Update, funciones que forman parte del ciclo de un juego.

- En Preload se cargan los assets necesarios para el juego (imágenes, sonidos, tiles, etc).
- En Create se crean los objetos del mundo del juego, plataformas, personajes, etc.
- En Update se actualiza constantemente el estado del juego, movimientos, colisiones, etc.
