var JTABLE = {
  Backbone: {
    Models: {},
    Collections: {},
    Views: {},
    Templates: {}
  }
};

(function($) {
  $.fn.jtable = function(options) {
    var options = (options || {});
    var jtable = new JTABLE.Backbone.Views.jtable({el: this, jtableOptions: options});
    jtable.render();
  }
})(jQuery);