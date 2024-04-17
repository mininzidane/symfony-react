const $ = require('jquery');

module.exports = function () {

  /**
   * FormSorter converts table heading into sorting inputs with sort-icons.
   * Requires:
   *      form to submit filter/sort details
   *      input for field to sort on
   *      input for sort direction
   *
   * Given:
   *      form
   *          - input id=sortByMe
   *          - input id=orderBy
   *
   *      <td data-sort-x='somefieldlabel'>Column Heading</td>
   *
   * FormSort.initialize({
   *     trigger: 'data-sort-x'
   *     sortFieldInput: '#sortByMe'
   *     sortOrderInput: '#orderBy'
   * })
   *
   * The "Column Heading" will have a sorting icon
   * Clicking on "Column Heading" will populate the to form inputs $('#sortByMe').val('somefieldlabel');
   *     and submit the form after a short delay
   * Column sort headings' icons will be set according to the values in those inputs.
   */
  function FormSorter() {
    var main = this;

    this.defaults = {
      trigger: 'data-sort-field',
      sortDefaultTrigger: 'data-sort-default',
      sortFieldInput: '#sort',
      sortOrderInput: '#sortOrder',
      fontawesome: 'sort-amount'
    };

    this.initialize = function (options) {
      options = main.setDefaults(options);
      var instance = this;
      instance.$sortInput = $(options.sortFieldInput);
      instance.$orderInput = $(options.sortOrderInput);

      if (!instance.$sortInput.length || !instance.$orderInput.length) {
        return;
      }

      instance.sort = instance.$sortInput.val().toLowerCase();
      instance.sortOrder = instance.$orderInput.val().toLowerCase();

      if (typeof options.defaultSort !== 'undefined' && options.defaultSort && !instance.sort) {
        instance.sort = options.defaultSort;
        instance.$sortInput.val(instance.sort);
      }

      if (typeof options.defaultSortOrder !== 'undefined' && options.defaultSortOrder && !instance.sortOrder) {
        instance.sortOrder = options.defaultSortOrder;
        instance.$orderInput.val(instance.sortOrder);
      }

      instance.submitTimer = null;

      this.attach = function () {
        var $el = $(this);

        this.init = function () {
          $el.on('click', this.toggleSort);

          var field = $el.attr(options.trigger);
          var icon = $('<i class="fa fa-sort"></i>');
          if (field === instance.sort) {
            $(icon).removeClass('fa-sort').addClass('fa-' + options.fontawesome + '-' + instance.sortOrder);
          }
          $el.append(icon);
        };

        this.toggleSort = function () {
          instance.toggleSort(this);
          $el.parent().find('.fa').removeClass('fa-' + options.fontawesome + '-asc fa-' + options.fontawesome + '-desc').addClass('fa-sort');
          $el.find('.fa').removeClass('fa-sort').addClass('fa-' + options.fontawesome + '-' + instance.sortOrder);
        };

        this.init();
      };

      this.toggleSort = function (el) {
        var $el = $(el);
        var sort = $el.data('sort-field');
        var sortOrder = options.defaultSortOrder || 'desc';

        if (instance.sort === sort) {
          sortOrder = (instance.sortOrder === 'asc') ? 'desc' : 'asc';
        }

        instance.setSort(sort, sortOrder);
      };

      this.setSort = function (field, dir) {
        instance.sort = field;
        instance.sortOrder = dir;
        instance.$sortInput.val(instance.sort);
        instance.$orderInput.val(instance.sortOrder);

        clearTimeout(instance.submitTimer);
        instance.submitTimer = setTimeout(instance.submitForm, 750);
      };

      this.submitForm = function () {
        instance.$sortInput.closest('form').submit();
      };

      $('[' + options.trigger + ']').each(instance.attach);
    };

    this.setDefaults = function (options) {
      options = $.extend({}, this.defaults, options || {});

      if (typeof options.defaultSort === 'undefined' || !options.defaultSort || typeof options.defaultSortOrder === 'undefined' || !options.defaultSortOrder) {
        var $fieldLabel = $('[' + options.sortDefaultTrigger + ']').first();
        options.defaultSort = $fieldLabel.attr(options.trigger);
        options.defaultSortOrder = $fieldLabel.attr(options.sortDefaultTrigger);
      }

      return options;
    };
  }

  return new FormSorter();

}();
