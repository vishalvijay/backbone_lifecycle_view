# backbone_lifecycle_view
A BackboneJS view implementation with proper life cycle management.

##Methods:
* isAttached
* attachTo
* attach
* destroy

##Life cycle methods:
* onCreate
* afterAttached
* onDestroy

##How to use it:
* Extend the class with Backbone.LifeCycleView
* Use `attach` method to attach view to any jQuery dom object
* Use `attachTo` method to attach view to any jQuery dom object and here parent will be the current view.