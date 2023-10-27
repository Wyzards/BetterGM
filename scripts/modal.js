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
            if ($(event.target).is($(modal.id)))
                modal.hide();
        });

        window.addEventListener("click", function (event) {
            if ($(event.target).is($("#add-employee-modal")))
                $("#add-employee-modal").css("display", "none");
            if ($(event.target).is($("#show-employee-modal"))) {
                $("#show-employee-modal").css("display", "none");
                $("#employee-jobs-select").css("display", "none");
                $("#employee-jobs-list").css("display", "block");
                $("#edit-jobs-button").css("display", "block");
                $("#save-jobs-button").css("display", "none");
            }
        });
    }

    get id() {
        return this.#id;
    }

    show() {
        $(".modal").css("display", "none");
        $("#" + this.#showByDefault.join(",#")).css("display", "block");
        $("#" + this.#hideByDefault.join(",#")).css("display", "none");
        $(this.#id).css("display", "flex");
    }

    hide() {
        $(this.#id).css("display", "none");
    }

}

export { Modal };