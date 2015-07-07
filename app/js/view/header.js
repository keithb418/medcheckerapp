/*global mina*/

define(function (require) {
  'use strict';
  var App = require('app');
  var snap = require('snap');
  var template = require('text!../../html/header.html');

  return Backbone.Marionette.ItemView.extend({
    id: 'header',
    tagName: 'div',
    className: '',
    template: _.template(template),

    serializeData: function () {
      return {
        appName: App.name
      };
    },

    events: {
      'click .trigger': 'handleToggleMenu',
      'click :not(.menu)': 'closeMenu',
      'click *': 'closeSearch',
      'click .menu__items a': 'resetBackboneHistory'
    },
    
    ui: {
      'menu': '.menu'
    },
    
    initialize: function () {
      var that = this;
      App.vent.on("close:menu", function () {
        that.bindUIElements();
        that.closeMenu();
      });
    },
    
    onRender: function () {
      this.trigger = this.el.querySelector('button.trigger');
      this.shapeEl = this.el.querySelector('span.morph-shape');
  
      var shape = snap(this.shapeEl.querySelector('svg'));
      this.pathEl = shape.select('path');
      this.paths = {
        reset: this.pathEl.attr('d'),
        active: this.shapeEl.getAttribute('data-morph-active')
      };
      this.bindUIElements();
    },
    
    resetBackboneHistory: function () {
      Backbone.history.stop();
      Backbone.history.start();
    },
    
    handleToggleMenu: function () {
      var self = this; 
   
      if (this.ui.menu.hasClass('menu--open')) {
        this.ui.menu.removeClass('menu--open');
      } else {
        setTimeout(function() {
          self.ui.menu.addClass('menu--open');
        }, 175);
      }
  
      this.pathEl.stop().animate({
        'path': this.paths.active
      }, 150, mina.easein, function() {
        self.pathEl.stop().animate({
          'path': self.paths.reset
        }, 800, mina.elastic);
      });
    },
    closeMenu: function () {
      this.ui.menu.removeClass('menu--open');
    },
    closeSearch: function () {
      App.vent.trigger('close:results');
    }   
  });
});
