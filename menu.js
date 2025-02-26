/**
 * Represents a Menu component that dynamically creates a list of items.
 *
 * @class Menu
 * @property {HTMLUListElement} ulElement - The unordered list element that holds the menu items.
 * @property {string[]} labels - The labels for the menu items.
 * @property {number} esp - The spacing between menu items.
 * @property {number} disp - The display mode of the menu (0 for flex, 1 for block).
 *
 * @constructor
 * @param {string[]} labels - An array of labels for the menu items.
 * @param {number} esp - The spacing between menu items.
 * @param {number} disp - The display mode of the menu (0 for flex, 1 for block).
 *
 * @method createItem
 * @private
 * @param {string} label - The label for the menu item.
 * @param {number} [index] - The index of the menu item.
 *
 * @method getObjDOM
 * @returns {HTMLUListElement} The unordered list element representing the menu.
 *
 * @method setEsp
 * @param {number} esp - The new spacing between menu items.
 * @returns {this} The instance of the Menu class.
 *
 * @method setDisp
 * @param {number} disp - The new display mode of the menu.
 * @returns {this} The instance of the Menu class.
 *
 * @method addItem
 * @param {string} label - The label for the new menu item.
 * @returns {this} The instance of the Menu class.
 */
var Menu = /** @class */ (function () {
    function Menu(labels, esp, disp) {
        if (labels === void 0) { labels = []; }
        if (esp === void 0) { esp = 20; }
        if (disp === void 0) { disp = 0; }
        var _this = this;
        this.labels = labels;
        this.esp = esp;
        this.disp = disp;
        this.ulElement = document.createElement("ul");
        this.ulElement.style.listStyleType = "none";
        this.ulElement.style.padding = "0";
        this.ulElement.style.margin = "0";
        this.ulElement.style.display = this.disp === 0 ? "flex" : "block";
        this.labels.forEach(function (label, index) {
            _this.createItem(label, index);
        });
    }
    Menu.prototype.createItem = function (label, index) {
        var _this = this;
        var liElement = document.createElement("li");
        liElement.textContent = label;
        liElement.style.marginRight = this.disp === 0 ? "".concat(this.esp, "px") : "0";
        liElement.style.marginBottom = this.disp === 1 ? "".concat(this.esp, "px") : "0";
        liElement.style.cursor = "pointer";
        liElement.addEventListener("click", function () {
            var event = new CustomEvent("menu_click", {
                detail: { index: index },
            });
            _this.ulElement.dispatchEvent(event);
        });
        this.ulElement.appendChild(liElement);
    };
    Menu.prototype.getObjDOM = function () {
        return this.ulElement;
    };
    Menu.prototype.setEsp = function (esp) {
        var _this = this;
        this.esp = esp;
        Array.from(this.ulElement.children).forEach(function (child) {
            var li = child;
            li.style.marginRight = _this.disp === 0 ? "".concat(_this.esp, "px") : "0";
            li.style.marginBottom = _this.disp === 1 ? "".concat(_this.esp, "px") : "0";
        });
        return this;
    };
    Menu.prototype.setDisp = function (disp) {
        this.disp = disp;
        this.ulElement.style.display = this.disp === 0 ? "flex" : "block";
        this.setEsp(this.esp);
        return this;
    };
    Menu.prototype.addItem = function (label) {
        this.labels.push(label);
        this.createItem(label, this.labels.length - 1);
        return this;
    };
    return Menu;
}());
var labels = ["Accueil", "Produits", "Contact"];
var menu = new Menu(labels);
var menuObj = menu.getObjDOM();
menuObj.addEventListener("menu_click", function (evt) {
    return console.log("Clic sur ".concat(labels[evt.detail.index]));
});
document.body.appendChild(menuObj);
setTimeout(function () { return menu.setEsp(100).setDisp(1).addItem("Test"); }, 5000);
