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
            var target = $(event.target);
            var modal_target = $("#" + modal.id);

            if (target.is(modal_target))
                modal_target.hide();
        });
    }

    get id() {
        return this.#id;
    }

    show() {
        $(".modal").css("display", "none");

        if (this.#showByDefault.length > 0)
            $("#" + this.#showByDefault.join(",#")).css("display", "block");
        if (this.#hideByDefault.length > 0)
            $("#" + this.#hideByDefault.join(",#")).css("display", "none");

        $("#" + this.#id).css("display", "flex");
    }

    hide() {
        $("#" + this.#id).css("display", "none");
        $("#" + this.#id).children("span").children("input").val("");
    }

}

export { Modal };