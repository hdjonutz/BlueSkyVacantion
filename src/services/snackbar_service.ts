/**
 * 🍔 Controls a SnackBar that is displayed at the bottom of the page and allow
 * do overlay a short notification text.
 */
import style from '../components/pages/ui/utils/snackbar.less';
import {injectable} from "inversify";

const DISPLAY_DURATION = 10000;
const SHOW_ANIMATION_DURATION = 300;
const HIDE_ANIMATION_DURATION = 300;

export class SnackAction {
    constructor(public readonly title: string, public readonly callback: () => void) { }
}

export enum SnackbarStyle {
    Default,
    Error
}

class Snack {
    private hidePromise: Promise<void> = null;
    private showPromise: Promise<void> = null;
    private timeoutInstance: any = null;
    private element: HTMLElement = null;

    constructor(public readonly text: string, private readonly callback: () => void = null,
                public readonly action: SnackAction = null,
                public readonly snackbarStyle: SnackbarStyle = SnackbarStyle.Default) { }

    show(milliSeconds?: number): Promise<void> {
        return this.showPromise || (this.showPromise = new Promise<void>((resolve) => {
            const contentElement = document.createElement('div');
            contentElement.textContent = this.text;

            this.element = document.createElement('div');
            this.element.classList.add(style.snackbar);

            if (this.snackbarStyle === SnackbarStyle.Error) {
                this.element.classList.add(style.error);
            }

            this.element.addEventListener('click', () => {
                if (this.callback) {
                    this.callback();
                }

                this.hide();
            });
            this.element.appendChild(contentElement);

            if (this.action) {
                const actionElement = document.createElement('button');
                actionElement.textContent = this.action.title;
                actionElement.addEventListener('click', () => {
                    this.action.callback();
                    this.hide();
                });
                this.element.appendChild(actionElement);
            }

            const insertAfterElement = document.getElementById('div_inline') || document.body.firstChild;
            document.body.insertBefore(this.element, insertAfterElement.nextSibling);

            setTimeout(() => this.element.classList.add(style.visible), 100);
            setTimeout(() => {
                resolve();

                this.timeoutInstance = setTimeout(() => this.hide(), milliSeconds ? milliSeconds : DISPLAY_DURATION);
            }, SHOW_ANIMATION_DURATION);
        }));
    }

    hide(): Promise<void> {
        // First wait till completely displayed
        return this.showPromise.then(() => {
            return this.hidePromise || (this.hidePromise = new Promise<void>((resolve) => {
                this.element.classList.remove(style.visible);

                clearTimeout(this.timeoutInstance);

                setTimeout(() => {
                    this.element.parentNode.removeChild(this.element);

                    resolve();
                }, HIDE_ANIMATION_DURATION);
            }));
        });
    }
}

@injectable()
export class SnackbarService {
    private currentSnack: Snack = null;
    private nextSnack: Snack = null;

    constructor() {}

    /**
     * Displays a snack containing text. The snack is automatically hidden
     * after a specific timeout. If a snack is already display, the previous
     * one is hidden first.
     * Action can be supplied as an object containing a callback and a title.
     */
    displaySnack(text: string, callback: () => void = null, action: SnackAction = null,
                 snackbarStyle: SnackbarStyle = SnackbarStyle.Default, milliSeconds?: number): void {
        // We have a extra variable for the next one to make sure that we
        // only display the latest snack.
        this.nextSnack = new Snack(text, callback, action, snackbarStyle);

        this.clearSnack().then(() => {
            if (this.nextSnack) {
                this.currentSnack = this.nextSnack;
                this.currentSnack.show(milliSeconds);
                this.nextSnack = null;
            }
        });
    }

    /**
     * Hides the current displayed snack, if any. The returned Promise is
     * triggered after the snack was removed.
     */
    clearSnack(): Promise<void> {
        if (this.currentSnack) {
            return this.currentSnack.hide();
        } else {
            return Promise.resolve();
        }
    }
}
