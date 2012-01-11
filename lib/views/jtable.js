JTABLE.Backbone.Views.jtable = Backbone.View.extend({
  template: JTABLE.Backbone.Templates.jtable,
  
  initialize: function() {
    _.bindAll(this, 'render');
    this.el = this.options.el;
    this.settings = this.options.settings;
    $(this.el).addClass('jtable-container');
  },
  
  render: function() {
    $(this.el).html(this.template({view: this}));
    this.header_view = new JTABLE.Backbone.Views.header({mainView: this, settings: this.settings});
    this.header_view.render();
    this.table_view = new JTABLE.Backbone.Views.table({mainView: this, settings: this.settings});
    this.table_view.render();
    this.footer_view = new JTABLE.Backbone.Views.footer({mainView: this, settings: this.settings});
    this.footer_view.render();
    return this;
  }
});