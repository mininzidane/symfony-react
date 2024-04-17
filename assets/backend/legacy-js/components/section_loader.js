const $ = require('jquery');
/**
 * To add a script to be loaded onto a specific page, or section:
 *    Add a section selector, and a function to the SectionManager.
 *
 * Treat the function added as a typical on-page-load wrapper
 *
 * EX:
 *
 * var M = new SectionManager();
 * M.addSection('body',function(){
 *     console.log('Hello');
 * });
 *
 * function testMethod() {
 *     console.log('test success');
 * }
 *
 * // These two are equivalent IFF the body section has already been added
 * // The addAction call WILL FAIL IFF the body section has not been loaded (thus, always call SectionManager.addSection)
 * M.getSection('body').addAction(testMethod);
 * M.addSection('body', testMethod);
 *
 * // Load the single Section:
 * M.getSection('body').load();
 *
 * // Load all sections:
 * M.load();
 */

/**
 * SectionLoader ensures relevent scripts are only
 *     loaded IFF the selector matches
 *     loaded onto each matched section individually (to prevent collisions)
 *     allows for more complex loader behaviors in the future.
 *
 * @param sectionSelector string
 */
function SectionLoader(sectionSelector) {
  var main = this;
  this.selector = sectionSelector;
  this.match = $(sectionSelector);

  this.actions = [];

  this.check = function () {
    return (main.match.length > 0 && main.actions.length > 0);
  };

  this.addAction = function (method) {
    main.actions.push(method);
  };

  this.load = function () {
    if (!main.check()) {
      return false;
    }

    main.actions.forEach(function (loadAction) {
      main.match.each(loadAction);
    });
  };
}

/**
 * SectionManager regulates all loaded sections in order to prevent collisions, and enable more complex behaviors in the future
 *
 * addSection should be the only publicly accessible method to add selector/method pairs
 *    this method will check the manager's collection of sections, and add the method to that sections loader call
 *
 *    EX: manager.addSection('selector',function(){  DO SOMETHING  });
 *
 * after all section loaders have been added:
 *     Individual Sections may be retrieved and altered/loaded:
 *          manager.getSection('selector').load();
 *
 *     All Sections May be immediately loaded:
 *          manager.load();
 */
function SectionManager() {
  var main = this;

  this.sections = new Map();

  this.load = function () {
    main.sections.forEach(function (loader, selector) {
      loader.load();
    });
  };

  this.getSection = function (selector) {
    if (main.sections.has(selector)) {
      return;
    }

    return false;
  };

  this.addSection = function (selector, method) {
    var loader = null;
    if (main.sections.has(selector)) {
      loader = main.sections.get(selector);
    } else {
      loader = new SectionLoader(selector);
    }

    loader.addAction(method);
    main.sections.set(selector, loader);
  };
}

module.exports = function () {
  var manager = new SectionManager();

  return {
    loader: manager,
    definer: manager.addSection
  };

}();
