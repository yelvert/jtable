JTABLE.Backbone.Views.jtable = Backbone.View.extend({
  template: JTABLE.Backbone.Templates.jtable,
  
  initialize: function() {
    _.bindAll(this);
    $(this.el).data('jtable', this);
    $(this.el).addClass('jtable-container');
    $(this.el).html(this.template({view: this}));
    this.header_view = new JTABLE.Backbone.Views.header({mainView: this});
    this.footer_view = new JTABLE.Backbone.Views.footer({mainView: this});
  }
});