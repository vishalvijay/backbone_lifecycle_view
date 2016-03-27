class Backbone.LifeCycleView extends Backbone.View

  initialize: (arg) ->
    @subViews = []
    @attached = false
    @isAlive = true
    @onCreate(arg)

  onCreate: (arg) ->

  destroy: ->
    @subViews.forEach (sv) ->
      sv.destroy() if sv
    @onDestroy()
    @remove()
    @undelegateEvents()
    @isAlive = false

  onDestroy: ->

  isAttached: ->
    unless @parent
      @attached
    else
      @parent.isAttached()

  attachTo: (v, atTO, options = {})->
    @subViews.push v
    v.attach atTO, $.extend({}, options, {parent: @})

  attach: (atTO, options = {}) ->
    @parent = options.parent
    isAppend = options.isAppend || false
    isAnimate = options.isAnimate || false
    atTO.hide() if isAnimate
    @render()
    unless isAppend
      atTO.html @el
    else
      atTO.append @el
    atTO.fadeIn("fast") if isAnimate
    @attached = true unless @parent
    @afterAttach()
  
  afterAttach: ->
    if @isAttached()
      @subViews.forEach (sv, i) ->
        if sv
          if sv.isAlive
            sv.afterAttach()
          else
            @subViews[i] = -1
      @subViews = _.without(@subViews, -1)
      @afterAttached()

  afterAttached: ->
