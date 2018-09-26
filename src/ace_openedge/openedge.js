define('ace/mode/openedge', function(require, exports, module) {
    var oop = require("ace/lib/oop");
    var TextMode = require("ace/mode/text").Mode;
    var Tokenizer = require("ace/tokenizer").Tokenizer;
    var Range = require("../range").Range;
    var OpenEdgeHighlightRules = require("ace/mode/openedge_highlight_rules").OpenEdgeHighlightRules;

    var Mode = function() {
        this.HighlightRules = OpenEdgeHighlightRules;
        //comment
    };
    oop.inherits(Mode, TextMode);

    (function() {
        // Extra logic goes here. (see below)
    }).call(Mode.prototype);

    exports.Mode = Mode;
});