import clamp from "lodash.clamp";

var MIN_PAGE = 1,
    DEFAULT_ITEMS_PER = 15,
    INITIAL_LIMITS = [
        NaN, // Pad with a NaN so our indexes match page number
        Number.MAX_SAFE_INTEGER
    ];

function PageState(itemsPer) {
    this.limits = INITIAL_LIMITS.slice(); // copy
    this.page = 1;

    this.itemsPer = itemsPer;

    if(this.itemsPer) {
        return;
    }

    if(window.localStorage) {
        itemsPer = window.localStorage.getItem("crucible:itemsPer");
        itemsPer = parseInt(itemsPer, 10);

        if(!itemsPer) {
            itemsPer = DEFAULT_ITEMS_PER;
        }
    }

    this.setItemsPer(itemsPer);
}

PageState.prototype = {
    setItemsPer : function(newNum) {
        var setTo = newNum;

        if(typeof setTo !== "number") {
            setTo = parseInt(setTo, 10);
            if(isNaN(setTo)) {
                setTo = DEFAULT_ITEMS_PER;
            }
        }

        this.itemsPer = setTo;
        window.localStorage.setItem("crucible:itemsPer", setTo);
        this.reset();
    },

    reset : function() {
        this.limits = INITIAL_LIMITS.slice(); // copy
        this.page = 1;
    },

    numPages : function() {
        return this.limits.length - 1;
    },

    currPageTs : function() {
        return this.limits[this.page];
    },

    nextPageTs : function() {
        var nextIndex = this.page + 1;

        return this.limits.length > nextIndex ? this.limits[nextIndex] : null;
    },

    first : function() {
        this.page = MIN_PAGE;
    },

    next : function() {
        this.page = this.clampPage(++this.page);
    },

    prev : function() {
        this.page = this.clampPage(--this.page);
    },

    clampPage : function(pgNum) {
        return clamp(pgNum, MIN_PAGE, this.numPages());
    }
};

export default PageState;
