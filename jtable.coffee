###
jTable jQuery Plugin v0.1.1
(c) 2011 Taylor Yelverton - http://www.jtable.net
License: MIT (http://www.opensource.org/licenses/mit-license.php)

Compiled with CoffeeScript version 1.0.0
coffee -b -c jtable.coffee

###


(($) ->
  $.jTable =
    defaults:
      settings:
        columns: []
        identifierAttribute: 'id'
        singleColumnSearch: false
        perPage: 25
        perPageOptions: [25,50,100]
        fullPagination: true
        ajaxInterval: 250
        rowClass: ''
        width: ''
        indexUrl: ''
        viewLink: true
        viewUrl: '?id=:id:'
        inlineView: true
        editLink: true
        editUrl: 'edit?id=:id:'
        destroyLink: true
        destroyUrl: '?id=:id:'
        onDestroy: ->
          
        otherActions: []
        language:
          viewLinkText: "View"
          editLinkText: "Edit"
          destroyLinkText: "Destroy"
          noItemsMsg: "No Records were found."
          destroyConfirmMsg: "Are you sure?"
      column:
        searchable: true
        sortable: true
        dataType: 'string'
        trueValue: 'True'
        falseValue: 'False'
        columnClass: ''
  
  $.fn.jTable = (options = {}) ->
    this.each ->
      
      buildAll = =>
        buildTopToolbar()
        buildTable()
        buildBottomToolbar()
        fetchItems()
        
      generateBaseQuery = =>
        searchable_columns = []
        for column in @settings.columns
          if column.searchable
            searchable_columns.push(column.attribute)
        @query.searchable_columns = searchable_columns
        @query.search = ""
        @query.limit = @settings.perPage
        @query.offset = 0
        @query.column_search = {}
        
      fetchItems = =>
        if @query != @previous_query or @query.search == ""
          current_query = $.extend(true, {}, @query)
          @stale_paging = false
          updateProcessingOverlay()
          @processing_overlay.show()
          ajax = $.ajax({
            url: @settings.indexUrl
            data: {jTableQuery: current_query}
            cache: false
            success: (data, textStatus, XMLHttpRequest) =>
              updateItems(data)
              @initial_load = false
              @processing_overlay.hide()
          })
          @previous_query = $.extend(true, {}, current_query)
        
      updateItems = (data) =>
        @items_count = data.total_items
        items = data.items
        @items = []
        for item in items
          @items.push item
        @container.data('jTable').items = @items
        updateTableRows()
        changePage(@page)
        
      updateProcessingOverlay = =>
        container_css =
          left: @container.position().left
          top: @container.position().top
          width: @container.width()
          height: @container.height()
        @processing_overlay.css(container_css)
        box = $('div', @processing_overlay)
        box_css =
          left: (parseInt(container_css.width,10)/2)-75
          top: (parseInt(container_css.height,10)/2)
        box.css(box_css)
        
      buildTopToolbar = =>
        toolbar = $('<div class="jTable-top-toolbar"></div>')
        @container.append(toolbar)
        buildSearch()
        buildPerPageSelect()
        
      buildTable = =>
        @container.append('<div class="jTable-table-container"><table class="jTable-table"><thead></thead><tbody></tbody><tfoot></tfoot></table></div>')
        @table = $('table', @container)
        buildTableHead()
        if @settings.singleColumnSearch
          buildTableFoot()
        
      buildTableHead = =>
        table_head = $('thead', @table)
        for column in @settings.columns
          th = $('<th class="jTable-column-heading"></th>')
          th.attr('data-jTable-column-attribute', column.attribute)
          if column.heading == undefined
            th.html("<div>#{column.attribute}</div>")
          else
            th.html("<div>#{column.heading}</div>")
          if column.sortable
            $('div',th).append('<span class="jTable-sort jTable-sort-none"></span>')
            th.click (event) =>
              $('.jTable-column-heading span', @container).removeClass('jTable-sort-asc jTable-sort-desc')
              attribute = $(event.currentTarget).attr('data-jTable-column-attribute')
              sort_icon = $('span', $(event.currentTarget))
              if @query.sort_column == attribute
                if @query.sort_direction == ''
                  @query.sort_direction = 'ASC'
                  sort.addClass('jTable-sort-asc')
                else if @query.sort_direction == 'ASC'
                  @query.sort_direction = 'DESC'
                  sort_icon.addClass('jTable-sort-desc')
                else
                  @query.sort_column = ''
                  @query.sort_direction = ''
                  sort_icon.addClass('jTable-sort-none')
              else
                @query.sort_column = attribute
                @query.sort_direction = 'ASC'
                sort_icon.addClass('jTable-sort-asc')
              fetchItems()
          table_head.append($(th))
        if @show_links
          table_head.append($('<th class="jTable-column-heading">&nbsp</th>'))
        
      buildTableFoot = =>
        if @settings.singleColumnSearch
          table_foot = $('tfoot', @table)
          for column in @settings.columns
            if column.searchable
              th = $('<th class="jTable-column-footer"></th>')
              search_field = $("<input type='text' jTable-column-attribute='#{column.attribute}'>")
              search_field.keyup (event) =>
                field = $(event.currentTarget)
                attribute = field.attr('jTable-column-attribute')
                @query.column_search[attribute] = field.val()
                current_search = String(@query.column_search[attribute])
                setTimeout(=>
                  if current_search == field.val()
                    @page = 1
                    @query.offset = 0
                    fetchItems()
                @settings.ajaxInterval)
              th.append(search_field)
            else
              th = $('<th class="jTable-column-footer">&nbsp;</th>')
            table_foot.append(th)
          if @show_links
            table_foot.append($('<th class="jTable-column-footer">&nbsp;</th>'))
        
      updateTableRows = =>
        table_body = $('tbody', @table)
        table_body.html('')
        if @items_count == 0
          column_count = @settings.columns.length
          if @show_links
            column_count += 1
          blank_row = $("<tr><td colspan='#{column_count}' class='jTable-cell jTable-no-items-row'>#{@settings.language.noItemsMsg}</td></tr>")
          table_body.append(blank_row)
        else
          for item, i in @items
            new_row = $("<tr data-jTable-row-index='#{i}'></tr>")
            if i%2==0
              new_row.addClass("jTable-row-even")
            else
              new_row.addClass("jTable-row-odd")
            new_row.addClass(@settings.rowClass)
            new_row.attr('data-jTable-item-identifier', item[@settings.identifierAttribute])
            for column in @settings.columns
              new_cell = $('<td class="jTable-cell"></td>')
              new_cell.addClass(column.columnClass)
              new_cell.attr({'data-jTable-cell-attribute': column.attribute, 'data-jTable-cell-value': item[column.attribute]})
              if column.dataType == 'boolean'
                if item[column.attribute]
                  new_cell.html(column.trueValue)
                else
                  new_cell.html(column.falseValue)
              else
                new_cell.html(item[column.attribute])
              new_row.append(new_cell)
            if @show_links
              actions_cell = $('<td class="jTable-actions-cell jTable-cell"></td>')
              for action in @settings.otherActions
                action_link = $("<a>#{action.title}</a>")
                for name, value of action
                  unless name == "title"
                    action_link.attr(name, insertItemAttributesIntoString(item, value))
                actions_cell.append(action_link)
              if @settings.viewLink
                if @settings.inlineView
                  view_link = $("<a href='#'>#{@settings.language.viewLinkText}</a>")
                  view_link.attr('data-jTable-view-url', insertItemAttributesIntoString(item, @settings.viewUrl))
                  view_link.click (event) =>
                    $("tr.jTable-info-row[data-jTable-item-identifier=#{$(event.target).closest('tr').attr('data-jTable-item-identifier')}]").remove()
                    $.ajax({
                      url: $(event.currentTarget).attr('data-jTable-view-url')
                      type: 'GET'
                      success: (data, status, xhr) =>
                        insertInfoRowForItem($(event.currentTarget),data)
                      error: (xhr, status, error) =>
                        @element.trigger('ajax:error', [xhr, status, error]);
                    })
                else
                  view_link = $("<a>#{@settings.language.viewLinkText}</a>")
                  view_link.attr('href', insertItemAttributesIntoString(item, @settings.viewUrl))
                actions_cell.append(view_link)
              if @settings.editLink
                edit_link = $("<a>#{@settings.language.editLinkText}</a>")
                edit_link.attr('href', insertItemAttributesIntoString(item, @settings.editUrl))
                actions_cell.append(edit_link)
              if @settings.destroyLink
                destroy_link = $("<a href='#'>#{@settings.language.destroyLinkText}</a>")
                destroy_link.attr('data-jTable-destroy-url', insertItemAttributesIntoString(item, @settings.destroyUrl))
                destroy_link.click (event) =>
                  if (confirm(@settings.language.destroyConfirmMsg))
                    $.ajax({
                      url: $(event.currentTarget).attr('data-jTable-destroy-url')
                      type: 'POST'
                      data: {'_method': 'DELETE'}
                      success: (data, status, xhr) =>
                        @settings.onDestroy(data)
                      error: (xhr, status, error) =>
                        @element.trigger('ajax:error', [xhr, status, error]);
                    })
                    fetchItems()
                actions_cell.append(destroy_link)
              new_row.append(actions_cell)
            table_body.append(new_row)
        
      buildSearch = =>
        $('.jTable-full-search-container.', @container).remove()
        search_field = $('<input type="text" />')
        search_field.keyup =>
          @query.search = search_field.val()
          current_search = String(@query.search)
          setTimeout(=>
            if current_search == search_field.val()
              @page = 1
              @query.offset = 0
              fetchItems()
          @settings.ajaxInterval)
        search_container = $('<div class="jTable-full-search-container"></div>')
        search_container.html('Search: ')
        search_container.append(search_field)
        $('.jTable-top-toolbar', @container).prepend(search_container)
        
      buildPerPageSelect = =>
        $('.jTable-per-page-container', @container).remove()
        select_box = $('<select class="jTable-per-page-select"></select>')
        for option in @settings.perPageOptions
          opt = $("<option value='#{option}'>#{option}</option>")
          select_box.append(opt)
        select_box.change =>
          @query.limit = parseInt(select_box.val(),10)
          @settings.perPage = parseInt(select_box.val(),10)
          fetchItems()
        per_page_container = $('<div class="jTable-per-page-container">Items Per Page: </div>')
        per_page_container.append(select_box)
        $('.jTable-top-toolbar', @container).append(per_page_container)
        
      buildBottomToolbar = =>
        toolbar = $('<div class="jTable-bottom-toolbar"><div class="jTable-page-info"></div><div class="jTable-pagination-container"></div></div>')
        @container.append(toolbar)
        updatePageInfo()
        updatePagination()
        
      updatePageInfo = =>
        page_info = $('.jTable-page-info', @container)
        start_items = if @items_count == 0 then 0 else ((@page-1)*@settings.perPage)+1
        end_items = if @items_count-start_items > @settings.perPage then start_items+@settings.perPage-1 else @items_count
        total_items = @items_count
        page_info.html("Displaying #{start_items} to #{end_items} of #{total_items} items.")
        
      updatePagination = =>
        page_div = $('.jTable-pagination-container', @container)
        page_div.html('')
        generatePaginationButton = (page_number) =>
          $("<span class='jTable-button jTable-pagination-button' data-jTable-pagination-page='#{page_number}'>#{page_number}</span>").click (event) =>
            @stale_paging = true
            changePage(parseInt($(event.currentTarget).attr('data-jTable-pagination-page'), 10))
          
        unless (@page-1)*@settings.perPage <= 0
          prev_page_link = $("<span class='jTable-button jTable-pagination-button'>Prev</span>")
          prev_page_link.click (event) =>
            @stale_paging = true
            changePage(@page-1)
          page_div.append(prev_page_link)
        if @settings.fullPagination
          if Math.ceil(@items_count/@settings.perPage) == 0
            page_link = generatePaginationButton(1)
            page_div.append(page_link)
          else
            number_of_pages = Math.ceil(@items_count/@settings.perPage)
            start_page = if @page-2 < 1 then 1 else @page-2
            end_page = if @page+2 > number_of_pages then number_of_pages else @page+2
            for i in [start_page..end_page]
              page_link = generatePaginationButton(i)
              page_div.append(page_link)
        unless @items_count <= @page*@settings.perPage
          next_page_link = $("<span class='jTable-button jTable-pagination-button'>Next</span>")
          next_page_link.click (event) =>
            @stale_paging = true
            changePage(@page+1)
          page_div.append(next_page_link)
        $(".jTable-pagination-button[data-jTable-pagination-page=#{@page}]", @container).addClass('jTable-pagination-current-page')
        
      changePage = (new_page) =>
        if @initial_load
          @page = new_page
          updatePageInfo()
          updatePagination()
        else
          if @stale_paging
            @query.offset = ((new_page-1)*@settings.perPage)
            @page = new_page
            fetchItems()
          else
            @page = new_page
            updatePageInfo()
            updatePagination()
        
      insertItemAttributesIntoString = (item, str) =>
        str = str.toString()
        for name, value of item
          str = str.replace(RegExp("(:#{name}:)"), encodeURIComponent(value))
        str
        
      insertInfoRowForItem = (target, data) =>
        item_row = target.closest('tr')
        info_row = $("<tr class='jTable-info-row'></tr>")
        info_row.attr('data-jTable-item-identifier', item_row.attr('data-jTable-item-identifier'))
        info_container = $('<td></td>')
        info_container.attr('colspan', if @show_links then @settings.columns.length+1 else @settings.columns.length)
        close_btn = $("<span class='jTable-close-info-row'></span>")
        close_btn.click (event) =>
          $(event.currentTarget).closest('tr').remove()
        info_container.append(close_btn)
        info_container.append(data)
        info_row.append(info_container)
        info_row.insertAfter(item_row)
        window.scrollTo(item_row.position().left, item_row.position().top)
      
      @settings = $.extend(true, {}, $.jTable.defaults.settings)
      @query = {}
      $.extend true, @settings, options
      for column, i in @settings.columns
        @settings.columns[i] = $.extend(true, {}, $.jTable.defaults.column, column)
        @settings.columns[i].searchable = false if @settings.columns[i].dataType == 'boolean'
      generateBaseQuery()
      @container = $(this)
      if @settings.width != ''
        @container.css({width: @settings.width})
      @container.addClass('jTable-container')
      @initial_load = true
      @stale_paging = false
      @items = []
      @show_links = @settings.viewLink or @settings.editLink or @settings.destroyLink or @settings.otherActions != []
      @container.data('jTable', {})
      @container.data('jTable').settings = @settings
      @previous_query = $.extend(true, {}, @query)
      @table = null
      @processing_overlay = $("<div class='jTable-processing-overlay'><div>Processing...</div></div>")
      $(document.body).append(@processing_overlay)
      @page = 1
      buildAll()
      changePage(1)
    
)(jQuery);