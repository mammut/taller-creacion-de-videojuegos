---
layout: post
title: "Phaser: Endless Jumper y Repite"
cover: 2016-03-13.jpg
date:   2016-03-13 17:54:40
categories: posts
---

## Probando Phaser


Lo primero que hice para aprender Phaser fue seguir el tutorial de principiantes, donde explican a rasgos generales como utilizar el framework. Explican principalmente el funcionamiento del Preloader, Create y Update, funciones que forman parte del ciclo de un juego.

- En Preload se cargan los assets necesarios para el juego (imágenes, sonidos, tiles, etc).
- En Create se crean los objetos del mundo del juego, plataformas, personajes, etc.
- En Update se actualiza constantemente el estado del juego, movimientos, colisiones, etc.

Leyendo otros tutoriales y ejemplos descubrí una forma diferente de programar el juego utilizando Herencia en JS (herencia de prototipos, no de clases). Es un poco mas complicada que utilizando el objeto literal, pero el código queda mas estructurado y la ocultación de los objetos del juego es mas limpia que hacer la típica **immediately invoked function**.

La diferencia es:

### Ejemplo utilizando objetos literales
```javascript
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { 
    preload: preload,
    create: create,
    update: update 
    // todo es referenciado utilizando game
    ...
});
```
&nbsp;

### Ejemplo utilizando herencia de prototipos
```javascript
var Jumper = function() {};
Jumper.Play = function() {};

Jumper.Play.prototype = {
    preload: preload,
    create: create,
    update: update 
    // todo es referenciado utilizando this
};

var game = new Phaser.Game(600, 500, Phaser.CANVAS, '');
```

Por experiencia previa en JavaScript opte por hacer mis juegos en el segundo formato.

## Endles Jumper

[Endless Jumper](http://gamejolt.com/games/endless-jumper/133143): La idea original es del juego [Winterbells](http://www.ferryhalim.com/orisinal/g3/bells.htm), un endless jumper en que solo es posible avanzar hacia arriba a medida que se van tocando las campanitas.

Este juego es un arcade el cual involucra física, en especifico gravedad y colisiones. Phaser incluye tres tipos de físicas y es muy sencillo de inicializar. Muy bueno en ese aspecto.

Phaser da la posibilidad de crear grupos de objetos o elementos, por ejemplo el grupo de estrellas, el cual colisiona con el Player. Esto es una gran ventaja, pues para indicarle al juego que las estrellas deben colisionar con el jugador no es necesario indicarle a cada estrella individualmente, si no basta con el grupo estrella, luego cualquier elemento del grupo colisiona con el Player automáticamente.

La principal dificultad del juego fue el movimiento infinito vertical y el manejo de las estrellas (aparecer y desaparecer).

Para el movimiento infinito vertical se utiliza una mezcla de *Bounds* y *Wrap*. El mundo en el eje vertical queda fijo con respecto al player. En el eje x tiene un wrap (si sale por la derecha, aparece por la izquierda). 

Para la generación de estrellas encontré un ejemplo de un sistema similar (a lo flappy bird) en que utiliza elementos *vivos* y *muertos* (`elem.kill()`)
Luego cuando salían las estrellas de la vista, o cuando el player lo tocaba, quedaba en la lista de elementos muertos. Luego en el update, volvía a crear el elemento por sobre la vista de la cámara actual, distribuido equitativamente.

```javascript
this.stars.forEachAlive(function(elem) {
    if (elem.y > this.camera.y + this.game.height) {
         // eliminar elementos fuera de la camara
        elem.kill();
         // Crear arriba
        this.starsCreateOne(this.rnd.integerInRange(0, this.world.width - 50),  this.camera.y - 50);
    }
}.bind(this));
```

Phaser es una excelente opción para crear juegos tipo arcade, pues incluye muchas implementaciones elementos de física (gravedad, colisiones, teclados, camaras, etc).

### Repite

Este juego no es un arcade, sino un tipo memorice, donde el jugador debe observar una secuencia de luces para luego repetirla. Al repetirla correctamente, la secuencia crece en una luz.

No fue necesario utilizar física en este juego, y la lógica del juego en general es bastante sencilla, solo se agrega un numero del botón al azar a una lista de números (la secuencia) y luego se escucha la secuencia del usuario, si cambia en algo este pierde.

La mayor dificultad fue el parpadeo de las luces, pero en los ejemplos de Phaser había un ejemplo similar de como crear parpadeos. Utilizaban diferencias de tiempo para luego en un tiempo futuro en otro update cambiar el *alpha* del botón.

## Veredicto

Phaser es una excelente libreria en JavaScript para crear juegos, la API esta bien documentada, hay muchisimos ejemplos y recursos para aprender, la comunidad es grande. Por otro lado es necesario tener un nivel descente de JavaScript, en especial cuando se refiere al scope, el tipico problema de:

```javascript
setTimeout(function() {
    this.works(); // no funciona
}, 400);
```

vs

```javascript
setTimeout(function() {
    this.works() // funciona
}.bind(this), 400);
```
