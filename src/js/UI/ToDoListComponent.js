import {Eventable} from "../lib/Eventable";

export class ToDoListComponent extends Eventable {

    constructor(root) {
        super();
        this._root = root;
    }

    addItem(text) {
        var template = templates.item({
            text: text
        });

        this._root.appendChild(template.item);
        template.removeButton.addEventListener('click', () => this.trigger('removeItem', template.item));
        template.checkbox.addEventListener('click', () => this.trigger('checkBoxAction', template.item));

        var textArea = template.item.querySelector('.todo-list_item_text');
        textArea.addEventListener('change', () => ToDoListComponent.resizeTextArea(textArea));
        textArea.addEventListener('keydown', () => ToDoListComponent.resizeTextArea(textArea));
    }

    removeItem(item) {
        this._root.removeChild(item);
    }

    static checkBoxAction(item) {
        var status = item.querySelector('.custom-checkbox_target').checked;
        if (!status) {
            item.classList.remove('__is-checked');
        } else {
            item.classList.add('__is-checked');
        }

    }

    static resizeTextArea(textArea) {
        textArea.style.height = 'auto';
        textArea.style.height = textArea.scrollHeight + 'px';
    }
}

var templates = {
    item: function (data) {
        var list_item = document.createElement('div');
        list_item.classList.add('todo-list_item');
        var custom_checkbox = document.createElement('div');
        custom_checkbox.classList.add('custom-checkbox');
        custom_checkbox.classList.add('todo-list_item_ready-marker');
        var checkbox_target = document.createElement('input');
        checkbox_target.classList.add('custom-checkbox_target');
        checkbox_target.setAttribute('type', 'checkbox');
        checkbox_target.setAttribute('aria-label', 'Mark todo as ready');
        var checkbox_visual = document.createElement('div');
        checkbox_visual.classList.add('custom-checkbox_visual');
        var checkbox_visual_icon = document.createElement('div');
        checkbox_visual_icon.classList.add('custom-checkbox_visual_icon');
        custom_checkbox.appendChild(checkbox_target);
        checkbox_visual.appendChild(checkbox_visual_icon);
        custom_checkbox.appendChild(checkbox_visual);

        var button_remove = document.createElement('button');
        button_remove.classList.add('todo-list_item_remove');
        button_remove.setAttribute('aria-label', 'Delete todo');

        var item_text = document.createElement('div');
        item_text.classList.add('todo-list_item_text-w');
        var text = document.createElement('textarea');
        text.classList.add('todo-list_item_text');
        text.setAttribute('rows', '1');
        text.value = data.text;
        item_text.appendChild(text);

        list_item.appendChild(custom_checkbox);
        list_item.appendChild(button_remove);
        list_item.appendChild(item_text);

        return {
            item: list_item,
            removeButton: button_remove,
            checkbox: custom_checkbox
        };
    }
};