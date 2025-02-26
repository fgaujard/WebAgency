/**
 * Menu component - creates a list of items.
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
class Menu {
  private readonly ulElement: HTMLUListElement;
  private readonly labels: string[];
  private esp: number;
  private disp: number;

  constructor(labels: string[] = [], esp: number = 20, disp: number = 0) {
    this.labels = labels;
    this.esp = esp;
    this.disp = disp;
    this.ulElement = document.createElement("ul");

    this.ulElement.style.listStyleType = "none";
    this.ulElement.style.padding = "0";
    this.ulElement.style.margin = "0";
    this.ulElement.style.display = this.disp === 0 ? "flex" : "block";

    this.labels.forEach((label, index) => {
      this.createItem(label, index);
    });
  }

  private createItem(label: string, index?: number): void {
    const liElement = document.createElement("li");
    liElement.textContent = label;
    liElement.style.marginRight = this.disp === 0 ? `${this.esp}px` : "0";
    liElement.style.marginBottom = this.disp === 1 ? `${this.esp}px` : "0";
    liElement.style.cursor = "pointer";

    liElement.addEventListener("click", () => {
      const event = new CustomEvent("menu_click", {
        detail: { index: index },
      });
      this.ulElement.dispatchEvent(event);
    });

    this.ulElement.appendChild(liElement);
  }

  getObjDOM(): HTMLUListElement {
    return this.ulElement;
  }

  setEsp(esp: number) {
    this.esp = esp;
    Array.from(this.ulElement.children).forEach((child) => {
      const li = child as HTMLLIElement;
      li.style.marginRight = this.disp === 0 ? `${this.esp}px` : "0";
      li.style.marginBottom = this.disp === 1 ? `${this.esp}px` : "0";
    });
    return this;
  }

  setDisp(disp: number) {
    this.disp = disp;
    this.ulElement.style.display = this.disp === 0 ? "flex" : "block";
    this.setEsp(this.esp);
    return this;
  }

  addItem(label: string) {
    this.labels.push(label);
    this.createItem(label, this.labels.length - 1);
    return this;
  }
}

const labels: string[] = ["Accueil", "Produits", "Contact"];
const menu: Menu = new Menu(labels);
const menuObj: HTMLUListElement = menu.getObjDOM();
menuObj.addEventListener("menu_click", (evt) =>
  console.log(`Clic sur ${labels[(evt as CustomEvent).detail.index]}`)
);

document.body.appendChild(menuObj);
setTimeout(() => menu.setEsp(100).setDisp(1).addItem("Test"), 5000);
