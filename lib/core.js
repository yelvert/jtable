(function($) {
  $.fn.jtable = function(settings) {
    var settings = $.extend(true, (settings || {}), JTABLE.DefaultSettings);
    var jtable = new JTABLE.Backbone.Views.jtable({el: $(this), settings: settings});
    jtable.render();
  }
})(jQuery);