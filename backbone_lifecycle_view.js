var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone.LifeCycleView = (function(superClass) {
  extend(LifeCycleView, superClass);

  function LifeCycleView() {
    return LifeCycleView.__super__.constructor.apply(this, arguments);
  }

  LifeCycleView.prototype.initialize = function(arg) {
    this.subViews = [];
    this.attached = false;
    this.isAlive = true;
    return this.onCreate(arg);
  };

  LifeCycleView.prototype.onCreate = function(arg) {};

  LifeCycleView.prototype.destroy = function() {
    this.subViews.forEach(function(sv) {
      if (sv) {
        return sv.destroy();
      }
    });
    this.onDestroy();
    this.remove();
    this.undelegateEvents();
    return this.isAlive = false;
  };

  LifeCycleView.prototype.onDestroy = function() {};

  LifeCycleView.prototype.isAttached = function() {
    if (!this.parent) {
      return this.attached;
    } else {
      return this.parent.isAttached();
    }
  };

  LifeCycleView.prototype.attachTo = function(v, atTO, options) {
    if (options == null) {
      options = {};
    }
    this.subViews.push(v);
    return v.attach(atTO, $.extend({}, options, {
      parent: this
    }));
  };

  LifeCycleView.prototype.attach = function(atTO, options) {
    var isAnimate, isAppend;
    if (options == null) {
      options = {};
    }
    this.parent = options.parent;
    isAppend = options.isAppend || false;
    isAnimate = options.isAnimate || false;
    if (isAnimate) {
      atTO.hide();
    }
    this.render();
    if (!isAppend) {
      atTO.html(this.el);
    } else {
      atTO.append(this.el);
    }
    if (isAnimate) {
      atTO.fadeIn("fast");
    }
    if (!this.parent) {
      this.attached = true;
    }
    return this.afterAttach();
  };

  LifeCycleView.prototype.afterAttach = function() {
    if (this.isAttached()) {
      this.subViews.forEach(function(sv, i) {
        if (sv) {
          if (sv.isAlive) {
            return sv.afterAttach();
          } else {
            return this.subViews[i] = -1;
          }
        }
      });
      this.subViews = _.without(this.subViews, -1);
      return this.afterAttached();
    }
  };

  LifeCycleView.prototype.afterAttached = function() {};

  return LifeCycleView;

})(Backbone.View);
