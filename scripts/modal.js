class Modal {

    #id;
    #showByDefault;
    #hideByDefault;

    constructor(id, showByDefault = [], hideByDefault = []) {
        this.#id = id;
        this.#showByDefault = showByDefault;
        this.#hideByDefault = hideByDefault;

        var modal = this;

        window.addEventListener("click", function (event) {
            console.log("event.target.id = " + $(event.target).prop("outerHTML"));
            //console.log("modal.id = " + $(modal).id);

            //if ($(event.target).is($(modal)))
            //   modal.hide();
        });
    }

    get id() {
        return this.#id;
    }

    show() {
        $(".modal").css("display", "none");

        if (this.#showByDefault.length > 0) {
            let selector = "#" + this.#showByDefault.join(",#");
            console.log("show selector: " + selector);
            $(selector).css("display", "block");
        }

        if (this.#hideByDefault.length > 0) {
            let selector = "#" + this.#hideByDefault.join(",#");
            console.log("hide selector: " + selector);
            $("#" + selector).css("display", "none");
        }

        $("#" + this.#id).css("display", "flex");
    }

    hide() {
        $(this.#id).css("display", "none");
    }

}

export { Modal };