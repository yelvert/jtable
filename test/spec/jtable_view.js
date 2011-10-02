describe("View: jtable", function() {
  beforeEach(function() {
    this.element = $('<div />')
    this.view = new JTABLE.Backbone.Views.jtable({el: this.element})
  })
  
  it("should generate container element", function() {
    expect($(this.view.el)).toBe(this.element)
    expect($(this.view.el)).toHaveClass('jtable-container')
    expect($(this.view.el).html()).toNotBe('')
  })
  
  it("should make the header", function() {
    expect(this.view.header_view).toBeDefined()
    expect(this.view.header_view.mainView).toEqual(this.view)
    expect($(this.view.header_view.el)).toBe(this.view.$('.jtable-header'))
  })
  
  it("should make the footer", function() {
    expect(this.view.footer_view).toBeDefined()
    expect(this.view.footer_view.mainView).toEqual(this.view)
    expect($(this.view.footer_view.el)).toBe(this.view.$('.jtable-footer'))
  })
})