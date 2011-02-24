[jTable](http://www.jtable.net/) - jQuery Datagrid done right
=============================================================

[jTable JS project](https://github.com/yelvert/jtable)

[jtable-rails RubyGem](https://github.com/yelvert/jtable-rails)

[jTable.net source](https://github.com/yelvert/jtable-site)

To Use:
-------
    <div id="widgets"></div>
    
    <script type="text/javascript" charset="utf-8">
      $(document).ready(function() {
        $("#widgets").jTable({
          columns: [
            {heading: "Column 1", attribute: "attribute_1"},
            {heading: "Column 2", attribute: "attribute_2"},
            {heading: "Column 3", attribute: "attribute_3"}
          ]
        })
      })
    </script>

Options:
--------
*   **identifierAttribute**:
    *   Default: `"id"`
    *   This attribute will be used to identify each record in the table.
*   **singleColumnSearch**:
    *   Default: `false`
    *   Enable single column search for all searchable columns.
*   **perPage**:
    *   Default: `25`
    *   The default number of items displayed per page.
*   **perPageOptions**:
    *   Default: `[25,50,100]`
    *   The possible selections for the number of items displayed per page.
*   **fullPagination**:
    *   Default: `true`
    *   Show page numbers.
*   **ajaxInterval**:
    *   Default: `250`
    *   The amount of time (in ms) to wait for more user input before sending server request.
*   **noItemsMsg**:
    *   Default: `"No Records were found."`
    *   The text displayed when no records are returned for the current query.
*   **rowClass**:
    *   Default: `""`
    *   CSS classes to be added to each records table row. Multiple classes should be space separated.
*   **width**:
    *   Default: `""`
    *   CSS width to be applied to the container.
*   **indexUrl**:
    *   Default: `""`
    *   The URL where all query calls are sent.
*   **viewLink**:
    *   Default: `true`
    *   Show the "View" link on each record.
*   **viewUrl**:
    *   Default: `"?id=:id:"`
    *   The URL for the "View" link. The value of a records attributes can be substituted into the URL by using *:attribute:* (see the "Record URLs" section below).
*   **inlineView**:
    *   Default: `true`
    *   Display the view in the table.
*   **editLink**:
    *   Default: `true`
    *   Show the "Edit" link on each record.
*   **editUrl**:
    *   Default: `"edit?id=:id:"`
    *   The URL for the "Edit" link. The value of a records attributes can be substituted into the URL by using *:attribute:* (see the "Record URLs" section below).
*   **destroyLink**:
    *   Default: `true`
    *   Show the "Destroy" link on each record.
*   **destroyUrl**:
    *   Default: `"?id=:id:"`
    *   The URL for the "Destroy" link. The value of a records attributes can be substituted into the URL by using *:attribute:* (see the "Record URLs" section below).
*   **onDestroy**:
    *   Default: `function(data){}`
    *   Function to run when the destroy ajax call returns successful. The destroy ajax call's response is passed into the function.
*   **destroyConfirmMsg**:
    *   Default: `"Are you sure?"`
    *   Message to use in confirmation before the destroy request is sent.
*   **otherActions**:
    *   Default: `[]`
    *   An array of objects that are used to generate links thats are added to each records actions.
    *   Action options:
        *   **title**: This will be the text of the link
        *   All other attributes will be applied as HTML attributes of the link. The value of a records attributes can be substituted into each HTML attribute value by using *:attribute:* (see the "Record URLs" section below).
*   **columns**:
    *   Default: `[]`
    *   An array of objects that are used to for generating the tables columns (see the "Column Options" section below).

Record URLs
-----------
For Widget with attributes `{id: 37, name: 'Thingy'}` `/widgets/:id:?name=:name:`, will produce `/widgets/37?name=Thingy`.

Column Options
--------------
*   **searchable**:
    *   Default: `true`
    *   Enable searching for this column
*   **sortable**:
    *   Default: `true`
    *   Enable sorting for this column
*   **dataType**:
    *   Default: `"string"`
    *   What type of attribute is this column (ex. `string`, `boolean`).
*   **trueValue**:
    *   Default: `"True"`
    *   The text displayed for a `true` value in a `boolean` dataType column.
*   **falseValue**:
    *   Default: `"False"`
    *   The text displayed for a `false` value in a `boolean` dataType column.
*   **columnClass**:
    *   Default: `""`
    *   CSS classes to be added to this column for each record. Multiple classes should be space separated.