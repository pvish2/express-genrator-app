function define(name, value) {
    Object.defineProperty(exports, name, {
        value:      value,
        enumerable: true
    });
}

define("INVALID_CARD", "invalid card");
define("CARD_LIMIT","card limit should be greater than 0");
define("CARD_CREATED","Card created!")