import {Eventable} from "../lib/Eventable";

export class ToDoCreatorComponent extends Eventable {

    constructor(root) {
        super();
        this._input = root.querySelector('.todo-creator_text-input');
        root.addEventListener('submit', this);

    }

    handleEvent(e) {
        switch (e.type) {
            case 'submit':
                e.preventDefault();
                this.AddInputText();
                break;
        }
    }

    AddInputText() {
        const inputText = this._input.value.trim();
        if (inputText) {
            this._input.value = '';
            this.trigger('addItem', inputText);
        }
    }
}