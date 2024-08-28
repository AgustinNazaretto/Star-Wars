"use strict";

/* Declaraciones */
var d = document,
    navBtn = d.querySelector('#nav button'),
    navMenu = d.querySelector('#nav .menu'),
    mapBtn = d.querySelector('#footer button.map'),
    mapFrame = d.querySelector('#footer iframe.map'),
    galleries = d.querySelectorAll('.gallery'),
    sound = d.createElement('audio');
/* Funciones */

var toggle = function toggle(element) {
  var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "active";
  return element.classList.toggle(className);
};

var getActiveItem = function getActiveItem(array) {
  var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'active';
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = array[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      // Buscamos el elemento
      if (item.classList.contains(className)) {
        toggle(item); // Removemos la clase

        return item;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};

var parent = function parent(el, type) {
  return el.parentNode[type + "ElementChild"];
};

var getFirst = function getFirst(el) {
  return parent(el, "first");
};

var getLast = function getLast(el) {
  return parent(el, "last");
};

var setActiveItem = function setActiveItem(array, type) {
  var className = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'active';
  var item = getActiveItem(array, className);
  var newItem = // Identificamos al siguiente elemento
  type === 'next' ? item.nextElementSibling || getFirst(item) : type === "prev" ? item.previousElementSibling || getLast(item) : array[type];
  toggle(newItem); // Agregamos la clase
};
/* Eventos */


navBtn.addEventListener('click', function () {
  return toggle(navMenu);
});
mapBtn.addEventListener('click', function () {
  return toggle(mapFrame);
});
galleries.forEach(function (gallery) {
  var buttons = ['prev', 'next'];
  var items = gallery.querySelectorAll('.gallery-item');
  var controls = gallery.querySelectorAll('.gallery-controls button'); // Botones de direccion

  buttons.forEach(function (button) {
    var btn = gallery.querySelector(".icon-".concat(button));
    btn.addEventListener('click', function () {
      setActiveItem(items, button);
      setActiveItem(controls, button);
    });
  }); // Botones de control

  controls.forEach(function (ctrl, i) {
    return ctrl.addEventListener('click', function () {
      setActiveItem(items, i);
      setActiveItem(controls, i);
    });
  });
});