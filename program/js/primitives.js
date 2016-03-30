/*
 Basic Primitives orgDiagram v2.1.5
 Copyright (c) 2013 - 2015 Basic Primitives Inc

 Non-commercial - Free
 http://creativecommons.org/licenses/by-nc/3.0/

 Commercial and government licenses:
 http://www.basicprimitives.com/pdf/license.pdf

*/
(function () {
    var a = function (a) {
        var a = a.split("."),
            c = window,
            d;
        for (d = 0; d < a.length; d += 1) c = c[a[d]] = c[a[d]] || {};
        return c
    };
    a("primitives.common");
    a("primitives.common.perimeter");
    a("primitives.orgdiagram");
    a("primitives.famdiagram");
    a("primitives.text");
    a("primitives.callout");
    a("primitives.connector");
    a("primitives.shape")
})();
primitives.common.isNullOrEmpty = function (a) {
    var b = !0;
    void 0 !== a && null !== a && (a = a.toString(), 0 < a.length && (b = !1));
    return b
};
primitives.common.isEmptyObject = function (a) {
    for (var b in a)
        if (a.hasOwnProperty(b)) return !1;
    return !0
};
primitives.common.hashCode = function (a) {
    var b = 0,
        c, d;
    if (0 < a.length)
        for (d = 0; d < a.length; d += 1) c = a.charCodeAt(d), b = (b << 5) - b + c, b &= b;
    return b
};
primitives.common.attr = function (a, b) {
    var c, d;
    if (a.hasOwnProperty("attrHash"))
        for (c in b) b.hasOwnProperty(c) && (d = b[c], a.attrHash[c] != d && (a.attrHash[c] = d, a.attr(c, d)));
    else a.attr(b), a.attrHash = b
};
primitives.common.css = function (a, b) {
    var c, d;
    if (a.hasOwnProperty("cssHash"))
        for (c in b) b.hasOwnProperty(c) && (d = b[c], a.cssHash[c] != d && (a.cssHash[c] = d, a.css(c, d)));
    else a.css(b), a.cssHash = b
};
primitives.common.stopPropagation = function (a) {
    void 0 !== a.stopPropagation ? a.stopPropagation() : void 0 !== a.cancelBubble ? a.cancelBubble = !0 : void 0 !== a.preventDefault && a.preventDefault()
};
primitives.common.indexOf = function (a, b, c) {
    var d, e;
    for (d = 0; d < a.length; d += 1)
        if (e = a[d], null != c ? c(e, b) : e === b) return d;
    return -1
};
primitives.common._supportsSVG = null;
primitives.common.supportsSVG = function () {
    null === primitives.common._supportsSVG && (primitives.common._supportsSVG = document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") || document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Shape", "1.0"));
    return primitives.common._supportsSVG
};
primitives.common._supportsVML = null;
primitives.common.supportsVML = function () {
    var a, b;
    null === primitives.common._supportsVML && (primitives.common._supportsVML = !1, jQuery.support.opacity || (a = document.createElement("div"), a = document.body.appendChild(a), a.innerHTML = '<v:shape adj="1" />', b = a.firstChild, b.style.behavior = "url(#default#VML)", primitives.common._supportsVML = b ? "object" === typeof b.adj : !1, a.parentNode.removeChild(a)));
    return primitives.common._supportsVML
};
primitives.common._supportsCanvas = null;
primitives.common.supportsCanvas = function () {
    null === primitives.common._supportsCanvas && (primitives.common._supportsCanvas = !!window.HTMLCanvasElement);
    return primitives.common._supportsCanvas
};
primitives.common.createGraphics = function (a, b) {
    var c = null,
        d, e;
    d = [a];
    for (e in primitives.common.GraphicsType) primitives.common.GraphicsType.hasOwnProperty(e) && d.push(primitives.common.GraphicsType[e]);
    for (e = 0; null === c && e < d.length; e += 1) switch (d[e]) {
    case 2:
        primitives.common.supportsVML() && (c = new primitives.common.VmlGraphics(b));
        break;
    case 0:
        primitives.common.supportsSVG() && (c = new primitives.common.SvgGraphics(b));
        break;
    case 1:
        primitives.common.supportsCanvas() && (c = new primitives.common.CanvasGraphics(b))
    }
    return c
};
primitives.common.getColorHexValue = function (a) {
    var b, c, d;
    if ("#" === a.substr(0, 1)) return a;
    b = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(a);
    if (null !== b && 0 < b.length) return a = parseInt(b[2], 10), c = parseInt(b[3], 10), d = parseInt(b[4], 10), a = (a << 16 | c << 8 | d).toString(16), b[1] + "000000".substr(0, 6 - a.length) + a;
    if (void 0 === primitives.common.ColorHexs)
        for (c in primitives.common.ColorHexs = {}, primitives.common.Colors) primitives.common.Colors.hasOwnProperty(c) && (primitives.common.ColorHexs[c.toUpperCase()] = primitives.common.Colors[c]);
    return primitives.common.ColorHexs[a.toUpperCase()]
};
primitives.common.getColorName = function (a) {
    var b, a = primitives.common.getColorHexValue(a);
    if (void 0 === primitives.common.ColorNames)
        for (b in primitives.common.ColorNames = {}, primitives.common.Colors) primitives.common.Colors.hasOwnProperty(b) && (primitives.common.ColorNames[primitives.common.Colors[b]] = b);
    return primitives.common.ColorNames[a]
};
primitives.common.getRed = function (a) {
    return "#" === a.substr(0, 1) && 7 === a.length ? parseInt(a.substr(1, 2), 16) : null
};
primitives.common.getGreen = function (a) {
    return "#" === a.substr(0, 1) && 7 === a.length ? parseInt(a.substr(3, 2), 16) : null
};
primitives.common.getBlue = function (a) {
    return "#" === a.substr(0, 1) && 7 === a.length ? parseInt(a.substr(5, 2), 16) : null
};
primitives.common.beforeOpacity = function (a, b) {
    var c = primitives.common,
        d, e, a = c.getColorHexValue(a);
    d = Math.ceil((c.getRed(a) - 255 * (1 - b)) / b);
    e = Math.ceil((c.getGreen(a) - 255 * (1 - b)) / b);
    c = Math.ceil((c.getBlue(a) - 255 * (1 - b)) / b);
    d = (d << 16 | e << 8 | c).toString(16);
    return "#" + "000000".substr(0, 6 - d.length) + d
};
primitives.common.highestContrast = function (a, b, c) {
    var d = b,
        e = primitives.common,
        f = a + "," + b + "," + c;
    void 0 === e.highestContrasts && (e.highestContrasts = {});
    e.highestContrasts.hasOwnProperty(f) ? d = e.highestContrasts[f] : (e.luminosity(b, a) < e.luminosity(c, a) && (d = c), e.highestContrasts[f] = d);
    return d
};
primitives.common.luminosity = function (a, b) {
    var c = primitives.common,
        d = c.getColorHexValue(a),
        e = c.getColorHexValue(b),
        d = 0.2126 * Math.pow(c.getRed(d) / 255, 2.2) + 0.7152 * Math.pow(c.getRed(d) / 255, 2.2) + 0.0722 * Math.pow(c.getRed(d) / 255, 2.2),
        c = 0.2126 * Math.pow(c.getRed(e) / 255, 2.2) + 0.7152 * Math.pow(c.getRed(e) / 255, 2.2) + 0.0722 * Math.pow(c.getRed(e) / 255, 2.2);
    return d > c ? (d + 0.05) / (c + 0.05) : (c + 0.05) / (d + 0.05)
};
primitives.common.compareArrays = function (a, b, c) {
    var d = !0,
        e, f, g, h;
    if (a.length != b.length) d = !1;
    else {
        h = {};
        e = 0;
        for (f = a.length; e < f; e += 1) g = null != c ? c(a[e]) : a[e], h[g] = h.hasOwnProperty(g) ? h[g] + 1 : 1;
        e = 0;
        for (f = b.length; e < f; e += 1)
            if (g = null != c ? c(b[e]) : b[e], h.hasOwnProperty(g)) {
                if (h[g] -= 1, 0 > h[g]) {
                    d = !1;
                    break
                }
            } else {
                d = !1;
                break
            }
    }
    return d
};
var mouseHandled2 = !1;
jQuery(document).mouseup(function () {
    mouseHandled2 = !1
});
jQuery.widget("ui.mouse2", {
    version: "1.10.1",
    options: {
        cancel: "input,textarea,button,select,option",
        distance: 1,
        delay: 0
    },
    _mouseInit: function (a) {
        var b = this;
        this.element2 = a;
        this.element2.bind("mousedown." + this.widgetName, function (a) {
            return b._mouseDown(a)
        }).bind("click." + this.widgetName, function (a) {
            if (!0 === jQuery.data(a.target, b.widgetName + ".preventClickEvent")) return jQuery.removeData(a.target, b.widgetName + ".preventClickEvent"), a.stopImmediatePropagation(), !1
        });
        this.started = !1
    },
    _mouseDestroy: function () {
        this.element2.unbind("." +
            this.widgetName);
        this._mouseMoveDelegate && jQuery(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
    },
    _mouseDown: function (a) {
        if (!mouseHandled2) {
            this._mouseStarted && this._mouseUp(a);
            this._mouseDownEvent = a;
            var b = this,
                c = 1 === a.which,
                d = "string" === typeof this.options.cancel && a.target.nodeName ? jQuery(a.target).closest(this.options.cancel).length : !1;
            if (!c || d || !this._mouseCapture(a)) return !0;
            this.mouseDelayMet = !this.options.delay;
            this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
                b.mouseDelayMet = !0
            }, this.options.delay));
            if (this._mouseDistanceMet(a) && this._mouseDelayMet(a) && (this._mouseStarted = !1 !== this._mouseStart(a), !this._mouseStarted)) return a.preventDefault(), !0;
            !0 === jQuery.data(a.target, this.widgetName + ".preventClickEvent") && jQuery.removeData(a.target, this.widgetName + ".preventClickEvent");
            this._mouseMoveDelegate = function (a) {
                return b._mouseMove(a)
            };
            this._mouseUpDelegate = function (a) {
                return b._mouseUp(a)
            };
            jQuery(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
            a.preventDefault();
            return mouseHandled2 = !0
        }
    },
    _mouseMove: function (a) {
        if (jQuery.ui.ie && (!document.documentMode || 9 > document.documentMode) && !a.button) return this._mouseUp(a);
        if (this._mouseStarted) return this._mouseDrag(a), a.preventDefault();
        this._mouseDistanceMet(a) && this._mouseDelayMet(a) && ((this._mouseStarted = !1 !== this._mouseStart(this._mouseDownEvent, a)) ? this._mouseDrag(a) :
            this._mouseUp(a));
        return !this._mouseStarted
    },
    _mouseUp: function (a) {
        jQuery(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
        this._mouseStarted && (this._mouseStarted = !1, a.target === this._mouseDownEvent.target && jQuery.data(a.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(a));
        return !1
    },
    _mouseDistanceMet: function (a) {
        return Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this._mouseDownEvent.pageY -
            a.pageY)) >= this.options.distance
    },
    _mouseDelayMet: function () {
        return this.mouseDelayMet
    },
    _mouseStart: function () {},
    _mouseDrag: function () {},
    _mouseStop: function () {},
    _mouseCapture: function () {
        return !0
    }
});
primitives.common.AdviserPlacementType = {
    Auto: 0,
    Left: 2,
    Right: 3
};
primitives.orgdiagram.AdviserPlacementType = primitives.common.AdviserPlacementType;
primitives.common.VerticalAlignmentType = {
    Top: 0,
    Middle: 1,
    Bottom: 2
};
primitives.common.UpdateMode = {
    Recreate: 0,
    Refresh: 1,
    PositonHighlight: 2
};
primitives.orgdiagram.UpdateMode = primitives.common.UpdateMode;
primitives.text.TextOrientationType = {
    Horizontal: 0,
    RotateLeft: 1,
    RotateRight: 2,
    Auto: 3
};
primitives.common.SideFlag = {
    Top: 1,
    Right: 2,
    Bottom: 4,
    Left: 8
};
primitives.common.ShapeType = {
    Rectangle: 0,
    Oval: 1,
    Triangle: 2,
    CrossOut: 3,
    Circle: 4,
    Rhombus: 5,
    None: 6
};
primitives.common.SelectionPathMode = {
    None: 0,
    FullStack: 1
};
primitives.orgdiagram.SelectionPathMode = primitives.common.SelectionPathMode;
primitives.common.SegmentType = {
    Line: 0,
    Move: 1,
    QuadraticArc: 2,
    CubicArc: 3,
    Dot: 4
};
primitives.common.RenderingMode = {
    Create: 0,
    Update: 1
};
primitives.common.PlacementType = {
    Auto: 0,
    TopLeft: 8,
    Top: 1,
    TopRight: 2,
    RightTop: 11,
    Right: 3,
    RightBottom: 12,
    BottomRight: 4,
    Bottom: 5,
    BottomLeft: 6,
    LeftBottom: 10,
    Left: 7,
    LeftTop: 9
};
primitives.common.PageFitMode = {
    None: 0,
    PageWidth: 1,
    PageHeight: 2,
    FitToPage: 3,
    PrintPreview: 4
};
primitives.orgdiagram.PageFitMode = primitives.common.PageFitMode;
primitives.common.OrientationType = {
    Top: 0,
    Bottom: 1,
    Left: 2,
    Right: 3
};
primitives.orgdiagram.OrientationType = primitives.common.OrientationType;
primitives.common.LineType = {
    Solid: 0,
    Dotted: 1,
    Dashed: 2
};
primitives.common.Layers = {
    BackgroundAnnotations: 1,
    Connector: 2,
    Highlight: 3,
    Marker: 4,
    Label: 5,
    Cursor: 6,
    Item: 7,
    ForegroundAnnotations: 8,
    Annotation: 9,
    Controls: 10
};
primitives.common.LabelType = {
    Regular: 0,
    Dummy: 1,
    Fixed: 2
};
primitives.orgdiagram.ItemType = {
    Regular: 0,
    Assistant: 1,
    Adviser: 2,
    SubAssistant: 4,
    SubAdviser: 5,
    GeneralPartner: 6,
    LimitedPartner: 7,
    AdviserPartner: 8
};
primitives.common.HorizontalAlignmentType = {
    Center: 0,
    Left: 1,
    Right: 2
};
primitives.common.GroupByType = {
    None: 0,
    Parents: 1,
    Children: 2
};
primitives.common.GraphicsType = {
    SVG: 0,
    Canvas: 1,
    VML: 2
};
primitives.common.Enabled = {
    Auto: 0,
    True: 1,
    False: 2
};
primitives.common.ElbowType = {
    None: 0,
    Dot: 1,
    Bevel: 2,
    Round: 3
};
primitives.common.ConnectorType = {
    Squared: 0,
    Angular: 1,
    Curved: 2
};
primitives.orgdiagram.ConnectorType = primitives.common.ConnectorType;
primitives.common.ConnectorStyleType = {
    Extra: 0,
    Regular: 1,
    Highlight: 2
};
primitives.common.ConnectorShapeType = {
    OneWay: 0,
    TwoWay: 1
};
primitives.common.ConnectorLabelPlacementType = {
    From: 0,
    Between: 1,
    To: 2
};
primitives.common.Colors = {
    AliceBlue: "#f0f8ff",
    AntiqueWhite: "#faebd7",
    Aqua: "#00ffff",
    Aquamarine: "#7fffd4",
    Azure: "#f0ffff",
    Beige: "#f5f5dc",
    Bisque: "#ffe4c4",
    Black: "#000000",
    BlanchedAlmond: "#ffebcd",
    Blue: "#0000ff",
    BlueViolet: "#8a2be2",
    Brown: "#a52a2a",
    BurlyWood: "#deb887",
    Bronze: "#cd7f32",
    CadetBlue: "#5f9ea0",
    ChartReuse: "#7fff00",
    Chocolate: "#d2691e",
    Coral: "#ff7f50",
    CornflowerBlue: "#6495ed",
    Cornsilk: "#fff8dc",
    Crimson: "#dc143c",
    Cyan: "#00ffff",
    DarkBlue: "#00008b",
    DarkCyan: "#008b8b",
    DarkGoldenrod: "#b8860b",
    DarkGray: "#a9a9a9",
    DarkGreen: "#006400",
    DarkKhaki: "#bdb76b",
    DarkMagenta: "#8b008b",
    DarkOliveGreen: "#556b2f",
    Darkorange: "#ff8c00",
    DarkOrchid: "#9932cc",
    DarkRed: "#8b0000",
    DarkSalmon: "#e9967a",
    DarkSeaGreen: "#8fbc8f",
    DarkSlateBlue: "#483d8b",
    DarkSlateGray: "#2f4f4f",
    DarkTurquoise: "#00ced1",
    DarkViolet: "#9400d3",
    DeepPink: "#ff1493",
    DeepSkyBlue: "#00bfff",
    DimGray: "#696969",
    DodgerBlue: "#1e90ff",
    FireBrick: "#b22222",
    FloralWhite: "#fffaf0",
    ForestGreen: "#228b22",
    Fuchsia: "#ff00ff",
    Gainsboro: "#dcdcdc",
    GhostWhite: "#f8f8ff",
    Gold: "#ffd700",
    Goldenrod: "#daa520",
    Gray: "#808080",
    Green: "#008000",
    GreenYellow: "#adff2f",
    Honeydew: "#f0fff0",
    Hotpink: "#ff69b4",
    IndianRed: "#cd5c5c",
    Indigo: "#4b0082",
    Ivory: "#fffff0",
    Khaki: "#f0e68c",
    Lavender: "#e6e6fa",
    LavenderBlush: "#fff0f5",
    Lawngreen: "#7cfc00",
    Lemonchiffon: "#fffacd",
    LightBlue: "#add8e6",
    LightCoral: "#f08080",
    LightCyan: "#e0ffff",
    LightGoldenrodYellow: "#fafad2",
    LightGray: "#d3d3d3",
    LightGreen: "#90ee90",
    LightPink: "#ffb6c1",
    LightSalmon: "#ffa07a",
    LightSeaGreen: "#20b2aa",
    LightSkyBlue: "#87cefa",
    LightSlateGray: "#778899",
    LightSteelBlue: "#b0c4de",
    LightYellow: "#ffffe0",
    Lime: "#00ff00",
    Limegreen: "#32cd32",
    Linen: "#faf0e6",
    Magenta: "#ff00ff",
    Maroon: "#800000",
    MediumAquamarine: "#66cdaa",
    MediumBlue: "#0000cd",
    MediumOrchid: "#ba55d3",
    MediumPurple: "#9370d8",
    MediumSeaGreen: "#3cb371",
    MediumSlateBlue: "#7b68ee",
    MediumSpringGreen: "#00fa9a",
    MediumTurquoise: "#48d1cc",
    MediumVioletRed: "#c71585",
    MidnightBlue: "#191970",
    MintCream: "#f5fffa",
    MistyRose: "#ffe4e1",
    Moccasin: "#ffe4b5",
    NavajoWhite: "#ffdead",
    Navy: "#000080",
    Oldlace: "#fdf5e6",
    Olive: "#808000",
    Olivedrab: "#6b8e23",
    Orange: "#ffa500",
    OrangeRed: "#ff4500",
    Orchid: "#da70d6",
    PaleGoldenRod: "#eee8aa",
    PaleGreen: "#98fb98",
    PaleTurquoise: "#afeeee",
    PaleVioletRed: "#d87093",
    Papayawhip: "#ffefd5",
    Peachpuff: "#ffdab9",
    Peru: "#cd853f",
    Pink: "#ffc0cb",
    Plum: "#dda0dd",
    PowderBlue: "#b0e0e6",
    Purple: "#800080",
    Red: "#ff0000",
    RosyBrown: "#bc8f8f",
    RoyalBlue: "#4169e1",
    SaddleBrown: "#8b4513",
    Salmon: "#fa8072",
    SandyBrown: "#f4a460",
    SeaGreen: "#2e8b57",
    Seashell: "#fff5ee",
    Sienna: "#a0522d",
    Silver: "#c0c0c0",
    SkyBlue: "#87ceeb",
    SlateBlue: "#6a5acd",
    SlateGray: "#708090",
    Snow: "#fffafa",
    SpringGreen: "#00ff7f",
    SteelBlue: "#4682b4",
    Tan: "#d2b48c",
    Teal: "#008080",
    Thistle: "#d8bfd8",
    Tomato: "#ff6347",
    Turquoise: "#40e0d0",
    Violet: "#ee82ee",
    Wheat: "#f5deb3",
    White: "#ffffff",
    WhiteSmoke: "#f5f5f5",
    Yellow: "#ffff00",
    YellowGreen: "#9acd32"
};
primitives.common.ChildrenPlacementType = {
    Auto: 0,
    Vertical: 1,
    Horizontal: 2,
    Matrix: 3
};
primitives.orgdiagram.ChildrenPlacementType = primitives.common.ChildrenPlacementType;
primitives.common.AnnotationType = {
    Connector: 0,
    Shape: 1,
    HighlightPath: 2,
    Label: 3,
    Background: 4
};
primitives.common.Visibility = {
    Auto: 0,
    Normal: 1,
    Dot: 2,
    Line: 3,
    Invisible: 4
};
primitives.common.ZOrderType = {
    Auto: 0,
    Background: 1,
    Foreground: 2
};
primitives.common.RenderEventArgs = function () {
    this.renderingMode = this.templateName = this.context = this.element = null;
    this.isSelected = this.isCursor = !1
};
primitives.common.BaseShape = function () {};
primitives.common.BaseShape.prototype._getLabelPosition = function (a, b, c, d, e, f, g, h) {
    var j = null;
    switch (h) {
    case 1:
        j = new primitives.common.Rect(a + c / 2 - e / 2, b - g - f, e, f);
        break;
    case 2:
        j = new primitives.common.Rect(a + c - e, b - g - f, e, f);
        break;
    case 8:
        j = new primitives.common.Rect(a, b - g - f, e, f);
        break;
    case 3:
        j = new primitives.common.Rect(a + c + g, b + d / 2 - f / 2, e, f);
        break;
    case 11:
        j = new primitives.common.Rect(a + c + g, b, e, f);
        break;
    case 12:
        j = new primitives.common.Rect(a + c + g, b + d - f, e, f);
        break;
    case 4:
        j = new primitives.common.Rect(a + c - e,
            b + d + g, e, f);
        break;
    case 6:
        j = new primitives.common.Rect(a, b + d + g, e, f);
        break;
    case 7:
        j = new primitives.common.Rect(a - e - g, b + d / 2 - f / 2, e, f);
        break;
    case 9:
        j = new primitives.common.Rect(a - e - g, b, e, f);
        break;
    case 10:
        j = new primitives.common.Rect(a - e - g, b + d - f, e, f);
        break;
    default:
        j = new primitives.common.Rect(a + c / 2 - e / 2, b + d + g, e, f)
    }
    return j
};
primitives.common.BaseShape.prototype._betweenPoint = function (a, b) {
    return new primitives.common.Point((a.x + b.x) / 2, (a.y + b.y) / 2)
};
primitives.common.BaseShape.prototype._offsetPoint = function (a, b, c) {
    var d = null,
        d = a.distanceTo(b);
    return d = 0 == d || 0 == c ? new primitives.common.Point(a) : new primitives.common.Point(a.x + (b.x - a.x) / d * c, a.y + (b.y - a.y) / d * c)
};
primitives.common.Callout = function (a) {
    this.m_graphics = a;
    this.pointerPlacement = 0;
    this.cornerRadius = "10%";
    this.offset = 0;
    this.lineWidth = this.opacity = 1;
    this.pointerWidth = "10%";
    this.borderColor = "#000000";
    this.lineType = 0;
    this.fillColor = "#d3d3d3";
    this.m_map = [[8, 7, 6], [1, null, 5], [2, 3, 4]]
};
primitives.common.Callout.prototype = new primitives.common.BaseShape;
primitives.common.Callout.prototype.draw = function (a, b) {
    var b = (new primitives.common.Rect(b)).offset(this.offset),
        c = new primitives.common.Point(b.x, b.y),
        d = new primitives.common.Point(b.right(), b.y),
        e = new primitives.common.Point(b.right(), b.bottom()),
        f = new primitives.common.Point(b.left(), b.bottom()),
        g = [null, null, null, null, null, null, null, null],
        f = [c, d, e, f],
        d = this.m_graphics.getPxSize(this.cornerRadius, Math.min(c.distanceTo(d), d.distanceTo(e))),
        h;
    null !== a && (c = 0 === this.pointerPlacement ? this._getPlacement(a,
        c, e) : this.pointerPlacement, null !== c && (g[c] = a));
    c = [];
    for (h = 0; h < f.length; h += 1) this._drawSegment(c, f[0], f[1], f[2], this.pointerWidth, d, g[1], g[2]), e = f.shift(), f.push(e), e = g.shift(), g.push(e), e = g.shift(), g.push(e);
    g = {};
    null !== this.fillColor && (g.fillColor = this.fillColor, g.opacity = this.opacity);
    null !== this.borderColor && (g.borderColor = this.borderColor);
    g.lineWidth = this.lineWidth;
    g.lineType = this.lineType;
    this.m_graphics.polyline(c, g)
};
primitives.common.Callout.prototype._getPlacement = function (a, b, c) {
    var d = null,
        e = null,
        d = a.x < b.x ? 0 : a.x > c.x ? 2 : 1,
        e = a.y < b.y ? 0 : a.y > c.y ? 2 : 1;
    return this.m_map[d][e]
};
primitives.common.Callout.prototype._drawSegment = function (a, b, c, d, e, f, g, h) {
    var j = this._offsetPoint(b, c, f),
        i = this._offsetPoint(c, b, f),
        d = this._offsetPoint(c, d, f),
        e = this.m_graphics.getPxSize(e, b.distanceTo(c) / 2);
    0 === a.length && a.push(new primitives.common.MoveSegment(j));
    null !== g && (j = this._betweenPoint(b, c), b = this._offsetPoint(j, b, e), e = this._offsetPoint(j, c, e), a.push(new primitives.common.LineSegment(b)), a.push(new primitives.common.LineSegment(g)), a.push(new primitives.common.LineSegment(e)));
    a.push(new primitives.common.LineSegment(i));
    null !== h ? (a.push(new primitives.common.LineSegment(h)), a.push(new primitives.common.LineSegment(d))) : a.push(new primitives.common.QuadraticArcSegment(c, d))
};
primitives.common.Connector = function (a) {
    this.m_graphics = a;
    this.transform = null;
    this.orientationType = 0;
    this.panelSize = null;
    this.connectorShapeType = 1;
    this.offset = 0;
    this.lineWidth = 1;
    this.labelOffset = 4;
    this.labelSize = new primitives.common.Size(60, 30);
    this.lineType = 0;
    this.labelPlacementType = primitives.common.ConnectorLabelPlacementType.Between;
    this.color = "#000000";
    this.hasLabel = !1;
    this.labelTemplateHashCode = this.labelTemplate = null
};
primitives.common.Connector.prototype = new primitives.common.BaseShape;
primitives.common.Connector.prototype.draw = function (a, b, c) {
    var d, e, f, g, h, j, i, k, l, m = 6 * this.lineWidth,
        n, p, q = 0,
        s = 0,
        r, t = new primitives.common.PaletteItem({
            lineColor: this.color,
            lineWidth: this.lineWidth,
            lineType: this.lineType
        }),
        u = new primitives.common.PolylinesBuffer,
        v = u.getPolyline(t),
        a = (new primitives.common.Rect(a)).offset(this.offset),
        b = (new primitives.common.Rect(b)).offset(this.offset);
    j = [];
    switch (this.connectorShapeType) {
    case 1:
        j = [-m / 2, m / 2];
        break;
    case 0:
        j = [0]
    }
    this.transform = new primitives.common.Transform;
    this.transform.size = this.panelSize;
    this.transform.setOrientation(this.orientationType);
    this.transform.transformRect(a.x, a.y, a.width, a.height, !1, this, function (b, c, d, e) {
        a = new primitives.common.Rect(b, c, d, e)
    });
    this.transform.transformRect(b.x, b.y, b.width, b.height, !1, this, function (a, c, d, e) {
        b = new primitives.common.Rect(a, c, d, e)
    });
    this.transform.transformRect(0, 0, this.labelSize.width, this.labelSize.height, !1, this, function (a, b, c, d) {
        n = new primitives.common.Size(c, d)
    });
    this.transform.transformRect(0, 0, this.panelSize.width,
        this.panelSize.height, !1, this,
        function (a, b, c, d) {
            r = new primitives.common.Size(c, d)
        });
    q = Math.max(this.hasLabel ? n.width : 0, 5 * m);
    if (a.right() + q < b.left() || a.left() > b.right() + q)
        if (a.left() > b.right() ? (d = new primitives.common.Point(a.left(), a.verticalCenter()), e = new primitives.common.Point(b.right(), b.verticalCenter()), q = 7, s = 3) : (d = new primitives.common.Point(a.right(), a.verticalCenter()), e = new primitives.common.Point(b.left(), b.verticalCenter()), q = 3, s = 7), f = new primitives.common.Rect(d, e), l = d.y <= e.y, k = d.x <
            e.x, f.height < f.width) {
            f.height < 2 * m && f.offset(0, l ? 2 * m : 0, 0, l ? 0 : 2 * m);
            g = 0;
            for (h = j.length; g < h; g += 1) i = j[g], u.addInverted(function (a) {
                a = a.getPolyline(t);
                a.segments.push(new primitives.common.MoveSegment(d.x, d.y + i));
                a.segments.push(new primitives.common.QuadraticArcSegment(f.horizontalCenter(), (l ? f.top() : f.bottom()) + i, e.x, e.y + i))
            }, !g), v.addArrow(this.lineWidth, function (a, b) {
                var c = u.getPolyline(b);
                c.segments = c.segments.concat(a)
            });
            j = n.width < 2 * (f.width / 5) ? primitives.common.QuadraticArcSegment.prototype.offsetPoint(d.x,
                d.y, f.horizontalCenter(), l ? f.top() : f.bottom(), e.x, e.y, 0.5) : new primitives.common.Point(d.x, l ? f.top() : f.bottom());
            p = new primitives.common.Rect(j.x + (k ? m : -n.width - m), l ? j.y - n.height - m : j.y + m, n.width, n.height)
        } else {
            g = 0;
            for (h = j.length; g < h; g += 1) i = j[g], u.addInverted(function (a) {
                a = a.getPolyline(t);
                a.segments.push(new primitives.common.MoveSegment(d.x, d.y + i));
                a.segments.push(new primitives.common.QuadraticArcSegment(f.horizontalCenter() + i * (l != k ? 1 : -1), (l ? f.top() : f.bottom()) + i, f.horizontalCenter() + i * (l != k ? 1 : -1),
                    f.verticalCenter() + i));
                a.segments.push(new primitives.common.QuadraticArcSegment(f.horizontalCenter() + i * (l != k ? 1 : -1), (l ? f.bottom() : f.top()) + i, e.x, e.y + i))
            }, !g), v.addArrow(this.lineWidth, function (a, b) {
                var c = u.getPolyline(b);
                c.segments = c.segments.concat(a)
            });
            p = new primitives.common.Rect(f.horizontalCenter() + (l != k ? m : -(m + n.width)), f.verticalCenter() - n.height / 2, n.width, n.height)
        } else if (a.verticalCenter() < b.top() || a.verticalCenter() > b.bottom()) {
        k = a.x < r.width / 2;
        d = new primitives.common.Point(k ? a.right() : a.left(),
            a.verticalCenter());
        e = new primitives.common.Point(k ? b.right() : b.left(), b.verticalCenter());
        s = q = k ? 3 : 7;
        f = new primitives.common.Rect(d, e);
        f.offset(10 * m, 0, 10 * m, 0);
        l = d.y <= e.y;
        g = 0;
        for (h = j.length; g < h; g += 1) i = j[g], u.addInverted(function (a) {
            a = a.getPolyline(t);
            a.segments.push(new primitives.common.MoveSegment(d.x, d.y + i));
            a.segments.push(new primitives.common.QuadraticArcSegment(k ? f.right() + i * (l ? -1 : 1) : f.left() - i * (l ? -1 : 1), f.verticalCenter(), k ? b.right() : b.left(), b.verticalCenter() - i))
        }, !g), v.addArrow(this.lineWidth,
            function (a, b) {
                var c = u.getPolyline(b);
                c.segments = c.segments.concat(a)
            });
        j = primitives.common.QuadraticArcSegment.prototype.offsetPoint(d.x, d.y, k ? f.right() : f.left(), f.verticalCenter(), e.x, e.y, 0.5);
        p = new primitives.common.Rect(j.x + (k ? m / 2 : -m / 2 - n.width), j.y - n.height / 2, n.width, n.height)
    } else {
        d = new primitives.common.Point(a.horizontalCenter(), a.top());
        e = new primitives.common.Point(b.horizontalCenter(), b.top());
        s = q = 1;
        f = new primitives.common.Rect(d, e);
        f.offset(0, 7 * m, 0, 0);
        k = d.x < e.x;
        g = 0;
        for (h = j.length; g < h; g +=
            1) i = j[g], u.addInverted(function (a) {
            a = a.getPolyline(t);
            a.segments.push(new primitives.common.MoveSegment(d.x + i, d.y));
            a.segments.push(new primitives.common.QuadraticArcSegment(f.horizontalCenter(), f.top() - i * (k ? -1 : 1), b.horizontalCenter() - i, b.top()))
        }, !g), v.addArrow(this.lineWidth, function (a, b) {
            var c = u.getPolyline(b);
            c.segments = c.segments.concat(a)
        });
        j = primitives.common.QuadraticArcSegment.prototype.offsetPoint(d.x, d.y, f.horizontalCenter(), f.top(), e.x, e.y, 0.5);
        p = new primitives.common.Rect(j.x - n.width /
            2, j.y - (this.labelOffset + n.height), n.width, n.height)
    }
    u.transform(this.transform, !0);
    this.m_graphics.polylinesBuffer(u);
    if (this.hasLabel) {
        switch (this.labelPlacementType) {
        case primitives.common.ConnectorLabelPlacementType.From:
            p = this._getLabelPosition(a.x, a.y, a.width, a.height, p.width, p.height, this.labelOffset, q);
            break;
        case primitives.common.ConnectorLabelPlacementType.To:
            p = this._getLabelPosition(b.x, b.y, b.width, b.height, p.width, p.height, this.labelOffset, s)
        }
        this.transform.transformRect(p.x, p.y, p.width,
            p.height, !0, this,
            function (a, b, c, d) {
                p = new primitives.common.Rect(a, b, c, d)
            });
        this.m_graphics.template(p.x, p.y, 0, 0, 0, 0, p.width, p.height, this.labelTemplate, this.labelTemplateHashCode, "onAnnotationLabelTemplateRender", c, null)
    }
};
primitives.common.Perimeter = function (a) {
    this.m_graphics = a;
    this.transform = null;
    this.opacity = this.lineWidth = 1;
    this.fillColor = null;
    this.lineType = 0;
    this.borderColor = null
};
primitives.common.Perimeter.prototype = new primitives.common.BaseShape;
primitives.common.Perimeter.prototype.draw = function (a) {
    var b = new primitives.common.PaletteItem({
            lineColor: this.borderColor,
            lineWidth: this.lineWidth,
            fillColor: this.fillColor,
            lineType: this.lineType,
            opacity: this.opacity
        }),
        c = new primitives.common.Polyline(b),
        d = this.lineWidth / 2,
        e = null,
        f = null,
        g = null,
        h = {};
    a.segments.iterate(function (b) {
        var i = 0,
            k = 0,
            l = !1;
        if (0 < d) switch (b.orientationType) {
        case 3:
            i = -d;
            l = !1;
            break;
        case 2:
            i = d;
            l = !1;
            break;
        case 0:
            k = d;
            l = !0;
            break;
        case 1:
            k = -d;
            l = !0;
            break;
        default:
            throw "Orientation is not defined!";
        }
        0 == c.segments.length && (f = new primitives.common.MoveSegment(b.fromPoint), c.segments.push(f), h[a.segments.endKey()] = {
            point: f,
            isVertical: l
        });
        i = null != a.segments.item(b.oppositeKey) ? new primitives.common.MoveSegment(b.toPoint.x + i, b.toPoint.y + k) : new primitives.common.LineSegment(b.toPoint.x + i, b.toPoint.y + k);
        c.segments.push(i);
        0 < d && (l ? f.y = i.y : f.x = i.x, null != e && (!a.segments.item(e.oppositeKey) && null != a.segments.item(b.oppositeKey) ? h.hasOwnProperty(b.oppositeKey) ? (k = h[b.oppositeKey], k.isVertical ? f.y = k.point.y :
            f.x = k.point.x, g ? k.point.y = f.y : k.point.x = f.x) : h[b.oppositeKey] = {
            point: f,
            isVertical: g
        } : null != a.segments.item(e.oppositeKey) && !a.segments.item(b.oppositeKey) && (h.hasOwnProperty(e.key) ? (k = h[e.key], k.isVertical ? f.y = k.point.y : f.x = k.point.x, g ? k.point.y = f.y : k.point.x = f.x) : h[e.key] = {
            point: f,
            isVertical: l
        })), g = l, e = b);
        f = i
    });
    0 < d && !a.segments.item(e.oppositeKey) && (b = h[e.key], b.isVertical ? f.y = b.point.y : f.x = b.point.x, g ? b.point.y = f.y : b.point.x = f.x);
    c.transform(this.transform, !0);
    this.m_graphics.polyline(c.segments,
        c.paletteItem.toAttr())
};
primitives.common.Shape = function (a) {
    this.m_graphics = a;
    this.transform = null;
    this.orientationType = 0;
    this.panelSize = null;
    this.shapeType = 0;
    this.offset = new primitives.common.Thickness(0, 0, 0, 0);
    this.lineWidth = 1;
    this.labelOffset = 4;
    this.cornerRadius = "10%";
    this.opacity = 1;
    this.fillColor = null;
    this.labelSize = new primitives.common.Size(60, 30);
    this.lineType = 0;
    this.borderColor = null;
    this.hasLabel = !1;
    this.labelTemplateHashCode = this.labelTemplate = null;
    this.labelPlacement = 0
};
primitives.common.Shape.prototype = new primitives.common.BaseShape;
primitives.common.Shape.prototype.draw = function (a, b) {
    var c, d, e, f, g, a = (new primitives.common.Rect(a)).offset(this.offset);
    this.transform = new primitives.common.Transform;
    this.transform.size = this.panelSize;
    this.transform.setOrientation(this.orientationType);
    this.hasLabel && (c = this._getLabelPosition(a.x, a.y, a.width, a.height, this.labelSize.width, this.labelSize.height, this.labelOffset, this.labelPlacement));
    switch (this.shapeType) {
    case 0:
        f = new primitives.common.Callout(this.m_graphics);
        f.cornerRadius = this.cornerRadius;
        f.opacity = this.opacity;
        f.lineWidth = this.lineWidth;
        f.lineType = this.lineType;
        f.borderColor = this.borderColor;
        f.fillColor = this.fillColor;
        f.draw(null, a);
        break;
    default:
        g = new primitives.common.PaletteItem({
            lineColor: this.borderColor,
            lineWidth: this.lineWidth,
            lineType: this.lineType,
            fillColor: this.fillColor,
            opacity: this.opacity
        });
        f = new primitives.common.PolylinesBuffer;
        g = f.getPolyline(g);
        this.transform.transformRect(a.x, a.y, a.width, a.height, !1, this, function (b, c, d, e) {
            a = new primitives.common.Rect(b, c, d, e)
        });
        switch (this.shapeType) {
        case 4:
            d = Math.min(a.width / 2, a.height / 2), a = new primitives.common.Rect(a.horizontalCenter() - d, a.verticalCenter() - d, 2 * d, 2 * d);
        case 1:
            d = 0.5522848 * (a.width / 2);
            e = 0.5522848 * (a.height / 2);
            g.segments.push(new primitives.common.MoveSegment(a.x, a.verticalCenter()));
            g.segments.push(new primitives.common.CubicArcSegment(a.x, a.verticalCenter() - e, a.horizontalCenter() - d, a.y, a.horizontalCenter(), a.y));
            g.segments.push(new primitives.common.CubicArcSegment(a.horizontalCenter() + d, a.y, a.right(), a.verticalCenter() -
                e, a.right(), a.verticalCenter()));
            g.segments.push(new primitives.common.CubicArcSegment(a.right(), a.verticalCenter() + e, a.horizontalCenter() + d, a.bottom(), a.horizontalCenter(), a.bottom()));
            g.segments.push(new primitives.common.CubicArcSegment(a.horizontalCenter() - d, a.bottom(), a.x, a.verticalCenter() + e, a.x, a.verticalCenter()));
            break;
        case 5:
            g.segments.push(new primitives.common.MoveSegment(a.horizontalCenter(), a.bottom()));
            g.segments.push(new primitives.common.LineSegment(a.left(), a.verticalCenter()));
            g.segments.push(new primitives.common.LineSegment(a.horizontalCenter(), a.y));
            g.segments.push(new primitives.common.LineSegment(a.right(), a.verticalCenter()));
            g.segments.push(new primitives.common.LineSegment(a.horizontalCenter(), a.bottom()));
            break;
        case 2:
            g.segments.push(new primitives.common.MoveSegment(a.left(), a.bottom()));
            g.segments.push(new primitives.common.LineSegment(a.horizontalCenter(), a.y));
            g.segments.push(new primitives.common.LineSegment(a.right(), a.bottom()));
            g.segments.push(new primitives.common.LineSegment(a.left(),
                a.bottom()));
            break;
        case 3:
            g.segments.push(new primitives.common.MoveSegment(a.horizontalCenter(), a.verticalCenter())), g.segments.push(new primitives.common.LineSegment(a.x, a.y)), g.segments.push(new primitives.common.MoveSegment(a.horizontalCenter(), a.verticalCenter())), g.segments.push(new primitives.common.LineSegment(a.right(), a.bottom())), g.segments.push(new primitives.common.MoveSegment(a.horizontalCenter(), a.verticalCenter())), g.segments.push(new primitives.common.LineSegment(a.right(), a.y)),
                g.segments.push(new primitives.common.MoveSegment(a.horizontalCenter(), a.verticalCenter())), g.segments.push(new primitives.common.LineSegment(a.left(), a.bottom()))
        }
        f.transform(this.transform, !0);
        this.m_graphics.polylinesBuffer(f)
    }
    this.hasLabel && this.m_graphics.template(c.x, c.y, 0, 0, 0, 0, c.width, c.height, this.labelTemplate, this.labelTemplateHashCode, "onAnnotationLabelTemplateRender", b, null)
};
primitives.common.Point = function (a, b) {
    this.y = this.x = null;
    switch (arguments.length) {
    case 1:
        this.x = a.x;
        this.y = a.y;
        break;
    case 2:
        this.x = a, this.y = b
    }
};
primitives.common.Point.prototype.distanceTo = function (a, b) {
    var c = 0,
        d = 0;
    switch (arguments.length) {
    case 1:
        c = a.x;
        d = a.y;
        break;
    case 2:
        c = a, d = b
    }
    c = this.x - c;
    d = this.y - d;
    return Math.sqrt(c * c + d * d)
};
primitives.common.Point.prototype.swap = function (a) {
    var b = a.x,
        c = a.y;
    a.x = this.x;
    a.y = this.y;
    this.x = b;
    this.y = c
};
primitives.common.Point.prototype.clone = function () {
    return new primitives.common.Point(this)
};
primitives.common.Point.prototype.toString = function (a) {
    var b, a = void 0 !== a ? a : "px";
    b = "" + ("left:" + this.x + a + ";");
    return b += "top:" + this.y + a + ";"
};
primitives.common.MoveSegment = function () {
    this.parent = primitives.common.Point.prototype;
    this.parent.constructor.apply(this, arguments);
    this.segmentType = 1
};
primitives.common.MoveSegment.prototype = new primitives.common.Point;
primitives.common.MoveSegment.prototype.getEndPoint = function () {
    return this
};
primitives.common.MoveSegment.prototype.invert = function (a) {
    this.x = a.x;
    this.y = a.y
};
primitives.common.MoveSegment.prototype.transform = function (a, b) {
    var c = this;
    a.transformPoint(c.x, c.y, b, c, function (a, b) {
        c.x = a;
        c.y = b
    })
};
primitives.common.CubicArcSegment = function (a, b, c, d, e, f) {
    this.parent = primitives.common.Point.prototype;
    this.cpY2 = this.cpX2 = this.cpY1 = this.cpX1 = this.y = this.x = null;
    switch (arguments.length) {
    case 3:
        this.parent.constructor.apply(this, [c.x, c.y]);
        this.cpX1 = a.x;
        this.cpY1 = a.y;
        this.cpX2 = b.x;
        this.cpY2 = b.y;
        break;
    case 6:
        this.parent.constructor.apply(this, [e, f]), this.cpX1 = a, this.cpY1 = b, this.cpX2 = c, this.cpY2 = d
    }
    this.segmentType = 3
};
primitives.common.CubicArcSegment.prototype = new primitives.common.Point;
primitives.common.CubicArcSegment.prototype.getEndPoint = function () {
    return this
};
primitives.common.CubicArcSegment.prototype.invert = function (a) {
    var b = this.cpX1,
        c = this.cpY1;
    this.x = a.x;
    this.y = a.y;
    this.cpX1 = this.cpX2;
    this.cpY1 = this.cpY2;
    this.cpX2 = b;
    this.cpY2 = c
};
primitives.common.CubicArcSegment.prototype.transform = function (a, b) {
    var c = this;
    a.transform3Points(c.x, c.y, c.cpX1, c.cpY1, c.cpX2, c.cpY2, b, c, function (a, b, f, g, h, j) {
        c.x = a;
        c.y = b;
        c.cpX1 = f;
        c.cpY1 = g;
        c.cpX2 = h;
        c.cpY2 = j
    })
};
primitives.common.CubicArcSegment.prototype.trim = function (a, b) {
    var c = 0.5,
        d = this.offsetPoint(this.x, this.y, this.cpX2, this.cpY2, this.cpX1, this.cpY1, a.x, a.y, c),
        e = this.offsetPoint(this.x, this.y, this.cpX2, this.cpY2, this.cpX1, this.cpY1, a.x, a.y, 0.1),
        c = b * (c / d.distanceTo(this.x, this.y) + 0.1 / e.distanceTo(this.x, this.y)) / 2,
        d = this.offsetPoint(this.x, this.y, this.cpX2, this.cpY2, this.cpX1, this.cpY1, a.x, a.y, c);
    this.x = d.x;
    this.y = d.y;
    return this
};
primitives.common.CubicArcSegment.prototype.offsetPoint = function (a, b, c, d, e, f, g, h, j) {
    return new primitives.common.Point((1 - j) * (1 - j) * (1 - j) * a + 3 * (1 - j) * (1 - j) * j * c + 3 * (1 - j) * j * j * e + j * j * j * g, (1 - j) * (1 - j) * (1 - j) * b + 3 * (1 - j) * (1 - j) * j * d + 3 * (1 - j) * j * j * f + j * j * j * h)
};
primitives.common.DotSegment = function (a, b, c, d, e) {
    this.segmentType = 4;
    this.x = a;
    this.y = b;
    this.width = c;
    this.height = d;
    this.cornerRadius = e
};
primitives.common.Label = function () {
    this.position = this.text = null;
    this.weight = 0;
    this.isActive = !0;
    this.horizontalAlignmentType = this.labelOrientation = this.labelType = 0;
    this.verticalAlignmentType = 2
};
primitives.common.LineSegment = function () {
    this.parent = primitives.common.MoveSegment.prototype;
    this.parent.constructor.apply(this, arguments);
    this.segmentType = 0
};
primitives.common.LineSegment.prototype = new primitives.common.MoveSegment;
primitives.common.LineSegment.prototype.trim = function (a, b) {
    var c = this._offsetPoint(this, a, b);
    this.x = c.x;
    this.y = c.y;
    return this
};
primitives.common.LineSegment.prototype._offsetPoint = function (a, b, c) {
    var d = null,
        d = a.distanceTo(b);
    return d = 0 == d || 0 == c ? new primitives.common.Point(a) : new primitives.common.Point(a.x + (b.x - a.x) / d * c, a.y + (b.y - a.y) / d * c)
};
primitives.common.PaletteItem = function (a) {
    this.lineColor = "#c0c0c0";
    this.lineWidth = 1;
    this.lineType = 0;
    this.opacity = this.fillColor = null;
    this._key = "";
    var b, c, d, e;
    c = ["lineColor", "lineWidth", "lineType", "fillColor", "opacity"];
    d = 0;
    for (e = c.length; d < e; d += 1) b = c[d], null != a && a.hasOwnProperty(b) && (this[b] = a[b]), this._key += (!primitives.common.isNullOrEmpty(this._key) ? ", " : "") + b + ":" + this[b]
};
primitives.common.PaletteItem.prototype.toAttr = function () {
    var a = {
        lineWidth: this.lineWidth,
        lineType: this.lineType
    };
    null !== this.fillColor && (a.fillColor = this.fillColor);
    null !== this.opacity && (a.opacity = this.opacity);
    null !== this.lineColor && (a.borderColor = this.lineColor);
    return a
};
primitives.common.PaletteItem.prototype.toString = function () {
    return this._key
};
primitives.common.PaletteManager = function (a) {
    this.palette = [];
    this.cursor = 0;
    var b, c;
    if (0 == a.linesPalette.length) this.palette = [new primitives.common.PaletteItem({
        lineColor: a.linesColor,
        lineWidth: a.linesWidth,
        lineType: a.linesType
    })], this.paletteLength = this.palette.length, this.regularIndex = 0;
    else {
        b = 0;
        for (c = a.linesPalette.length; b < c; b += 1) this.palette.push(new primitives.common.PaletteItem(a.linesPalette[b]));
        this.paletteLength = this.palette.length;
        this.palette.push(new primitives.common.PaletteItem({
            lineColor: a.linesColor,
            lineWidth: a.linesWidth,
            lineType: a.linesType
        }));
        this.regularIndex = this.palette.length - 1
    }
    this.palette.push(new primitives.common.PaletteItem({
        lineColor: a.highlightLinesColor,
        lineWidth: a.highlightLinesWidth,
        lineType: a.highlightLinesType
    }));
    this.highlightIndex = this.palette.length - 1
};
primitives.common.PaletteManager.prototype.selectPalette = function (a) {
    this.cursor = a % this.paletteLength
};
primitives.common.PaletteManager.prototype.getPalette = function (a) {
    var b = null;
    switch (a) {
    case 1:
        b = this.regularIndex;
        break;
    case 2:
        b = this.highlightIndex;
        break;
    case 0:
        b = this.cursor
    }
    return this.palette[b]
};
primitives.common.Polyline = function (a) {
    this.paletteItem = new primitives.common.PaletteItem;
    this.segments = [];
    switch (arguments.length) {
    case 1:
        this.paletteItem = a
    }
    this.arrowPaletteItem = new primitives.common.PaletteItem({
        lineColor: this.paletteItem.lineColor,
        lineWidth: 0,
        fillColor: this.paletteItem.lineColor,
        opacity: 1
    })
};
primitives.common.Polyline.prototype.transform = function (a, b) {
    var c, d, e;
    c = 0;
    for (d = this.segments.length; c < d; c += 1) e = this.segments[c], null != e.transform && e.transform(a, b)
};
primitives.common.Polyline.prototype.isInvertable = function () {
    return primitives.common.isNullOrEmpty(this.paletteItem.fillColor)
};
primitives.common.Polyline.prototype.addInverted = function (a) {
    var b = a.segments,
        c, d;
    if (0 < b.length)
        if (this.isInvertable()) {
            d = b[b.length - 1].getEndPoint();
            this.segments.push(new primitives.common.MoveSegment(d));
            for (a = b.length - 1; 0 < a; a -= 1) c = b[a], d = b[a - 1], 4 != c.segmentType && 4 != d.segmentType && (d = d.getEndPoint(), c.invert(d)), this.segments.push(c)
        } else this.segments = this.segments.concat(b)
};
primitives.common.Polyline.prototype.addArrow = function (a, b) {
    var c, d, e;
    d = this.segments.length;
    var f;
    f = 8 * a;
    var g = 6 * a;
    null != b && 1 < d && (c = this.segments[d - 2].getEndPoint(), e = this.segments[d - 1], null != e.trim && (d = new primitives.common.Point(e.getEndPoint()), c = e.trim(c, g), f = this._getArrow(c.x, c.y, d.x, d.y, f, g), b(f, this.arrowPaletteItem, c)))
};
primitives.common.Polyline.prototype.optimizeMoveSegments = function () {
    var a, b, c, d, e;
    c = {};
    var f = [],
        g = [];
    a = 0;
    for (b = this.segments.length; a < b - 1; a += 1) switch (d = this.segments[a], e = this.segments[a + 1], d.segmentType) {
    case 0:
    case 2:
    case 3:
        switch (e.segmentType) {
        case 1:
        case 4:
            d = d.x + "&" + d.y, c.hasOwnProperty(d) || (c[d] = a)
        }
        break;
    case 1:
        d = d.x + "&" + d.y, c.hasOwnProperty(d) && !f[c[d]] && (f[c[d]] = a + 1, g[a] = !0)
    }
    e = [];
    for (a = 0; a < b; a += 1)
        if (!g[a] && (d = this.segments[a], e.push(d), g[a] = !0, 0 < f[a]))
            for (c = f[a]; c < b && !g[c];) d = this.segments[c],
                e.push(d), g[c] = !0, c = 0 < f[c] ? f[c] : c + 1;
    this.segments = e
};
primitives.common.Polyline.prototype._getArrow = function (a, b, c, d, e, f) {
    for (var g = [], h, j, e = [new primitives.common.Point(e, -f / 2), new primitives.common.Point(0, 0), new primitives.common.Point(e, f / 2), new primitives.common.Point(3 * (e / 4), 0)], i = Math.atan2(b - d, a - c), a = 0, b = e.length; a < b; a += 1) f = e[a], h = f.x * Math.cos(i) - f.y * Math.sin(i), j = f.x * Math.sin(i) + f.y * Math.cos(i), f.x = h + c, f.y = j + d;
    g.push(new primitives.common.MoveSegment(e[0].x, e[0].y));
    g.push(new primitives.common.LineSegment(e[1].x, e[1].y));
    g.push(new primitives.common.LineSegment(e[2].x,
        e[2].y));
    g.push(new primitives.common.QuadraticArcSegment(e[3].x, e[3].y, e[0].x, e[0].y));
    return g
};
primitives.common.Polyline.prototype.toString = function () {
    return this.paletteItem.toString()
};
primitives.common.PolylinesBuffer = function () {
    this.polylines = {}
};
primitives.common.PolylinesBuffer.prototype._getPolyline = function (a, b) {
    a[b.toString()] || (a[b.toString()] = new primitives.common.Polyline(b));
    return a[b.toString()]
};
primitives.common.PolylinesBuffer.prototype.getPolyline = function (a) {
    return this._getPolyline(this.polylines, a)
};
primitives.common.PolylinesBuffer.prototype.getPolylines = function () {
    var a, b, c = [];
    for (a in this.polylines)
        if (this.polylines.hasOwnProperty(a) && (b = this.polylines[a])) b.optimizeMoveSegments(), c.push(b);
    return c
};
primitives.common.PolylinesBuffer.prototype.addInverted = function (a, b) {
    var c, d, e, f;
    d = this.polylines;
    this.polylines = [];
    null != a && a(this);
    for (c in this.polylines) this.polylines.hasOwnProperty(c) && (e = this._getPolyline(this.polylines, c), f = this._getPolyline(d, e.paletteItem), b ? f.segments = f.segments.concat(e.segments) : f.addInverted(e));
    this.polylines = d
};
primitives.common.PolylinesBuffer.prototype.transform = function (a, b) {
    var c, d;
    for (c in this.polylines) this.polylines.hasOwnProperty(c) && (d = this.polylines[c]) && d.transform(a, b)
};
primitives.common.QuadraticArcSegment = function (a, b, c, d) {
    this.cpY = this.cpX = this.y = this.x = null;
    switch (arguments.length) {
    case 2:
        this.x = b.x;
        this.y = b.y;
        this.cpX = a.x;
        this.cpY = a.y;
        break;
    case 4:
        this.cpX = a, this.cpY = b, this.x = c, this.y = d
    }
    this.segmentType = 2
};
primitives.common.QuadraticArcSegment.prototype.getEndPoint = function () {
    return this
};
primitives.common.QuadraticArcSegment.prototype.invert = function (a) {
    this.x = a.x;
    this.y = a.y
};
primitives.common.QuadraticArcSegment.prototype.transform = function (a, b) {
    var c = this;
    a.transformPoints(c.x, c.y, c.cpX, c.cpY, b, c, function (a, b, f, g) {
        c.x = a;
        c.y = b;
        c.cpX = f;
        c.cpY = g
    })
};
primitives.common.QuadraticArcSegment.prototype.trim = function (a, b) {
    var c = 0.5,
        d = this.offsetPoint(this.x, this.y, this.cpX, this.cpY, a.x, a.y, c),
        e = this.offsetPoint(this.x, this.y, this.cpX, this.cpY, a.x, a.y, 0.1),
        c = b * (c / d.distanceTo(this.x, this.y) + 0.1 / e.distanceTo(this.x, this.y)) / 2,
        d = this.offsetPoint(this.x, this.y, this.cpX, this.cpY, a.x, a.y, c);
    this.x = d.x;
    this.y = d.y;
    return this
};
primitives.common.QuadraticArcSegment.prototype.offsetPoint = function (a, b, c, d, e, f, g) {
    return new primitives.common.Point((1 - g) * (1 - g) * a + 2 * (1 - g) * g * c + g * g * e, (1 - g) * (1 - g) * b + 2 * (1 - g) * g * d + g * g * f)
};
primitives.common.Rect = function (a, b, c, d) {
    this.height = this.width = this.y = this.x = null;
    switch (arguments.length) {
    case 1:
        this.x = a.x;
        this.y = a.y;
        this.width = a.width;
        this.height = a.height;
        break;
    case 2:
        this.x = Math.min(a.x, b.x);
        this.y = Math.min(a.y, b.y);
        this.width = Math.abs(b.x - a.x);
        this.height = Math.abs(b.y - a.y);
        break;
    case 4:
        this.x = a, this.y = b, this.width = c, this.height = d
    }
};
primitives.common.Rect.prototype.left = function () {
    return this.x
};
primitives.common.Rect.prototype.top = function () {
    return this.y
};
primitives.common.Rect.prototype.right = function () {
    return this.x + this.width
};
primitives.common.Rect.prototype.bottom = function () {
    return this.y + this.height
};
primitives.common.Rect.prototype.verticalCenter = function () {
    return this.y + this.height / 2
};
primitives.common.Rect.prototype.horizontalCenter = function () {
    return this.x + this.width / 2
};
primitives.common.Rect.prototype.isEmpty = function () {
    return null === this.x || null === this.y || null === this.width || null === this.height || 0 > this.width || 0 > this.height
};
primitives.common.Rect.prototype.offset = function (a, b, c, d) {
    switch (arguments.length) {
    case 1:
        null !== a && "object" == typeof a ? (this.x -= a.left, this.y -= a.top, this.width = this.width + a.left + a.right, this.height = this.height + a.top + a.bottom) : (this.x -= a, this.y -= a, this.width += 2 * a, this.height += 2 * a);
        break;
    case 4:
        this.x -= a, this.y -= b, this.width = this.width + a + c, this.height = this.height + b + d
    }
    return this
};
primitives.common.Rect.prototype.translate = function (a, b) {
    this.x += a;
    this.y += b;
    return this
};
primitives.common.Rect.prototype.invert = function () {
    var a = this.width,
        b = this.x;
    this.width = this.height;
    this.height = a;
    this.x = this.y;
    this.y = b;
    return this
};
primitives.common.Rect.prototype.contains = function (a, b) {
    switch (arguments.length) {
    case 1:
        return this.x <= a.x && a.x <= this.x + this.width && this.y <= a.y && a.y <= this.y + this.height;
    case 2:
        return this.x <= a && a <= this.x + this.width && this.y <= b && b <= this.y + this.height;
    default:
        return !1
    }
};
primitives.common.Rect.prototype.cropByRect = function (a) {
    this.x < a.x && (this.width -= a.x - this.x, this.x = a.x);
    this.right() > a.right() && (this.width -= this.right() - a.right());
    this.y < a.y && (this.height -= a.y - this.y, this.y = a.y);
    this.bottom() > a.bottom() && (this.height -= this.bottom() - a.bottom());
    this.isEmpty() && (this.height = this.width = this.y = this.x = null);
    return this
};
primitives.common.Rect.prototype.overlaps = function (a) {
    var b = !0;
    if (this.x + this.width < a.x || a.x + a.width < this.x || this.y + this.height < a.y || a.y + a.height < this.y) b = !1;
    return b
};
primitives.common.Rect.prototype.addRect = function (a, b, c, d) {
    var e, f;
    switch (arguments.length) {
    case 1:
        a.isEmpty() || (this.isEmpty() ? (this.x = a.x, this.y = a.y, this.width = a.width, this.height = a.height) : (e = Math.max(this.right(), a.right()), f = Math.max(this.bottom(), a.bottom()), this.x = Math.min(this.x, a.x), this.y = Math.min(this.y, a.y), this.width = e - this.x, this.height = f - this.y));
        break;
    case 2:
        this.isEmpty() ? (this.x = a, this.y = b, this.height = this.width = 0) : (e = Math.max(this.right(), a), f = Math.max(this.bottom(), b), this.x = Math.min(this.x,
            a), this.y = Math.min(this.y, b), this.width = e - this.x, this.height = f - this.y);
        break;
    case 4:
        this.isEmpty() ? (this.x = a, this.y = b, this.width = c, this.height = d) : (e = Math.max(this.right(), a + c), f = Math.max(this.bottom(), b + d), this.x = Math.min(this.x, a), this.y = Math.min(this.y, b), this.width = e - this.x, this.height = f - this.y)
    }
    return this
};
primitives.common.Rect.prototype.getCSS = function (a) {
    a = void 0 !== a ? a : "px";
    return {
        left: this.x + a,
        top: this.y + a,
        width: this.width + a,
        height: this.height + a
    }
};
primitives.common.Rect.prototype.toString = function (a) {
    var b, a = void 0 !== a ? a : "px";
    b = "" + ("left:" + this.x + a + ";");
    b += "top:" + this.y + a + ";";
    b += "width:" + this.width + a + ";";
    return b += "height:" + this.height + a + ";"
};
primitives.common.Size = function (a, b) {
    this.height = this.width = 0;
    switch (arguments.length) {
    case 1:
        this.width = a.width;
        this.height = a.height;
        break;
    case 2:
        this.width = a, this.height = b
    }
};
primitives.common.Size.prototype.invert = function () {
    var a = this.width;
    this.width = this.height;
    this.height = a;
    return this
};
primitives.common.Thickness = function (a, b, c, d) {
    this.left = a;
    this.top = b;
    this.right = c;
    this.bottom = d
};
primitives.common.Thickness.prototype.isEmpty = function () {
    return 0 === this.left && 0 === this.top && 0 === this.right && 0 === this.bottom
};
primitives.common.Thickness.prototype.toString = function (a) {
    a = void 0 !== a ? a : "px";
    return this.left + a + ", " + this.top + a + ", " + this.right + a + ", " + this.bottom + a
};
primitives.common.Graphics = function (a) {
    this.m_widget = a;
    this.m_placeholders = {};
    this.m_activePlaceholder = null;
    this.m_cache = new primitives.common.Cache;
    this.boxModel = jQuery.support.boxModel;
    this.graphicsType = null;
    this.debug = this.hasGraphics = !1
};
primitives.common.Graphics.prototype.clean = function () {
    var a, b, c, d;
    this.m_cache.clear();
    this.m_widget = this.m_cache = null;
    for (a in this.m_placeholders)
        if (this.m_placeholders.hasOwnProperty(a)) {
            b = this.m_placeholders[a];
            for (c in b.layers) b.layers.hasOwnProperty(c) && (d = b.layers[c], d.canvas.remove(), d.canvas = null);
            b.layers.length = 0;
            b.activeLayer = null;
            b.size = null;
            b.rect = null;
            b.div = null
        }
    this.m_placeholders.length = 0;
    this.m_activePlaceholder = null
};
primitives.common.Graphics.prototype.resize = function (a, b, c) {
    a = this.m_placeholders[a];
    null != a && this.resizePlaceholder(a, b, c)
};
primitives.common.Graphics.prototype.resizePlaceholder = function (a, b, c) {
    var d;
    a.size = new primitives.common.Size(b, c);
    a.rect = new primitives.common.Rect(0, 0, b, c);
    for (d in a.layers) a.layers.hasOwnProperty(d) && (b = a.layers[d], -1 !== b.name && b.canvas.css({
        position: "absolute",
        width: "0px",
        height: "0px"
    }))
};
primitives.common.Graphics.prototype.begin = function () {
    this.m_cache.begin()
};
primitives.common.Graphics.prototype.end = function () {
    this.m_cache.end()
};
primitives.common.Graphics.prototype.reset = function (a, b) {
    var c = "none",
        d = -1;
    switch (arguments.length) {
    case 1:
        "string" === typeof a ? c = a : d = a;
        break;
    case 2:
        c = a, d = b
    }
    this.m_cache.reset(c, d)
};
primitives.common.Graphics.prototype.activate = function (a, b) {
    switch (arguments.length) {
    case 1:
        "string" === typeof a ? (this._activatePlaceholder(a), this._activateLayer(-1)) : (this._activatePlaceholder("none"), this._activateLayer(a));
        break;
    case 2:
        this._activatePlaceholder(a), this._activateLayer(b)
    }
    return this.m_activePlaceholder
};
primitives.common.Graphics.prototype._activatePlaceholder = function (a) {
    var b = this.m_placeholders[a],
        c;
    void 0 === b && (c = "none" === a ? this.m_widget.element : this.m_widget.element.find("." + a), b = new primitives.common.Placeholder(a), b.div = c, b.size = new primitives.common.Size(c.innerWidth(), c.innerHeight()), b.rect = new primitives.common.Rect(0, 0, b.size.width, b.size.height), this.m_placeholders[a] = b);
    this.m_activePlaceholder = b
};
primitives.common.Graphics.prototype._activateLayer = function (a) {
    var b = this.m_activePlaceholder.layers[a],
        c, d, e, f;
    if (void 0 === b) {
        c = this.m_activePlaceholder;
        if (-1 === a) b = new primitives.common.Layer(a), b.canvas = c.div;
        else {
            d = jQuery("<div></div>");
            d.addClass("Layer" + a);
            new primitives.common.Rect(c.rect);
            d.css({
                position: "absolute",
                width: "0px",
                height: "0px"
            });
            e = null;
            for (f in c.layers) c.layers.hasOwnProperty(f) && (b = c.layers[f], b.name < a && (e = null !== e ? Math.max(e, b.name) : b.name));
            b = new primitives.common.Layer(a);
            b.canvas = d;
            null === e ? c.div.prepend(b.canvas[0]) : b.canvas.insertAfter(c.layers[e].canvas)
        }
        c.layers[a] = b
    }
    this.m_activePlaceholder.activeLayer = b
};
primitives.common.Graphics.prototype.text = function (a, b, c, d, e, f, g, h, j) {
    var i = this.m_activePlaceholder,
        g = {
            position: "absolute",
            padding: 0,
            margin: 0,
            "text-align": this._getTextAlign(g),
            "font-size": j["font-size"],
            "font-family": j["font-family"],
            "font-weight": j["font-weight"],
            "font-style": j["font-style"],
            color: j["font-color"],
            "line-height": j["font-size"]
        },
        j = "";
    switch (f) {
    case 0:
    case 3:
        g.left = a;
        g.top = b;
        g.width = c;
        g.height = d;
        break;
    case 1:
        g.left = a + Math.round(c / 2 - d / 2);
        g.top = b + Math.round(d / 2 - c / 2);
        g.width = d;
        g.height =
            c;
        j = "rotate(-90deg)";
        break;
    case 2:
        g.left = a + Math.round(c / 2 - d / 2), g.top = b + Math.round(d / 2 - c / 2), g.width = d, g.height = c, j = "rotate(90deg)"
    }
    g["-webkit-transform-origin"] = "center center";
    g["-moz-transform-origin"] = "center center";
    g["-o-transform-origin"] = "center center";
    g["-ms-transform-origin"] = "center center";
    g["-webkit-transform"] = j;
    g["-moz-transform"] = j;
    g["-o-transform"] = j;
    g["-ms-transform"] = j;
    g.transform = j;
    g["max-width"] = g.width;
    g["max-height"] = g.height;
    e = e.replace(RegExp("\n", "g"), "<br/>");
    switch (h) {
    case 0:
        this.debug &&
            (g.border = "solid 1px black");
        a = this.m_cache.get(i.name, i.activeLayer.name, "text");
        null === a ? (a = jQuery("<div></div>"), a.css(g), a.html(e), i.activeLayer.canvas.append(a), this.m_cache.put(i.name, i.activeLayer.name, "text", a)) : (a.css(g), a.html(e));
        break;
    default:
        g["border-collapse"] = "collapse", b = {
            "vertical-align": this._getVerticalAlignment(h),
            padding: 0
        }, this.debug && (b.border = "solid 1px black"), a = this.m_cache.get(i.name, i.activeLayer.name, "textintable"), null === a ? (a = jQuery("<table><tbody><tr><td></td></tr></tbody></table>"),
            primitives.common.css(a, g), a.find("td").css(b).html(e), i.activeLayer.canvas.append(a), this.m_cache.put(i.name, i.activeLayer.name, "textintable", a)) : (primitives.common.css(a, g), a.find("td").css(b).html(e))
    }
};
primitives.common.Graphics.prototype._getTextAlign = function (a) {
    var b = null;
    switch (a) {
    case 0:
        b = "center";
        break;
    case 1:
        b = "left";
        break;
    case 2:
        b = "right"
    }
    return b
};
primitives.common.Graphics.prototype._getVerticalAlignment = function (a) {
    var b = null;
    switch (a) {
    case 1:
        b = "middle";
        break;
    case 0:
        b = "top";
        break;
    case 2:
        b = "bottom"
    }
    return b
};
primitives.common.Graphics.prototype.polylinesBuffer = function (a) {
    var a = a.getPolylines(),
        b, c, d, e;
    d = 0;
    for (e = a.length; d < e; d += 1) b = a[d], 0 < b.segments.length && (c = b.paletteItem.toAttr(), this.polyline(b.segments, c))
};
primitives.common.Graphics.prototype.polyline = function (a, b) {
    var c = null,
        d = null,
        e, f;
    for (e = 0; e < a.length; e += 1) switch (f = a[e], f.segmentType) {
    case 1:
        c = Math.round(f.x) + 0.5;
        d = Math.round(f.y) + 0.5;
        break;
    case 0:
        this.rightAngleLine(c, d, Math.round(f.x) + 0.5, Math.round(f.y) + 0.5, b);
        c = Math.round(f.x) + 0.5;
        d = Math.round(f.y) + 0.5;
        break;
    case 4:
        this.dot(f.x, f.y, f.width, f.height, f.cornerRadius, b)
    }
};
primitives.common.Graphics.prototype.dot = function (a, b, c, d, e, f) {
    var g = this.m_activePlaceholder,
        h = this.m_cache.get(g.name, g.activeLayer.name, "dot"),
        j = void 0 !== f.lineWidth && void 0 !== f.borderColor,
        a = {
            position: "absolute",
            width: c - (j ? 1 : 0),
            top: Math.round(b),
            left: Math.round(a),
            padding: 0,
            margin: 0,
            "line-height": "0px",
            overflow: "hidden",
            height: d - (j ? 1 : 0),
            background: f.fillColor,
            "-moz-border-radius": e,
            "-webkit-border-radius": e,
            "-khtml-border-radius": e,
            "border-radius": e,
            "font-size": "0px",
            "border-style": j ? "Solid" : "None",
            "border-width": j ? "1px" : "0px",
            "border-color": j ? f.borderColor : ""
        };
    null === h ? (h = jQuery("<div></div>"), primitives.common.css(h, a), g.activeLayer.canvas.append(h), this.m_cache.put(g.name, g.activeLayer.name, "dot", h)) : primitives.common.css(h, a)
};
primitives.common.Graphics.prototype.rightAngleLine = function (a, b, c, d, e) {
    var f = this.m_activePlaceholder,
        g = Math.abs(d - b) > Math.abs(c - a),
        h = e.lineWidth,
        e = {
            position: "absolute",
            top: Math.round(Math.min(b, d) - (g ? 0 : h / 2)),
            left: Math.round(Math.min(a, c) - (g ? h / 2 : 0)),
            padding: 0,
            margin: 0,
            opacity: 0.5,
            "line-height": "0px",
            overflow: "hidden",
            background: e.borderColor,
            "font-size": "0px"
        };
    g ? (e.width = h, e.height = Math.abs(Math.round(d - b))) : (e.width = Math.abs(Math.round(c - a)), e.height = h);
    a = this.m_cache.get(f.name, f.activeLayer.name,
        "rect");
    null === a ? (a = jQuery("<div></div>"), primitives.common.css(a, e), f.activeLayer.canvas.append(a), this.m_cache.put(f.name, f.activeLayer.name, "rect", a)) : primitives.common.css(a, e)
};
primitives.common.Graphics.prototype.template = function (a, b, c, d, e, f, g, h, j, i, k, l, m) {
    var c = this.m_activePlaceholder,
        d = "template" + (null !== i ? i : primitives.common.hashCode(j)),
        n = 0,
        i = this.m_cache.get(c.name, c.activeLayer.name, d);
    null !== m && void 0 !== m["border-width"] && (n = this.boxModel ? this.getPxSize(m["border-width"]) : 0);
    a = {
        width: g - n + "px",
        height: h - n + "px",
        top: b + f + "px",
        left: a + e + "px"
    };
    jQuery.extend(a, m);
    null == l && (l = new primitives.common.RenderEventArgs);
    null == i ? (i = jQuery(j), jQuery.extend(a, {
        position: "absolute",
        padding: "0px",
        margin: "0px"
    }, m), primitives.common.css(i, a), l.element = i, l.renderingMode = 0, null !== k && this.m_widget._trigger(k, null, l), c.activeLayer.canvas.append(i), this.m_cache.put(c.name, c.activeLayer.name, d, i)) : (l.element = i, l.renderingMode = 1, primitives.common.css(i, a), null !== k && this.m_widget._trigger(k, null, l));
    return i
};
primitives.common.Graphics.prototype.getPxSize = function (a, b) {
    var c = a;
    "string" === typeof a && (c = 0 < a.indexOf("pt") ? 96 * parseInt(a, 10) / 72 : 0 < a.indexOf("%") ? parseFloat(a) / 100 * b : parseInt(a, 10));
    return c
};
primitives.common.Graphics.prototype.polylineLength = function (a) {
    var b = 0,
        c, d, e, f = null;
    c = 0;
    for (d = a.length; c < d; c += 1) {
        e = a[c];
        switch (e.segmentType) {
        case 0:
            b += f.distanceTo(e.x, e.y)
        }
        f = e
    }
    return b
};
primitives.common.Cache = function () {
    this.threshold = 20;
    this.m_visible = {};
    this.m_invisible = {}
};
primitives.common.Cache.prototype.begin = function () {
    var a, b, c, d;
    for (a in this.m_visible)
        if (this.m_visible.hasOwnProperty(a))
            for (b in this.m_visible[a])
                if (this.m_visible[a].hasOwnProperty(b)) {
                    for (c = this.m_visible[a][b].length - 1; 0 <= c; c -= 1) d = this.m_visible[a][b][c], d.css({
                        visibility: "hidden"
                    }), this.m_invisible[a][b].push(d);
                    this.m_visible[a][b].length = 0
                }
};
primitives.common.Cache.prototype.end = function () {
    var a, b, c;
    for (a in this.m_visible)
        if (this.m_visible.hasOwnProperty(a))
            for (b in this.m_visible[a])
                if (this.m_visible[a].hasOwnProperty(b) && this.m_invisible[a][b].length > this.threshold)
                    for (; void 0 !== (c = this.m_invisible[a][b].pop());) c.remove()
};
primitives.common.Cache.prototype.reset = function (a, b) {
    var a = a + "-" + b,
        c = null,
        d, e;
    for (d in this.m_visible[a])
        if (this.m_visible[a].hasOwnProperty(d)) {
            for (e = this.m_visible[a][d].length - 1; 0 <= e; e -= 1) c = this.m_visible[a][d][e], this.m_invisible[a][d].push(c), c.css({
                visibility: "hidden"
            });
            this.m_visible[a][d].length = 0
        }
};
primitives.common.Cache.prototype.clear = function () {
    var a, b, c;
    for (a in this.m_visible)
        if (this.m_visible.hasOwnProperty(a))
            for (b in this.m_visible[a])
                if (this.m_visible[a].hasOwnProperty(b)) {
                    for (; void 0 !== (c = this.m_visible[a][b].pop());) c.remove();
                    for (; void 0 !== (c = this.m_invisible[a][b].pop());) c.remove()
                }
};
primitives.common.Cache.prototype.get = function (a, b, c) {
    a = a + "-" + b;
    b = null;
    void 0 === this.m_visible[a] && (this.m_visible[a] = {}, this.m_invisible[a] = {});
    void 0 === this.m_visible[a][c] && (this.m_visible[a][c] = [], this.m_invisible[a][c] = []);
    b = this.m_invisible[a][c].pop() || null;
    null !== b && (this.m_visible[a][c].push(b), b.css({
        visibility: "inherit"
    }));
    return b
};
primitives.common.Cache.prototype.put = function (a, b, c, d) {
    this.m_visible[a + "-" + b][c].push(d)
};
primitives.common.CanvasGraphics = function (a) {
    this.parent = primitives.common.Graphics.prototype;
    this.parent.constructor.apply(this, arguments);
    this.graphicsType = 1;
    this.m_maximum = 6E3
};
primitives.common.CanvasGraphics.prototype = new primitives.common.Graphics;
primitives.common.CanvasGraphics.prototype.clean = function () {
    var a, b, c, d;
    for (a in this.m_placeholders)
        if (this.m_placeholders.hasOwnProperty(a))
            for (c in b = this.m_placeholders[a], b.layers) b.layers.hasOwnProperty(c) && (d = b.layers[c], null !== d.canvascanvas && (d.canvascanvas.remove(), d.canvascanvas = null));
    this.parent.clean.apply(this, arguments)
};
primitives.common.CanvasGraphics.prototype._activatePlaceholder = function (a) {
    var b, c, d;
    this.parent._activatePlaceholder.apply(this, arguments);
    b = this.m_activePlaceholder;
    c = b.size.width;
    d = b.size.height;
    b.hasGraphics = c > this.m_maximum || d > this.m_maximum ? !1 : !0
};
primitives.common.CanvasGraphics.prototype.resizePlaceholder = function (a, b, c) {
    var d, e;
    this.parent.resizePlaceholder.apply(this, arguments);
    for (d in a.layers) a.layers.hasOwnProperty(d) && (e = a.layers[d], null !== e.canvascanvas && (e.canvascanvas.css({
        position: "absolute",
        width: b + "px",
        height: c + "px"
    }), e.canvascanvas.attr({
        width: b + "px",
        height: c + "px"
    })))
};
primitives.common.CanvasGraphics.prototype.begin = function () {
    var a, b, c, d, e, f;
    this.parent.begin.apply(this);
    for (a in this.m_placeholders)
        if (this.m_placeholders.hasOwnProperty(a))
            for (c in b = this.m_placeholders[a], e = b.size.width, f = b.size.height, b.layers) b.layers.hasOwnProperty(c) && (d = b.layers[c], null !== d.canvascanvas && d.canvascontext.clearRect(0, 0, e, f))
};
primitives.common.Graphics.prototype._getContext = function (a, b) {
    var c = a.size.width,
        d = a.size.height;
    null === b.canvascanvas && (b.canvascanvas = jQuery("<canvas></canvas>"), b.canvascanvas.attr({
        width: c + "px",
        height: d + "px"
    }), a.activeLayer.canvas.prepend(b.canvascanvas), b.canvascontext = b.canvascanvas[0].getContext("2d"));
    return b.canvascontext
};
primitives.common.CanvasGraphics.prototype.reset = function (a, b) {
    var c = "none",
        d = -1,
        e, f;
    switch (arguments.length) {
    case 1:
        "string" === typeof a ? c = a : d = a;
        break;
    case 2:
        c = a, d = b
    }
    this.parent.reset.apply(this, arguments);
    e = this.m_placeholders[c];
    void 0 !== e && (c = e.size.width, f = e.size.height, d = e.layers[d], void 0 !== d && null !== d.canvascanvas && d.canvascontext.clearRect(0, 0, c, f))
};
primitives.common.CanvasGraphics.prototype.polyline = function (a, b) {
    var c = this.m_activePlaceholder,
        d, e, f;
    if (c.hasGraphics) {
        d = c.activeLayer;
        c = this._getContext(c, d);
        c.save();
        void 0 !== b.lineWidth && void 0 !== b.borderColor ? (c.strokeStyle = b.borderColor, c.lineWidth = b.lineWidth) : (c.lineWidth = 0, c.strokeStyle = "Transparent");
        if (null != b.lineType) {
            d = Math.round(b.lineWidth) || 1;
            switch (b.lineType) {
            case 0:
                e = [];
                break;
            case 1:
                e = [d, d];
                break;
            case 2:
                e = [5 * d, 3 * d]
            }
            void 0 !== c.setLineDash ? c.setLineDash(e) : void 0 !== c.webkitLineDash ?
                c.webkitLineDash = e : void 0 !== c.mozDash && (c.mozDash = e)
        }
        c.beginPath();
        for (e = 0; e < a.length; e += 1) switch (d = a[e], d.segmentType) {
        case 1:
            c.moveTo(Math.round(d.x) + 0.5, Math.round(d.y) + 0.5);
            break;
        case 0:
            c.lineTo(Math.round(d.x) + 0.5, Math.round(d.y) + 0.5);
            break;
        case 4:
            d.width == d.height && d.width / 2 <= d.cornerRadius ? (c.moveTo(Math.round(d.x) + d.width + 0.5, Math.round(d.y) + d.height / 2 + 0.5), c.arc(Math.round(d.x) + d.width / 2 + 0.5, Math.round(d.y) + d.height / 2 + 0.5, Math.round(d.width / 2), 0, 2 * Math.PI, !1)) : 0 == d.cornerRadius ? (c.moveTo(Math.round(d.x) +
                0.5, Math.round(d.y) + 0.5), c.lineTo(Math.round(d.x + d.width) + 0.5, Math.round(d.y) + 0.5), c.lineTo(Math.round(d.x + d.width) + 0.5, Math.round(d.y + d.height) + 0.5), c.lineTo(Math.round(d.x) + 0.5, Math.round(d.y + d.height) + 0.5), c.lineTo(Math.round(d.x) + 0.5, Math.round(d.y) + 0.5)) : (f = Math.min(d.cornerRadius, Math.min(d.width / 2, d.height / 2)), c.moveTo(Math.round(d.x) + 0.5, Math.round(d.y + f) + 0.5), c.arc(Math.round(d.x + f) + 0.5, Math.round(d.y + f) + 0.5, Math.round(f), Math.PI, -Math.PI / 2, !1), c.lineTo(Math.round(d.x + d.width - f) + 0.5, Math.round(d.y) +
                0.5), c.arc(Math.round(d.x + d.width - f) + 0.5, Math.round(d.y + f) + 0.5, Math.round(f), -Math.PI / 2, 0, !1), c.lineTo(Math.round(d.x + d.width) + 0.5, Math.round(d.y + d.height - f) + 0.5), c.arc(Math.round(d.x + d.width - f) + 0.5, Math.round(d.y + d.height - f) + 0.5, Math.round(f), 0, Math.PI / 2, !1), c.lineTo(Math.round(d.x + f) + 0.5, Math.round(d.y + d.height) + 0.5), c.arc(Math.round(d.x + f) + 0.5, Math.round(d.y + d.height - f) + 0.5, Math.round(f), Math.PI / 2, Math.PI, !1), c.lineTo(Math.round(d.x) + 0.5, Math.round(d.y + f) + 0.5));
            break;
        case 2:
            c.quadraticCurveTo(Math.round(d.cpX) +
                0.5, Math.round(d.cpY) + 0.5, Math.round(d.x) + 0.5, Math.round(d.y) + 0.5);
            break;
        case 3:
            c.bezierCurveTo(Math.round(d.cpX1) + 0.5, Math.round(d.cpY1) + 0.5, Math.round(d.cpX2) + 0.5, Math.round(d.cpY2) + 0.5, Math.round(d.x) + 0.5, Math.round(d.y) + 0.5)
        }
        void 0 !== b.lineWidth && c.stroke();
        void 0 !== b.fillColor && (c.fillStyle = b.fillColor, c.globalAlpha = b.opacity, c.fill());
        c.restore()
    } else this.parent.polyline.apply(this, arguments)
};
primitives.common.Element = function (a, b) {
    this.name = this.ns = null;
    this.attr = {};
    this.style = {};
    this.children = [];
    switch (arguments.length) {
    case 1:
        this.name = a;
        break;
    case 2:
        this.ns = a, this.name = b
    }
};
primitives.common.Element.prototype.setAttribute = function (a, b) {
    this.attr[a] = b
};
primitives.common.Element.prototype.appendChild = function (a) {
    this.children[this.children.length] = a
};
primitives.common.Element.prototype.create = function (a) {
    var b = null,
        c, d, b = null !== this.ns ? document.createElementNS(this.ns, this.name) : document.createElement(this.name);
    for (c in this.attr) this.attr.hasOwnProperty(c) && (void 0 !== a ? b[c] = this.attr[c] : b.setAttribute(c, this.attr[c]));
    for (c in this.style) this.style.hasOwnProperty(c) && (b.style[c] = this.style[c]);
    for (d = 0; d < this.children.length; d += 1) c = this.children[d], "string" === typeof c ? b.appendChild(document.createTextNode(c)) : b.appendChild(c.create(a));
    return b
};
primitives.common.Element.prototype.update = function (a, b) {
    var c, d, e;
    for (c in this.style) this.style.hasOwnProperty(c) && (d = this.style[c], a.style[c] !== d && (a.style[c] = d));
    for (c in this.attr) this.attr.hasOwnProperty(c) && (d = this.attr[c], void 0 !== b ? a[c] !== d && (a[c] = d) : a.getAttribute(c) !== d && a.setAttribute(c, d));
    c = this.children.length;
    for (d = 0; d < c; d += 1) e = this.children[d], "string" === typeof e ? a.innerHtml !== e && (a.innerHtml = e) : this.children[d].update(a.children[d], b)
};
primitives.common.Layer = function (a) {
    this.name = a;
    this.svgcanvas = this.canvascanvas = this.canvas = null
};
primitives.common.Placeholder = function (a) {
    this.name = a;
    this.layers = {};
    this.div = this.rect = this.size = this.activeLayer = null;
    this.hasGraphics = !0
};
primitives.common.SvgGraphics = function (a) {
    this.parent = primitives.common.Graphics.prototype;
    this.parent.constructor.apply(this, arguments);
    this._svgxmlns = "http://www.w3.org/2000/svg";
    this.graphicsType = 0;
    this.hasGraphics = !0
};
primitives.common.SvgGraphics.prototype = new primitives.common.Graphics;
primitives.common.SvgGraphics.prototype.clean = function () {
    var a, b, c, d;
    for (a in this.m_placeholders)
        if (this.m_placeholders.hasOwnProperty(a))
            for (c in b = this.m_placeholders[a], b.layers) b.layers.hasOwnProperty(c) && (d = b.layers[c], null !== d.svgcanvas && (d.svgcanvas.remove(), d.svgcanvas = null));
    this.parent.clean.apply(this, arguments)
};
primitives.common.SvgGraphics.prototype.resizePlaceholder = function (a, b, c) {
    var d, e, f;
    this.parent.resizePlaceholder.apply(this, arguments);
    for (d in a.layers) a.layers.hasOwnProperty(d) && (e = a.layers[d], null !== e.svgcanvas && (f = {
        position: "absolute",
        width: b + "px",
        height: c + "px"
    }, e.svgcanvas.css(f), e.svgcanvas.attr({
        viewBox: "0 0 " + b + " " + c
    })))
};
primitives.common.SvgGraphics.prototype._getCanvas = function () {
    var a = this.m_activePlaceholder,
        b = a.activeLayer,
        c = a.rect;
    null === b.svgcanvas && (b.svgcanvas = jQuery('<svg version = "1.1"></svg>'), b.svgcanvas.attr({
        viewBox: c.x + " " + c.y + " " + c.width + " " + c.height
    }), b.svgcanvas.css({
        width: c.width + "px",
        height: c.height + "px"
    }), a.activeLayer.canvas.prepend(b.svgcanvas));
    return b.svgcanvas
};
primitives.common.SvgGraphics.prototype.polyline = function (a, b) {
    var c = this.m_activePlaceholder,
        d, e, f, g, h;
    d = new primitives.common.Element(this._svgxmlns, "path");
    void 0 !== b.fillColor ? (d.setAttribute("fill", b.fillColor), d.setAttribute("fill-opacity", b.opacity)) : d.setAttribute("fill-opacity", 0);
    void 0 !== b.lineWidth && void 0 !== b.borderColor ? (d.setAttribute("stroke", b.borderColor), d.setAttribute("stroke-width", b.lineWidth)) : (d.setAttribute("stroke", "transparent"), d.setAttribute("stroke-width", 0));
    if (null !=
        b.lineType) switch (e = Math.round(b.lineWidth) || 1, b.lineType) {
    case 0:
        d.setAttribute("stroke-dasharray", "");
        break;
    case 1:
        d.setAttribute("stroke-dasharray", e + "," + e);
        break;
    case 2:
        d.setAttribute("stroke-dasharray", 5 * e + "," + 3 * e)
    }
    e = "";
    for (f = 0; f < a.length; f += 1) switch (g = a[f], g.segmentType) {
    case 1:
        e += "M" + (Math.round(g.x) + 0.5) + " " + (Math.round(g.y) + 0.5);
        break;
    case 0:
        e += "L" + (Math.round(g.x) + 0.5) + " " + (Math.round(g.y) + 0.5);
        break;
    case 2:
        e += "Q" + (Math.round(g.cpX) + 0.5) + " " + (Math.round(g.cpY) + 0.5) + " " + (Math.round(g.x) +
            0.5) + " " + (Math.round(g.y) + 0.5);
        break;
    case 4:
        g.width == g.height && g.width / 2 <= g.cornerRadius ? (h = g.width / 2, e += "M" + (Math.round(g.x) + 0.5) + " " + (Math.round(g.y) + g.height / 2 + 0.5), e += "A" + h + " " + h + " 0 0 0 " + (Math.round(g.x + g.width) + 0.5) + " " + (Math.round(g.y) + g.height / 2 + 0.5), e += "A" + h + " " + h + " 0 0 0 " + (Math.round(g.x) + 0.5) + " " + (Math.round(g.y) + g.height / 2 + 0.5)) : 0 == g.cornerRadius ? (e += "M" + (Math.round(g.x) + 0.5) + " " + (Math.round(g.y) + 0.5), e += "L" + (Math.round(g.x + g.width) + 0.5) + " " + (Math.round(g.y) + 0.5), e += "L" + (Math.round(g.x +
            g.width) + 0.5) + " " + (Math.round(g.y + g.height) + 0.5), e += "L" + (Math.round(g.x) + 0.5) + " " + (Math.round(g.y + g.height) + 0.5), e += "L" + (Math.round(g.x) + 0.5) + " " + (Math.round(g.y) + 0.5)) : (h = Math.min(g.cornerRadius, Math.min(g.width / 2, g.height / 2)), e += "M" + (Math.round(g.x) + 0.5) + " " + (Math.round(g.y + h) + 0.5), e += "A" + Math.round(h) + " " + Math.round(h) + " 0 0 1 " + (Math.round(g.x + h) + 0.5) + " " + (Math.round(g.y) + 0.5), e += "L" + (Math.round(g.x + g.width - h) + 0.5) + " " + (Math.round(g.y) + 0.5), e += "A" + Math.round(h) + " " + Math.round(h) + " 0 0 1 " + (Math.round(g.x +
            g.width) + 0.5) + " " + (Math.round(g.y + h) + 0.5), e += "L" + (Math.round(g.x + g.width) + 0.5) + " " + (Math.round(g.y + g.height - h) + 0.5), e += "A" + Math.round(h) + " " + Math.round(h) + " 0 0 1 " + (Math.round(g.x + g.width - h) + 0.5) + " " + (Math.round(g.y + g.height) + 0.5), e += "L" + (Math.round(g.x + h) + 0.5) + " " + (Math.round(g.y + g.height) + 0.5), e += "A" + Math.round(h) + " " + Math.round(h) + " 0 0 1 " + (Math.round(g.x) + 0.5) + " " + (Math.round(g.y + g.height - h) + 0.5), e += "L" + (Math.round(g.x) + 0.5) + " " + (Math.round(g.y + h) + 0.5));
        break;
    case 3:
        e += "C" + (Math.round(g.cpX1) +
            0.5) + " " + (Math.round(g.cpY1) + 0.5) + " " + (Math.round(g.cpX2) + 0.5) + " " + (Math.round(g.cpY2) + 0.5) + " " + (Math.round(g.x) + 0.5) + " " + (Math.round(g.y) + 0.5)
    }
    d.setAttribute("d", e);
    e = this.m_cache.get(c.name, c.activeLayer.name, "path");
    null === e ? (e = jQuery(d.create()), d = this._getCanvas(), d.append(e), this.m_cache.put(c.name, c.activeLayer.name, "path", e)) : d.update(e[0])
};
primitives.common.Transform = function () {
    this.invertVertically = this.invertHorizontally = this.invertArea = !1;
    this.size = null
};
primitives.common.Transform.prototype.setOrientation = function (a) {
    switch (a) {
    case 0:
        this.invertVertically = this.invertHorizontally = this.invertArea = !1;
        break;
    case 1:
        this.invertHorizontally = this.invertArea = !1;
        this.invertVertically = !0;
        break;
    case 2:
        this.invertArea = !0;
        this.invertVertically = this.invertHorizontally = !1;
        break;
    case 3:
        this.invertHorizontally = this.invertArea = !0, this.invertVertically = !1
    }
};
primitives.common.Transform.prototype.getOrientation = function (a) {
    var b = a;
    if (this.invertHorizontally) switch (a) {
    case 2:
        b = 3;
        break;
    case 3:
        b = 2
    }
    if (this.invertVertically) switch (a) {
    case 0:
        b = 1;
        break;
    case 1:
        b = 0
    }
    if (this.invertArea) switch (b) {
    case 0:
        b = 2;
        break;
    case 1:
        b = 3;
        break;
    case 2:
        b = 0;
        break;
    case 3:
        b = 1
    }
    return b
};
primitives.common.Transform.prototype.transformPoint = function (a, b, c, d, e) {
    var f;
    c && this.invertArea && (f = a, a = b, b = f);
    this.invertHorizontally && (a = this.size.width - a);
    this.invertVertically && (b = this.size.height - b);
    !c && this.invertArea && (f = a, a = b, b = f);
    e.call(d, a, b)
};
primitives.common.Transform.prototype.transformPoints = function (a, b, c, d, e, f, g) {
    var h;
    e && this.invertArea && (h = a, a = b, b = h, h = c, c = d, d = h);
    this.invertHorizontally && (a = this.size.width - a, c = this.size.width - c);
    this.invertVertically && (b = this.size.height - b, d = this.size.height - d);
    !e && this.invertArea && (h = a, a = b, b = h, h = c, c = d, d = h);
    g.call(f, a, b, c, d)
};
primitives.common.Transform.prototype.transform3Points = function (a, b, c, d, e, f, g, h, j) {
    var i;
    g && this.invertArea && (i = a, a = b, b = i, i = c, c = d, d = i, i = e, e = f, f = i);
    this.invertHorizontally && (a = this.size.width - a, c = this.size.width - c, e = this.size.width - e);
    this.invertVertically && (b = this.size.height - b, d = this.size.height - d, f = this.size.height - f);
    !g && this.invertArea && (i = a, a = b, b = i, i = c, c = d, d = i, i = e, e = f, f = i);
    j.call(h, a, b, c, d, e, f)
};
primitives.common.Transform.prototype.transformRect = function (a, b, c, d, e, f, g) {
    var h;
    e && this.invertArea && (h = a, a = b, b = h, h = c, c = d, d = h);
    this.invertHorizontally && (a = this.size.width - a - c);
    this.invertVertically && (b = this.size.height - b - d);
    !e && this.invertArea && (h = a, a = b, b = h, h = c, c = d, d = h);
    g.call(f, a, b, c, d)
};
primitives.common.VmlGraphics = function (a) {
    var b, c, d;
    this.parent = primitives.common.Graphics.prototype;
    this.parent.constructor.apply(this, arguments);
    this.prefix = "rvml";
    this.ie8mode = document.documentMode && 8 <= document.documentMode;
    try {
        eval("document.namespaces")
    } catch (e) {}
    document.namespaces[this.prefix] || document.namespaces.add(this.prefix, "urn:schemas-microsoft-com:vml");
    if (!primitives.common.VmlGraphics.prototype.vmlStyle) {
        b = primitives.common.VmlGraphics.prototype.vmlStyle = document.createStyleSheet();
        c = " *;fill;shape;path;textpath;stroke".split(";");
        for (d = 0; d < c.length; d += 1) b.addRule(this.prefix + "\\:" + c[d], "behavior:url(#default#VML); position:absolute;")
    }
    this.graphicsType = 2;
    this.hasGraphics = !0
};
primitives.common.VmlGraphics.prototype = new primitives.common.Graphics;
primitives.common.VmlGraphics.prototype.text = function (a, b, c, d, e, f, g, h, j) {
    var i, k, l;
    switch (f) {
    case 0:
    case 3:
        this.parent.text.call(this, a, b, c, d, e, f, g, h, j);
        break;
    default:
        i = this.m_activePlaceholder;
        f = 1 === f;
        a = new primitives.common.Rect(a, b, c, d);
        d = new primitives.common.Rect(0, 0, 10 * c, 10 * d);
        c = new primitives.common.Element(this.prefix + ":shape");
        c.setAttribute("CoordSize", d.width + "," + d.height);
        c.setAttribute("filled", !0);
        c.setAttribute("stroked", !1);
        c.setAttribute("fillcolor", j["font-color"]);
        c.style.top = a.y +
            "px";
        c.style.left = a.x + "px";
        c.style.width = a.width + "px";
        c.style.height = a.height + "px";
        c.style["font-family"] = j["font-family"];
        a = new primitives.common.Element(this.prefix + ":path");
        a.setAttribute("TextPathOk", !0);
        b = 16 * Math.floor(this.getPxSize(j["font-size"])) * Math.max(e.split("\n").length - 1, 1);
        l = k = null;
        if (f) switch (h) {
        case 0:
            k = new primitives.common.Point(d.x + b / 2, d.bottom());
            l = new primitives.common.Point(d.x + b / 2, d.y);
            break;
        case 1:
            k = new primitives.common.Point(d.horizontalCenter(), d.bottom());
            l = new primitives.common.Point(d.horizontalCenter(),
                d.y);
            break;
        case 2:
            k = new primitives.common.Point(d.right() - b / 2, d.bottom()), l = new primitives.common.Point(d.right() - b / 2, d.y)
        } else switch (h) {
        case 0:
            k = new primitives.common.Point(d.right() - b / 2, d.y);
            l = new primitives.common.Point(d.right() - b / 2, d.bottom());
            break;
        case 1:
            k = new primitives.common.Point(d.horizontalCenter(), d.y);
            l = new primitives.common.Point(d.horizontalCenter(), d.bottom());
            break;
        case 2:
            k = new primitives.common.Point(d.x + b / 2, d.y), l = new primitives.common.Point(d.x + b / 2, d.bottom())
        }
        a.setAttribute("v",
            " m" + k.x + "," + k.y + " l" + l.x + "," + l.y + " e");
        h = new primitives.common.Element(this.prefix + ":textpath");
        h.setAttribute("on", !0);
        h.setAttribute("string", e);
        h.style.trim = !1;
        h.style["v-text-align"] = this._getTextAlign(g);
        h.style.font = "normal normal normal " + j["font-size"] + "pt " + j["font-family"];
        c.appendChild(a);
        c.appendChild(h);
        e = this.m_cache.get(i.name, i.activeLayer.name, "vmltext");
        null === e ? (e = jQuery(c.create(this.ie8mode)), i.activeLayer.canvas.append(e), this.m_cache.put(i.name, i.activeLayer.name, "vmltext",
            e)) : c.update(e[0], this.ie8mode)
    }
};
primitives.common.VmlGraphics.prototype.polyline = function (a, b) {
    var c = this.m_activePlaceholder,
        d = new primitives.common.Rect(c.rect),
        e = new primitives.common.Rect(0, 0, 10 * d.width, 10 * d.height),
        f = new primitives.common.Element(this.prefix + ":shape"),
        g, h, j, i, k;
    void 0 !== b.borderColor && void 0 !== b.lineWidth ? (f.setAttribute("strokecolor", b.borderColor), f.setAttribute("strokeweight", b.lineWidth), f.setAttribute("stroked", !0)) : f.setAttribute("stroked", !1);
    f.setAttribute("CoordSize", e.width + "," + e.height);
    f.style.top =
        d.y + "px";
    f.style.left = d.x + "px";
    f.style.width = d.width + "px";
    f.style.height = d.height + "px";
    d = "";
    for (e = 0; e < a.length; e += 1) switch (g = a[e], g.segmentType) {
    case 1:
        d += " m" + 10 * Math.round(g.x) + "," + 10 * Math.round(g.y);
        break;
    case 0:
        d += " l" + 10 * Math.round(g.x) + "," + 10 * Math.round(g.y);
        break;
    case 4:
        h = Math.round(g.x);
        j = Math.round(g.y);
        i = Math.round(g.x + g.width);
        g = Math.round(g.y + g.height);
        h > i && (k = h, h = i, i = k);
        j > g && (k = j, j = g, g = k);
        h = 10 * h + 5;
        j = 10 * j + 5;
        i = 10 * i - 5;
        g = 10 * g - 5;
        d += " m" + h + "," + j;
        d += " l" + i + "," + j;
        d += " l" + i + "," + g;
        d += " l" + h + "," +
            g;
        d += " l" + h + "," + j;
        break;
    case 2:
        d += " qb" + 10 * Math.round(g.cpX) + "," + 10 * Math.round(g.cpY) + " l" + 10 * Math.round(g.x) + "," + 10 * Math.round(g.y);
        break;
    case 3:
        d += " c" + 10 * Math.round(g.cpX1) + "," + 10 * Math.round(g.cpY1) + "," + 10 * Math.round(g.cpX2) + "," + 10 * Math.round(g.cpY2) + "," + 10 * Math.round(g.x) + "," + 10 * Math.round(g.y)
    }
    d += " e";
    e = "shapepath";
    h = new primitives.common.Element(this.prefix + ":path");
    h.setAttribute("v", d);
    f.appendChild(h);
    if (null != b.lineType) {
        d = new primitives.common.Element(this.prefix + ":stroke");
        switch (b.lineType) {
        case 0:
            d.setAttribute("dashstyle",
                "Solid");
            break;
        case 1:
            d.setAttribute("dashstyle", "ShortDot");
            break;
        case 2:
            d.setAttribute("dashstyle", "Dash")
        }
        f.appendChild(d);
        e += "stroke"
    }
    null !== b.fillColor ? (f.setAttribute("filled", !0), d = new primitives.common.Element(this.prefix + ":fill"), d.setAttribute("opacity", b.opacity), d.setAttribute("color", b.fillColor), f.appendChild(d), e += "fill") : f.setAttribute("filled", !1);
    d = this.m_cache.get(c.name, c.activeLayer.name, e);
    null === d ? (d = jQuery(f.create(this.ie8mode)), c.activeLayer.canvas.append(d), this.m_cache.put(c.name,
        c.activeLayer.name, e, d)) : f.update(d[0], this.ie8mode)
};
primitives.text.Config = function () {
    this.classPrefix = "bptext";
    this.graphicsType = 0;
    this.actualGraphicsType = null;
    this.orientation = 0;
    this.text = "";
    this.verticalAlignment = 1;
    this.horizontalAlignment = 0;
    this.fontSize = "16px";
    this.fontFamily = "Arial";
    this.color = "#000000";
    this.fontStyle = this.fontWeight = "normal"
};
primitives.text.Controller = function () {
    this.widgetEventPrefix = "bptext";
    this.options = new primitives.text.Config;
    this.m_graphics = this.m_panelSize = this.m_placeholder = null
};
primitives.text.Controller.prototype._create = function () {
    this.element.addClass("ui-widget");
    this._createLayout();
    this._redraw()
};
primitives.text.Controller.prototype.destroy = function () {
    this._cleanLayout()
};
primitives.text.Controller.prototype._createLayout = function () {
    this.m_panelSize = new primitives.common.Rect(0, 0, this.element.outerWidth(), this.element.outerHeight());
    this.m_placeholder = jQuery("<div></div>");
    this.m_placeholder.css({
        position: "relative",
        overflow: "hidden",
        top: "0px",
        left: "0px",
        padding: "0px",
        margin: "0px"
    });
    this.m_placeholder.css(this.m_panelSize.getCSS());
    this.m_placeholder.addClass("placeholder");
    this.m_placeholder.addClass(this.widgetEventPrefix);
    this.element.append(this.m_placeholder);
    this.m_graphics = primitives.common.createGraphics(this.options.graphicsType, this);
    this.options.actualGraphicsType = this.m_graphics.graphicsType
};
primitives.text.Controller.prototype._cleanLayout = function () {
    null !== this.m_graphics && this.m_graphics.clean();
    this.m_graphics = null;
    this.element.find("." + this.widgetEventPrefix).remove()
};
primitives.text.Controller.prototype._updateLayout = function () {
    this.m_panelSize = new primitives.common.Rect(0, 0, this.element.innerWidth(), this.element.innerHeight());
    this.m_placeholder.css(this.m_panelSize.getCSS())
};
primitives.text.Controller.prototype.update = function (a) {
    a ? (this._cleanLayout(), this._createLayout(), this._redraw()) : (this._updateLayout(), this.m_graphics.resize("placeholder", this.m_panelSize.width, this.m_panelSize.height), this.m_graphics.begin(), this._redraw(), this.m_graphics.end())
};
primitives.text.Controller.prototype._redraw = function () {
    var a = this.m_graphics.activate("placeholder");
    this.m_graphics.text(a.rect.x, a.rect.y, a.rect.width, a.rect.height, this.options.text, this.options.orientation, this.options.horizontalAlignment, this.options.verticalAlignment, {
        "font-size": this.options.fontSize,
        "font-family": this.options.fontFamily,
        "font-style": this.options.fontStyle,
        "font-weight": this.options.fontWeight,
        "font-color": this.options.color
    })
};
primitives.text.Controller.prototype._setOption = function (a, b) {
    jQuery.Widget.prototype._setOption.apply(this, arguments);
    switch (a) {
    case "disabled":
        var c = jQuery([]);
        b ? (c.filter(".ui-state-focus").blur(), c.removeClass("ui-state-hover"), c.propAttr("disabled", !0), this.element.addClass("ui-disabled")) : (c.propAttr("disabled", !1), this.element.removeClass("ui-disabled"))
    }
};
(function (a) {
    a.widget("ui.bpText", new primitives.text.Controller)
})(jQuery);
primitives.orgdiagram.BaseController = function () {
    this._orgTree = this._configs = this.transform = this.graphics = null;
    this._orgPartners = {};
    this._visualTree = primitives.common.tree();
    this._treeItemCounter = 0;
    this._treeItemsByUserId = {};
    this._treeLevels = [];
    this._leftMargins = {};
    this._rightMargins = {};
    this._templates = {};
    this.m_scrollPanel = this._highlightTreeItem = this._cursorTreeItem = this._printPreviewTemplateHashCode = this._printPreviewTemplate = this._annotationLabelTemplateHashCode = this._annotationLabelTemplate = this._groupTitleTemplateHashCode =
        this._groupTitleTemplate = this._buttonsTemplateHashCode = this._buttonsTemplate = this._checkBoxTemplateHashCode = this._checkBoxTemplate = this._defaultTemplate = null;
    this.m_scrollPanelRect = new primitives.common.Rect(0, 0, 0, 0);
    this.m_placeholder = null;
    this.m_placeholderRect = new primitives.common.Rect(0, 0, 0, 0);
    this.m_calloutShape = this.m_calloutPlaceholder = null;
    this.boxModel = jQuery.support.boxModel;
    this._cancelMouseClick = !1;
    this._itemsInterval = [];
    this._scale = null;
    this.scale = 1;
    this._debug = this.showElbowDots = this.showInvisibleSubTrees = !1
};
primitives.orgdiagram.BaseController.prototype._create = function () {
    this.element.addClass("ui-widget");
    this._createLayout();
    this._virtualBind();
    this.transform = this.graphics = null;
    this._redraw()
};
primitives.orgdiagram.BaseController.prototype.destroy = function () {
    this._virtualUnbind();
    this._clean();
    this._cleanLayout()
};
primitives.orgdiagram.BaseController.prototype._clean = function () {
    null !== this.graphics && this.graphics.clean();
    this.transform = this.graphics = null
};
primitives.orgdiagram.BaseController.prototype._cleanLayout = function () {
    this.options.enablePanning && this._mouseDestroy();
    this.element.find("." + this.widgetEventPrefix).remove()
};
primitives.orgdiagram.BaseController.prototype._createLayout = function () {
    this.m_scrollPanelRect = new primitives.common.Rect(0, 0, this.element.outerWidth(), this.element.outerHeight());
    this.m_placeholderRect = new primitives.common.Rect(this.m_scrollPanelRect);
    var a = this.element.offset();
    this.m_scrollPanel = jQuery('<div tabindex="0"></div>');
    this.m_scrollPanel.css({
        position: "relative",
        overflow: "auto",
        top: "0px",
        left: "0px",
        width: this.m_scrollPanelRect.width + "px",
        height: this.m_scrollPanelRect.height + "px",
        padding: "0px",
        "margin-bottom": "0px",
        "margin-right": "0px",
        "margin-top": -a.top + Math.floor(a.top) + "px",
        "margin-left": -a.left + Math.floor(a.left) + "px",
        "-webkit-overflow-scrolling": "touch"
    });
    this.m_scrollPanel.addClass(this.widgetEventPrefix);
    this.m_placeholder = jQuery("<div></div>");
    this.m_placeholder.css({
        position: "absolute",
        overflow: "hidden",
        top: "0px",
        left: "0px"
    });
    this.m_placeholder.addClass("placeholder");
    this.m_placeholder.addClass(this.widgetEventPrefix);
    this.m_placeholder.css(this.m_placeholderRect.getCSS());
    this.m_scrollPanel.append(this.m_placeholder);
    this.m_calloutPlaceholder = jQuery("<div></div>");
    this.m_calloutPlaceholder.css({
        position: "absolute",
        overflow: "visible"
    });
    this.m_calloutPlaceholder.addClass("calloutplaceholder");
    this.m_calloutPlaceholder.addClass(this.widgetEventPrefix);
    this.m_calloutPlaceholder.css({
        top: "0px",
        left: "0px",
        width: "0px",
        height: "0px"
    });
    this.m_placeholder.append(this.m_calloutPlaceholder);
    this.element.append(this.m_scrollPanel);
    this.options.enablePanning && this._mouseInit(this.m_placeholder)
};
primitives.orgdiagram.BaseController.prototype._updateLayout = function () {
    var a = this.element.offset();
    this.m_scrollPanelRect = new primitives.common.Rect(0, 0, this.element.outerWidth(), this.element.outerHeight());
    this.m_scrollPanel.css({
        top: "0px",
        left: "0px",
        width: this.m_scrollPanelRect.width + "px",
        height: this.m_scrollPanelRect.height + "px",
        "margin-bottom": "0px",
        "margin-right": "0px",
        "margin-top": -a.top + Math.floor(a.top) + "px",
        "margin-left": -a.left + Math.floor(a.left) + "px"
    })
};
primitives.orgdiagram.BaseController.prototype._virtualBind = function () {
    var a = this;
    this.m_placeholder.mousemove(function (b) {
        a._onMouseMove(b)
    }).click(function (b) {
        a._onMouseClick(b)
    }).dblclick(function (b) {
        a._onMouseDblClick(b)
    });
    this.m_scrollPanel.keydown(function (b) {
        a._onKeyDown(b)
    });
    "ontouchstart" in document.documentElement && (this.m_scrollPanel[0].addEventListener("gesturestart", a.onGestureStartHandler = function (b) {
        a.onGestureStart(b)
    }, !1), this.m_scrollPanel[0].addEventListener("gesturechange", a.onGestureChangeHandler =
        function (b) {
            a.onGestureChange(b)
        }, !1));
    this.options.onDefaultTemplateRender = function (b, c) {
        a._onDefaultTemplateRender(b, c)
    };
    this.options.onCheckBoxTemplateRender = function (b, c) {
        a._onCheckBoxTemplateRender(b, c)
    };
    this.options.onGroupTitleTemplateRender = function (b, c) {
        a._onGroupTitleTemplateRender(b, c)
    };
    this.options.onButtonsTemplateRender = function (b, c) {
        a._onButtonsTemplateRender(b, c)
    };
    this.options.onAnnotationLabelTemplateRender = function (b, c) {
        a._onAnnotationLabelTemplateRender(b, c)
    }
};
primitives.orgdiagram.BaseController.prototype._virtualUnbind = function () {
    this.m_placeholder.unbind("mousemove");
    this.m_placeholder.unbind("click");
    this.m_placeholder.unbind("dblclick");
    this.m_scrollPanel.unbind("keydown");
    "ontouchstart" in document.documentElement && (this.m_scrollPanel[0].removeEventListener("gesturestart", this.onGestureStartHandler, !1), this.m_scrollPanel[0].removeEventListener("gesturechange", this.onGestureChangeHandler, !1));
    this.options.onDefaultTemplateRender = null;
    this.options.onCheckBoxTemplateRender =
        null;
    this.options.onGroupTitleTemplateRender = null;
    this.options.onButtonsTemplateRender = null;
    this.options.onAnnotationLabelTemplateRender = null
};
primitives.orgdiagram.BaseController.prototype.update = function (a) {
    switch (a) {
    case 2:
        this._redrawHighlight();
        break;
    case 1:
        this._refresh();
        break;
    default:
        this._redraw()
    }
};
primitives.orgdiagram.BaseController.prototype._mouseCapture = function (a) {
    this._dragStartPosition = new primitives.common.Point(this.m_scrollPanel.scrollLeft() + a.pageX, this.m_scrollPanel.scrollTop() + a.pageY);
    return !0
};
primitives.orgdiagram.BaseController.prototype._mouseDrag = function (a) {
    var b = new primitives.common.Point(a.pageX, a.pageY),
        a = -b.x + this._dragStartPosition.x,
        b = -b.y + this._dragStartPosition.y;
    this.m_scrollPanel.css("visibility", "hidden");
    this.m_scrollPanel.scrollLeft(a).scrollTop(b);
    this.m_scrollPanel.css("visibility", "inherit");
    return !1
};
primitives.orgdiagram.BaseController.prototype._mouseStop = function () {
    this._cancelMouseClick = !0
};
primitives.orgdiagram.BaseController.prototype._virtualGetEventArgs = function () {
    return null
};
primitives.orgdiagram.BaseController.prototype._onMouseMove = function (a) {
    var b = this.m_placeholder.offset(),
        c = a.pageX - b.left,
        b = a.pageY - b.top;
    this._mouseStarted || (this._cancelMouseClick = !1, c = this._getTreeItemForMousePosition(c, b), this._setHighlightItem(a, c))
};
primitives.orgdiagram.BaseController.prototype._onMouseClick = function (a) {
    var b = this._highlightTreeItem,
        c, d;
    null !== b && !this._cancelMouseClick && (c = jQuery(a.target), c.hasClass(this.widgetEventPrefix + "button") || 0 < c.parent("." + this.widgetEventPrefix + "button").length ? (c = c.hasClass(this.widgetEventPrefix + "button") ? c : c.parent("." + this.widgetEventPrefix + "button"), d = c.data("buttonname"), c = this._virtualGetEventArgs(null, b, d), this._trigger("onButtonClick", a, c)) : "selectiontext" !== c.attr("name") && ("checkbox" ===
        c.attr("name") ? (c = this._virtualGetEventArgs(null, b, d), this._trigger("onSelectionChanging", a, c), d = primitives.common.indexOf(this.options.selectedItems, b.itemConfig.id), 0 <= d ? this.options.selectedItems.splice(d, 1) : this.options.selectedItems.push(b.itemConfig.id), this._trigger("onSelectionChanged", a, c)) : (c = this._virtualGetEventArgs(null, b), this._trigger("onMouseClick", a, c), c.cancel || (this._setCursorItem(a, b), this.m_scrollPanel.focus()))));
    this._cancelMouseClick = !1
};
primitives.orgdiagram.BaseController.prototype._onMouseDblClick = function (a) {
    var b;
    null !== this._highlightTreeItem && !this._cancelMouseClick && (b = this._virtualGetEventArgs(null, this._highlightTreeItem), this._trigger("onMouseDblClick", a, b));
    this._cancelMouseClick = !1
};
primitives.orgdiagram.BaseController.prototype._setHighlightItem = function (a, b) {
    var c = !0,
        d;
    null !== b ? b.itemConfig.id !== this.options.highlightItem && (d = this._virtualGetEventArgs(this._highlightTreeItem, b), this._highlightTreeItem = b, this.options.highlightItem = b.itemConfig.id, this._trigger("onHighlightChanging", a, d), d.cancel ? c = !1 : (this._refreshHighlight(), this._trigger("onHighlightChanged", a, d))) : null !== this.options.highlightItem && (d = this._virtualGetEventArgs(this._highlightTreeItem, null), this._highlightTreeItem =
        null, this.options.highlightItem = null, this._trigger("onHighlightChanging", a, d), d.cancel ? c = !1 : (this._refreshHighlight(), this._trigger("onHighlightChanged", a, d)));
    return c
};
primitives.orgdiagram.BaseController.prototype._setCursorItem = function (a, b) {
    var c;
    b.itemConfig.id !== this.options.cursorItem && (c = this._virtualGetEventArgs(null != this.options.cursorItem ? this._treeItemsByUserId[this.options.cursorItem] : null, b), this.options.cursorItem = b.itemConfig.id, this._trigger("onCursorChanging", a, c), c.cancel || (this._refresh(), this._trigger("onCursorChanged", a, c)))
};
primitives.orgdiagram.BaseController.prototype._getNextLevelTreeItem = function (a, b) {
    var c = a.actualPosition.horizontalCenter(),
        d, e, f, g, h = null,
        j = null,
        i, k, l, m = b ? this._treeLevels.slice(a.level + 1, this._treeLevels.length) : this._treeLevels.slice(0, a.level).reverse();
    f = 0;
    for (g = m.length; f < g; f += 1) {
        k = m[f].treeItems;
        d = 0;
        for (e = k.length; d < e; d += 1)
            if (l = this._visualTree.node(k[d]), 1 == l.actualVisibility)
                if (i = Math.abs(c - l.actualPosition.horizontalCenter()), i < j || null == j) j = i, h = l;
                else break;
        if (null != j) break
    }
    return h
};
primitives.orgdiagram.BaseController.prototype._onKeyDown = function (a) {
    var b, c, d, e = null != this._highlightTreeItem ? this._highlightTreeItem : this._cursorTreeItem,
        f, g, h = null,
        j;
    if (null != e) {
        switch (a.which) {
        case 13:
            this._setCursorItem(a, e);
            a.preventDefault();
            this.m_scrollPanel.focus();
            break;
        case 40:
            h = 1;
            break;
        case 38:
            h = 0;
            break;
        case 37:
            h = 2;
            break;
        case 39:
            h = 3
        }
        if (null != h) {
            for (j = !1; !j;) {
                j = !0;
                h = this.transform.getOrientation(h);
                switch (h) {
                case 0:
                    g = this._getNextLevelTreeItem(e, !1);
                    break;
                case 1:
                    g = this._getNextLevelTreeItem(e, !0);
                    break;
                case 2:
                    b = this._treeLevels[e.level];
                    for (c = e.levelPosition - 1; 0 <= c; c -= 1)
                        if (f = this._visualTree.node(b.treeItems[c]), 1 == f.actualVisibility) {
                            g = f;
                            break
                        }
                    break;
                case 3:
                    b = this._treeLevels[e.level];
                    c = e.levelPosition + 1;
                    for (d = b.treeItems.length; c < d; c += 1)
                        if (f = this._visualTree.node(b.treeItems[c]), 1 == f.actualVisibility) {
                            g = f;
                            break
                        }
                }
                null != g && (a.preventDefault(), this._centerOnCursor(g, !1), (j = this._setHighlightItem(a, g)) || (e = g))
            }
            this.m_scrollPanel.focus()
        }
    }
};
primitives.orgdiagram.BaseController.prototype.onGestureStart = function (a) {
    this._scale = this.scale;
    a.preventDefault()
};
primitives.orgdiagram.BaseController.prototype.onGestureChange = function (a) {
    var b = Math.round(10 * this._scale * a.scale) / 10;
    b > this.options.maximumScale ? b = this.options.maximumScale : b < this.options.minimumScale && (b = this.options.minimumScale);
    this.scale = b;
    this._refresh();
    a.preventDefault()
};
primitives.orgdiagram.BaseController.prototype._updateScale = function () {
    var a = "scale(" + this.scale + "," + this.scale + ")";
    this.m_placeholder.css({
        "transform-origin": "0 0",
        transform: a,
        "-ms-transform": a,
        "-webkit-transform": a,
        "-o-transform": a,
        "-moz-transform": a
    })
};
primitives.orgdiagram.BaseController.prototype._redraw = function () {
    this._clean();
    this.graphics = primitives.common.createGraphics(this.options.graphicsType, this);
    this.graphics.debug = this._debug;
    this.transform = new primitives.common.Transform;
    this.options.actualGraphicsType = this.graphics.graphicsType;
    this.m_calloutShape = new primitives.common.Callout(this.graphics);
    this._virtualReadTemplates();
    this._createCheckBoxTemplate();
    this._createButtonsTemplate();
    this._createGroupTitleTemplate();
    this._createAnnotationLabelTemplate();
    this._createPrintPreviewTemplate();
    this._refresh()
};
primitives.orgdiagram.BaseController.prototype._refresh = function () {
    this._updateLayout();
    this.m_scrollPanel.css({
        display: "none",
        "-webkit-overflow-scrolling": "auto"
    });
    this._updateScale();
    this._setItemsIntervals();
    this._virtualCreateOrgTree();
    this._createVisualTree();
    this._positionTreeItems();
    this.graphics.resize("placeholder", this.m_placeholderRect.width, this.m_placeholderRect.height);
    this.transform.size = new primitives.common.Size(this.m_placeholderRect.width, this.m_placeholderRect.height);
    this.graphics.begin();
    this._redrawTreeItems();
    this._tracePathAnnotations();
    this._redrawConnectors();
    this._drawPrintPreview();
    this._drawAnnotations();
    this._drawHighlight();
    this._hideHighlightAnnotation();
    this._drawCursor();
    this.graphics.end();
    this.m_scrollPanel.css({
        display: "block"
    });
    this._centerOnCursor(this._cursorTreeItem, !0);
    this.m_scrollPanel.css({
        "-webkit-overflow-scrolling": "touch"
    })
};
primitives.orgdiagram.BaseController.prototype._setItemsIntervals = function () {
    this._itemsInterval[1] = this.options.normalItemsInterval;
    this._itemsInterval[2] = this.options.dotItemsInterval;
    this._itemsInterval[3] = this.options.lineItemsInterval;
    this._itemsInterval[4] = this.options.lineItemsInterval
};
primitives.orgdiagram.BaseController.prototype._redrawHighlight = function () {
    null != this._treeItemsByUserId[this.options.highlightItem] && (this._highlightTreeItem = this._treeItemsByUserId[this.options.highlightItem]);
    this._refreshHighlight()
};
primitives.orgdiagram.BaseController.prototype._refreshHighlight = function () {
    this.graphics.reset("placeholder", 3);
    this.graphics.reset("calloutplaceholder", 9);
    this._drawHighlight();
    this._drawHighlightAnnotation()
};
primitives.orgdiagram.BaseController.prototype._drawHighlight = function () {
    var a, b, c, d;
    null !== this._highlightTreeItem && (this.graphics.activate("placeholder", 3), a = this._highlightTreeItem.actualPosition, b = new primitives.common.Rect(0, 0, Math.round(this._highlightTreeItem.actualSize.width), Math.round(this._highlightTreeItem.actualSize.height)), c = this._highlightTreeItem.template.highlightPadding, b.offset(c.left, c.top, c.right, c.bottom), d = new primitives.common.RenderEventArgs, d.context = this._highlightTreeItem.itemConfig,
        d.isCursor = this._highlightTreeItem.isCursor, d.isSelected = this._highlightTreeItem.isSelected, d.templateName = this._highlightTreeItem.template.name, this.transform.transformRect(a.x, a.y, a.width, a.height, !0, this, function (a, c, g, h) {
            1 == this._highlightTreeItem.actualVisibility ? this.graphics.template(a, c, g, h, b.x, b.y, b.width, b.height, this._highlightTreeItem.template.highlightTemplate, this._highlightTreeItem.template.highlightTemplateHashCode, this._highlightTreeItem.template.highlightTemplateRenderName, d, null) :
                this.graphics.template(a, c, g, h, b.x, b.y, b.width - 1, b.height - 1, this._highlightTreeItem.template.dotHighlightTemplate, this._highlightTreeItem.template.dotHighlightTemplateHashCode, null, d, null)
        }))
};
primitives.orgdiagram.BaseController.prototype._drawCursor = function () {
    var a = this._cursorTreeItem,
        b, c, d, e;
    null !== a && 1 == a.actualVisibility && (this.graphics.activate("placeholder", 6), b = a.actualPosition, c = new primitives.common.Rect(a.contentPosition), d = a.template.cursorPadding, c.offset(d.left, d.top, d.right, d.bottom), e = new primitives.common.RenderEventArgs, e.context = a.itemConfig, e.isCursor = a.isCursor, e.isSelected = a.isSelected, e.templateName = a.template.name, this.transform.transformRect(b.x, b.y, b.width, b.height, !0, this, function (b, d, h, j) {
        this.graphics.template(b, d, h, j, c.x, c.y, c.width, c.height, a.template.cursorTemplate, a.template.cursorTemplateHashCode, a.template.cursorTemplateRenderName, e, {
            "border-width": a.template.cursorBorderWidth
        })
    }))
};
primitives.orgdiagram.BaseController.prototype._redrawTreeItems = function () {
    var a, b, c, d = {},
        e, f, g, h;
    this.transform.setOrientation(this.options.orientationType);
    f = 0;
    for (g = this._treeLevels.length; f < g; f += 1) a = this._treeLevels[f], a.labels = [], a.labelsRect = null, a.hasFixedLabels = !1, a.showLabels = !0;
    this._visualTree.loop(this, function (a, f) {
        var g = f.orgItem,
            l = this._treeLevels[f.level];
        f.setActualPosition(l, this.options);
        this.transform.transformRect(f.actualPosition.x, f.actualPosition.y, f.actualPosition.width, f.actualPosition.height, !0, this, function (a, j, p, q) {
            switch (f.actualVisibility) {
            case 1:
                b = new primitives.common.RenderEventArgs;
                b.context = f.itemConfig;
                b.isCursor = f.isCursor;
                b.isSelected = f.isSelected;
                b.templateName = f.template.name;
                this.graphics.activate("placeholder", 7);
                this.graphics.template(a, j, p, q, f.contentPosition.x, f.contentPosition.y, f.contentPosition.width, f.contentPosition.height, f.template.itemTemplate, f.template.itemTemplateHashCode, f.template.itemTemplateRenderName, b, {
                    "border-width": f.template.itemBorderWidth
                });
                f.actualHasGroupTitle &&
                    this.graphics.template(a, j, p, q, 2, f.contentPosition.y, this.options.groupTitlePanelSize - 4, f.contentPosition.height + 2, this._groupTitleTemplate, this._groupTitleTemplateHashCode, "onGroupTitleTemplateRender", f, null);
                f.actualHasSelectorCheckbox && (this.graphics.activate("placeholder", 10), this.graphics.template(a, j, p, q, f.contentPosition.x, f.actualSize.height - (this.options.checkBoxPanelSize - 4), f.contentPosition.width, this.options.checkBoxPanelSize - 4, this._checkBoxTemplate, this._checkBoxTemplateHashCode, "onCheckBoxTemplateRender",
                    f, null));
                f.actualHasButtons && (this.graphics.activate("placeholder", 10), this.graphics.template(a, j, p, q, f.actualSize.width - (this.options.buttonsPanelSize - 4), f.contentPosition.y, this.options.buttonsPanelSize - 4, Math.max(f.contentPosition.height, f.actualSize.height - f.contentPosition.y), this._buttonsTemplate, f.template.name + this._buttonsTemplateHashCode, "onButtonsTemplateRender", f, null));
                0 == this.options.showLabels && (h = new primitives.common.Label, h.text = g.title, h.position = new primitives.common.Rect(a, j,
                    p, q), h.weight = 1E4, h.labelType = 1, l.labels.push(h));
                break;
            case 2:
                c = g.itemTitleColor;
                null == c && (c = "#000080");
                d.hasOwnProperty(c) || (d[c] = []);
                e = d[c];
                e.push(new primitives.common.DotSegment(a, j, p, q, f.template.minimizedItemCornerRadius));
                h = this._createLabel(a, j, p, q, f);
                null != h && l.labels.push(h);
                break;
            default:
                this._debug && (c = "#ff0000", d.hasOwnProperty(c) || (d[c] = []), e = d[c], e.push(new primitives.common.DotSegment(a - 1, j - 1, 2, 2, 1)))
            }
        })
    });
    this.graphics.activate("placeholder", 4);
    for (c in d) d.hasOwnProperty(c) && (e =
        d[c], a = {
            fillColor: c,
            borderColor: c,
            opacity: 1,
            lineWidth: 1,
            lineType: 0
        }, this.graphics.polyline(e, a));
    this._redrawLabels()
};
primitives.orgdiagram.BaseController.prototype._redrawLabels = function () {
    var a, b, c, d, e, f, g, h;
    if (0 == this.options.showLabels) {
        g = 0;
        for (h = this._treeLevels.length; g < h; g += 1) {
            e = this._treeLevels[g];
            a = e.labels;
            d = 0;
            for (f = a.length; d < f; d += 1) b = a[d], null == e.labelsRect ? e.labelsRect = new primitives.common.Rect(b.position) : e.labelsRect.addRect(b.position), e.hasFixedLabels = e.hasFixedLabels || 2 == b.labelType
        }
        for (g = this._treeLevels.length - 1; 0 < g; g -= 1) a = this._treeLevels[g - 1], b = this._treeLevels[g], null != a.labelsRect && null !=
            b.labelsRect && a.labelsRect.overlaps(b.labelsRect) && (b.showLabels = !1);
        g = 0;
        for (h = this._treeLevels.length; g < h; g += 1)
            if (e = this._treeLevels[g], a = e.labels, e.showLabels) {
                d = 0;
                for (f = a.length; d < f; d += 1)
                    if (b = a[d], b.isActive)
                        for (e = d + 1; e < f; e += 1)
                            if (c = a[e], c.isActive)
                                if (b.position.overlaps(c.position))
                                    if (b.weight >= c.weight) 0 == c.labelType && (c.isActive = !1);
                                    else {
                                        0 == b.labelType && (b.isActive = !1);
                                        break
                                    } else break
            }
    }
    this.graphics.activate("placeholder", 5);
    c = {
        "font-size": this.options.labelFontSize,
        "font-family": this.options.labelFontFamily,
        "font-style": this.options.labelFontStyle,
        "font-weight": this.options.labelFontWeight,
        "font-color": this.options.labelColor
    };
    g = 0;
    for (h = this._treeLevels.length; g < h; g += 1)
        if (e = this._treeLevels[g], e.showLabels || e.hasFixedLabels) {
            a = e.labels;
            d = 0;
            for (f = a.length; d < f; d += 1)
                if (b = a[d], b.isActive) switch (b.labelType) {
                case 0:
                case 2:
                    this.graphics.text(b.position.x, b.position.y, b.position.width, b.position.height, b.text, b.labelOrientation, b.horizontalAlignmentType, b.verticalAlignmentType, c)
                }
        }
};
primitives.orgdiagram.BaseController.prototype._createLabel = function (a, b, c, d, e) {
    var f, g, h = null,
        j = this.options.labelOffset,
        i;
    i = e.orgItem;
    if (!primitives.common.isNullOrEmpty(i.label)) {
        switch (i.showLabel) {
        case 0:
            switch (this.options.showLabels) {
            case 0:
                switch (e.actualVisibility) {
                case 3:
                case 2:
                    h = new primitives.common.Label, h.labelType = 0, h.weight = e.leftPadding + e.rightPadding
                }
                break;
            case 1:
                h = new primitives.common.Label, h.labelType = 2, h.weight = 1E4
            }
            break;
        case 1:
            h = new primitives.common.Label, h.weight = 1E4, h.labelType =
                2
        }
        if (null != h) {
            h.text = i.label;
            e = null != i.labelSize ? i.labelSize : this.options.labelSize;
            h.labelOrientation = 3 != i.labelOrientation ? i.labelOrientation : 3 != this.options.labelOrientation ? this.options.labelOrientation : 0;
            i = 0 != i.labelPlacement ? i.labelPlacement : 0 != this.options.labelPlacement ? this.options.labelPlacement : 1;
            switch (h.labelOrientation) {
            case 0:
                f = e.width;
                g = e.height;
                break;
            case 1:
            case 2:
                g = e.width, f = e.height
            }
            switch (i) {
            case 0:
            case 1:
                h.position = new primitives.common.Rect(a + c / 2 - f / 2, b - j - g, f, g);
                switch (h.labelOrientation) {
                case 0:
                    h.horizontalAlignmentType =
                        0;
                    h.verticalAlignmentType = 2;
                    break;
                case 1:
                    h.horizontalAlignmentType = 1;
                    h.verticalAlignmentType = 1;
                    break;
                case 2:
                    h.horizontalAlignmentType = 2, h.verticalAlignmentType = 1
                }
                break;
            case 2:
            case 11:
                h.position = new primitives.common.Rect(a + c + j, b - j - g, f, g);
                switch (h.labelOrientation) {
                case 0:
                    h.horizontalAlignmentType = 1;
                    h.verticalAlignmentType = 2;
                    break;
                case 1:
                    h.horizontalAlignmentType = 1;
                    h.verticalAlignmentType = 0;
                    break;
                case 2:
                    h.horizontalAlignmentType = 2, h.verticalAlignmentType = 2
                }
                break;
            case 3:
                h.position = new primitives.common.Rect(a +
                    c + j, b + d / 2 - g / 2, f, g);
                switch (h.labelOrientation) {
                case 0:
                    h.horizontalAlignmentType = 1;
                    h.verticalAlignmentType = 1;
                    break;
                case 1:
                    h.horizontalAlignmentType = 0;
                    h.verticalAlignmentType = 0;
                    break;
                case 2:
                    h.horizontalAlignmentType = 0, h.verticalAlignmentType = 2
                }
                break;
            case 4:
            case 12:
                h.position = new primitives.common.Rect(a + c + j, b + d + j, f, g);
                switch (h.labelOrientation) {
                case 0:
                    h.horizontalAlignmentType = 1;
                    h.verticalAlignmentType = 0;
                    break;
                case 1:
                    h.horizontalAlignmentType = 2;
                    h.verticalAlignmentType = 0;
                    break;
                case 2:
                    h.horizontalAlignmentType =
                        1, h.verticalAlignmentType = 2
                }
                break;
            case 5:
                h.position = new primitives.common.Rect(a + c / 2 - f / 2, b + d + j, f, g);
                switch (h.labelOrientation) {
                case 0:
                    h.horizontalAlignmentType = 0;
                    h.verticalAlignmentType = 0;
                    break;
                case 1:
                    h.horizontalAlignmentType = 2;
                    h.verticalAlignmentType = 1;
                    break;
                case 2:
                    h.horizontalAlignmentType = 1, h.verticalAlignmentType = 1
                }
                break;
            case 6:
            case 10:
                h.position = new primitives.common.Rect(a - f - j, b + d + j, f, g);
                switch (h.labelOrientation) {
                case 0:
                    h.horizontalAlignmentType = 2;
                    h.verticalAlignmentType = 0;
                    break;
                case 1:
                    h.horizontalAlignmentType =
                        2;
                    h.verticalAlignmentType = 2;
                    break;
                case 2:
                    h.horizontalAlignmentType = 1, h.verticalAlignmentType = 0
                }
                break;
            case 7:
                h.position = new primitives.common.Rect(a - f - j, b + d / 2 - g / 2, f, g);
                switch (h.labelOrientation) {
                case 0:
                    h.horizontalAlignmentType = 2;
                    h.verticalAlignmentType = 1;
                    break;
                case 1:
                    h.horizontalAlignmentType = 0;
                    h.verticalAlignmentType = 2;
                    break;
                case 2:
                    h.horizontalAlignmentType = 0, h.verticalAlignmentType = 0
                }
                break;
            case 8:
            case 9:
                switch (h.position = new primitives.common.Rect(a - f - j, b - j - g, f, g), h.labelOrientation) {
                case 0:
                    h.horizontalAlignmentType =
                        2;
                    h.verticalAlignmentType = 2;
                    break;
                case 1:
                    h.horizontalAlignmentType = 1;
                    h.verticalAlignmentType = 2;
                    break;
                case 2:
                    h.horizontalAlignmentType = 2, h.verticalAlignmentType = 0
                }
            }
        }
    }
    return h
};
primitives.orgdiagram.BaseController.prototype._tracePathAnnotations = function () {
    var a, b, c, d, e, f, g, h, j, i, k, l;
    a = 0;
    for (b = this.options.annotations.length; a < b; a += 1) switch (c = this.options.annotations[a], c.annotationType) {
    case 2:
        if (null == j && (j = this._getConnectionsGraph()), null != c.items && 0 < c.items.length && (k = c.items.slice(0), e = this._treeItemsByUserId[k[0]], null != e && (1 == k.length && this._navigationFamily.loopParents(this, e.id, function (a, b) {
                    null != b.itemConfig && k.push(b.itemConfig.id);
                    return this._navigationFamily.SKIP
                }),
                1 < k.length))) {
            c = 1;
            for (d = k.length; c < d; c += 1)
                if (g = this._treeItemsByUserId[k[c]], null != g) {
                    i = j.getShortestPath(e.id, g.id, function (a, b, c) {
                        return a.getNear(c)
                    });
                    e = 1;
                    for (f = i.length; e < f; e += 1) l = j.edge([i[e - 1]], [i[e]]), h = this._visualTree.node(l.highlightItemId), h.highlightPath = 1, l.hasOwnProperty("partnerid") && (h = this._visualTree.node(l.partnerid), h.partnerHighlightPath = 1);
                    e = g
                }
        }
    }
};
primitives.orgdiagram.BaseController.prototype._getConnectionsGraph = function () {
    var a, b, c, d, e, f, g, h, j, i, k, l, m = primitives.common.graph();
    b = 0;
    for (c = this._treeLevels.length; b < c; b += 1) {
        a = this._treeLevels[b];
        d = 0;
        for (e = a.treeItems.length; d < e; d += 1) {
            h = a.treeItems[d];
            h = this._visualTree.node(h);
            i = h.actualIsActive ? 100 : 1;
            h.connectorPlacement & 8 ? k = [a.treeItems[h.levelPosition - 1]] : h.connectorPlacement & 2 ? k = [a.treeItems[h.levelPosition + 1]] : h.connectorPlacement & 1 ? (f = this._visualTree.parent(h.id), k = 1 < f.partners.length ?
                f.partners.slice(0) : [f.id], 0 < f.extraPartners.length && (k = k.concat(f.extraPartners))) : k = [];
            f = 0;
            for (g = k.length; f < g; f += 1) l = k[f], j = this._visualTree.node(l), j = j.actualIsActive ? 100 : 1, j = new primitives.famdiagram.EdgeItem(h.id, i, l, j), j.highlightItemId = h.id, 1 != g && (j.partnerid = l), m.addEdge(h.id, l, j)
        }
    }
    return m
};
primitives.orgdiagram.BaseController.prototype._drawPrintPreview = function () {
    var a = this.options.printPreviewPageSize,
        b, c, d;
    if (4 == this.options.pageFitMode) {
        this.graphics.activate("placeholder", 1);
        for (b = 0;
            (b + 1) * a.width < this.m_placeholderRect.width;) {
            for (c = 0;
                (c + 1) * a.height < this.m_placeholderRect.height;) d = this.graphics.template(b * a.width, c * a.height, a.width, a.height, 0, 0, a.width, a.height, this._printPreviewTemplate, this._printPreviewTemplateHashCode, null, null, null), d.data({
                column: b,
                row: c
            }), c += 1;
            b += 1
        }
    }
};
primitives.orgdiagram.BaseController.prototype._drawAnnotations = function () {
    var a;
    a = 8;
    var b, c, d, e, f, g, h, j, i, k, l, m, n, p;
    b = 0;
    for (c = this.options.annotations.length; b < c; b += 1) switch (m = this.options.annotations[b], m.annotationType) {
    case 0:
        if (null != m.fromItem && null != m.toItem && (e = this._treeItemsByUserId[m.fromItem], f = this._treeItemsByUserId[m.toItem], null != e && null != f)) {
            h = new primitives.orgdiagram.ConnectorAnnotationConfig;
            g = new primitives.common.Connector(this.graphics);
            g.orientationType = this.options.orientationType;
            k = "connectorShapeType labelPlacementType offset lineWidth color lineType labelSize zOrderType".split(" ");
            a = 0;
            for (d = k.length; a < d; a += 1) l = k[a], g[l] = m.hasOwnProperty(l) ? m[l] : h[l];
            g.labelTemplate = this._annotationLabelTemplate;
            g.labelTemplateHashCode = this._annotationLabelTemplateHashCode;
            g.hasLabel = !primitives.common.isNullOrEmpty(m.label);
            n = new primitives.common.RenderEventArgs;
            n.context = m;
            switch (g.zOrderType) {
            case 1:
                a = 1;
                break;
            default:
                a = 8
            }
            a = this.graphics.activate("placeholder", a);
            g.panelSize = a.size;
            this.transform.transformRect(e.actualPosition.x,
                e.actualPosition.y, e.actualPosition.width, e.actualPosition.height, !0, this,
                function (a, b, c, d) {
                    var e = new primitives.common.Rect(a, b, c, d);
                    this.transform.transformRect(f.actualPosition.x, f.actualPosition.y, f.actualPosition.width, f.actualPosition.height, !0, this, function (a, b, c, d) {
                        a = new primitives.common.Rect(a, b, c, d);
                        g.draw(e, a, n)
                    })
                })
        }
        break;
    case 1:
        if (null != m.items && 0 < m.items.length) {
            e = new primitives.common.Rect;
            a = 0;
            for (d = m.items.length; a < d; a += 1) h = this._treeItemsByUserId[m.items[a]], null != h && e.addRect(h.actualPosition);
            if (!e.isEmpty()) {
                g = new primitives.common.Shape(this.graphics);
                h = new primitives.orgdiagram.ShapeAnnotationConfig;
                k = "opacity cornerRadius shapeType offset lineWidth borderColor fillColor lineType labelSize labelOffset labelPlacement zOrderType".split(" ");
                a = 0;
                for (d = k.length; a < d; a += 1) l = k[a], g[l] = m.hasOwnProperty(l) ? m[l] : h[l];
                switch (g.zOrderType) {
                case 2:
                    a = 8;
                    break;
                case 1:
                    a = 1;
                    break;
                default:
                    switch (g.shapeType) {
                    case 3:
                    case 1:
                    case 2:
                        a = 8;
                        break;
                    default:
                        a = 1
                    }
                }
                a = this.graphics.activate("placeholder", a);
                g.position =
                    e;
                g.orientationType = this.options.orientationType;
                g.panelSize = a.size;
                g.labelTemplate = this._annotationLabelTemplate;
                g.labelTemplateHashCode = this._annotationLabelTemplateHashCode;
                g.hasLabel = null != m.templateName || null != m.label;
                n = new primitives.common.RenderEventArgs;
                n.context = m;
                n.templateName = g.labelTemplate;
                this.transform.transformRect(e.x, e.y, e.width, e.height, !0, this, function (a, b, c, d) {
                    a = new primitives.common.Rect(a, b, c, d);
                    g.draw(a, n)
                })
            }
        }
        break;
    case 4:
        if (null != m.items && 0 < m.items.length) {
            p || (p = this._getBackgroundManager());
            g = new primitives.common.Perimeter(this.graphics);
            g.transform = this.transform;
            h = new primitives.orgdiagram.BackgroundAnnotationConfig;
            k = "opacity lineWidth borderColor fillColor lineType zOrderType".split(" ");
            a = 0;
            for (d = k.length; a < d; a += 1) l = k[a], g[l] = m.hasOwnProperty(l) ? m[l] : h[l];
            switch (g.zOrderType) {
            case 2:
                a = 8;
                break;
            case 1:
                a = 1;
                break;
            default:
                a = 1
            }
            a = this.graphics.activate("placeholder", a);
            j = [];
            i = {};
            if (m.includeChildren) {
                a = 0;
                for (d = m.items.length; a < d; a += 1) h = m.items[a], e = this._treeItemsByUserId[h], null != e &&
                    (i[e.orgItem.id] = !0, j.push(e.orgItem.id), this._navigationFamily.loopChildren(this, e.id, function (a, b) {
                        null != b.orgItem && !i[b.orgItem.id] && (i[b.orgItem.id] = !0, j.push(b.orgItem.id))
                    }))
            } else j = m.items;
            m = p.getMergedPerimeters(j);
            for (a = 0; a < m.length; a += 1) g.draw(m[a])
        }
    }
};
primitives.orgdiagram.BaseController.prototype._getBackgroundManager = function () {
    var a = new primitives.common.perimeter.Manager,
        b, c, d, e, f, g, h, j, i, k, l;
    if (0 < this._treeLevels.length) {
        j = [];
        f = [];
        b = 0;
        for (c = this._treeLevels.length; b < c; b += 1)
            if (h = i = null, d = this._treeLevels[b], 4 != d.actualVisibility) {
                j.push(b);
                g = [];
                k = d.treeItems;
                d = 0;
                for (e = k.length; d < e; d += 1) l = this._visualTree.node(k[d]), 4 != l.actualVisibility && null != l.orgItem && (null != h && this._addOffset(g, i, h, l), i = h, h = l);
                null != h && this._addOffset(g, i, h, null);
                f.push(g)
            }
        if (0 <
            f.length) {
            i = [];
            g = [];
            b = 0;
            for (c = f.length; b < c; b += 1) g = primitives.common.mergeSort([g, f[b]], null, !0), i.push(g), g = f[b];
            i.push(primitives.common.mergeSort([f[b - 1]], null, !0));
            f = [];
            b = 0;
            for (c = i.length; b < c; b += 1) {
                h = {};
                g = i[b];
                d = 0;
                for (e = g.length; d < e; d += 1) k = g[d], h[k] = d;
                f.push(h)
            }
            h = [];
            d = g = null;
            b = 0;
            for (c = j.length; b < c; b += 1) e = this._treeLevels[j[b]], null != d && this._addTreeLevelPerimeters(h, b - 1, f, i, g, d, e), g = d, d = e;
            null != d && this._addTreeLevelPerimeters(h, b - 1, f, i, g, d, null);
            a.add(h)
        }
    }
    return a
};
primitives.orgdiagram.BaseController.prototype._addTreeLevelPerimeters = function (a, b, c, d, e, f, g) {
    var h = Math.floor(this.options.normalItemsInterval / 2),
        e = null != e ? Math.floor(3 * (e.shift + e.depth) / 7 + 4 * f.shift / 7) : f.shift - h,
        g = null != g ? Math.floor(3 * (f.shift + f.depth) / 7 + 4 * g.shift / 7) : f.shift + f.depth + h,
        j = h = null,
        i = f.treeItems,
        k, l;
    k = 0;
    for (l = i.length; k < l; k += 1) f = this._visualTree.node(i[k]), 4 != f.actualVisibility && null != f.orgItem && (null != j && this._addPerimeter(a, c[b], c[b + 1], d[b], d[b + 1], e, g, h, j, f), h = j, j = f);
    null != j && this._addPerimeter(a,
        c[b], c[b + 1], d[b], d[b + 1], e, g, h, j, null)
};
primitives.orgdiagram.BaseController.prototype._addOffset = function (a, b, c, d) {
    var e = Math.floor(this.options.normalItemsInterval / 2),
        d = null != d ? Math.floor(3 * (c.offset + c.actualSize.width) / 7 + 4 * d.offset / 7) : c.offset + c.actualSize.width + e;
    a.push(null != b ? Math.floor(3 * (b.offset + b.actualSize.width) / 7 + 4 * c.offset / 7) : c.offset - e);
    a.push(d)
};
primitives.orgdiagram.BaseController.prototype._addPerimeter = function (a, b, c, d, e, f, g, h, j, i) {
    var k = [],
        l = primitives.common.perimeter.SegmentItem,
        m = Math.floor(this.options.normalItemsInterval / 2),
        h = null != h ? Math.floor(3 * (h.offset + h.actualSize.width) / 7 + 4 * j.offset / 7) : j.offset - m,
        i = null != i ? Math.floor(3 * (j.offset + j.actualSize.width) / 7 + 4 * i.offset / 7) : j.offset + j.actualSize.width + m;
    k.push(new l(h, f, h, g));
    for (m = c[h] + 1; m <= c[i]; m += 1) k.push(new l(e[m - 1], g, e[m], g));
    k.push(new l(i, g, i, f));
    for (m = b[i] - 1; m >= b[h]; m -= 1) k.push(new l(d[m +
        1], f, d[m], f));
    a.push(new primitives.common.perimeter.Item(j.orgItem.id, k))
};
primitives.orgdiagram.BaseController.prototype._redrawConnectors = function () {
    var a = this.graphics.activate("placeholder", 2),
        b, c, d, e, f, g, h, j;
    if (this._visualTree.hasNodes()) {
        e = new primitives.common.PaletteManager(this.options);
        f = new primitives.common.PolylinesBuffer;
        for (j = 0; j < this._treeLevels.length; j += 1) {
            d = this._treeLevels[j];
            c = d.treeItems;
            g = 0;
            for (h = c.length; g < h; g += 1) b = this._visualTree.node(c[g]), this._redrawConnector(a.hasGraphics, f, e, b, d)
        }
        this.graphics.polylinesBuffer(f)
    }
};
primitives.orgdiagram.BaseController.prototype._redrawConnector = function (a, b, c, d, e) {
    var f = this,
        g, h, j, i, k, l, m, n, p, q, s, r, t, u = 0,
        v, w = 0 == this.options.connectorType,
        x, z;
    t = 0 < d.partnerConnectorOffset ? e.shift + e.connectorShift - e.levelSpace / 2 * (e.partnerConnectorOffset - d.partnerConnectorOffset + 1) : d.connectorPlacement & 4 ? d.actualPosition.bottom() : e.shift + e.connectorShift;
    1 >= d.partnerConnectorOffset ? c.selectPalette(0) : 1 < d.partnerConnectorOffset ? c.selectPalette(d.partnerConnectorOffset - 1) : c.selectPalette(e.partnerConnectorOffset);
    this._visualTree.hasChildren(d.id) && (g = 4 === d.actualVisibility && null == this._visualTree.parentid(d.id), r = d.actualPosition.horizontalCenter());
    j = [];
    if (1 < d.partners.length || 0 < d.extraPartners.length) {
        i = d.partners;
        for (m = 0; m < i.length; m += 1) k = this._visualTree.node(i[m]), v = new primitives.orgdiagram.ConnectorPoint(k.actualPosition.horizontalCenter(), k.actualPosition.bottom()), v.isSquared = !0, v.highlightPath = k.partnerHighlightPath, v.connectorStyleType = k.partnerHighlightPath ? 2 : 1, v.visibility = k.actualVisibility,
            j.push(v);
        i = d.extraPartners;
        for (m = 0; m < i.length; m += 1) k = this._visualTree.node(i[m]), v = new primitives.orgdiagram.ConnectorPoint(k.actualPosition.horizontalCenter(), k.actualPosition.bottom()), v.isSquared = !0, v.highlightPath = k.partnerHighlightPath, v.connectorStyleType = k.partnerHighlightPath ? 2 : 0, v.visibility = k.actualVisibility, j.push(v);
        0 < j.length && (j.sort(function (a, b) {
            return a.x - b.x
        }), this._visualTree.hasChildren(d.id) || (r = (j[0].x + j[j.length - 1].x) / 2), b.addInverted(function (b) {
            f._drawTopConnectors(b, c,
                r, t, j, !0, a, 1 == f.options.arrowsDirection)
        }))
    }
    h = [];
    this._visualTree.hasChildren(d.id) && (s = !1, this._visualTree.loopChildren(this, d.id, function (d, e) {
        l = this._treeLevels[e.level];
        x = c.getPalette(e.highlightPath ? 2 : 1);
        z = b.getPolyline(x);
        if (e.connectorPlacement & 8) n = this._visualTree.node(l.treeItems[e.levelPosition - 1]), this.transform.transformPoints(e.actualPosition.x, l.shift + l.horizontalConnectorsDepth, n.actualPosition.right(), l.shift + l.horizontalConnectorsDepth, !0, this, function (a, c, d, g) {
            f._drawLineWithArrow(a,
                c, d, g, b, z, e.actualVisibility, n.actualVisibility)
        });
        else if (e.connectorPlacement & 2) p = this._visualTree.node(l.treeItems[e.levelPosition + 1]), this.transform.transformPoints(e.actualPosition.right(), l.shift + l.horizontalConnectorsDepth, p.actualPosition.x, l.shift + l.horizontalConnectorsDepth, !0, this, function (a, c, d, g) {
            f._drawLineWithArrow(a, c, d, g, b, z, e.actualVisibility, p.actualVisibility)
        });
        else if (e.connectorPlacement & 1 && !g) {
            q = !0;
            if (a) switch (e.actualVisibility) {
            case 2:
            case 3:
                q = w
            }
            v = new primitives.orgdiagram.ConnectorPoint(e.actualPosition.horizontalCenter() +
                0, e.actualPosition.top());
            v.isSquared = q;
            v.connectorStyleType = e.highlightPath ? 2 : 1;
            v.visibility = e.actualVisibility;
            h.push(v);
            u = Math.max(u, v.connectorStyleType);
            s = s || v.isSquared
        }
    }), !g && 0 < h.length && (this.transform.transformPoints(r, t, r, e.shift + e.connectorShift, !0, this, function (a, e, g, i) {
        var k = Math.round(f.options.elbowDotSize / 2),
            l = c.getPalette(u),
            m = b.getPolyline(l),
            m = b.getPolyline(m.arrowPaletteItem);
        this.showElbowDots && (0 != this.options.elbowType && 0 < d.partners.length) && m.segments.push(new primitives.common.DotSegment(a -
            k, e - k, 2 * k, 2 * k, k));
        b.addInverted(function (c) {
            c = c.getPolyline(l);
            c.segments.push(new primitives.common.MoveSegment(g, i));
            c.segments.push(new primitives.common.LineSegment(a, e));
            1 == f.options.arrowsDirection && (4 != d.visibility && 1 >= j.length) && c.addArrow(f.options.linesWidth, function (a, c) {
                var d = b.getPolyline(c);
                d.segments = d.segments.concat(a)
            })
        });
        this.showElbowDots && (0 != this.options.elbowType && 1 < h.length) && m.segments.push(new primitives.common.DotSegment(g - k, i - k, 2 * k, 2 * k, k))
    }), this._drawTopConnectors(b, c,
        r, e.shift + e.connectorShift, h, s, a, 2 == this.options.arrowsDirection)))
};
primitives.orgdiagram.BaseController.prototype._drawLineWithArrow = function (a, b, c, d, e, f, g, h) {
    a = new primitives.common.Point(a, b);
    c = new primitives.common.Point(c, d);
    d = !1;
    switch (this.options.arrowsDirection) {
    case 1:
        4 != h && (d = !0);
        break;
    case 2:
        4 != g && (a.swap(c), d = !0)
    }
    f.segments.push(new primitives.common.MoveSegment(a));
    f.segments.push(new primitives.common.LineSegment(c));
    d && f.addArrow(this.options.linesWidth, function (a, b) {
        var c = e.getPolyline(b);
        c.segments = c.segments.concat(a)
    })
};
primitives.orgdiagram.BaseController.prototype._drawTopConnectors = function (a, b, c, d, e, f, g, h) {
    var j, i, k, l = [],
        m, n, p, q = this;
    if (f) {
        l = [];
        f = 0;
        for (i = e.length; f < i; f += 1)
            if (k = e[f], k.x < c && !k.isSquared) l.push(k);
            else break;
        i = l.length;
        0 < i && this._drawAngularConnectors(a, b, c, d, l, !1, h);
        l = [];
        for (j = e.length - 1; j >= f; j -= 1)
            if (k = e[j], k.x > c && !k.isSquared) l.push(k);
            else break;
        i = l.length;
        0 < i && this._drawAngularConnectors(a, b, c, d, l, !1, h);
        l = {};
        i = {};
        for (n in primitives.common.ConnectorStyleType) primitives.common.ConnectorStyleType.hasOwnProperty(n) &&
            (l[primitives.common.ConnectorStyleType[n]] = c, i[primitives.common.ConnectorStyleType[n]] = c);
        for (n = f; n <= j; n += 1) {
            k = e[n];
            m = b.getPalette(k.connectorStyleType);
            p = a.getPolyline(m);
            m = this.options.dotItemsInterval / 2;
            2 > m && (m = 0);
            if (g) switch (this.options.elbowType) {
            case 2:
            case 3:
                0 < m && (Math.abs(c - k.x) > m && Math.abs(d - k.y) > m) && (k.hasElbow = !0, k.elbowPoint1 = new primitives.common.Point(k.x, d + (d > k.y ? -m : m)), k.elbowPoint2 = new primitives.common.Point(k.x + (c > k.x ? m : -m), d));
                break;
            case 1:
                0 < j - f && this.transform.transformPoints(k.x,
                    d, k.x, k.y, !0, this,
                    function (b, c) {
                        var d = Math.round(q.options.elbowDotSize / 2);
                        a.getPolyline(p.arrowPaletteItem).segments.push(new primitives.common.DotSegment(b - d, c - d, 2 * d, 2 * d, d))
                    })
            }
            l[k.connectorStyleType] = Math.min(l[k.connectorStyleType], k.hasElbow ? k.elbowPoint2.x : k.x);
            i[k.connectorStyleType] = Math.max(i[k.connectorStyleType], k.hasElbow ? k.elbowPoint2.x : k.x)
        }
        m = [Math.max(0, f - 1), Math.min(j + 1, e.length - 1)];
        for (n = 0; n < m.length; n += 1) k = e[m[n]], l[k.connectorStyleType] = Math.min(l[k.connectorStyleType], k.hasElbow ?
            k.elbowPoint2.x : k.x), i[k.connectorStyleType] = Math.max(i[k.connectorStyleType], k.hasElbow ? k.elbowPoint2.x : k.x);
        k = c;
        for (n = 2; 0 <= n; n -= 1) m = b.getPalette(n), p = a.getPolyline(m), m = l[n], null != m && m < k && (this.transform.transformPoints(k, d, m, d, !0, this, function (a, b, c, d) {
            p.segments.push(new primitives.common.MoveSegment(a, b));
            p.segments.push(new primitives.common.LineSegment(c, d))
        }), k = m), m = i[n], null != m && m > c && (this.transform.transformPoints(c, d, m, d, !0, this, function (a, b, c, d) {
            p.segments.push(new primitives.common.MoveSegment(a,
                b));
            p.segments.push(new primitives.common.LineSegment(c, d))
        }), c = m);
        for (n = f; n <= j; n += 1) k = e[n], m = b.getPalette(k.connectorStyleType), p = a.getPolyline(m), k.hasElbow ? (this.transform.transform3Points(k.elbowPoint2.x, k.elbowPoint2.y, k.elbowPoint1.x, k.elbowPoint2.y, k.elbowPoint1.x, k.elbowPoint1.y, !0, this, function (a, b, c, d, e, f) {
            switch (this.options.elbowType) {
            case 2:
                p.segments.push(new primitives.common.MoveSegment(a, b));
                p.segments.push(new primitives.common.LineSegment(e, f));
                break;
            case 3:
                p.segments.push(new primitives.common.MoveSegment(a,
                    b)), p.segments.push(new primitives.common.CubicArcSegment(a, b, c, d, e, f))
            }
        }), this.transform.transformPoints(k.elbowPoint1.x, k.elbowPoint1.y, k.x, k.y, !0, this, function (a, b, c, d) {
            p.segments.push(new primitives.common.LineSegment(c, d))
        })) : this.transform.transformPoints(k.x, d, k.x, k.y, !0, this, function (a, b, c, d) {
            p.segments.push(new primitives.common.MoveSegment(a, b));
            p.segments.push(new primitives.common.LineSegment(c, d))
        }), g && (h && 4 != k.visibility) && p.addArrow(this.options.linesWidth, function (b, c) {
            var d = a.getPolyline(c);
            d.segments = d.segments.concat(b)
        })
    } else this._drawAngularConnectors(a, b, c, d, e, !0, h)
};
primitives.orgdiagram.BaseController.prototype._drawAngularConnectors = function (a, b, c, d, e, f, g) {
    var h = null,
        j = e.length,
        i, k, l, m, h = f ? c : e[j - 1].x;
    k = new primitives.common.Point(h, d);
    for (c = 0; c < j; c += 1) {
        l = e[c];
        i = b.getPalette(l.connectorStyleType);
        m = a.getPolyline(i);
        this.transform.transformPoint(h, d, !0, this, function (a, b) {
            m.segments.push(new primitives.common.MoveSegment(a, b))
        });
        switch (this.options.connectorType) {
        case 1:
            this.transform.transformPoint(l.x, l.y, !0, this, function (a, b) {
                m.segments.push(new primitives.common.LineSegment(a,
                    b))
            });
            break;
        case 2:
            i = new primitives.common.Rect(k, l), f ? h > i.x ? this.transform.transform3Points(i.right(), i.verticalCenter(), i.x, i.verticalCenter(), i.x, i.bottom(), !0, this, function (a, b, c, d, e, f) {
                m.segments.push(new primitives.common.CubicArcSegment(a, b, c, d, e, f))
            }) : this.transform.transform3Points(i.x, i.verticalCenter(), i.right(), i.verticalCenter(), i.right(), i.bottom(), !0, this, function (a, b, c, d, e, f) {
                m.segments.push(new primitives.common.CubicArcSegment(a, b, c, d, e, f))
            }) : h > i.x ? this.transform.transformPoints(i.x,
                i.y, i.x, i.bottom(), !0, this,
                function (a, b, c, d) {
                    m.segments.push(new primitives.common.QuadraticArcSegment(a, b, c, d))
                }) : this.transform.transformPoints(i.right(), i.y, i.right(), i.bottom(), !0, this, function (a, b, c, d) {
                m.segments.push(new primitives.common.QuadraticArcSegment(a, b, c, d))
            })
        }
        g && 4 != l.visibility && m.addArrow(this.options.linesWidth, function (b, c, d) {
            c = a.getPolyline(c);
            c.segments = c.segments.concat(b);
            this._debug && (b = a.getPolyline({
                fillColor: "#ff0000"
            }), b.segments.push(new primitives.common.DotSegment(d.x -
                1, d.y - 1, 2, 2, 1)))
        })
    }
};
primitives.orgdiagram.BaseController.prototype._centerOnCursor = function (a, b) {
    var c;
    if (null !== a && (this.graphics.activate("placeholder", 7), c = this._getTransformedItemPosition(a), b || this._isAnnotationNeeded(a, this._getPanelPosition()))) this.m_scrollPanel.scrollLeft(c.horizontalCenter() - this.m_scrollPanelRect.horizontalCenter()), this.m_scrollPanel.scrollTop(c.verticalCenter() - this.m_scrollPanelRect.verticalCenter())
};
primitives.orgdiagram.BaseController.prototype._setOption = function (a, b) {
    jQuery.Widget.prototype._setOption.apply(this, arguments);
    switch (a) {
    case "disabled":
        var c = jQuery([]);
        b ? (c.filter(".ui-state-focus").blur(), c.removeClass("ui-state-hover"), c.propAttr("disabled", !0), this.element.addClass("ui-disabled")) : (c.propAttr("disabled", !1), this.element.removeClass("ui-disabled"))
    }
};
primitives.orgdiagram.BaseController.prototype._getTreeItemForMousePosition = function (a, b) {
    var c = null,
        d = this,
        e, f, g;
    this.graphics.activate("placeholder", 7);
    a /= this.scale;
    b /= this.scale;
    this.transform.transformPoint(a, b, !1, this, function (a, b) {
        e = 0;
        for (f = this._treeLevels.length; e < f; e += 1)
            if (g = d._treeLevels[e], 0 < g.activeTreeItems.length && b > g.shift + g.topConnectorShift && b <= g.shift + g.connectorShift) {
                c = d._visualTree.node(primitives.common.binarySearch(g.activeTreeItems, function (c) {
                    c = d._visualTree.node(c);
                    switch (c.actualVisibility) {
                    case 1:
                        if (c.actualPosition.contains(a,
                                b)) return 0;
                    case 2:
                    case 3:
                        return a - c.actualPosition.horizontalCenter();
                    case 4:
                        if (d._debug) throw "Clickable items collection should contain only visible items.";
                    }
                }));
                break
            }
    });
    return c
};
primitives.orgdiagram.BaseController.prototype._drawHighlightAnnotation = function () {
    var a = primitives.common,
        b, c, d, e, f;
    e = !0;
    var g;
    if (null !== this._highlightTreeItem) switch (this._highlightTreeItem.actualVisibility) {
    case 2:
    case 3:
    case 1:
        b = this._highlightTreeItem;
        c = b.orgItem;
        switch (c.showCallout) {
        case 2:
            e = !1;
            break;
        case 1:
            e = !1;
            break;
        default:
            e = this.options.showCallout
        }
        e ? (this.graphics.activate("placeholder", 7), e = this._getTransformedItemPosition(b), e = new a.Point(e.horizontalCenter(), e.verticalCenter()), d =
            this._getPanelPosition(), this._isAnnotationNeeded(b, d) ? (c = !a.isNullOrEmpty(c.calloutTemplateName) ? c.calloutTemplateName : !a.isNullOrEmpty(c.templateName) ? c.templateName : !a.isNullOrEmpty(this.options.defaultCalloutTemplateName) ? this.options.defaultCalloutTemplateName : this.options.defaultTemplateName, c = this._templates[c], null == c && (c = this._defaultTemplate), f = this._getAnnotationPosition(e, d, c.itemSize), d = new a.Rect(f), d.addRect(e.x, e.y), d.offset(50), g = d.getCSS(), g.display = "inherit", g.visibility = "inherit",
                this.m_calloutPlaceholder.css(g), e.x -= d.x, e.y -= d.y, f.x -= d.x, f.y -= d.y, a = new a.RenderEventArgs, a.context = b.itemConfig, a.isCursor = b.isCursor, a.isSelected = b.isSelected, a.templateName = c.name, this.graphics.resize("calloutplaceholder", d.width, d.height), this.graphics.activate("calloutplaceholder", 9), this.graphics.template(f.x, f.y, f.width, f.height, 0, 0, f.width, f.height, c.itemTemplate, c.itemTemplateHashCode, c.itemTemplateRenderName, a, null), this.pointerPlacement = 0, this.m_calloutShape.cornerRadius = this.options.calloutCornerRadius,
                this.m_calloutShape.offset = this.options.calloutOffset, this.m_calloutShape.opacity = this.options.calloutOpacity, this.m_calloutShape.lineWidth = this.options.calloutLineWidth, this.m_calloutShape.pointerWidth = this.options.calloutPointerWidth, this.m_calloutShape.borderColor = this.options.calloutBorderColor, this.m_calloutShape.fillColor = this.options.calloutfillColor, this.m_calloutShape.draw(e, f)) : this.m_calloutPlaceholder.css({
                display: "none",
                visibility: "hidden"
            })) : this.m_calloutPlaceholder.css({
            display: "none",
            visibility: "hidden"
        });
        break;
    case 4:
        this.m_calloutPlaceholder.css({
            display: "none",
            visibility: "hidden"
        })
    }
};
primitives.orgdiagram.BaseController.prototype._hideHighlightAnnotation = function () {
    this.m_calloutPlaceholder.css({
        display: "none",
        visibility: "hidden"
    })
};
primitives.orgdiagram.BaseController.prototype._getPanelPosition = function () {
    return new primitives.common.Rect(this.m_scrollPanel.scrollLeft(), this.m_scrollPanel.scrollTop(), Math.min(this.m_scrollPanelRect.width - 25, this.m_placeholderRect.width), Math.min(this.m_scrollPanelRect.height - 25, this.m_placeholderRect.height))
};
primitives.orgdiagram.BaseController.prototype._getTransformedItemPosition = function (a) {
    var b = !1;
    this.transform.transformRect(a.actualPosition.x * this.scale, a.actualPosition.y * this.scale, a.actualPosition.width * this.scale, a.actualPosition.height * this.scale, !0, this, function (a, d, e, f) {
        b = new primitives.common.Rect(a, d, e, f)
    });
    return b
};
primitives.orgdiagram.BaseController.prototype._isAnnotationNeeded = function (a, b) {
    var c = !1,
        d = this._getTransformedItemPosition(a);
    if (1 != a.actualVisibility || !b.overlaps(d)) c = !0;
    return c
};
primitives.orgdiagram.BaseController.prototype._getAnnotationPosition = function (a, b, c) {
    var d = new primitives.common.Rect(a.x, a.y, c.width, c.height);
    a.y > b.bottom() - b.height / 4 ? (d.y -= c.height / 2, d.x = a.x < b.horizontalCenter() ? d.x + c.width / 4 : d.x - (c.width / 4 + c.width)) : (d.y += c.height / 4, d.x -= c.width / 2);
    d.x < b.x ? d.x = b.x + 5 : d.right() > b.right() && (d.x -= d.right() - b.right() + 5);
    d.y < b.y ? d.y = b.y + 5 : d.bottom() > b.bottom() && (d.y -= d.bottom() - b.bottom() + 5);
    return d
};
primitives.orgdiagram.BaseController.prototype._positionTreeItems = function () {
    var a = new primitives.common.Rect(0, 0, (this.m_scrollPanelRect.width - 25) / this.scale, (this.m_scrollPanelRect.height - 25) / this.scale),
        b = new primitives.common.Rect(0, 0, 0, 0),
        c, d, e, f, g;
    switch (this.options.orientationType) {
    case 2:
    case 3:
        a.invert()
    }
    if (0 < this._treeLevels.length) {
        switch (this.options.pageFitMode) {
        case 0:
        case 4:
            c = [new primitives.orgdiagram.LevelVisibility(0, 1)];
            b = this._setTreeLevelsVisibilityAndPositionTreeItems(c, 0);
            break;
        default:
            c = [new primitives.orgdiagram.LevelVisibility(0, 1)];
            b = [];
            switch (this.options.minimalVisibility) {
            case 2:
                b.push(2);
                break;
            case 0:
            case 3:
            case 4:
                b.push(2), b.push(3)
            }
            for (d = this._treeLevels.length - 1; 0 <= d; d -= 1)
                for (e = 0; e < b.length; e += 1) c.push(new primitives.orgdiagram.LevelVisibility(d, b[e]));
            d = this._setTreeLevelsVisibilityAndPositionTreeItems(c, c.length - 1);
            d.addRect(a);
            d.offset(0, 0, 5, 5);
            b = this._setTreeLevelsVisibilityAndPositionTreeItems(c, 0);
            if (!this._checkDiagramSize(b, d) && (e = 0, b = this._setTreeLevelsVisibilityAndPositionTreeItems(c,
                    c.length - 1), this._checkDiagramSize(b, d))) {
                for (g = f = c.length - 1; 1 < f - e;) g = Math.floor((f + e) / 2), b = this._setTreeLevelsVisibilityAndPositionTreeItems(c, g), this._checkDiagramSize(b, d) ? f = g : e = g;
                f !== g && (b = this._setTreeLevelsVisibilityAndPositionTreeItems(c, f))
            }
        }
        switch (this.options.pageFitMode) {
        case 4:
            a = this._stretchToAvoidPageMargins();
            b.width = a.width;
            b.height = a.height;
            break;
        default:
            b.width < a.width && (this._stretchToWidth(b.width, a.width), b.width = a.width), b.height < a.height && (b.height = a.height)
        }
        switch (this.options.orientationType) {
        case 2:
        case 3:
            b.invert()
        }
        this.m_placeholder.css(b.getCSS());
        this.m_placeholderRect = new primitives.common.Rect(b)
    }
};
primitives.orgdiagram.BaseController.prototype._stretchToAvoidPageMargins = function () {
    var a = new primitives.common.Size(this.options.printPreviewPageSize),
        b = this,
        c, d, e, f, g, h;
    switch (this.options.orientationType) {
    case 2:
    case 3:
        a.invert()
    }
    c = [];
    e = 0;
    for (f = this._treeLevels.length; e < f; e += 1) c.push(this._treeLevels[e].treeItems);
    d = primitives.common.mergeSort(c, function (a) {
        return b._visualTree.node(a).offset
    });
    c = 0;
    g = a.width;
    e = 0;
    for (f = d.length; e < f; e += 1) h = b._visualTree.node(d[e]), h.offset + c < g && h.offset + h.actualSize.width +
        c > g && (c += g - h.offset - c + this.options.normalItemsInterval / 2), h.offset += c, h.offset > g && (g += a.width);
    c = 0;
    f = a.height;
    for (e = 0; e < this._treeLevels.length; e += 1) d = this._treeLevels[e], d.shift + c < f && d.shift + d.depth + c > f && (c += f - d.shift - c + this.options.normalLevelShift / 2), d.shiftDown(c), d.shift > f && (f += a.height);
    return new primitives.common.Size(g + 1, f + 1)
};
primitives.orgdiagram.BaseController.prototype._checkDiagramSize = function (a, b) {
    var c = !1;
    switch (this.options.pageFitMode) {
    case 1:
        b.width >= a.width && (c = !0);
        break;
    case 2:
        b.height >= a.height && (c = !0);
        break;
    case 3:
        b.height >= a.height && b.width >= a.width && (c = !0)
    }
    return c
};
primitives.orgdiagram.BaseController.prototype._setTreeLevelsVisibilityAndPositionTreeItems = function (a, b) {
    var c, d;
    for (c = 0; c < this._treeLevels.length; c += 1) this._treeLevels[c].currentvisibility = 1;
    for (c = 0; c <= b; c += 1) d = a[c], this._treeLevels[d.level].currentvisibility = d.currentvisibility;
    this._recalcItemsSize();
    this._setOffsets();
    this._recalcLevelsDepth();
    this._shiftLevels();
    return new primitives.common.Rect(0, 0, Math.round(this._getDiagramWidth()), Math.round(this._getDiagramHeight()))
};
primitives.orgdiagram.BaseController.prototype._getDiagramHeight = function () {
    var a = this._treeLevels[this._treeLevels.length - 1];
    return a.shift + a.nextLevelShift
};
primitives.orgdiagram.BaseController.prototype._getDiagramWidth = function () {
    var a = 0,
        b, c;
    b = 0;
    for (c = this._treeLevels.length; b < c; b += 1) a = Math.max(a, this._treeLevels[b].currentOffset);
    return a += this.options.normalItemsInterval
};
primitives.orgdiagram.BaseController.prototype._setOffsets = function () {
    var a, b;
    a = 0;
    for (b = this._treeLevels.length; a < b; a += 1) this._treeLevels[a].currentOffset = 0;
    this._visualTree.hasNodes() && this._setOffset(this._visualTree.node(this._treeLevels[0].treeItems[0]))
};
primitives.orgdiagram.BaseController.prototype._setOffset = function (a) {
    var b = this._treeLevels[a.level],
        c = this._itemsInterval[0 === a.visibility ? b.currentvisibility : a.visibility] / 2,
        d, e, f, g, h, j, i, k, l;
    j = 8 * this.options.linesWidth;
    a.leftPadding = c + (0 < b.currentOffset ? c * a.relationDegree * this.options.cousinsIntervalMultiplier : 0);
    a.rightPadding = c;
    0 != this.options.arrowsDirection && (a.connectorPlacement & 8 && (a.leftPadding += j), a.connectorPlacement & 2 && (a.rightPadding += j));
    a.offset = b.currentOffset + a.leftPadding;
    b.currentOffset =
        a.offset + a.actualSize.width + a.rightPadding;
    if (this._visualTree.hasChildren(a.id))
        if (this._visualTree.loopChildren(this, a.id, function (a, b) {
                this._setOffset(b)
            }), b = this._getChildrenOffset(a), 0 < b) this._offsetItemChildren(a, b);
        else if (0 > b && (b = -b, this._offsetItem(a, b), e = null, f = {}, h = null, c = this._visualTree.parent(a.id), null !== c && (this._visualTree.loopChildrenReversed(this, c.id, function (b, c) {
            if (c === a) e = [];
            else if (null !== e)
                if (g = this._getGapBetweenSiblings(c, a), f[c.id] = g, 0 < g) e.splice(0, 0, c);
                else return h = c, !0
        }), 0 < e.length))) {
        j = null;
        if (null !== h) {
            i = [h];
            i = i.concat(e);
            i.push(a);
            j = [[h]];
            c = 1;
            for (d = i.length; c < d; c += 1) k = i[c - 1], l = i[c], 2 == k.gravity || 1 == l.gravity ? j[j.length - 1].push(l) : j.push([l])
        } else j = [e.slice(0)], j[j.length - 1].push(a);
        if (0 < j.length) {
            e = j[j.length - 1];
            for (c = e.length - 2; 0 <= c; c -= 1) l = e[c], g = f[l.id], b = Math.min(g, b), this._offsetItem(l, b), this._offsetItemChildren(l, b)
        }
        i = b / (j.length - 1);
        for (d = j.length - 2; 0 < d; d -= 1) {
            k = j[d];
            for (c = k.length - 1; 0 <= c; c -= 1) l = k[c], g = f[l.id], b = Math.min(d * i, Math.min(g, b)), this._offsetItem(l,
                b), this._offsetItemChildren(l, b)
        }
    }
};
primitives.orgdiagram.BaseController.prototype._getGapBetweenSiblings = function (a, b) {
    var c = null,
        d = this._getRightMargins(a),
        e = this._getLeftMargins(b),
        f = Math.min(d.length, e.length),
        g, h;
    for (g = 0; g < f && !(h = e[g] - d[g], c = null !== c ? Math.min(c, h) : h, 0 >= h); g += 1);
    return Math.floor(c)
};
primitives.orgdiagram.BaseController.prototype._getRightMargins = function (a) {
    var b = [],
        c, d, e;
    c = this._rightMargins[a];
    void 0 === c && (c = []);
    c = c.slice();
    c.splice(0, 0, a.id);
    a = 0;
    for (d = c.length; a < d; a += 1) e = this._visualTree.node(c[a]), b[a] = e.offset + e.actualSize.width + e.rightPadding;
    return b
};
primitives.orgdiagram.BaseController.prototype._getLeftMargins = function (a) {
    var b = [],
        c, d, e;
    c = this._leftMargins[a];
    void 0 === c && (c = []);
    c = c.slice();
    c.splice(0, 0, a.id);
    a = 0;
    for (d = c.length; a < d; a += 1) e = this._visualTree.node(c[a]), b[a] = e.offset - e.leftPadding;
    return b
};
primitives.orgdiagram.BaseController.prototype._getChildrenOffset = function (a) {
    var b = a.offset + a.actualSize.width / 2,
        c = null,
        d, e;
    if (null === a.visualAggregatorId) switch (d = null, this._visualTree.loopChildren(this, a.id, function (a, b) {
        d = b;
        if (d.connectorPlacement & 1) return !0
    }), e = null, this._visualTree.loopChildrenReversed(this, a.id, function (a, b) {
        e = b;
        if (e.connectorPlacement & 1) return !0
    }), this.options.horizontalAlignment) {
    case 1:
        c = d.offset + d.actualSize.width / 2;
        break;
    case 2:
        c = e.offset + e.actualSize.width / 2;
        break;
    case 0:
        c =
            (d.offset + e.offset + e.actualSize.width) / 2
    } else a = this._visualTree.node(a.visualAggregatorId), c = a.offset + a.actualSize.width / 2;
    return b - c
};
primitives.orgdiagram.BaseController.prototype._offsetItem = function (a, b) {
    a.offset += b;
    var c = this._treeLevels[a.level];
    c.currentOffset = Math.max(c.currentOffset, a.offset + a.actualSize.width)
};
primitives.orgdiagram.BaseController.prototype._offsetItemChildren = function (a, b) {
    var c, d;
    this._visualTree.hasChildren(a.id) && (this._visualTree.loopChildren(this, a.id, function (a, d) {
        c = d;
        c.offset += b;
        this._offsetItemChildren(c, b)
    }), d = this._treeLevels[c.level], d.currentOffset = Math.max(d.currentOffset, c.offset + c.actualSize.width))
};
primitives.orgdiagram.BaseController.prototype._stretchToWidth = function (a, b) {
    var c;
    switch (this.options.horizontalAlignment) {
    case 1:
        c = 0;
        break;
    case 2:
        c = b - a;
        break;
    case 0:
        c = (b - a) / 2
    }
    0 < c && this._visualTree.loop(this, function (a, b) {
        b.offset += c
    })
};
primitives.orgdiagram.BaseController.prototype._recalcItemsSize = function () {
    var a, b, c, d, e, f, g;
    a = 0;
    for (b = this._treeLevels.length; a < b; a += 1) {
        f = this._treeLevels[a];
        g = f.treeItems;
        c = 0;
        for (d = g.length; c < d; c += 1) e = this._visualTree.node(g[c]), e.setActualSize(f, this.options)
    }
};
primitives.orgdiagram.BaseController.prototype._recalcLevelsDepth = function () {
    var a, b, c, d, e, f, g, h, j, i, k;
    a = 0;
    for (b = this._treeLevels.length; a < b; a += 1) {
        g = this._treeLevels[a];
        f = g.treeItems;
        c = 0;
        for (d = f.length; c < d; c += 1);
    }
    a = 0;
    for (b = this._treeLevels.length; a < b; a += 1) {
        g = this._treeLevels[a];
        g.shift = 0;
        g.depth = 0;
        g.partnerConnectorOffset = 0;
        g.actualVisibility = 4;
        f = g.treeItems;
        j = [];
        k = i = null;
        c = 0;
        for (d = f.length; c < d; c += 1) {
            e = this._visualTree.node(f[c]);
            g.depth = Math.max(g.depth, e.actualSize.height);
            switch (e.actualVisibility) {
            case 2:
            case 3:
            case 4:
                k = !k ? e.actualSize.height : Math.min(k, e.actualSize.height);
                break;
            default:
                i = !i ? e.actualSize.height : Math.min(i, e.actualSize.height)
            }
            g.actualVisibility = Math.min(g.actualVisibility, e.actualVisibility);
            (0 < e.partners.length || 0 < e.extraPartners.length) && j.push(new primitives.common.StackSegment(e))
        }
        null == i && (i = g.depth);
        null != k && k > i && (i = k);
        switch (this.options.verticalAlignment) {
        case 0:
            g.horizontalConnectorsDepth = i / 2;
            break;
        case 1:
            g.horizontalConnectorsDepth = g.depth / 2;
            break;
        case 2:
            g.horizontalConnectorsDepth = g.depth -
                i / 2
        }
        if (0 < j.length) {
            c = 0;
            for (d = j.length; c < d; c += 1) {
                i = j[c];
                k = i.context.partners.slice(0).concat(i.context.extraPartners);
                e = 0;
                for (f = k.length; e < f; e += 1) h = this._visualTree.node(k[e]), h = h.offset + h.actualSize.width / 2, i.startIndex = null != i.startIndex ? Math.min(i.startIndex, h) : h, i.endIndex = null != i.endIndex ? Math.max(i.endIndex, h) : h
            }
            g.partnerConnectorOffset = primitives.common.stackSegments(j, function (a, b) {
                a.context.partnerConnectorOffset = b
            })
        }
    }
};
primitives.orgdiagram.BaseController.prototype._shiftLevels = function () {
    var a = this.options.lineLevelShift,
        b, c, d, e = 0,
        f = 0;
    b = 8 * this.options.linesWidth;
    switch (this.options.arrowsDirection) {
    case 1:
        e = b;
        f = 0;
        break;
    case 2:
        e = 0, f = b
    }
    b = 0;
    for (c = this._treeLevels.length; b < c; b += 1) d = this._treeLevels[b], a += d.setShift(a, this._getLevelSpace(d.actualVisibility), f, e)
};
primitives.orgdiagram.BaseController.prototype._getLevelSpace = function (a) {
    var b = 0;
    switch (a) {
    case 1:
        b = this.options.normalLevelShift;
        break;
    case 2:
        b = this.options.dotLevelShift;
        break;
    case 3:
    case 4:
        b = this.options.lineLevelShift
    }
    return b
};
primitives.orgdiagram.BaseController.prototype._virtualReadTemplates = function () {
    var a, b = new primitives.orgdiagram.TemplateConfig,
        c;
    this._templates = {};
    a = new primitives.orgdiagram.Template(b, b);
    a.name = this.widgetEventPrefix + "Template";
    a.createDefaultTemplates();
    this._templates[a.name] = a;
    for (a = 0; a < this.options.templates.length; a += 1) c = this.options.templates[a], c = new primitives.orgdiagram.Template(c, b), c.createDefaultTemplates(), this._templates[c.name] = c
};
primitives.orgdiagram.BaseController.prototype._onDefaultTemplateRender = function (a, b) {
    var c = b.context,
        d = null != c.itemTitleColor ? c.itemTitleColor : "#4169e1",
        e = primitives.common.highestContrast(d, this.options.itemTitleSecondFontColor, this.options.itemTitleFirstFontColor);
    b.element.find("[name=titleBackground]").css({
        background: d
    });
    b.element.find("[name=photo]").attr({
        src: c.image,
        alt: c.title
    });
    b.element.find("[name=title]").css({
        color: e
    }).text(c.title);
    b.element.find("[name=description]").text(c.description)
};
primitives.orgdiagram.BaseController.prototype._createCheckBoxTemplate = function () {
    var a = jQuery("<div></div>");
    a.addClass("bp-item bp-selectioncheckbox-frame");
    a.append(jQuery('<label><nobr><input type="checkbox" name="checkbox" class="bp-selectioncheckbox" />&nbsp;<span name="selectiontext" class="bp-selectiontext">' + this.options.selectCheckBoxLabel + "</span></nobr></label>"));
    this._checkBoxTemplate = a.wrap("<div>").parent().html();
    this._checkBoxTemplateHashCode = primitives.common.hashCode(this._checkBoxTemplate)
};
primitives.orgdiagram.BaseController.prototype._onCheckBoxTemplateRender = function (a, b) {
    b.element.find("[name=checkbox]").prop("checked", b.isSelected)
};
primitives.orgdiagram.BaseController.prototype._createGroupTitleTemplate = function () {
    var a = jQuery("<div></div>");
    a.addClass("bp-item bp-corner-all bp-grouptitle-frame");
    this._groupTitleTemplate = a.wrap("<div>").parent().html();
    this._groupTitleTemplateHashCode = primitives.common.hashCode(this._groupTitleTemplate)
};
primitives.orgdiagram.BaseController.prototype._onGroupTitleTemplateRender = function (a, b) {
    var c = new primitives.text.Config,
        d = null != b.itemConfig.groupTitleColor ? b.itemConfig.groupTitleColor : "#4169e1";
    c.orientation = 2;
    c.horizontalAlignment = 0;
    c.verticalAlignment = 1;
    c.text = b.itemConfig.groupTitle;
    c.fontSize = "12px";
    c.color = primitives.common.highestContrast(d, this.options.itemTitleSecondFontColor, this.options.itemTitleFirstFontColor);
    c.fontFamily = "Arial";
    switch (b.renderingMode) {
    case 0:
        b.element.bpText(c);
        break;
    case 1:
        b.element.bpText("option", c), b.element.bpText("update")
    }
    primitives.common.css(b.element, {
        background: d
    })
};
primitives.orgdiagram.BaseController.prototype._createButtonsTemplate = function () {
    var a = jQuery("<ul></ul>");
    a.css({
        position: "absolute"
    }).addClass("ui-widget ui-helper-clearfix");
    this._buttonsTemplate = a.wrap("<div>").parent().html();
    this._buttonsTemplateHashCode = primitives.common.hashCode(this._buttonsTemplate)
};
primitives.orgdiagram.BaseController.prototype._onButtonsTemplateRender = function (a, b) {
    var c = 0,
        d, e, f, g;
    switch (b.renderingMode) {
    case 0:
        f = null != b.template.buttons ? b.template.buttons : this.options.buttons;
        for (g = 0; g < f.length; g += 1) d = f[g], e = jQuery('<li data-buttonname="' + d.name + '"></li>').css({
            position: "absolute",
            top: c + "px",
            left: "0px",
            width: d.size.width + "px",
            height: d.size.height + "px",
            padding: "3px"
        }).addClass(this.widgetEventPrefix + "button"), b.element.append(e), e.button({
            icons: {
                primary: d.icon
            },
            text: d.text,
            label: d.label
        }), primitives.common.isNullOrEmpty(d.tooltip) || null != e.tooltip && e.tooltip({
            content: d.tooltip
        }), c += 10 + d.size.height
    }
};
primitives.orgdiagram.BaseController.prototype._createAnnotationLabelTemplate = function () {
    var a = jQuery("<div></div>");
    a.addClass("bp-item bp-corner-all bp-connector-label");
    this._annotationLabelTemplate = a.wrap("<div>").parent().html();
    this._annotationLabelTemplateHashCode = primitives.common.hashCode(this._annotationLabelTemplate)
};
primitives.orgdiagram.BaseController.prototype._onAnnotationLabelTemplateRender = function (a, b) {
    b.element.html(b.context.label)
};
primitives.orgdiagram.BaseController.prototype._createPrintPreviewTemplate = function () {
    var a = jQuery("<div></div>");
    a.addClass("bp-item bp-printpreview");
    this._printPreviewTemplate = a.wrap("<div>").parent().html();
    this._printPreviewTemplateHashCode = primitives.common.hashCode(this._printPreviewTemplate)
};
primitives.orgdiagram.BaseController.prototype._virtualCreateOrgTree = function () {};
primitives.orgdiagram.BaseController.prototype._createVisualTree = function () {
    this._defaultTemplate = this._highlightTreeItem = this._cursorTreeItem = null;
    this._defaultTemplate = this._templates[this.options.defaultTemplateName];
    void 0 === this._defaultTemplate && (this._defaultTemplate = this._templates[this.widgetEventPrefix + "Template"]);
    this._visualTree = primitives.common.tree();
    this._treeItemCounter = 0;
    this._treeItemsByUserId = {};
    this._navigationFamily = primitives.common.family();
    this._treeLevels = [];
    this._leftMargins = {};
    this._rightMargins = {};
    if (this._orgTree.hasNodes() && (this._createVisualTreeItems(), this._treeItemsByUserId.hasOwnProperty(this.options.cursorItem) && (this._cursorTreeItem = this._treeItemsByUserId[this.options.cursorItem], this._cursorTreeItem.isCursor = !0), this._treeItemsByUserId.hasOwnProperty(this.options.highlightItem) && (this._highlightTreeItem = this._treeItemsByUserId[this.options.highlightItem]), this._readVisualTree(), this._updateVisualTreeMargins(), this._addExtraConnections(), this._showSelectedItems(),
            this._virtualShowCursorNeighbours(), this._debug && !this._navigationFamily.validate())) throw "Family tree is broken. Logical child does not reference logical parent.";
};
primitives.orgdiagram.BaseController.prototype._addExtraConnections = function () {
    var a, b, c, d, e, f;
    for (a in this._orgPartners)
        if (this._orgPartners.hasOwnProperty(a) && null != this._orgPartners[a]) {
            c = this._orgPartners[a];
            f = this._treeItemsByUserId[a];
            null != f.partnerAggregatorId && (f = this._visualTree.node(f.partnerAggregatorId));
            d = 0;
            for (e = c.length; d < e; d += 1) {
                b = c[d];
                0 == f.partners.length && f.partners.push(f.id);
                b = this._treeItemsByUserId[b];
                if (!b) throw "Item does not exists!";
                f.extraPartners.push(b.id)
            }
        }
};
primitives.orgdiagram.BaseController.prototype._getNewTreeItem = function (a) {
    var b = new primitives.orgdiagram.TreeItem(this._treeItemCounter),
        c;
    for (c in a) a.hasOwnProperty(c) && (b[c] = a[c]);
    this._treeItemCounter += 1;
    a = a.orgItem;
    null != a && (this._treeItemsByUserId[a.id] = b, c = this._templates[a.templateName], b.template = void 0 !== c ? c : this._defaultTemplate, b.actualHasSelectorCheckbox = this._getSelectionVisibility(this.options.cursorItem == a.id, a.hasSelectorCheckbox, this.options.hasSelectorCheckbox), b.actualHasButtons =
        (0 < this.options.buttons.length || null != b.template.buttons && 0 < b.template.buttons.length) && this._getSelectionVisibility(this.options.cursorItem == a.id, a.hasButtons, this.options.hasButtons), b.actualIsActive = a.isActive && b.template.isActive);
    return b
};
primitives.orgdiagram.BaseController.prototype._createVisualTreeItems = function () {
    var a, b, c, d, e, f, g, h, j, i, k, l, m = {},
        n, p = {},
        q, s, r, t = {},
        u;
    this._orgTree.loopPostOrder(this, function (a, b, c, d) {
        b.hasVisibleChildren = b.isVisible || b.hasVisibleChildren;
        null != d && (d.hasVisibleChildren = d.hasVisibleChildren || b.hasVisibleChildren)
    });
    this._orgTree.loopLevels(this, function (c, g) {
        var i, h, j;
        if (!this.showInvisibleSubTrees && !g.hasVisibleChildren) return this._orgTree.SKIP;
        i = this._treeItemsByUserId[c];
        i || (i = this._getNewTreeItem({
            visibility: 4,
            connectorPlacement: 0,
            parentId: null,
            orgItem: g,
            itemConfig: null,
            actualItemType: 0
        }), this._visualTree.add(null, i.id, i));
        r = s = 0;
        if (null != (f = this._visualTree.indexOf(i.id))) s = f, r = this._visualTree.countSiblings(i.id) - f - 1;
        h = [];
        this._orgTree.loopChildren(this, c, function (c, f) {
            if (this.showInvisibleSubTrees || f.hasVisibleChildren) {
                a = this._getNewTreeItem({
                    orgItem: f,
                    itemConfig: f.context,
                    parentId: i.id,
                    actualItemType: f.itemType
                });
                a.visibility = !a.orgItem.isVisible ? 4 : 0;
                switch (i.actualItemType) {
                case 7:
                case 8:
                case 6:
                    switch (a.actualItemType) {
                    case 7:
                    case 8:
                    case 6:
                        a.actualItemType =
                            2;
                        break;
                    case 0:
                        a.actualItemType = 1
                    }
                }
                switch (a.actualItemType) {
                case 5:
                    this._defineNavigationParent(i, a), a.connectorPlacement = 5, j = this._getNewTreeItem({
                        visibility: 4
                    }), this._visualTree.add(j.id, a.id, a), a = j;
                case 8:
                case 2:
                    b = this._visualTree.parent(i.id);
                    if (i.connectorPlacement & 2) d = this._findLeftSiblingIndex(i), this._visualTree.add(b.id, a.id, a, d + 1), a.connectorPlacement = 6, a.gravity = 2;
                    else if (i.connectorPlacement & 8) e = this._findRightSiblingIndex(i), this._visualTree.add(b.id, a.id, a, e), a.connectorPlacement = 12,
                        a.gravity = 1;
                    else switch (f.adviserPlacementType) {
                    case 2:
                        d = this._findLeftSiblingIndex(i);
                        this._visualTree.add(b.id, a.id, a, d + 1);
                        a.connectorPlacement = 6;
                        a.gravity = 2;
                        break;
                    default:
                        e = this._findRightSiblingIndex(i), this._visualTree.add(b.id, a.id, a, e), a.connectorPlacement = 12, a.gravity = 1
                    }
                    switch (a.actualItemType) {
                    case 8:
                        null != i.parentId ? this._defineNavigationParent(this._visualTree.node(i.parentId), a) : this._defineNavigationParent(i, a, !0);
                        break;
                    case 2:
                        this._defineNavigationParent(i, a)
                    }
                    break;
                case 4:
                    this._defineNavigationParent(i,
                        a), a.connectorPlacement = 5, j = this._getNewTreeItem({
                        visibility: 4
                    }), this._visualTree.add(j.id, a.id, a), a = j;
                case 1:
                    null === i.visualAggregatorId && this._createNewVisualAggregator(i, !1);
                    switch (f.adviserPlacementType) {
                    case 2:
                        this._visualTree.add(i.id, a.id, a, 0);
                        a.connectorPlacement = 6;
                        a.gravity = 2;
                        break;
                    default:
                        this._visualTree.add(i.id, a.id, a), a.connectorPlacement = 12, a.gravity = 1
                    }
                    1 == a.actualItemType && this._defineNavigationParent(i, a);
                    break;
                case 0:
                    h.push(a);
                    this._defineNavigationParent(i, a);
                    break;
                case 7:
                case 6:
                    b =
                        this._visualTree.parent(i.id);
                    if (i.connectorPlacement & 2) this._visualTree.add(b.id, a.id, a, s), a.connectorPlacement = 6, a.gravity = 2;
                    else if (i.connectorPlacement & 8) this._visualTree.add(b.id, a.id, a, this._visualTree.countChildren(b.id) - r), a.connectorPlacement = 12, a.gravity = 1;
                    else {
                        switch (f.adviserPlacementType) {
                        case 2:
                            this._visualTree.add(b.id, a.id, a, s);
                            a.gravity = 2;
                            break;
                        default:
                            this._visualTree.add(b.id, a.id, a, this._visualTree.countChildren(b.id) - r), a.gravity = 1
                        }
                        switch (a.actualItemType) {
                        case 6:
                            a.connectorPlacement =
                                5;
                            break;
                        case 7:
                            a.connectorPlacement = 4
                        }
                    }
                    null != i.parentId ? this._defineNavigationParent(this._visualTree.node(i.parentId), a) : this._defineNavigationParent(i, a, !0)
                }
            }
        });
        switch (i.actualItemType) {
        case 7:
        case 8:
        case 6:
            break;
        default:
            u = [], null != (b = this._visualTree.parent(i.id)) && this._visualTree.loopChildrenRange(this, b.id, s, this._visualTree.countChildren(b.id) - r, function (a, b) {
                    if (b.id == i.id) u.push(b);
                    else switch (b.actualItemType) {
                    case 7:
                    case 8:
                    case 6:
                        this._orgTree.parentid(b.orgItem.id) == i.orgItem.id && u.push(b)
                    }
                }),
                1 < u.length && (t[i.id] = u)
        }
        m[i.id] = [];
        p[i.id] = [];
        this._layoutChildren(i, h, i.orgItem.childrenPlacementType, m[i.id], p[i.id])
    });
    this._orgTree.loopPostOrder(this, function (a) {
        var a = this._treeItemsByUserId[a],
            b, d, e;
        if (null != a) {
            b = p[a.id];
            d = m[a.id];
            i = this._getAssitantsDepth(a);
            if (0 < i && (a.visualDepth = i + 1, null !== a.visualAggregatorId)) {
                c = this._visualTree.node(a.visualAggregatorId);
                e = this._visualTree.hasChildren(c.id);
                for (f = 0; f < i - 1; f += 1) c = this._createNewVisualAggregator(c, !e)
            }
            i = this._getAdvisersDepth(a);
            if (1 < i) {
                a.visualDepth +=
                    i - 1;
                e = this._visualTree.hasChildren(a.id);
                c = a;
                for (f = 0; f < i - 1; f += 1) c = this._createNewVisualAggregator(c, !e)
            }
            k = [];
            f = 0;
            for (g = b.length; f < g; f += 1) {
                q = b[f];
                h = k[f] = 0;
                for (j = q.length; h < j; h += 1) k[f] = Math.max(k[f], this._getItemDepth(q[h]))
            }
            f = 0;
            for (g = k.length; f < g; f += 1)
                if (l = k[f], 1 < l) {
                    h = 0;
                    for (j = d[f].length; h < j; h += 1)
                        if (n = d[f][h], this._visualTree.hasChildren(n.id))
                            for (i = l; 1 < i;) n = this._createNewVisualAggregator(n, !1), i -= 1
                }
            null != t[a.id] && this._layoutPartners(a, t[a.id])
        }
    })
};
primitives.orgdiagram.BaseController.prototype._layoutPartners = function (a, b) {
    var c, d, e, f, g = 0,
        h = [],
        j, i;
    d = 0;
    for (e = b.length; d < e; d += 1) c = b[d], g = Math.max(g, c.visualDepth);
    d = 0;
    for (e = b.length; d < e; d += 1) {
        c = b[d];
        j = this._getLastVisualAggregator(c);
        f = 1;
        for (i = c; null != i.visualAggregatorId;) i = this._visualTree.node(i.visualAggregatorId), i.connectorPlacement = 5, f += 1;
        for (; f < g;) j = this._createNewVisualAggregator(j, !1), f += 1;
        h.push(this._getLastVisualAggregator(j).id)
    }
    i = this._getLastVisualAggregator(a);
    if (this._visualTree.hasChildren(i.id)) {
        j =
            b[Math.floor(b.length / 2)];
        if (1 < b.length && 0 == b.length % 2) {
            d = this._visualTree.parent(j.id);
            e = this._findLeftSiblingIndex(j);
            f = this._visualTree.getChild(d.id, e).gravity || this._visualTree.getChild(d.id, e + 1).gravity;
            j = this._getNewTreeItem({
                visibility: 4,
                connectorPlacement: j.connectorPlacement & 10,
                gravity: f
            });
            this._visualTree.add(d.id, j.id, j, e + 1);
            for (f = 1; f < g;) j = this._createNewVisualAggregator(j, !1), j.connectorPlacement = 0, f += 1
        }
        d = 0;
        for (e = b.length; d < e; d += 1) c = b[d], this._navigationFamily.loopChildren(this, a.id,
            function (b, d) {
                switch (d.actualItemType) {
                case 5:
                case 2:
                case 4:
                case 1:
                    break;
                default:
                    a.id != c.id && this._defineNavigationParent(c, d)
                }
                return this._navigationFamily.SKIP
            });
        j = this._getLastVisualAggregator(j);
        this._visualTree.moveChildren(i.id, j.id)
    }
    j.partners = h;
    a.partnerAggregatorId = j.id
};
primitives.orgdiagram.BaseController.prototype._defineNavigationParent = function () {};
primitives.orgdiagram.BaseController.prototype._getLastVisualAggregator = function (a) {
    for (; null != a.visualAggregatorId;) a = this._visualTree.node(a.visualAggregatorId);
    return a
};
primitives.orgdiagram.BaseController.prototype._getAdvisersDepth = function (a) {
    var b = 0,
        c = this._visualTree.parent(a.id),
        d, e;
    if (null !== c) {
        a = this._visualTree.indexOf(a.id);
        for (d = 1; null != (e = this._visualTree.getChild(c.id, a + d));)
            if (e.connectorPlacement & 8) b = Math.max(b, this._getItemDepth(e)), d += 1;
            else break;
        for (d = 1; null != (e = this._visualTree.getChild(c.id, a - d));)
            if (e.connectorPlacement & 2) b = Math.max(b, this._getItemDepth(e)), d += 1;
            else break
    }
    return b
};
primitives.orgdiagram.BaseController.prototype._getAssitantsDepth = function (a) {
    var b = 0;
    null != a.visualAggregatorId && this._visualTree.loopLevels(this, a.id, function (c, d, e) {
        if (a.visualAggregatorId == c) return this._visualTree.SKIP;
        b = e + 1
    });
    return b
};
primitives.orgdiagram.BaseController.prototype._getItemDepth = function (a) {
    var b = 0;
    this._visualTree.loopLevels(this, a.id, function (a, d, e) {
        b = e + 1
    });
    return b + 1
};
primitives.orgdiagram.BaseController.prototype._layoutChildren = function (a, b, c, d, e) {
    var f, g, h, j, i, k, l, m, n = 4 == a.visibility && 0 == a.connectorPlacement;
    switch (this.options.horizontalAlignment) {
    case 0:
    case 1:
        g = 3;
        break;
    case 2:
        g = 2
    }
    0 === c && (c = this._hasRegularLeavesOnly(this._orgTree, a) ? 0 === this.options.leavesPlacementType ? 3 : this.options.leavesPlacementType : 0 === this.options.childrenPlacementType ? 2 : this.options.childrenPlacementType);
    f = a;
    null !== a.visualAggregatorId && (f = this._visualTree.node(a.visualAggregatorId));
    3 == c && 3 > b.length && (c = 2);
    switch (c) {
    case 2:
        c = 0;
        for (j = b.length; c < j; c += 1) a = b[c], this._visualTree.add(f.id, a.id, a), a.connectorPlacement = (a.orgItem.hideParentConnection ? 0 : 1) | (a.orgItem.hideChildrenConnection ? 0 : 4), 0 == c && (a.relationDegree = 1);
        break;
    case 3:
        j = Math.min(this.options.maximumColumnsInMatrix, Math.ceil(Math.sqrt(b.length)));
        i = Math.ceil(b.length / j);
        k = Math.ceil(j / 2);
        for (l = 0; l < k; l += 1) {
            g = f;
            for (m = 0; m < i; m += 1) {
                a = this._getMatrixItem(b, 2 * l, m, j);
                c = this._getMatrixItem(b, 2 * l + 1, m, j);
                void 0 === d[m] && (d[m] = [], e[m] = []);
                null !== a && (0 == l && (a.relationDegree = 1), this._visualTree.add(g.id, a.id, a), a.connectorPlacement = (n ? 0 : 2) | 4, a.gravity = 2, e[m].push(a));
                if (null !== a || null !== c) h = this._getNewTreeItem({
                    visibility: 4,
                    connectorPlacement: n ? 0 : 5
                }), this._visualTree.add(g.id, h.id, h), d[m].push(h);
                null !== c && (this._visualTree.add(g.id, c.id, c), c.connectorPlacement = (n ? 0 : 8) | 4, c.gravity = 1, e[m].push(c));
                g = h
            }
        }
        2 < j && (f.visualAggregatorId = null);
        break;
    case 1:
        c = 0;
        for (j = b.length; c < j; c += 1) {
            a = b[c];
            h = this._getNewTreeItem({
                visibility: 4,
                connectorPlacement: n ?
                    0 : 5
            });
            f.visualAggregatorId = h.id;
            switch (g) {
            case 2:
                this._visualTree.add(f.id, a.id, a);
                this._visualTree.add(f.id, h.id, h);
                a.connectorPlacement = (n ? 0 : 2) | 4;
                a.gravity = 2;
                break;
            case 3:
                this._visualTree.add(f.id, h.id, h), this._visualTree.add(f.id, a.id, a), a.connectorPlacement = (n ? 0 : 8) | 4, a.gravity = 1
            }
            d[c] = [h];
            e[c] = [a];
            f = h
        }
    }
};
primitives.orgdiagram.BaseController.prototype._getMatrixItem = function (a, b, c, d) {
    0 < d % 2 && (b === d - 1 ? b = a.length : b === d && (b = d - 1));
    b = c * d + b;
    return b > a.length - 1 ? null : a[b]
};
primitives.orgdiagram.BaseController.prototype._hasRegularLeavesOnly = function (a, b) {
    var c = !1,
        d = !0;
    null !== b.orgItem && a.loopChildren(this, b.orgItem.id, function (b, f) {
        c = !0;
        if (0 === f.itemType && a.hasChildren(b)) return d = !1, !0
    });
    return c && d
};
primitives.orgdiagram.BaseController.prototype._findLeftSiblingIndex = function (a) {
    var b = null,
        c = {},
        d = this._visualTree.parent(a.id);
    this._visualTree.loopChildrenReversed(this, d.id, function (d, f, g) {
        if (null === b) d == a.id && (b = -1, c[a.id] = !0, this._navigationFamily.loopChildren(this, a.id, function (a, b, d) {
            if (0 < d) return this._navigationFamily.BREAK;
            c[a] = !0
        }));
        else if (c.hasOwnProperty(d)) this._navigationFamily.loopChildren(this, f.id, function (a, b, d) {
            if (0 < d) return this._navigationFamily.BREAK;
            c[a] = !0
        });
        else return b =
            g, !0
    });
    return b
};
primitives.orgdiagram.BaseController.prototype._findRightSiblingIndex = function (a) {
    var b = null,
        c = {},
        d = this._visualTree.parent(a.id);
    this._visualTree.loopChildren(this, d.id, function (d, f, g, h) {
        if (null === b) d == a.id && (b = h + 1, c[a.id] = !0, this._navigationFamily.loopChildren(this, a.id, function (a, b, d) {
            if (0 < d) return this._navigationFamily.BREAK;
            c[a] = !0
        }));
        else if (c.hasOwnProperty(d)) this._navigationFamily.loopChildren(this, d, function (a, b, d) {
            if (0 < d) return this._navigationFamily.BREAK;
            c[a] = !0
        });
        else return b = g, !0
    });
    return b
};
primitives.orgdiagram.BaseController.prototype._createNewVisualAggregator = function (a, b) {
    var c;
    c = this._getNewTreeItem({
        visibility: 4,
        visualAggregatorId: a.visualAggregatorId,
        connectorPlacement: 4 == a.visibility && 0 == a.connectorPlacement || b ? 0 : 5
    });
    this._visualTree.insert(a.id, c.id, c);
    a.visualAggregatorId = c.id;
    return c
};
primitives.orgdiagram.BaseController.prototype._readVisualTree = function () {
    this._visualTree.loopLevels(this, function (a, b, c) {
        var d = this._treeLevels[c];
        void 0 === d && (d = this._treeLevels[c] = new primitives.orgdiagram.TreeLevel(c));
        d.treeItems.push(a);
        b.actualIsActive && 4 != b.visibility && d.activeTreeItems.push(a);
        b.level = c;
        b.levelPosition = d.treeItems.length - 1
    })
};
primitives.orgdiagram.BaseController.prototype._updateVisualTreeMargins = function () {
    this._leftMargins = {};
    this._rightMargins = {};
    this._visualTree.loop(this, function (a) {
        this._leftMargins[a] = [];
        this._rightMargins[a] = []
    });
    this._visualTree.loopPostOrder(this, function (a, b, c) {
        var d = this._leftMargins[c],
            e = this._rightMargins[c],
            f = this._leftMargins[a],
            a = this._rightMargins[a],
            g;
        if (null != c) {
            d[0] || (d[0] = b);
            c = 0;
            for (g = f.length; c < g; c += 1) d[c + 1] || (d[c + 1] = f[c]);
            e[0] = b;
            c = 0;
            for (g = a.length; c < g; c += 1) e[c + 1] = a[c]
        }
    })
};
primitives.orgdiagram.BaseController.prototype._showSelectedItems = function () {
    var a, b, c, d = [],
        e = {};
    b = 0;
    for (c = this.options.annotations.length; b < c; b += 1) a = this.options.annotations[b], a.selectItems && (null != a.fromItem && d.push(a.fromItem), null != a.toItem && d.push(a.toItem), null != a.items && 0 < a.items.length && (d = d.concat(a.items)));
    b = 0;
    for (c = d.length; b < c; b += 1) a = this._treeItemsByUserId[d[b]], null != a && 0 === a.visibility && (a.visibility = 1);
    b = 0;
    for (c = this.options.selectedItems.length; b < c; b += 1)
        if (a = this._treeItemsByUserId[this.options.selectedItems[b]],
            null != a && (a.isSelected = !0, !e[a.id])) switch (0 === a.visibility && (a.visibility = 1), this.options.selectionPathMode) {
        case 1:
            this._navigationFamily.loopParents(this, a.id, function (a, b) {
                if (null != e[a]) return this._navigationFamily.SKIP;
                e[a] = !0;
                0 === b.visibility && (b.visibility = 1)
            })
        }
};
primitives.orgdiagram.BaseController.prototype._virtualShowCursorNeighbours = function () {};
primitives.orgdiagram.BaseController.prototype._getSelectionVisibility = function (a, b, c) {
    var d = !1;
    switch (b) {
    case 0:
        switch (c) {
        case 0:
            d = a;
            break;
        case 1:
            d = !0;
            break;
        case 2:
            d = !1
        }
        break;
    case 1:
        d = !0;
        break;
    case 2:
        d = !1
    }
    return d
};
primitives.common.StackSegment = function (a, b, c) {
    this.context = a;
    this.startIndex = b;
    this.endIndex = c
};
primitives.common.StackSegment.prototype.toString = function () {
    return "[" + Math.round(this.startIndex) + " - " + Math.round(this.endIndex) + "]"
};
primitives.common.perimeter.Item = function (a, b) {
    var c, d, e;
    this.id = a;
    this.segments = new primitives.common.LinkedHashItems;
    if (null != b) {
        c = 0;
        for (d = b.length; c < d; c += 1) e = b[c], this.segments.add(e.key, e)
    }
};
primitives.common.perimeter.Manager = function (a) {
    function b(a) {
        var b, g, h;
        b = 0;
        for (g = a.length; b < g; b += 1) h = a[b], c[h.id] = h, h.segments.iterate(function (a) {
            d[a.key] = h
        })
    }
    var c = {},
        d = {};
    null != a && b(a);
    return {
        add: b,
        getMergedPerimeters: function (a) {
            var b = [],
                g = {},
                h, j, i, k, l, m;
            h = 0;
            for (j = a.length; h < j; h += 1) i = a[h], g[i] = !c.hasOwnProperty(i);
            h = 0;
            for (j = a.length; h < j; h += 1)
                if (i = a[h], !g[i]) {
                    g[i] = !0;
                    k = new primitives.common.perimeter.Item(i);
                    i = c[i];
                    i.segments.iterate(function (a) {
                        k.segments.add(a.key, a)
                    });
                    b.push(k);
                    for (l = k.segments.startKey(); null !=
                        l;) {
                        m = k.segments.item(l);
                        d.hasOwnProperty(m.oppositeKey) && (i = d[m.oppositeKey], g.hasOwnProperty(i.id) && !g[i.id] && (g[i.id] = !0, i.segments.iterateBack(function (a) {
                            a.key != m.oppositeKey && k.segments.insertAfter(l, a.key, a)
                        }, m.oppositeKey, null), i.segments.iterateBack(function (a) {
                            k.segments.insertAfter(l, a.key, a)
                        }, null, m.oppositeKey)));
                        i = k.segments;
                        for (var n = m, p = i.nextKey(n.key), q = void 0; null != n && n.oppositeKey == (q = p || i.startKey());) null != p && (p = i.nextKey(p)), i.remove(n.key), i.remove(q), n = i.item(null != p ? i.prevKey(p) :
                            i.endKey());
                        l = p
                    }
                }
            return b
        }
    }
};
primitives.common.perimeter.SegmentItem = function (a, b, c, d) {
    this.toPoint = this.fromPoint = null;
    switch (arguments.length) {
    case 2:
        this.fromPoint = a;
        this.toPoint = b;
        break;
    case 4:
        this.fromPoint = new primitives.common.Point(a, b), this.toPoint = new primitives.common.Point(c, d)
    }
    var e = this.fromPoint.toString(),
        f = this.toPoint.toString();
    if (e == f) throw "Null length segment!";
    this.key = e + " - " + f;
    this.oppositeKey = f + " - " + e;
    this.orientationType = null;
    this.orientationType = this.fromPoint.y > this.toPoint.y ? 3 : this.fromPoint.y < this.toPoint.y ?
        2 : this.fromPoint.x > this.toPoint.x ? 0 : 1
};
primitives.common.mergeSort = function (a, b, c) {
    var d = null,
        e, f, g, h, j, i, k, l, m, n, p, q;
    switch (a.length) {
    case 0:
        d = [];
        break;
    default:
        d = [];
        for (g = 0; g < a.length; g += 1) {
            e = a[g];
            f = [];
            i = d.length;
            k = e.length;
            j = h = 0;
            p = m = n = l = null;
            0 < i && (l = d[h], n = !b ? l : b(l));
            0 < k && (m = e[j], p = !b ? m : b(m));
            for (q = null; h < i || j < k;)
                if (h >= i) {
                    if (!c || q != m) f.push(m), q = m;
                    j += 1;
                    j < k && (m = e[j], p = !b ? m : b(m))
                } else if (j >= k) {
                if (!c || q != l) f.push(l), q = l;
                h += 1;
                h < i && (l = d[h], n = !b ? l : b(l))
            } else if (n < p) {
                if (!c || q != l) f.push(l), q = l;
                h += 1;
                h < i && (l = d[h], n = !b ? l : b(l))
            } else {
                if (!c || q != m) f.push(m),
                    q = m;
                j += 1;
                j < k && (m = e[j], p = !b ? m : b(m))
            }
            d = f
        }
    }
    return d
};
primitives.common.stackSegments = function (a, b) {
    var c = 0,
        d, e, f, g, h, j, i, k = [],
        l, m, n, p, q, s, r = {};
    a.sort(function (a, b) {
        return a.endIndex - a.startIndex - (b.endIndex - b.startIndex)
    });
    g = 0;
    for (h = a.length; g < h; g += 1) {
        f = a[g];
        e = d = 0;
        n = f.startIndex;
        r[n] = d + 1;
        p = f.endIndex;
        r[p] = e;
        i = k.length;
        if (0 < i) {
            l = [];
            s = q = !1;
            for (j = 0; j < i; j += 1) m = k[j], m < n ? (l.push(m), d = r[m], e = r[m]) : m < p ? (q || (l.push(n), q = !0), d = Math.max(d, r[m]), e = r[m]) : (q || (l.push(n), q = !0), s || (l.push(p), s = !0, r[n] = d + 1, r[p] = e), l.push(m));
            q || (l.push(n), q = !0);
            s || (l.push(p), s = !0, r[n] =
                d + 1, r[p] = e);
            k = l
        } else k = [n, p];
        b(f, r[n]);
        c = Math.max(c, r[n])
    }
    return c
};
primitives.common.binarySearch = function (a, b) {
    var c = null,
        d, e, f = 0,
        g = a.length - 1,
        h, j;
    if (0 < a.length && (c = a[f], d = b(c), 0 < d))
        if (e = Math.abs(d), j = a[g], d = b(j), 0 <= d) c = j;
        else {
            d = Math.abs(d);
            e > d && (e = d, c = j);
            for (; f + 1 < g;)
                if (h = Math.round((f + g) / 2), j = a[h], d = b(j), 0 == d) {
                    c = j;
                    break
                } else 0 < d ? f = h : g = h, d = Math.abs(d), e > d && (e = d, c = j)
        }
    return c
};
primitives.common.family = function () {
    function a(a, b, c, d) {
        var e;
        if (null != d && (b = b[c], null != b))
            for (e in b)
                if (b.hasOwnProperty(e) && d.call(a, e)) break
    }

    function b(a, b) {
        var c = !1;
        null != s[a] && null != s[a][b] && (delete s[a][b], r[a] -= 1, delete t[b][a], u[b] -= 1, r[a] || (delete s[a], delete r[a]), t[b] || (delete t[b], delete u[b], null == p[null] && (p[null] = {}, q[null] = 0), p[null][b] = !0, q[null] += 1), c = !0);
        return c
    }

    function c(a, b) {
        var c;
        if (null != b)
            for (c in v)
                if (v.hasOwnProperty(c) && b.call(a, c, v[c])) break
    }

    function d(b, c, d, e) {
        for (var f,
                g, i = {}, h = 0, j = !0; j;) {
            f = {};
            j = !1;
            for (g in d)
                if (d.hasOwnProperty(g) && !i[g]) switch (i[g] = !0, e.call(b, g, v[g], h)) {
                case w:
                    f = {};
                    j = !1;
                    break;
                case x:
                    break;
                default:
                    a(this, c, g, function (a) {
                        i[a] || (j = f[a] = !0)
                    })
                }
                d = f;
            h += 1
        }
    }

    function e(a, b, c) {
        null != c && null != b && (null != v[b] && null != s[b]) && d(a, s, s[b], c)
    }

    function f(a, b, c) {
        null != c && null != b && (null != v[b] && null != t[b]) && d(a, t, t[b], c)
    }

    function g(b, c, d, e, f, g) {
        var i, h, j, k;
        if (null != g) {
            c = [];
            h = {};
            for (i in v) v.hasOwnProperty(i) && (h[i] = d[i] || 0, h[i] || c.push(i));
            for (k = 0; 0 < c.length;) {
                j = [];
                d = 0;
                for (f = c.length; d < f; d += 1) {
                    i = c[d];
                    if (g.call(b, i, v[i], k)) {
                        j = [];
                        break
                    }
                    k += 1;
                    a(this, e, i, function (a) {
                        h[a] -= 1;
                        0 == h[a] && j.push(a)
                    })
                }
                c = j
            }
        }
    }

    function h(a, b) {
        g(a, t, u, s, r, b)
    }

    function j(a, b) {
        g(a, s, r, t, u, b)
    }

    function i(a, b, c, d, e, f, g, i, h) {
        var j = !1,
            k, l;
        if (null != v[a] && null != g[a]) {
            j = !0;
            if (h) {
                h = 0;
                for (k = b.length; h < k; h += 1)
                    if (l = b[h], null == v[l] || null == g[a][l]) j = !1
            }
            if (j && (null != d && (v[c] = d), null != v[c])) {
                e[c] || (e[c] = {}, f[c] = 0);
                g[c] || (g[c] = {}, i[c] = 0);
                e[c][a] || (e[c][a] = !0, f[c] += 1);
                g[a][c] || (g[a][c] = !0, i[a] += 1);
                h = 0;
                for (k = b.length; h <
                    k; h += 1) l = b[h], c != l && (null != g[a][l] && (delete g[a][l], i[a] -= 1), null != e[l][a] && (delete e[l][a], f[l] -= 1), e[l][c] || (e[l][c] = !0, f[l] += 1), g[c][l] || (g[c][l] = !0, i[c] += 1))
            }
        }
        return j
    }

    function k(a, b, c, d) {
        return i(a, b, c, d, t, u, s, r, !0)
    }

    function l() {
        this.key = this.id = "";
        this.children = [];
        this.childrenHash = {};
        this.processed = !1
    }

    function m(a) {
        this.items = [];
        this.difference = this.weight = 0;
        0 < arguments.length && (this.difference = a)
    }

    function n(b) {
        var c = primitives.common.graph(),
            d, e, f, g, i, h, j, k, l = {};
        for (d in b) b.hasOwnProperty(d) &&
            a(this, s, d, function (d) {
                if (!l.hasOwnProperty(d)) {
                    l[d] = !0;
                    e = [];
                    a(this, t, d, function (a) {
                        e.push(a)
                    });
                    f = 0;
                    for (i = e.length; f < i - 1; f += 1)
                        if (h = e[f], b.hasOwnProperty(h))
                            for (g = f + 1; g < i; g += 1)
                                if (j = e[g], b.hasOwnProperty(j)) {
                                    k = Math.abs(b[h].children.length - b[j].children.length);
                                    var n = c.edge(h, j);
                                    null == n && (n = new m(k), c.addEdge(h, j, n));
                                    n.items.push(d);
                                    n.weight += 1
                                }
                }
            });
        return c
    }
    var p = {},
        q = {},
        s = {},
        r = {},
        t = {},
        u = {},
        v = {},
        w = 1,
        x = 2;
    return {
        add: function (b, c, d) {
            var e, f, g = {};
            if (!b || 0 == b.length) b = [null];
            if (null == v[c] && null != d) {
                v[c] =
                    d;
                d = 0;
                for (e = b.length; d < e; d += 1) f = b[d], null == g[f] && f != c && (g[f] = !0, null != v[f] ? (null == t[c] && (t[c] = {}, u[c] = 0), t[c][f] || (t[c][f] = !0, u[c] += 1), null == s[f] && (s[f] = {}, r[f] = 0), s[f][c] || (s[f][c] = !0, r[f] += 1)) : (null == p[f] && (p[f] = {}, q[f] = 0), p[f][c] || (p[f][c] = !0, q[f] += 1)));
                null != p[c] && (s[c] = p[c], r[c] = q[c], delete p[c], delete q[c], a(this, s, c, function (a) {
                    null == t[a] && (t[a] = {}, u[a] = 0);
                    t[a][c] || (t[a][c] = !0, u[a] += 1)
                }))
            }
        },
        adopt: function (a, b) {
            var c, d, e;
            if (null != v[b]) {
                c = 0;
                for (d = a.length; c < d; c += 1)
                    if (e = a[c], null == t[b] && (t[b] = {}, u[b] = 0), e != b && null != v[e]) t[b][e] || (t[b][e] = !0, u[b] += 1), null == s[e] && (s[e] = {}, r[e] = 0), s[e][b] || (s[e][b] = !0, r[e] += 1);
                    else throw "Item cannot be parent of itself and parent should exist in the structure!";
            } else throw "Child should be in hierarchy!";
        },
        bundleChildren: k,
        bundleParents: function (a, b, c, d) {
            return i(a, b, c, d, s, r, t, u, !0)
        },
        optimizeReferences: function (b) {
            var c = {},
                d = {},
                f = {},
                g, h, j, k, m, p;
            if (null != b) {
                for (g in v) v.hasOwnProperty(g) && (h = new l, a(this, s, g, function (a) {
                    h.children.push(a);
                    h.childrenHash[a] = !0
                }), h.children.sort(), h.id = g, h.key = h.children.join(","), f[h.id] = h);
                for (; !primitives.common.isEmptyObject(f);) {
                    j = {};
                    k = n(f);
                    for (g in f) f.hasOwnProperty(g) && (m = f[g], m.processed || (p = k.getSpanningTree(g, function (a, b) {
                        return a.weight > b.weight ? 1 : a.weight == b.weight ? b.difference - a.difference : -1
                    }), p.loopLevels(this, function (a, g) {
                        f[a].processed = !0;
                        p.loopChildren(this, a, function (h, m) {
                            var n = k.edge(a, h),
                                p = null,
                                q, A, L, y, H;
                            f[h].processed = !0;
                            if (1 < n.weight) {
                                A = n.items.join(",");
                                if (c.hasOwnProperty(A)) p = c[A];
                                else {
                                    q =
                                        b();
                                    v[q.id] = q;
                                    p = new l;
                                    p.id = q.id;
                                    p.key = A;
                                    A = 0;
                                    for (L = n.items.length; A < L; A += 1) p.children.push(n.items[A]), p.childrenHash[n.items[A]] = !0;
                                    p.children.sort();
                                    c[p.key] = p;
                                    d[p.id] = p;
                                    j[p.id] = p;
                                    y = p.children.slice(0);
                                    e(this, g.replacementItem || a, function (a) {
                                        null != d[a] && !p.childrenHash[a] && (H = !0, e(this, a, function (a) {
                                            return !p.childrenHash[a] ? (H = !1, w) : x
                                        }), H && y.push(a));
                                        return x
                                    });
                                    i(g.replacementItem || a, y, p.id, q, t, u, s, r, !1);
                                    if (1 >= (r[a] || 0)) g.replacementItem = p.id
                                }
                                if (p.id != h && (y = p.children.slice(0), e(this, m.replacementItem ||
                                        h,
                                        function (a) {
                                            null != d[a] && !p.childrenHash[a] && (H = !0, e(this, a, function (a) {
                                                return !p.childrenHash[a] ? (H = !1, w) : x
                                            }), H && y.push(a));
                                            return x
                                        }), i(m.replacementItem || h, y, p.id, null, t, u, s, r, !1), 1 >= (r[h] || 0))) m.replacementItem = p.id
                            }
                        })
                    })));
                    f = j
                }
            }
        },
        eliminateManyToMany: function (b) {
            var c, d;
            for (c in s) s.hasOwnProperty(c) && 1 < (r[c] || 0) && a(this, s, c, function (a) {
                if (1 < (u[a] || 0)) d = b(), k(c, [a], d.id, d)
            })
        },
        removeNode: function (b) {
            null != v[b] && (a(this, s, b, function (a) {
                delete t[a][b];
                u[a] -= 1;
                u[a] || (delete t[a], delete u[a], null ==
                    p[null] && (p[null] = {}, q[null] = 0), p[null][a] || (p[null][a] = !0, q[null] += 1))
            }), a(this, t, b, function (a) {
                delete s[a][b];
                r[a] -= 1;
                r[a] || (delete s[a], delete r[a])
            }), null != p[null] && null != p[null][b] && (delete p[null][b], q[null] -= 1, q[null] || (delete p[null], delete q[null])), delete s[b], delete r[b], delete t[b], delete u[b], delete v[b])
        },
        removeRelation: function (a, c) {
            var d = !1;
            null != v[a] && null != v[c] && (d = b(a, c) || b(c, a));
            return d
        },
        node: function (a) {
            return v[a]
        },
        loop: c,
        loopLevels: function (b, c, d) {
            function e() {
                this.items = {};
                this.minimumLevel = null
            }

            function f(a, b, c) {
                var d = n[b];
                d || (d = new e, n[b] = d);
                d.addItemToLevel(a, c);
                x = null == x ? c : Math.min(x, c);
                m[a] = c;
                k[a] = !0
            }
            var g = [],
                i = {},
                k = {},
                l = [],
                m = {},
                n = {},
                p, q, r, u, w, x = null;
            r = c ? h : j;
            var J, D, y, F, B, E, K, I;
            e.prototype.addItemToLevel = function (a, b) {
                var c = this.items[b];
                c ? c.push(a) : (c = [a], this.items[b] = c);
                this.minimumLevel = null == this.minimumLevel ? b : Math.min(this.minimumLevel, b)
            };
            if (null != d) {
                r(this, function (a, b, c) {
                    g.push(a);
                    i[a] = c
                });
                r = 0;
                for (J = g.length; r < J; r += 1)
                    if (p = g[r], null == k[p]) {
                        l.push(p);
                        for (f(p,
                                r, 0); 0 < l.length;) {
                            B = F = y = null;
                            E = !c;
                            K = [];
                            p = 0;
                            for (u = l.length; p < u; p += 1) w = l[p], D = m[w], I = !1, c ? (a(this, t, w, function (a) {
                                var b;
                                if (!k[a] && (I = !0, b = i[a], null == y || !E || y < b || y == b && B > D - 1)) y = b, F = a, B = D - 1, E = !0
                            }), a(this, s, w, function (a) {
                                var b;
                                if (!k[a] && (I = !0, b = i[a], null == y || !E && (y > b || y == b && B < D + 1))) y = b, F = a, B = D + 1, E = !1
                            })) : (a(this, s, w, function (a) {
                                var b;
                                if (!k[a] && (I = !0, b = i[a], null == y || E || y < b || y == b && B < D + 1)) y = b, F = a, B = D + 1, E = !1
                            }), a(this, t, w, function (a) {
                                var b;
                                if (!k[a] && (I = !0, b = i[a], null == y || E && (y > b || y == b && B > D - 1))) y = b, F = a, B = D - 1,
                                    E = !0
                            })), I && K.push(w);
                            null != F && (K.push(F), f(F, r, B));
                            l = K
                        }
                    }
                l = !0;
                for (c = x; l;) {
                    p = {};
                    l = !1;
                    for (q in n)
                        if (n.hasOwnProperty(q) && (r = n[q], u = r.items[r.minimumLevel - x + c], null != u)) {
                            p[q] = r;
                            l = !0;
                            r = 0;
                            for (J = u.length; r < J; r += 1)
                                if (w = u[r], d.call(b, w, v[w], c - x)) return l = !1, !0
                        }
                    n = p;
                    c += 1
                }
            }
        },
        loopTopo: h,
        loopTopoReversed: j,
        loopChildren: e,
        loopParents: f,
        findLargestRoot: function () {
            var a = null,
                b, c = {},
                d = {},
                e;
            b = null;
            j(this, function (g, i) {
                c.hasOwnProperty(g) || (c[g] = {}, d[g] = 0);
                c[g][g] = !0;
                d[g] += 1;
                e = !0;
                f(this, i.id, function (a) {
                    var b, f;
                    e = !1;
                    c.hasOwnProperty(a) || (c[a] = {}, d[a] = 0);
                    if (!d[a] && 1 == u[g]) c[a] = c[g], d[a] = d[g];
                    else
                        for (f in b = c[g], b) b.hasOwnProperty(f) && (c[a][f] = !0, d[a] += 1);
                    return x
                });
                if (e && (!b || d[g] > b)) b = d[g], a = g
            });
            return a
        },
        loopRoots: function (a, b) {
            var c = null,
                d, e = 0,
                g = {},
                i = {},
                h, k = {},
                l = {},
                m, n, p, q, r, s, t;
            j(this, function (a, b) {
                g.hasOwnProperty(a) || (g[a] = {}, i[a] = 0);
                g[a][a] = !0;
                i[a] += 1;
                h = !0;
                f(this, b.id, function (b) {
                    var c, d;
                    h = !1;
                    g.hasOwnProperty(b) || (g[b] = {}, i[b] = 0);
                    if (!i[b] && 1 == u[a]) g[b] = g[a], i[b] = i[a];
                    else
                        for (d in c = g[a], c) c.hasOwnProperty(d) &&
                            !g[b][d] && (g[b][d] = !0, i[b] += 1);
                    return x
                });
                h && (k[a] = !0, e += 1)
            });
            q = {};
            for (p in k)
                if (k.hasOwnProperty(p))
                    for (n in d = g[p], d) d.hasOwnProperty(n) && (q[n] || (q[n] = []), q[n].push(p.toString()));
            for (; 0 < e;) {
                d = null;
                for (m in k)
                    if (k.hasOwnProperty(m) && (!d || i[m] < d)) d = i[m], c = m;
                if (null != c) {
                    null != b && b.call(a, c, v[c]);
                    d = g[c];
                    for (n in d)
                        if (d.hasOwnProperty(n) && !l[n]) {
                            p = q[n];
                            s = 0;
                            for (t = p.length; s < t; s += 1) r = p[s], i[r] -= 1;
                            l[n] = !0
                        }
                    delete k[c];
                    e -= 1
                }
            }
        },
        hasNodes: function () {
            return !primitives.common.isEmptyObject(v)
        },
        hasCommonChild: function (b) {
            var c = !1,
                d, e, f, g, i, h, j;
            d = {};
            g = f = 0;
            for (i = b.length; g < i; g += 1) h = b[g], null != v[h] && !d[h] && (d[h] = !0, f += 1);
            e = {};
            for (h in d) d.hasOwnProperty(h) && a(this, s, h, function (a) {
                e[a] = e[a] ? e[a] + 1 : 1
            });
            for (j in e)
                if (e.hasOwnProperty(j) && null != t[j] && (u[j] || 0) == e[j] && e[j] == f) {
                    c = !0;
                    break
                }
            return c
        },
        loopNeighbours: function (a, b, c) {
            var d = {};
            null != c && (e(this, b, function (b, e) {
                    d.hasOwnProperty(b) || (d[b] = null, c.call(a, b, e, 1) && (d[b] = x, f(this, b, function (b, e) {
                        d.hasOwnProperty(b) || (d[b] = null, c.call(a, b, e, 2) && (d[b] = x));
                        return d[b]
                    })));
                    return d[b]
                }),
                f(this, b, function (b, f) {
                    d.hasOwnProperty(b) || (d[b] = null, c.call(a, b, f, 1) && (d[b] = x, e(this, b, function (b, e) {
                        d.hasOwnProperty(b) || (d[b] = !0, c.call(a, b, e, 2) && (d[b] = x));
                        return d[b]
                    })));
                    return d[b]
                }))
        },
        countChildren: function (a) {
            return r[a] || 0
        },
        countParents: function (a) {
            return u[a] || 0
        },
        firstParent: function (a) {
            var b = null,
                a = t[a] || {};
            for (b in a)
                if (a.hasOwnProperty(b)) return b;
            return null
        },
        firstChild: function (a) {
            var b = null,
                a = s[a] || {};
            for (b in a)
                if (a.hasOwnProperty(b)) return b;
            return null
        },
        validate: function (b) {
            function d(a) {
                var b =
                    0,
                    c;
                if (null != a)
                    for (c in a) a.hasOwnProperty(c) && (b += 1);
                return b
            }
            var e, f;
            c(this, function (c) {
                a(this, s, c, function (a) {
                    if (!t.hasOwnProperty(a) || !t[a].hasOwnProperty(c)) return null != b && (b.message = "Child #" + a + " does not reference parent #" + c), !1
                });
                a(this, t, c, function (a) {
                    if (!s.hasOwnProperty(a) || !s[a].hasOwnProperty(c)) return null != b && (b.message = "Parent #" + a + " does not reference child #" + c), !1
                })
            });
            for (e in t)
                if (t.hasOwnProperty(e)) {
                    if ((u[e] || 0) != d(t[e])) return null != b && (b.message = "Parents count for item #" +
                        e + " missmatch."), !1;
                    if (t.hasOwnProperty(e) && !v.hasOwnProperty(e)) return null != b && (b.message = "Orphant parents for item #" + e), !1
                }
            for (f in s)
                if (s.hasOwnProperty(f)) {
                    if ((r[f] || 0) != d(s[f])) return null != b && (b.message = "Children count for item " + f + " missmatch."), !1;
                    if (s.hasOwnProperty(f) && !v.hasOwnProperty(f)) return null != b && (b.message = "Orphant children of item " + f), !1
                }
            for (f in p)
                if (p.hasOwnProperty(f)) {
                    if ((q[f] || 0) != d(p[f])) return null != b && (b.message = "Root children count for item @" + f + " missmatch."), !1;
                    a(this, p, f, function (a) {
                        if (!v.hasOwnProperty(a)) return null != b && (b.message = "Child #" + a + "of root #" + f + " does not exists."), !1
                    })
                }
            return !0
        },
        clone: function () {
            var a = primitives.common.family();
            c(this, function (b, c) {
                var d = [];
                f(this, b, function (a) {
                    d.push(a);
                    return x
                });
                a.add(d, b, c)
            });
            return a
        },
        BREAK: w,
        SKIP: x
    }
};
primitives.common.graph = function () {
    var a = {};
    return {
        addEdge: function (b, c, d) {
            if ((null == a[b] || null == a[b][c]) && null != d) null == a[b] && (a[b] = {}), a[b][c] = d, null == a[c] && (a[c] = {}), a[c][b] = d
        },
        edge: function (b, c) {
            var d = null;
            null != a[b] && a[b][c] && (d = a[b][c]);
            return d
        },
        getSpanningTree: function (b, c) {
            var d = primitives.common.tree(),
                e = {},
                f, g = [],
                h, j = {},
                i, k, l, m, n, p, q;
            e[b] = !0;
            i = 1;
            j[b] = null;
            for (d.add(null, b.toString(), {}); 0 < i;) {
                g = [];
                m = l = k = null;
                for (f in e)
                    if (e.hasOwnProperty(f)) {
                        n = a[f];
                        h = !1;
                        for (p in n)
                            if (n.hasOwnProperty(p) &&
                                !j.hasOwnProperty(p) && (q = n[p], h = !0, !l || 0 <= c(q, l))) k = p, l = q, m = f;
                        h || g.push(f)
                    }
                if (null == k) break;
                else e[k] = !0, i += 1, j[k] = m, d.add(m, k, {});
                h = 0;
                for (k = g.length; h < k; h += 1) delete e[g[h]], i -= 1
            }
            return d
        },
        getGrowthSequence: function (b) {
            var c = [],
                d, e = {},
                f;
            d = [];
            var g, h = {},
                j = 0,
                i, k, l, m, n, p;
            if (null != b) {
                d = null;
                l = 0;
                m = null;
                for (g in a)
                    if (a.hasOwnProperty(g)) {
                        k = a[g];
                        l = 0;
                        for (i in k) k.hasOwnProperty(i) && (l += b(k[i]));
                        if (l > m || null == m) d = g, m = l
                    }
                if (null != d) {
                    c.push(d);
                    e[d] = !0;
                    j += 1;
                    for (h[d] = null; 0 < j;) {
                        d = [];
                        k = i = null;
                        l = {};
                        for (f in e)
                            if (e.hasOwnProperty(f)) {
                                m =
                                    a[f];
                                g = !1;
                                for (n in m)
                                    if (m.hasOwnProperty(n) && !h.hasOwnProperty(n) && (p = b(m[n]), g = !0, null == l[n] && (l[n] = 0), l[n] += p, !k || l[n] > k)) i = n, k = l[n];
                                g || d.push(f)
                            }
                        if (null == i) break;
                        else e[i] = !0, j += 1, h[i] = !0, c.push(i);
                        g = 0;
                        for (i = d.length; g < i; g += 1) delete e[d[g]], j -= 1
                    }
                }
            }
            return c
        },
        getShortestPath: function (b, c, d) {
            var e = {},
                f = {},
                g = {},
                h, j, i, k, l;
            e[b] = !0;
            h = 1;
            for (f[b] = 0; 0 < h;) {
                j = b = null;
                for (i in e) e.hasOwnProperty(i) && (null == j ? (b = i, j = f[i]) : j > f[i] && (b = i, j = f[i]));
                k = a[b];
                for (i in k) k.hasOwnProperty(i) && (l = j + (null != d ? d(k[i], b, i) :
                    1), f.hasOwnProperty(i) ? f[i] > l && e.hasOwnProperty(i) && (f[i] = l, g[i] = b) : (f[i] = l, g[i] = b, e[i] = !0, h += 1));
                if (b == c) break;
                else delete e[b], h -= 1
            }
            for (d = []; null != c;) d.push(c), c = g[c];
            return d
        }
    }
};
primitives.common.hashSet = function () {
    return {
        addEdge: addEdge,
        edge: edge,
        getSpanningTree: getSpanningTree,
        getGrowthSequence: getGrowthSequence,
        getShortestPath: getShortestPath
    }
};
primitives.common.LinkedHashItems = function () {
    function a(a, b) {
        if (e.hasOwnProperty(a)) throw "Duplicate segments are not supported!";
        e[a] = b;
        f[a] = null;
        null == j ? (h = a, g[a] = null) : (f[j] = a, g[a] = j);
        j = a
    }

    function b(a, b) {
        if (e.hasOwnProperty(a)) throw "Duplicate segments are not supported!";
        e[a] = b;
        g[a] = null;
        null == h ? (j = a, f[a] = null) : (g[h] = a, f[a] = h);
        h = a
    }

    function c(a, b, c, d) {
        var n;
        null == c && (c = a ? h : j);
        if (null != b)
            for (; null != c;) n = e[c], null != n && b(n), c = c == d ? null : a ? f[c] : g[c]
    }

    function d(a, b, d) {
        c(!0, a, b, d)
    }
    var e = {},
        f = {},
        g = {},
        h =
        null,
        j = null;
    return {
        add: a,
        item: function (a) {
            return e[a]
        },
        nextKey: function (a) {
            return f[a]
        },
        prevKey: function (a) {
            return g[a]
        },
        startKey: function () {
            return h
        },
        endKey: function () {
            return j
        },
        unshift: b,
        insertAfter: function (c, d, h) {
            if (e.hasOwnProperty(d)) throw "Duplicate segments are not supported!";
            if (null == c) b(d, h);
            else {
                var j = f[c];
                null == j ? a(d, h) : (e[d] = h, f[c] = d, f[d] = j, g[j] = d, g[d] = c)
            }
        },
        remove: function (a) {
            var b = g[a],
                c = f[a];
            null != b ? f[b] = c : h = c;
            null != c ? g[c] = b : j = b;
            delete e[a];
            delete f[a];
            delete g[a]
        },
        iterate: d,
        iterateBack: function (a,
            b, d) {
            c(!1, a, b, d)
        },
        empty: function () {
            e = {};
            f = {};
            g = {};
            j = h = null
        },
        toArray: function () {
            var a = [];
            d(function (b) {
                a.push(b)
            });
            return a
        },
        validate: function (a) {
            var b, c;
            for (b in e)
                if (e.hasOwnProperty(b) && (!f.hasOwnProperty(b) || !g.hasOwnProperty(b))) return null != a && (a.message = "Orphant key found!"), !1;
            if (!e.hasOwnProperty(h) || !e.hasOwnProperty(j)) return null != a && (a.message = "Start or end values are missing!"), !1;
            for (b in f)
                if (f.hasOwnProperty(b)) {
                    if (!e.hasOwnProperty(b) || !g.hasOwnProperty(b)) return null != a && (a.message =
                        "Orphant key found!"), !1;
                    if ((c = f[b]) && !f.hasOwnProperty(c)) return null != a && (a.message = "Next key not found!"), !1
                }
            for (b in g)
                if (g.hasOwnProperty(b)) {
                    if (!e.hasOwnProperty(b) || !f.hasOwnProperty(b)) return null != a && (a.message = "Orphant key found!"), !1;
                    if ((c = g[b]) && !g.hasOwnProperty(c)) return null != a && (a.message = "Prev key not found!"), !1
                }
            return !0
        }
    }
};
primitives.common.tree = function () {
    function a(a, b, c) {
        var e, g, h;
        if (null != d[b] && (b = f[b], null != b)) {
            g = 0;
            for (h = b.length; g < h && !(e = b[g], c.call(a, e, d[e], g, h - 1)); g += 1);
        }
    }

    function b(a) {
        var b = null;
        null != e[a] && (b = e[a]);
        return b
    }

    function c(a, b) {
        var c, d = a.length;
        for (c = 0; c < d; c += 1)
            if (a[c] == b) return a.splice(c, 1), d - 1;
        return d
    }
    var d = {},
        e = {},
        f = {},
        g = {},
        h = {};
    return {
        loop: function (a, b) {
            var c;
            if (null != b)
                for (c in d)
                    if (d.hasOwnProperty(c) && b.call(a, c, d[c])) break
        },
        loopLevels: function (a, b, c) {
            var e = 0,
                g = [],
                n, p, q, s, r;
            switch (arguments.length) {
            case 2:
                p =
                    b;
                break;
            case 3:
                n = b, p = c
            }
            if (null != p) {
                if (null == n)
                    for (q in h) h.hasOwnProperty(q) && (g = g.concat(h[q]));
                else null != f[n] && (g = g.concat(f[n]));
                for (; 0 < g.length;) {
                    q = [];
                    s = 0;
                    for (r = g.length; s < r; s += 1) switch (n = g[s], p.call(a, n, d[n], e)) {
                    case 1:
                        q = [];
                        break;
                    case 2:
                        break;
                    default:
                        null != f[n] && (q = q.concat(f[n]))
                    }
                    g = q;
                    e += 1
                }
            }
        },
        loopParents: function (a, b, c) {
            if (null != d[b] && null != c)
                for (; null != (b = e[b]) && !c.call(a, b, d[b]););
        },
        loopChildren: a,
        loopChildrenRange: function (a, b, c, e, g) {
            var h;
            if (null != d[b] && (b = f[b], null != b))
                if (c < e) {
                    c = Math.max(c,
                        0);
                    e = Math.min(e, b.length - 1);
                    for (h = c; h <= e && !(c = b[h], g.call(a, c, d[c], h, NaN)); h += 1);
                } else {
                    c = Math.min(c, b.length - 1);
                    e = Math.max(0, e);
                    for (h = c; h >= e && !(c = b[h], g.call(a, c, d[c], h, NaN)); h -= 1);
                }
        },
        loopChildrenReversed: function (a, b, c) {
            var e, g, h;
            if (null != d[b] && (b = f[b], h = b.length - 1, null != b))
                for (g = h; 0 <= g && !(e = b[g], c.call(a, e, d[e], g, h)); g -= 1);
        },
        loopPostOrder: function (a, b) {
            var c = [],
                g, m, n;
            if (null != b) {
                for (g in h) h.hasOwnProperty(g) && (c = c.concat(h[g]));
                for (; 0 < c.length;)
                    if (g = c[c.length - 1], g != m && null != (n = f[g]))
                        for (g = n.length -
                            1; 0 <= g; g -= 1) c.push(n[g]);
                    else if (c.pop(), m = e[g], b.call(a, g, d[g], m, d[m])) break
            }
        },
        loopPreOrder: function (a, b) {
            var c = [],
                g, m, n;
            if (null != b) {
                for (g in h) h.hasOwnProperty(g) && (c = c.concat(h[g]));
                for (; 0 < c.length;) {
                    g = c[c.length - 1];
                    if (g != m && b.call(a, g, d[g], m, d[m])) break;
                    if (g != m && null != (n = f[g]))
                        for (g = n.length - 1; 0 <= g; g -= 1) c.push(n[g]);
                    else c.pop(), m = e[g]
                }
            }
        },
        zipUp: function (a, b, c, d) {
            var f, g;
            if (null != d)
                for (; null != b && null != c && b != c;) {
                    f = e[b];
                    g = e[c];
                    if (d.call(a, b, f, c, g)) break;
                    b = f;
                    c = g
                }
        },
        parentid: b,
        parent: function (a) {
            var b =
                null;
            null != e[a] && (b = d[e[a]]);
            return b
        },
        adopt: function (a, b) {
            if (null != d[a] && null != d[b])
                if (a != b) g.hasOwnProperty(b) && (c(h[g[b]], b) || delete h[g[b]], delete g[b]), e.hasOwnProperty(b) && (c(f[e[b]], b) || delete f[e[b]]), e[b] = a, null != f[a] ? f[a].push(b) : f[a] = [b];
                else throw "Item cannot be parent of itself!";
            else throw "Both parent and child should be in hierarchy!";
        },
        moveChildren: function (b, c) {
            null != d[b] && (null != d[c] && b != c) && null != f[b] && (a(this, b, function (a) {
                e[a] = c
            }), f[c] = null != f[c] ? f[c].concat(f[b]) : f[b], delete f[b])
        },
        node: function (a) {
            return d[a]
        },
        add: function (a, b, c, l) {
            var m;
            if (null != b && (null != c && null == d[b]) && (null != d[a] ? (e[b] = a, null != f[a] ? null == l ? f[a].push(b) : f[a].splice(l, 0, b) : f[a] = [b]) : (g[b] = a, null != h[a] ? null == l ? h[a].push(b) : h[a].splice(l, 0, b) : h[a] = [b]), d[b] = c, null != h[b])) {
                f[b] = h[b];
                delete h[b];
                l = f[b];
                a = 0;
                for (c = l.length; a < c; a += 1) m = l[a], delete g[m], e[m] = b
            }
        },
        insert: function (b, c, g) {
            null != d[b] && (null != c && null == d[c] && null != g) && (d[c] = g, null != f[b] && (f[c] = f[b]), f[b] = [c], a(this, c, function (a) {
                e[a] = c
            }), e[c] = b)
        },
        hasNodes: function () {
            return !primitives.common.isEmptyObject(h)
        },
        hasChildren: function (a) {
            return null != f[a]
        },
        countChildren: function (a) {
            return null != f[a] ? f[a].length : 0
        },
        countSiblings: function (a) {
            a = b(a);
            return null != a ? f[a].length : 0
        },
        indexOf: function (a) {
            var c = b(a);
            return null != c ? primitives.common.indexOf(f[c], a) : null
        },
        getChild: function (a, b) {
            var c = null,
                e;
            if (null != (e = f[a])) c = d[e[b]];
            return c
        },
        arrangeChildren: function (a, b) {
            var c, g, h, b = b.slice(0);
            if (null != d[a])
                if (null != f[a])
                    if (f[a].length == b.length) {
                        g = 0;
                        for (h = b.length; g < h; g += 1)
                            if (c = b[g], e[c] != a) throw "Child " + c + " does not belong to given node!";
                        f[a] = b
                    } else throw "Collections of children don't match each other!";
            else if (0 < b.length) throw "Collections of children don't match each other!";
        },
        validate: function () {
            var a = !0,
                b;
            for (b in g)
                if (g.hasOwnProperty(b) && null != g[b]) {
                    a = !1;
                    break
                }
            return a
        },
        BREAK: 1,
        SKIP: 2
    }
};
primitives.callout.Config = function () {
    this.classPrefix = "bpcallout";
    this.graphicsType = 1;
    this.actualGraphicsType = null;
    this.pointerPlacement = 0;
    this.snapPoint = this.position = null;
    this.cornerRadius = "10%";
    this.offset = 0;
    this.lineWidth = this.opacity = 1;
    this.lineType = 0;
    this.pointerWidth = "10%";
    this.borderColor = "#000000";
    this.fillColor = "#d3d3d3"
};
primitives.callout.Controller = function () {
    this.widgetEventPrefix = "bpcallout";
    this.options = new primitives.callout.Config;
    this.m_shape = this.m_graphics = this.m_panelSize = this.m_placeholder = null
};
primitives.callout.Controller.prototype._create = function () {
    this.element.addClass("ui-widget");
    this._createLayout();
    this._redraw()
};
primitives.callout.Controller.prototype.destroy = function () {
    this._cleanLayout()
};
primitives.callout.Controller.prototype._createLayout = function () {
    this.m_panelSize = new primitives.common.Rect(0, 0, this.element.outerWidth(), this.element.outerHeight());
    this.m_placeholder = jQuery("<div></div>");
    this.m_placeholder.css({
        position: "relative",
        overflow: "hidden",
        top: "0px",
        left: "0px",
        padding: "0px",
        margin: "0px"
    });
    this.m_placeholder.css(this.m_panelSize.getCSS());
    this.m_placeholder.addClass("placeholder");
    this.m_placeholder.addClass(this.widgetEventPrefix);
    this.element.append(this.m_placeholder);
    this.m_graphics = primitives.common.createGraphics(this.options.graphicsType, this);
    this.options.actualGraphicsType = this.m_graphics.graphicsType;
    this.m_shape = new primitives.common.Callout(this.m_graphics)
};
primitives.callout.Controller.prototype._cleanLayout = function () {
    null !== this.m_graphics && this.m_graphics.clean();
    this.m_graphics = null;
    this.element.find("." + this.widgetEventPrefix).remove()
};
primitives.callout.Controller.prototype._updateLayout = function () {
    this.m_panelSize = new primitives.common.Rect(0, 0, this.element.innerWidth(), this.element.innerHeight());
    this.m_placeholder.css(this.m_panelSize.getCSS())
};
primitives.callout.Controller.prototype.update = function (a) {
    a ? (this._cleanLayout(), this._createLayout(), this._redraw()) : (this._updateLayout(), this.m_graphics.resize("placeholder", this.m_panelSize.width, this.m_panelSize.height), this.m_graphics.begin(), this._redraw(), this.m_graphics.end())
};
primitives.callout.Controller.prototype._redraw = function () {
    var a = "pointerPlacement cornerRadius offset opacity lineWidth lineType pointerWidth borderColor fillColor".split(" "),
        b, c;
    this.m_graphics.activate("placeholder");
    for (b = 0; b < a.length; b += 1) c = a[b], this.m_shape[c] = this.options[c];
    this.m_shape.draw(this.options.snapPoint, this.options.position)
};
primitives.callout.Controller.prototype._setOption = function (a, b) {
    jQuery.Widget.prototype._setOption.apply(this, arguments);
    switch (a) {
    case "disabled":
        var c = jQuery([]);
        b ? (c.filter(".ui-state-focus").blur(), c.removeClass("ui-state-hover"), c.propAttr("disabled", !0), this.element.addClass("ui-disabled")) : (c.propAttr("disabled", !1), this.element.removeClass("ui-disabled"))
    }
};
(function (a) {
    a.widget("ui.bpCallout", new primitives.callout.Controller)
})(jQuery);
primitives.connector.Config = function () {
    this.classPrefix = "bpconnector";
    this.graphicsType = 1;
    this.actualGraphicsType = null;
    this.connectorShapeType = this.orientationType = 0;
    this.toRectangle = this.fromRectangle = null;
    this.offset = new primitives.common.Thickness(0, 0, 0, 0);
    this.lineWidth = 3;
    this.color = "#000000";
    this.lineType = 0;
    this.label = null;
    this.labelSize = new primitives.common.Size(60, 30);
    this.labelPlacementType = primitives.common.ConnectorLabelPlacementType.Between
};
primitives.connector.Controller = function () {
    this.widgetEventPrefix = "bpconnector";
    this.options = new primitives.connector.Config;
    this._labelTemplateHashCode = this._labelTemplate = this.m_shape = this.m_graphics = this.m_panelSize = this.m_placeholder = null
};
primitives.connector.Controller.prototype._create = function () {
    var a = this;
    this.element.addClass("ui-widget");
    this._createLabelTemplate();
    this._createLayout();
    this.options.onAnnotationLabelTemplateRender = function (b, c) {
        a._onAnnotationLabelTemplateRender(b, c)
    };
    this._redraw()
};
primitives.connector.Controller.prototype.destroy = function () {
    this._cleanLayout();
    this.options.onLabelTemplateRender = null
};
primitives.connector.Controller.prototype._createLayout = function () {
    this.m_panelSize = new primitives.common.Rect(0, 0, this.element.outerWidth(), this.element.outerHeight());
    this.m_placeholder = jQuery("<div></div>");
    this.m_placeholder.css({
        position: "relative",
        overflow: "hidden",
        top: "0px",
        left: "0px",
        padding: "0px",
        margin: "0px"
    });
    this.m_placeholder.css(this.m_panelSize.getCSS());
    this.m_placeholder.addClass("placeholder");
    this.m_placeholder.addClass(this.widgetEventPrefix);
    this.element.append(this.m_placeholder);
    this.m_graphics = primitives.common.createGraphics(this.options.graphicsType, this);
    this.options.actualGraphicsType = this.m_graphics.graphicsType;
    this.m_shape = new primitives.common.Connector(this.m_graphics)
};
primitives.connector.Controller.prototype._cleanLayout = function () {
    null !== this.m_graphics && this.m_graphics.clean();
    this.m_graphics = null;
    this.element.find("." + this.widgetEventPrefix).remove()
};
primitives.connector.Controller.prototype._updateLayout = function () {
    this.m_panelSize = new primitives.common.Rect(0, 0, this.element.innerWidth(), this.element.innerHeight());
    this.m_placeholder.css(this.m_panelSize.getCSS())
};
primitives.connector.Controller.prototype.update = function (a) {
    a ? (this._cleanLayout(), this._createLayout(), this._redraw()) : (this._updateLayout(), this.m_graphics.resize("placeholder", this.m_panelSize.width, this.m_panelSize.height), this.m_graphics.begin(), this._redraw(), this.m_graphics.end())
};
primitives.connector.Controller.prototype._createLabelTemplate = function () {
    var a = jQuery("<div></div>");
    a.addClass("bp-item bp-corner-all bp-connector-label");
    this._labelTemplate = a.wrap("<div>").parent().html();
    this._labelTemplateHashCode = primitives.common.hashCode(this._labelTemplate)
};
primitives.connector.Controller.prototype._onAnnotationLabelTemplateRender = function (a, b) {
    b.element.html(this.options.label)
};
primitives.connector.Controller.prototype._redraw = function () {
    var a = "orientationType connectorShapeType offset lineWidth color lineType labelSize".split(" "),
        b, c;
    this.m_graphics.activate("placeholder");
    for (b = 0; b < a.length; b += 1) c = a[b], null != this.options[c] && (this.m_shape[c] = this.options[c]);
    this.m_shape.hasLabel = !primitives.common.isNullOrEmpty(this.options.label);
    this.m_shape.labelPlacementType = this.options.labelPlacementType;
    this.m_shape.labelTemplate = this._labelTemplate;
    this.m_shape.labelTemplateHashCode =
        this._labelTemplateHashCode;
    this.m_shape.panelSize = new primitives.common.Size(this.m_panelSize.width, this.m_panelSize.height);
    this.m_shape.draw(this.options.fromRectangle, this.options.toRectangle)
};
primitives.connector.Controller.prototype._setOption = function (a, b) {
    jQuery.Widget.prototype._setOption.apply(this, arguments);
    switch (a) {
    case "disabled":
        var c = jQuery([]);
        b ? (c.filter(".ui-state-focus").blur(), c.removeClass("ui-state-hover"), c.propAttr("disabled", !0), this.element.addClass("ui-disabled")) : (c.propAttr("disabled", !1), this.element.removeClass("ui-disabled"))
    }
};
(function (a) {
    a.widget("ui.bpConnector", new primitives.connector.Controller)
})(jQuery);
primitives.famdiagram.EventArgs = function () {
    this.context = this.oldContext = null;
    this.parentItems = [];
    this.name = this.position = null;
    this.cancel = !1
};
primitives.famdiagram.TemplateConfig = function () {
    this.name = null;
    this.isActive = !0;
    this.itemSize = new primitives.common.Size(120, 100);
    this.itemBorderWidth = 1;
    this.itemTemplate = null;
    this.minimizedItemSize = new primitives.common.Size(4, 4);
    this.minimizedItemCornerRadius = null;
    this.highlightPadding = new primitives.common.Thickness(2, 2, 2, 2);
    this.highlightBorderWidth = 1;
    this.highlightTemplate = null;
    this.cursorPadding = new primitives.common.Thickness(3, 3, 3, 3);
    this.cursorBorderWidth = 2;
    this.buttons = this.cursorTemplate =
        null
};
primitives.famdiagram.BackgroundAnnotationConfig = function (a) {
    var b;
    this.annotationType = 4;
    this.items = [];
    this.zOrderType = 0;
    this.lineWidth = 2;
    this.opacity = 1;
    this.fillColor = this.borderColor = null;
    this.lineType = 0;
    this.selectItems = !1;
    switch (arguments.length) {
    case 1:
        if (null !== a)
            if (a instanceof Array) this.items = a;
            else if ("object" == typeof a)
            for (b in a) a.hasOwnProperty(b) && (this[b] = a[b])
    }
};
primitives.famdiagram.ButtonConfig = function (a, b, c) {
    this.name = a;
    this.icon = b;
    this.text = !1;
    this.label = null;
    this.tooltip = c;
    this.size = new primitives.common.Size(16, 16)
};
primitives.famdiagram.Config = function (a) {
    this.name = void 0 !== a ? a : "FamDiagram";
    this.classPrefix = "famdiagram";
    this.graphicsType = 0;
    this.actualGraphicsType = null;
    this.pageFitMode = 3;
    this.minimalVisibility = 2;
    this.orientationType = 0;
    this.verticalAlignment = 1;
    this.arrowsDirection = 0;
    this.groupByType = 2;
    this.elbowType = 3;
    this.elbowDotSize = 4;
    this.emptyDiagramMessage = "Diagram is empty.";
    this.items = [];
    this.annotations = [];
    this.highligtItem = this.cursorItem = null;
    this.selectedItems = [];
    this.hasSelectorCheckbox = 0;
    this.selectCheckBoxLabel =
        "Selected";
    this.selectionPathMode = 1;
    this.templates = [];
    this.defaulLabelAnnotationTemplate = this.defaultTemplateName = null;
    this.hasButtons = 0;
    this.buttons = [];
    this.onCursorRender = this.onHighlightRender = this.onItemRender = this.onMouseDblClick = this.onMouseClick = this.onButtonClick = this.onSelectionChanged = this.onSelectionChanging = this.onCursorChanged = this.onCursorChanging = this.onHighlightChanged = this.onHighlightChanging = null;
    this.dotLevelShift = this.normalLevelShift = 20;
    this.normalItemsInterval = this.lineLevelShift =
        10;
    this.dotItemsInterval = 1;
    this.lineItemsInterval = 2;
    this.cousinsIntervalMultiplier = 5;
    this.itemTitleFirstFontColor = "#ffffff";
    this.itemTitleSecondFontColor = "#000080";
    this.linesColor = "#c0c0c0";
    this.linesWidth = 1;
    this.linesType = 0;
    this.linesPalette = [];
    this.showCallout = !0;
    this.defaultCalloutTemplateName = null;
    this.calloutfillColor = "#000000";
    this.calloutBorderColor = null;
    this.calloutCornerRadius = this.calloutOffset = 4;
    this.calloutPointerWidth = "10%";
    this.calloutLineWidth = 1;
    this.calloutOpacity = 0.2;
    this.buttonsPanelSize =
        28;
    this.checkBoxPanelSize = this.groupTitlePanelSize = 24;
    this.distance = 3;
    this.minimumScale = 0.5;
    this.maximumScale = 1;
    this.showLabels = 0;
    this.labelSize = new primitives.common.Size(80, 24);
    this.labelOffset = 1;
    this.labelOrientation = 0;
    this.labelPlacement = 1;
    this.labelFontSize = "10px";
    this.labelFontFamily = "Arial";
    this.labelColor = "#000000";
    this.labelFontStyle = this.labelFontWeight = "normal";
    this.enablePanning = !0;
    this.printPreviewPageSize = new primitives.common.Size(612, 792)
};
primitives.famdiagram.ConnectorAnnotationConfig = function (a, b) {
    var c;
    this.annotationType = 0;
    this.zOrderType = 2;
    this.toItem = this.fromItem = null;
    this.connectorShapeType = 0;
    this.labelPlacementType = primitives.common.ConnectorLabelPlacementType.Between;
    this.offset = new primitives.common.Thickness(0, 0, 0, 0);
    this.lineWidth = 2;
    this.color = "#000000";
    this.lineType = 0;
    this.selectItems = !0;
    this.label = null;
    this.labelSize = new primitives.common.Size(60, 30);
    switch (arguments.length) {
    case 1:
        for (c in a) a.hasOwnProperty(c) && (this[c] =
            a[c]);
        break;
    case 2:
        this.fromItem = a, this.toItem = b
    }
};
primitives.famdiagram.HighlightPathAnnotationConfig = function (a) {
    var b;
    this.annotationType = 2;
    this.items = [];
    this.selectItems = !1;
    switch (arguments.length) {
    case 1:
        if (null !== a)
            if (a instanceof Array) this.items = a;
            else if ("object" == typeof a)
            for (b in a) a.hasOwnProperty(b) && (this[b] = a[b])
    }
};
primitives.famdiagram.ItemConfig = function (a, b, c, d, e) {
    var f;
    this.id = null;
    this.parents = [];
    this.spouses = [];
    this.context = this.image = this.description = this.title = null;
    this.itemTitleColor = "#4169e1";
    this.groupTitle = null;
    this.groupTitleColor = "#4169e1";
    this.isActive = !0;
    this.hasButtons = this.hasSelectorCheckbox = 0;
    this.templateName = null;
    this.showCallout = 0;
    this.label = this.calloutTemplateName = null;
    this.showLabel = 0;
    this.labelSize = null;
    this.labelOrientation = 3;
    this.labelPlacement = 0;
    switch (arguments.length) {
    case 1:
        for (f in a) a.hasOwnProperty(f) &&
            (this[f] = a[f]);
        break;
    case 5:
        this.id = a, this.parent = b, this.title = c, this.description = d, this.image = e
    }
};
primitives.famdiagram.LabelAnnotationConfig = function (a, b) {
    var c;
    this.annotationType = 3;
    this.fromItem = null;
    this.toItems = [];
    this.title = null;
    this.itemTitleColor = "#4169e1";
    this.templateName = null;
    switch (arguments.length) {
    case 1:
        for (c in a) a.hasOwnProperty(c) && (this[c] = a[c]);
        break;
    case 2:
        this.fromItem = a, this.toItem = b
    }
};
primitives.famdiagram.PaletteItemConfig = function (a, b, c) {
    var d;
    this.lineColor = "#c0c0c0";
    this.lineWidth = 1;
    this.lineType = 0;
    switch (arguments.length) {
    case 1:
        for (d in a) a.hasOwnProperty(d) && (this[d] = a[d]);
        break;
    case 3:
        this.lineColor = a, this.lineWidth = b, this.lineType = c
    }
};
primitives.famdiagram.ShapeAnnotationConfig = function (a) {
    var b;
    this.annotationType = 1;
    this.zOrderType = 0;
    this.items = [];
    this.shapeType = 0;
    this.offset = new primitives.common.Thickness(0, 0, 0, 0);
    this.lineWidth = 2;
    this.cornerRadius = "10%";
    this.opacity = 1;
    this.fillColor = this.borderColor = null;
    this.lineType = 0;
    this.selectItems = !1;
    this.label = null;
    this.labelSize = new primitives.common.Size(60, 30);
    this.labelPlacement = 0;
    this.labelOffset = 4;
    switch (arguments.length) {
    case 1:
        if (null !== a)
            if (a instanceof Array) this.items = a;
            else if ("object" ==
            typeof a)
            for (b in a) a.hasOwnProperty(b) && (this[b] = a[b])
    }
};
primitives.famdiagram.Controller = function () {
    this.widgetEventPrefix = "famdiagram";
    this.parent = primitives.orgdiagram.BaseController.prototype;
    this.parent.constructor.apply(this, arguments);
    this.options = new primitives.famdiagram.Config;
    this.options.childrenPlacementType = 2;
    this.options.leavesPlacementType = 2;
    this.options.horizontalAlignment = 0;
    this.options.connectorType = 0;
    this.options.maximumColumnsInMatrix = 6;
    this.options.highlightLinesColor = "#ff0000";
    this.options.highlightLinesWidth = 1;
    this.options.highlightLinesType =
        0;
    this._defaultLabelAnnotationTemplateName = null
};
primitives.famdiagram.Controller.prototype = new primitives.orgdiagram.BaseController;
primitives.famdiagram.Controller.prototype._virtualBind = function () {
    var a = this;
    this.parent._virtualBind.apply(this, arguments);
    this.options.onLabelAnnotationTemplateRender = function (b, c) {
        a._onDefaulLabelAnnotationTemplateRender(b, c)
    }
};
primitives.famdiagram.Controller.prototype._virtualUnbind = function () {
    this.parent._virtualUnbind.apply(this, arguments);
    this.options.onLabelAnnotationTemplateRender = null
};
primitives.famdiagram.Controller.prototype._virtualGetEventArgs = function (a, b, c) {
    var d = new primitives.famdiagram.EventArgs,
        e;
    null != a && (a.itemConfig && null != a.itemConfig.id) && (d.oldContext = this._configs.node(a.itemConfig.id));
    null != b && (b.itemConfig && null != b.itemConfig.id) && (d.context = this._configs.node(b.itemConfig.id), this._configs.loopParents(this, b.itemConfig.id, function (a, b, c) {
            if (0 < c) return this._configs.BREAK;
            d.parentItems.push(b)
        }), e = this.m_placeholder.offset(), a = this.element.offset(), d.position =
        (new primitives.common.Rect(b.actualPosition)).translate(e.left, e.top).translate(-a.left, -a.top));
    null != c && (d.name = c);
    return d
};
primitives.famdiagram.Controller.prototype._virtualReadTemplates = function () {
    var a = new primitives.orgdiagram.TemplateConfig;
    this.parent._virtualReadTemplates.apply(this, arguments);
    a = new primitives.orgdiagram.Template({
        name: this.widgetEventPrefix + "DefaultLabelAnnotationTemplate",
        itemTemplate: this._getDefaultLabelAnnotationTemplate(),
        itemSize: new primitives.common.Size(100, 20)
    }, a);
    a.itemTemplateRenderName = "onLabelAnnotationTemplateRender";
    a.createDefaultTemplates();
    this._templates[a.name] = a
};
primitives.famdiagram.Controller.prototype._onDefaulLabelAnnotationTemplateRender = function (a, b) {
    b.element.text(b.context.title)
};
primitives.famdiagram.Controller.prototype._getDefaultLabelAnnotationTemplate = function () {
    var a = jQuery('<div class="bp-label-annotation"></div>');
    a.addClass("bp-item");
    return a.wrap("<div>").parent().html()
};
primitives.famdiagram.Controller.prototype._virtualCreateOrgTree = function () {
    var a, b, c, d, e, f, g, h, j = [],
        i, k, l, m, n, p, q, s, r, t = this,
        u, v, w, x, z;
    this._defaultLabelAnnotationTemplateName = this.widgetEventPrefix + "DefaultLabelAnnotationTemplate";
    primitives.common.isNullOrEmpty(this.options.defaulLabelAnnotationTemplate) || (this._defaultLabelAnnotationTemplateName = this.options.defaulLabelAnnotationTemplate);
    this.showElbowDots = this.showInvisibleSubTrees = !0;
    this._configs = primitives.common.family();
    this._logicalFamily =
        primitives.common.family();
    this.itemByChildrenKey = {};
    this._orgPartners = {};
    this._families = [];
    this._orgTree = primitives.common.tree();
    this.maximumFamItemId = 0;
    this.maximumLevel = this.minimumLevel = null;
    if (0 < this.options.items.length) {
        f = [];
        a = 0;
        for (b = this.options.items.length; a < b; a += 1) e = this.options.items[a], null != e && (this._configs.add(e.parents, e.id, e), d = new primitives.famdiagram.FamilyItem({
            id: e.id,
            itemConfig: e,
            isActive: e.hasOwnProperty("isActive") ? e.isActive : !0
        }), this._logicalFamily.add(e.parents, d.id,
            d), c = d.itemConfig.spouses, null != c && 0 < c.length && f.push(d), c = parseInt(e.id, 10), this.maximumFamItemId = Math.max(isNaN(c) ? 0 : c, this.maximumFamItemId));
        if (this._debug && !this._logicalFamily.validate()) throw "References are broken in family structure!";
        w = this._logicalFamily.clone();
        this._logicalFamily.loopTopo(this, function (a) {
            w.removeNode(a)
        });
        if (w.hasNodes()) {
            a = 0;
            for (b = this.options.items.length; a < b; a += 1)
                if (e = this.options.items[a], null != w.node(e.id)) {
                    r = [];
                    w.loopParents(this, e.id, function (a) {
                        r.push(a);
                        return w.SKIP
                    });
                    c = 0;
                    for (d = r.length; c < d; c += 1) w.removeRelation(r[c], e.id), this._logicalFamily.removeRelation(r[c], e.id);
                    this.maximumFamItemId += 1;
                    g = new primitives.famdiagram.FamilyItem({
                        id: this.maximumFamItemId,
                        isVisible: t._debug,
                        isActive: !1,
                        hideParentConnection: !0,
                        hideChildrenConnection: !0,
                        itemConfig: {
                            title: "fake parent #" + t.maximumFamItemId,
                            description: "This is fake parent item was created by loops reversal."
                        }
                    });
                    this._logicalFamily.add([], g.id, g);
                    this._logicalFamily.adopt([g.id], e.id);
                    c = 0;
                    for (d = r.length; c < d; c += 1) this.maximumFamItemId +=
                        1, e = new primitives.famdiagram.FamilyItem({
                            id: this.maximumFamItemId,
                            isVisible: t._debug,
                            isActive: !1,
                            hideParentConnection: !0,
                            hideChildrenConnection: !0,
                            itemConfig: {
                                title: "fake child #" + t.maximumFamItemId,
                                description: "This is fake child item was created by loops reversal."
                            }
                        }), this._logicalFamily.add([g.id, r[c]], e.id, e);
                    x = [];
                    w.loopTopo(this, function (a) {
                        x.push(a)
                    });
                    c = 0;
                    for (d = x.length; c < d; c += 1) w.removeNode(x[c])
                }
        }
        a = 0;
        for (b = f.length; a < b; a += 1) d = f[a], c = d.itemConfig.spouses.slice(0), c.push(d.id), this._logicalFamily.hasCommonChild(c) ||
            (this.maximumFamItemId += 1, e = new primitives.famdiagram.FamilyItem({
                id: this.maximumFamItemId,
                isVisible: t._debug,
                isActive: !1,
                hideParentConnection: !0,
                hideChildrenConnection: !0,
                itemConfig: {
                    title: "fake child #" + t.maximumFamItemId,
                    description: "This is fake child keeps spouses together."
                }
            }), this._logicalFamily.add(c, e.id, e));
        if (this._debug && !this._logicalFamily.validate()) throw "References are broken in family structure!";
        this._logicalFamily.loopLevels(this, 1 == this.options.groupByType, function (a, b, c) {
            b.level =
                c
        });
        this._addLabelAnnotations(this._logicalFamily, this.options.annotations);
        if (this._debug && !this._logicalFamily.validate()) throw "References are broken in family structure!";
        this._logicalFamily.optimizeReferences(function () {
            t.maximumFamItemId += 1;
            return new primitives.famdiagram.FamilyItem({
                id: t.maximumFamItemId,
                isVisible: t._debug,
                isActive: !1,
                itemConfig: {
                    title: "bundle #" + t.maximumFamItemId,
                    description: " This item was created by references optimizer."
                },
                levelGravity: 2
            })
        });
        if (this._debug && !this._logicalFamily.validate()) throw "References are broken in family structure!";
        this._logicalFamily.eliminateManyToMany(function () {
            t.maximumFamItemId += 1;
            return new primitives.famdiagram.FamilyItem({
                id: t.maximumFamItemId,
                isVisible: t._debug,
                isActive: !1,
                itemConfig: {
                    title: "dummy #" + t.maximumFamItemId,
                    description: "This is item used to eliminate M:M relations."
                },
                levelGravity: 2
            })
        });
        if (this._debug && !this._logicalFamily.validate()) throw "References are broken in family structure!";
        this._resortItemsBylevels(this._logicalFamily);
        this._debug && this._validate(this._logicalFamily, !1);
        this._fillInItems(this._logicalFamily,
            function () {
                t.maximumFamItemId += 1;
                return new primitives.famdiagram.FamilyItem({
                    id: t.maximumFamItemId,
                    levelGravity: 2,
                    isVisible: t._debug,
                    isActive: !1,
                    itemConfig: {
                        title: "extension #" + t.maximumFamItemId,
                        description: "This is item used to fill gaps in levels."
                    }
                })
            });
        this._debug && this._validate(this._logicalFamily, !0);
        v = {};
        this.properties = "title description image itemTitleColor groupTitle groupTitleColor isActive hasSelectorCheckbox hasButtons templateName showCallout calloutTemplateName label showLabel labelSize labelOrientation labelPlacement".split(" ");
        this.defaultItemConfig = new primitives.famdiagram.ItemConfig;
        k = 0;
        z = [];
        this._logicalFamily.loopRoots(this, function (a) {
            l = new primitives.famdiagram.Family(k);
            this._extractOrgChart(a, this._logicalFamily, v, l);
            this._families.push(l);
            z.push(l);
            k += 1
        });
        z.sort(function (a, b) {
            var c = a.items[0].level,
                d = b.items[0].level;
            return c != d ? c - d : b.items.length - a.items.length
        });
        j = [];
        i = {};
        if (0 < this._families.length) {
            e = primitives.common.graph();
            a = 0;
            for (b = this._families.length; a < b; a += 1) {
                l = this._families[a];
                c = 0;
                for (d = l.links.length; c <
                    d; c += 1) f = l.links[c], g = this._logicalFamily.node(f.fromItem).familyId, h = this._logicalFamily.node(f.toItem).familyId, g != h && (e.addEdge(g, h, {
                    weight: 0
                }), e.edge(g, h).weight += 1), this._families[h].backLinks.push(new primitives.famdiagram.FamLink(f.toItem, f.fromItem))
            }
            for (; j.length < this._families.length;) {
                a = 0;
                for (b = z.length; a < b; a += 1) l = z[a], i.hasOwnProperty(l.id) || (s = e.getSpanningTree(l.id, function (a, b) {
                    return a.weight - b.weight
                }), null != s.node(l.id) ? (s.loopPostOrder(this, function (a, b, c) {
                    var b = this._families[a],
                        d = this._families[c],
                        e = [],
                        f = this;
                    null != c && (d.familyPriority += b.familyPriority);
                    e = [];
                    s.loopChildren(this, a, function (a) {
                        e.push(a)
                    });
                    e.sort(function (a, b) {
                        return f._families[a].familyPriority - f._families[b].familyPriority
                    });
                    s.arrangeChildren(a, e)
                }), s.loopPreOrder(this, function (a) {
                    j.push(a);
                    i[a] = !0
                })) : (j.push(l.id), i[l.id] = !0))
            }
        }
        this.maximumFamItemId += 1;
        u = this._createOrgItem(this.maximumFamItemId, null, null, this.minimumLevel - 1, null);
        u.hideParentConnection = !0;
        u.hideChildrenConnection = !0;
        u.title = "internal root";
        u.isVisible = !1;
        u.isActive = !1;
        u.childIndex = 0;
        e = {};
        a = 0;
        for (b = j.length; a < b; a += 1) {
            l = this._families[j[a]];
            h = {};
            p = u;
            q = 0;
            d = l.links.concat(l.backLinks);
            for (c = 0; c < d.length; c += 1) f = d[c], g = this._orgTree.node(f.toItem), this._orgTree.node(f.fromItem), !0 == e[g.familyId] && (m = l.items[0], n = g, n.level >= m.level && this._orgTree.loopParents(this, n.id, function (a, b) {
                n = b;
                if (b.level < m.level) return !0
            }), h[n.id] = h.hasOwnProperty(n.id) ? h[n.id] + 1 : 1, q < h[n.id] && (p = n, q = h[n.id]));
            this._attachFamilyToOrgChart(p, l);
            e[l.id] = !0
        }
        a = this._getExtraGravity();
        b = this._getGrandChildren();
        this._balanceOrgTree(this._orgTree, a, b)
    }
};
primitives.famdiagram.Controller.prototype._validate = function (a, b) {
    if (!a.validate()) throw "Family structure failed to pass validation!";
    a.loop(this, function (c, d) {
        a.loopChildren(this, c, function (c, f, g) {
            if (0 < g) return a.BREAK;
            if (null === f.level || null === d.level || (b ? f.level != d.level + 1 : f.level <= d.level)) throw "Family tree is broken. Children/Parents or levels mismatch!";
        })
    })
};
primitives.famdiagram.Controller.prototype._addLabelAnnotations = function (a, b) {
    var c = primitives.common.graph(),
        d = {},
        e, f, g, h, j = this;
    if (0 < b.length) {
        h = 0;
        for (e = b.length; h < e; h += 1) f = b[h], 3 == f.annotationType && (d.hasOwnProperty(f.fromItem) ? d[f.fromItem].push(f) : (d[f.fromItem] = [f], a.loopChildren(this, f.fromItem, function (b) {
            c.addEdge(f.fromItem, b, new primitives.famdiagram.EdgeItem(f.fromItem, f.fromItem, b, b));
            return a.SKIP
        }), a.loopParents(this, f.fromItem, function (b) {
            c.addEdge(b, f.fromItem, new primitives.famdiagram.EdgeItem(b,
                b, f.fromItem, f.fromItem));
            return a.SKIP
        })));
        for (g in d)
            if (d.hasOwnProperty(g)) {
                e = d[g];
                e.sort(function (a, b) {
                    return b.toItems.length - a.toItems.length
                });
                for (h = 0; h < e.length; h += 1) f = e[h], this._addLabelAnnotation(a, c, f.fromItem, f.toItems, function () {
                    j.maximumFamItemId += 1;
                    return new primitives.famdiagram.FamilyItem({
                        id: j.maximumFamItemId,
                        isVisible: !0,
                        isActive: !1,
                        itemConfig: f
                    })
                })
            }
    }
};
primitives.famdiagram.Controller.prototype._addLabelAnnotation = function (a, b, c, d, e) {
    var f, g = !0,
        h = null,
        j, i, k, l = [];
    i = 0;
    for (k = d.length; i < k; i += 1)
        if (j = d[i], f = b.edge(c, j), null != f) {
            if (null == h) h = f.getFar(j);
            else if (h != f.getFar(j)) {
                g = !1;
                break
            }
            l.push(f.getNear(j))
        } else {
            g = !1;
            break
        }
    if (g && (e = e(), a.bundleChildren(h, l, e.id, e) ? (e.levelGravity = 1, g = !0) : a.bundleParents(h, l, e.id, e) && (e.levelGravity = 2, g = !0), g)) {
        i = 0;
        for (k = d.length; i < k; i += 1) j = d[i], f = b.edge(c, j), f.setFar(j, e.id)
    }
};
primitives.famdiagram.Controller.prototype._getGrandChildren = function () {
    var a = {};
    this._orgTree.loopPostOrder(this, function (b, c, d) {
        this.minimumLevel = null != this.minimumLevel ? Math.min(this.minimumLevel, c.level) : c.level;
        this.maximumLevel = null != this.maximumLevel ? Math.max(this.maximumLevel, c.level) : c.level;
        if (null != d && (a[d] || (a[d] = {}), c = c.level - 1, a[d][c] = a[d][c] ? a[d][c] + 1 : 1, null != a[b]))
            for (c in a[b]) a[b].hasOwnProperty(c) && (a[d][c] = a[d][c] ? a[d][c] + a[b][c] : a[b][c])
    });
    return a
};
primitives.famdiagram.Controller.prototype._balanceOrgTree = function (a, b, c) {
    var d, e, f, g, h, j, i, k, l, m, n;
    a.loopLevels(this, function (p, q) {
        var s = primitives.common.graph(),
            r = {},
            t = null,
            u;
        i = [];
        a.loopChildren(this, q.id, function (c, f, g) {
            var i;
            null == t && (t = f);
            r[f.id] = {};
            if (b.hasOwnProperty(f.id))
                for (i in j = b[f.id], j)
                    if (j.hasOwnProperty(i)) {
                        m = j[i];
                        r[f.id][i] = {};
                        d = 0;
                        for (e = m.length; d < e; d += 1) h = m[d], u = h.commonParent == q.id ? h.toParent : a.node(h.fromParent).childIndex < a.node(h.toParent).childIndex ? "__right__" : "__left__",
                            f.id != u && (s.addEdge(f.id, u, {
                                weight: 0
                            }), s.edge(f.id, u).weight += 1, null == r[f.id][i][u] && (r[f.id][i][u] = 0), r[f.id][i][u] += 1)
                    }
            0 < g && s.addEdge(f.id, t.id, {
                weight: 0
            })
        });
        if (null != t) {
            n = s.getGrowthSequence(function (a) {
                return a.weight
            });
            0 == n.length && (n = [t.id]);
            k = this._balanceItems(n, "__left__", "__right__", r, c);
            f = 0;
            for (g = k.length; f < g; f += 1) l = a.node(k[f]), l.childIndex = f, i.push(l.id)
        }
        a.arrangeChildren(q.id, i)
    })
};
primitives.famdiagram.Controller.prototype._balanceItems = function (a, b, c, d, e) {
    var f = [],
        g, h, j, i, k, l, m, n, p, q, s, r, t, u, v, w, x, z, G, C;
    h = new primitives.famdiagram.Slots;
    h.add(new primitives.famdiagram.Slot(b));
    h.add(new primitives.famdiagram.Slot(null));
    h.add(new primitives.famdiagram.Slot(c));
    j = 0;
    h.loop(function (a) {
        j += 1;
        a.position = j
    });
    for (g = 0; g < a.length; g += 1)
        if (i = a[g], i != b && i != c)
            for (x in p = n = m = l = k = null, h.loop(function (a) {
                    var b, c, f, g;
                    if (null == a.itemId) {
                        u = e[i];
                        t = r = s = q = 0;
                        for (b in a.crossings) a.crossings.hasOwnProperty(b) &&
                            (u && null != u[b] && (q += a.crossings[b] * u[b]), t += a.crossings[b]);
                        for (b in d[i])
                            if (d[i].hasOwnProperty(b))
                                for (c in f = d[i][b], f) f.hasOwnProperty(c) && (g = h.getSlot(c), null != g && (g.position < a.position ? (q += (a.left[b] || 0) - (g.left[b] || 0), r += Math.abs(g.balance + 1)) : (q += (a.right[b] || 0) - (g.right[b] || 0), r += Math.abs(g.balance - 1)), s += Math.abs(g.position - a.position)));
                        if (null == l || l > q || l == q && (m > s || m == s && (n > r || n == r && p > t))) l = q, k = a, m = s, n = r, p = t
                    }
                }), v = k.clone(), w = k.clone(), w.itemId = i, h.insertBefore(k, v), h.insertBefore(k, w), j =
                w.position = 0, h.loop(function (a) {
                    var b, c;
                    if (a.id != w.id) {
                        c = e[i];
                        for (b in c) c.hasOwnProperty(b) && (a.left[b] = a.left[b] ? a.left[b] + c[b] : c[b]);
                        j += 1;
                        a.position = j
                    }
                }, w), j = 0, h.backwardLoop(function (a) {
                    var b, c;
                    if (a.id != w.id) {
                        c = e[i];
                        for (b in e[i]) e[i].hasOwnProperty(b) && (a.right[b] = a.right[b] ? a.right[b] + c[b] : c[b]);
                        j -= 1;
                        a.position = j
                    }
                }, w), d[i])
                if (d[i].hasOwnProperty(x))
                    for (G in z = d[i][x], z) z.hasOwnProperty(G) && (C = h.getSlot(G), null != C && (0 > C.position ? (C.balance += 1, w.balance -= 1, h.backwardLoop(function (a) {
                        if (a.id !=
                            w.id)
                            if (a.id != C.id) a.crossings[x] = a.crossings[x] ? a.crossings[x] + z[G] : z[G];
                            else return !0
                    }, w)) : (C.balance -= 1, w.balance += 1, h.loop(function (a) {
                        if (a.id != w.id)
                            if (a.id != C.id) a.crossings[x] = a.crossings[x] ? a.crossings[x] + z[G] : z[G];
                            else return !0
                    }, w))));
    h.loop(function (a) {
        a = a.itemId;
        null != a && (a != b && a != c) && f.push(a)
    });
    return f
};
primitives.famdiagram.Controller.prototype._getExtraGravity = function () {
    var a, b, c = {},
        d, e, f, g;
    for (a in this._orgPartners)
        if (this._orgPartners.hasOwnProperty(a)) {
            b = this._orgTree.node(a);
            f = this._orgPartners[a];
            d = 0;
            for (e = f.length; d < e; d += 1) g = this._orgTree.node(f[d]), this._addExtraGravitiesForConnection(c, g, b)
        }
    return c
};
primitives.famdiagram.Controller.prototype._addExtraGravitiesForConnection = function (a, b, c) {
    var d = new primitives.famdiagram.ExtraGravity(b.level),
        e = new primitives.famdiagram.ExtraGravity(c.level);
    this._orgTree.zipUp(this, b.id, c.id, function (b, c, h, j) {
        this._addExtraGravityForItem(a, b, d);
        this._addExtraGravityForItem(a, h, e);
        if (c == j) return d.commonParent = c, d.fromParent = b, d.toParent = h, e.commonParent = c, e.fromParent = h, e.toParent = b, !0
    })
};
primitives.famdiagram.Controller.prototype._addExtraGravityForItem = function (a, b, c) {
    a.hasOwnProperty(b) || (a[b] = {});
    null == a[b][c.level] && (a[b][c.level] = []);
    a[b][c.level].push(c)
};
primitives.famdiagram.Controller.prototype._attachFamilyToOrgChart = function (a, b) {
    var c, d = b.items[0],
        e = null,
        e = a;
    for (c = a.level + 1; c < d.level; c += 1) this.maximumFamItemId += 1, e = this._createOrgItem(this.maximumFamItemId, e.id, null, c, null), e.title = "shift", e.isVisible = !1, e.isActive = !1, e.hideParentConnection = !0, e.hideChildrenConnection = !0, b.items.push(e);
    d.hideParentConnection = !0;
    this._orgTree.adopt(e.id, d.id, d)
};
primitives.famdiagram.Controller.prototype._extractOrgChart = function (a, b, c, d) {
    var e, f = [],
        g, h, a = this._logicalFamily.node(a),
        f = this._createOrgItem(a.id, null, d.id, a.level, a.itemConfig);
    f.hideParentConnection = !0;
    f.isVisible = a.isVisible;
    f.isActive = a.isActive;
    f.hideParentConnection = a.hideParentConnection;
    f.hideChildrenConnection = a.hideChildrenConnection;
    d.items.push(f);
    c[a.id] = !0;
    a.familyId = d.id;
    for (f = this._extractChildren(a, b, c, d); 0 < f.length;) {
        g = [];
        a = 0;
        for (e = f.length; a < e; a += 1) h = f[a], g = g.concat(this._extractChildren(h,
            b, c, d));
        f = g
    }
};
primitives.famdiagram.Controller.prototype._extractChildren = function (a, b, c, d) {
    var e = [],
        f = {},
        g = null,
        h = null,
        j;
    1 == b.countChildren(a.id) && (g = b.firstChild(a.id));
    null != this.itemByChildrenKey[g] ? (h = this.itemByChildrenKey[g], null == this._orgPartners[h.id] && (this._orgPartners[h.id] = []), this._orgPartners[h.id].push(a.id), d.links.push(new primitives.famdiagram.FamLink(a.id, g))) : (null != g && (this.itemByChildrenKey[g] = a), b.loopChildren(this, a.id, function (g, h) {
        var l = null;
        c[h.id] || (1 == b.countChildren(g) && (l = b.firstChild(g)),
            null != f[l] ? (j = this._createOrgItem(h.id, f[l].id, d.id, h.level, h.itemConfig), j.itemType = 6) : (null != l && (f[l] = h), e.push(h), j = this._createOrgItem(h.id, a.id, d.id, h.level, h.itemConfig)), j.hideParentConnection = h.hideParentConnection, j.hideChildrenConnection = h.hideChildrenConnection, j.isVisible = h.isVisible, j.isActive = h.isActive, d.items.push(j), c[h.id] = !0, h.familyId = d.id);
        return b.SKIP
    }));
    return e
};
primitives.famdiagram.Controller.prototype._createOrgItem = function (a, b, c, d, e) {
    var f = new primitives.orgdiagram.OrgItem;
    f.id = a;
    f.context = e;
    f.familyId = c;
    f.level = d;
    a = 0;
    for (c = this.properties.length; a < c; a += 1) d = this.properties[a], f[d] = null != e && void 0 !== e[d] ? e[d] : this.defaultItemConfig[d];
    null != e && 3 == e.annotationType && (f.templateName = !primitives.common.isNullOrEmpty(e.templateName) ? e.templateName : this._defaultLabelAnnotationTemplateName, f.hasSelectorCheckbox = 2);
    this._orgTree.add(b, f.id, f);
    return f
};
primitives.famdiagram.Controller.prototype._resortItemsBylevels = function (a) {
    var b = [],
        c = null,
        d = null,
        e, f, g;
    a.loop(this, function (a, e) {
        e.originalLevel = e.level;
        e.level = null;
        null != e.originalLevel && (b[e.originalLevel] || (b[e.originalLevel] = {}), b[e.originalLevel][a] = e, c = null != c ? Math.min(e.originalLevel, c) : e.originalLevel, d = null != d ? Math.max(e.originalLevel, d) : e.originalLevel)
    });
    e = 0;
    for (f = c; f <= d; f += 1) g = b[f], e = this._setLevelsForItems(g, a, e, f + 1);
    a.loopTopoReversed(this, function (b, c) {
        var d;
        2 == c.levelGravity && (d =
            null, a.loopChildren(this, b, function (b, c, e) {
                if (0 < e) return a.BREAK;
                d = null == d ? c.level - 1 : Math.min(c.level - 1, d)
            }), c.level = !d ? c.level : d)
    })
};
primitives.famdiagram.Controller.prototype._setLevelsForItems = function (a, b, c, d) {
    for (var e = c, f, g, h; !primitives.common.isEmptyObject(a);) {
        f = {};
        for (g in a) a.hasOwnProperty(g) && (h = a[g], null == h.level && (h.level = c), b.loopChildren(this, g, function (a, c, g) {
            if (0 < g) return b.BREAK;
            null == c.originalLevel ? (c.level = null == c.level ? h.level + 1 : Math.max(c.level, h.level + 1), f[a] = c) : c.originalLevel == d && (e = Math.max(e, h.level + 1))
        }));
        a = f
    }
    return e
};
primitives.famdiagram.Controller.prototype._fillInItems = function (a, b) {
    var c;
    a.loop(this, function (d, e) {
        for (var f = !0, g; f;) f = !1, g = [], a.loopParents(this, d, function (b, c) {
            e.level - 1 > c.level && g.push(b);
            return a.SKIP
        }), 1 < g.length && (c = b(e), c.level = e.level - 1, a.bundleParents(d, g, c.id, c), f = !0, d = c.id, e = c)
    });
    a.loop(this, function (d, e) {
        for (var f = !0, g, h = !0; f;) f = !1, g = [], a.loopChildren(this, d, function (b, c) {
            e.level + 1 < c.level ? g.push(b) : h = !1;
            return a.SKIP
        }), 0 < g.length && (c = b(e), c.level = e.level + 1, h && (c.hideParentConnection =
            e.hideChildrenConnection, c.hideChildrenConnection = e.hideChildrenConnection), a.bundleChildren(d, g, c.id, c), f = !0, d = c.id, e = c)
    })
};
primitives.famdiagram.Controller.prototype._virtualShowCursorNeighbours = function () {
    var a, b;
    null !== this._cursorTreeItem && (0 === this._cursorTreeItem.visibility && (this._cursorTreeItem.visibility = 1), b = this._cursorTreeItem.itemConfig, null != b && this._logicalFamily.loopNeighbours(this, b.id, function (b) {
        if (this._orgTree.node(b).isActive) return a = this._treeItemsByUserId[b], 0 === a.visibility && (a.visibility = 1), !0
    }))
};
primitives.famdiagram.EdgeItem = function (a, b, c, d) {
    this.values = [b, d];
    this[a] = 0;
    this[c] = 1
};
primitives.famdiagram.EdgeItem.prototype.getNear = function (a) {
    return this.values[this[a]]
};
primitives.famdiagram.EdgeItem.prototype.getFar = function (a) {
    return this.values[Math.abs(this[a] - 1)]
};
primitives.famdiagram.EdgeItem.prototype.setNear = function (a, b) {
    this.values[this[a]] = b
};
primitives.famdiagram.EdgeItem.prototype.setFar = function (a, b) {
    this.values[Math.abs(this[a] - 1)] = b
};
primitives.famdiagram.EdgeItem.prototype.toString = function () {
    return this.parent + "," + this.child
};
primitives.famdiagram.ExtraGravity = function (a) {
    this.toParent = this.fromParent = this.commonParent = null;
    this.level = a
};
primitives.famdiagram.Family = function (a) {
    this.id = null;
    this.familyPriority = 1;
    this.childFamilies = [];
    this.items = [];
    this.links = [];
    this.backLinks = [];
    1 == arguments.length && (this.id = a)
};
primitives.famdiagram.FamilyItem = function (a) {
    var b;
    this.itemConfig = this.familyId = this.id = null;
    this.isActive = this.isVisible = !0;
    this.level = null;
    this.levelGravity = 0;
    this.hideChildrenConnection = this.hideParentConnection = !1;
    switch (arguments.length) {
    case 1:
        for (b in a) a.hasOwnProperty(b) && (this[b] = a[b])
    }
};
primitives.famdiagram.FamLink = function (a, b) {
    this.fromItem = a;
    this.toItem = b
};
primitives.famdiagram.Slot = function (a) {
    this.position = this.next = this.prev = this.id = null;
    this.balance = 0;
    this.itemId = a;
    this.left = {};
    this.right = {};
    this.crossings = {}
};
primitives.famdiagram.Slot.prototype.clone = function () {
    var a = new primitives.famdiagram.Slot,
        b;
    a.itemId = this.itemId;
    for (b in this.left) this.left.hasOwnProperty(b) && (a.left[b] = this.left[b]);
    for (b in this.right) this.right.hasOwnProperty(b) && (a.right[b] = this.right[b]);
    for (b in this.crossings) this.crossings.hasOwnProperty(b) && (a.crossings[b] = this.crossings[b]);
    return a
};
primitives.famdiagram.Slots = function () {
    this.last = this.first = null;
    this.slots = {};
    this.items = {};
    this.counter = 0
};
primitives.famdiagram.Slots.prototype.add = function (a) {
    a.id = this.counter;
    this.counter += 1;
    this.slots[a.id] = a;
    null != a.itemId && (this.items[a.itemId] = a);
    null == this.last ? this.first = this.last = a.id : (this.slots[this.last].next = a.id, a.prev = this.last, this.last = a.id)
};
primitives.famdiagram.Slots.prototype.insertBefore = function (a, b) {
    b.id = this.counter;
    this.counter += 1;
    this.slots[b.id] = b;
    null != b.itemId && (this.items[b.itemId] = b);
    if (null == a.prev) b.next = a.id, this.first = b.id;
    else {
        var c = this.slots[a.prev];
        c.next = b.id;
        b.next = a.id;
        a.prev = b.id;
        b.prev = c.id
    }
};
primitives.famdiagram.Slots.prototype.loop = function (a, b) {
    for (var c = null != b ? b.id : this.first; null != c;) {
        c = this.slots[c];
        if (a(c)) break;
        c = c.next
    }
};
primitives.famdiagram.Slots.prototype.backwardLoop = function (a, b) {
    for (var c = null != b ? b.id : this.last; null != c;) {
        c = this.slots[c];
        if (a(c)) break;
        c = c.prev
    }
};
primitives.famdiagram.Slots.prototype.getSlot = function (a) {
    return this.items[a]
};
(function (a) {
    a.widget("ui.famDiagram", jQuery.ui.mouse2, new primitives.famdiagram.Controller)
})(jQuery);
primitives.orgdiagram.EventArgs = function () {
    this.name = this.position = this.parentItem = this.context = this.oldContext = null;
    this.cancel = !1
};
primitives.orgdiagram.TemplateConfig = function () {
    this.name = null;
    this.isActive = !0;
    this.itemSize = new primitives.common.Size(120, 100);
    this.itemBorderWidth = 1;
    this.itemTemplate = null;
    this.minimizedItemSize = new primitives.common.Size(4, 4);
    this.minimizedItemCornerRadius = null;
    this.highlightPadding = new primitives.common.Thickness(2, 2, 2, 2);
    this.highlightBorderWidth = 1;
    this.highlightTemplate = null;
    this.cursorPadding = new primitives.common.Thickness(3, 3, 3, 3);
    this.cursorBorderWidth = 2;
    this.buttons = this.cursorTemplate =
        null
};
primitives.orgdiagram.BackgroundAnnotationConfig = function (a) {
    var b;
    this.annotationType = 4;
    this.items = [];
    this.includeChildren = !1;
    this.zOrderType = 0;
    this.lineWidth = 2;
    this.opacity = 1;
    this.fillColor = this.borderColor = null;
    this.lineType = 0;
    this.selectItems = !1;
    switch (arguments.length) {
    case 1:
        if (null !== a)
            if (a instanceof Array) this.items = a;
            else if ("object" == typeof a)
            for (b in a) a.hasOwnProperty(b) && (this[b] = a[b])
    }
};
primitives.orgdiagram.ButtonConfig = function (a, b, c) {
    this.name = a;
    this.icon = b;
    this.text = !1;
    this.label = null;
    this.tooltip = c;
    this.size = new primitives.common.Size(16, 16)
};
primitives.orgdiagram.Config = function (a) {
    this.name = void 0 !== a ? a : "OrgDiagram";
    this.classPrefix = "orgdiagram";
    this.graphicsType = 0;
    this.actualGraphicsType = null;
    this.pageFitMode = 3;
    this.minimalVisibility = 2;
    this.horizontalAlignment = this.orientationType = 0;
    this.verticalAlignment = 1;
    this.elbowType = this.connectorType = this.arrowsDirection = 0;
    this.elbowDotSize = 4;
    this.emptyDiagramMessage = "Diagram is empty.";
    this.items = [];
    this.annotations = [];
    this.highligtItem = this.cursorItem = null;
    this.selectedItems = [];
    this.hasSelectorCheckbox =
        0;
    this.selectCheckBoxLabel = "Selected";
    this.selectionPathMode = 1;
    this.templates = [];
    this.defaultTemplateName = null;
    this.hasButtons = 0;
    this.buttons = [];
    this.onCursorRender = this.onHighlightRender = this.onItemRender = this.onMouseDblClick = this.onMouseClick = this.onButtonClick = this.onSelectionChanged = this.onSelectionChanging = this.onCursorChanged = this.onCursorChanging = this.onHighlightChanged = this.onHighlightChanging = null;
    this.dotLevelShift = this.normalLevelShift = 20;
    this.normalItemsInterval = this.lineLevelShift = 10;
    this.dotItemsInterval = 1;
    this.lineItemsInterval = 2;
    this.cousinsIntervalMultiplier = 5;
    this.itemTitleFirstFontColor = "#ffffff";
    this.itemTitleSecondFontColor = "#000080";
    this.linesColor = "#c0c0c0";
    this.linesWidth = 1;
    this.linesType = 0;
    this.highlightLinesColor = "#ff0000";
    this.highlightLinesWidth = 1;
    this.highlightLinesType = 0;
    this.showCallout = !0;
    this.defaultCalloutTemplateName = null;
    this.calloutfillColor = "#000000";
    this.calloutBorderColor = null;
    this.calloutCornerRadius = this.calloutOffset = 4;
    this.calloutPointerWidth = "10%";
    this.calloutLineWidth = 1;
    this.calloutOpacity = 0.2;
    this.leavesPlacementType = this.childrenPlacementType = 2;
    this.maximumColumnsInMatrix = 6;
    this.buttonsPanelSize = 28;
    this.checkBoxPanelSize = this.groupTitlePanelSize = 24;
    this.distance = 3;
    this.minimumScale = 0.5;
    this.maximumScale = 1;
    this.showLabels = 0;
    this.labelSize = new primitives.common.Size(80, 24);
    this.labelOffset = 1;
    this.labelOrientation = 0;
    this.labelPlacement = 1;
    this.labelFontSize = "10px";
    this.labelFontFamily = "Arial";
    this.labelColor = "#000000";
    this.labelFontStyle = this.labelFontWeight =
        "normal";
    this.enablePanning = !0;
    this.printPreviewPageSize = new primitives.common.Size(612, 792)
};
primitives.orgdiagram.ConnectorAnnotationConfig = function (a, b) {
    var c;
    this.annotationType = 0;
    this.zOrderType = 2;
    this.toItem = this.fromItem = null;
    this.connectorShapeType = 0;
    this.labelPlacementType = primitives.common.ConnectorLabelPlacementType.Between;
    this.offset = new primitives.common.Thickness(0, 0, 0, 0);
    this.lineWidth = 2;
    this.color = "#000000";
    this.lineType = 0;
    this.selectItems = !0;
    this.label = null;
    this.labelSize = new primitives.common.Size(60, 30);
    switch (arguments.length) {
    case 1:
        for (c in a) a.hasOwnProperty(c) && (this[c] =
            a[c]);
        break;
    case 2:
        this.fromItem = a, this.toItem = b
    }
};
primitives.orgdiagram.HighlightPathAnnotationConfig = function (a) {
    var b;
    this.annotationType = 2;
    this.items = [];
    this.selectItems = !1;
    switch (arguments.length) {
    case 1:
        if (null !== a)
            if (a instanceof Array) this.items = a;
            else if ("object" == typeof a)
            for (b in a) a.hasOwnProperty(b) && (this[b] = a[b])
    }
};
primitives.orgdiagram.ItemConfig = function (a, b, c, d, e) {
    var f;
    this.context = this.image = this.description = this.title = this.parent = this.id = null;
    this.itemTitleColor = "#4169e1";
    this.groupTitle = null;
    this.groupTitleColor = "#4169e1";
    this.isActive = this.isVisible = !0;
    this.childrenPlacementType = this.adviserPlacementType = this.itemType = this.hasButtons = this.hasSelectorCheckbox = 0;
    this.templateName = null;
    this.showCallout = 0;
    this.label = this.calloutTemplateName = null;
    this.showLabel = 0;
    this.labelSize = null;
    this.labelOrientation =
        3;
    this.labelPlacement = 0;
    switch (arguments.length) {
    case 1:
        for (f in a) a.hasOwnProperty(f) && (this[f] = a[f]);
        break;
    case 5:
        this.id = a, this.parent = b, this.title = c, this.description = d, this.image = e
    }
};
primitives.orgdiagram.ShapeAnnotationConfig = function (a) {
    var b;
    this.annotationType = 1;
    this.zOrderType = 0;
    this.items = [];
    this.shapeType = 0;
    this.offset = new primitives.common.Thickness(0, 0, 0, 0);
    this.lineWidth = 2;
    this.cornerRadius = "10%";
    this.opacity = 1;
    this.fillColor = this.borderColor = null;
    this.lineType = 0;
    this.selectItems = !1;
    this.label = null;
    this.labelSize = new primitives.common.Size(60, 30);
    this.labelPlacement = 0;
    this.labelOffset = 4;
    switch (arguments.length) {
    case 1:
        if (null !== a)
            if (a instanceof Array) this.items = a;
            else if ("object" ==
            typeof a)
            for (b in a) a.hasOwnProperty(b) && (this[b] = a[b])
    }
};
primitives.orgdiagram.Controller = function () {
    this.widgetEventPrefix = "orgdiagram";
    this.parent = primitives.orgdiagram.BaseController.prototype;
    this.parent.constructor.apply(this, arguments);
    this.options = new primitives.orgdiagram.Config;
    this.options.linesPalette = []
};
primitives.orgdiagram.Controller.prototype = new primitives.orgdiagram.BaseController;
primitives.orgdiagram.Controller.prototype._virtualGetEventArgs = function (a, b, c) {
    var d = new primitives.orgdiagram.EventArgs,
        e;
    null != a && (a.itemConfig && null != a.itemConfig.id) && (d.oldContext = this._configs.node(a.itemConfig.id));
    null != b && (b.itemConfig && null != b.itemConfig.id) && (d.context = this._configs.node(b.itemConfig.id), null !== b.itemConfig.parent && (d.parentItem = this._configs.parent(b.itemConfig.id)), e = this.m_placeholder.offset(), a = this.element.offset(), d.position = (new primitives.common.Rect(b.actualPosition)).translate(e.left,
        e.top).translate(-a.left, -a.top));
    null != c && (d.name = c);
    return d
};
primitives.orgdiagram.Controller.prototype._virtualCreateOrgTree = function () {
    var a, b, c, d, e, f, g, h, j, i, k;
    this._configs = primitives.common.tree();
    this._orgTree = primitives.common.tree();
    if (null != this.options.items && 0 < this.options.items.length) {
        j = "title description image itemTitleColor groupTitle groupTitleColor isVisible isActive hasSelectorCheckbox hasButtons itemType adviserPlacementType childrenPlacementType templateName showCallout calloutTemplateName label showLabel labelSize labelOrientation labelPlacement".split(" ");
        i =
            new primitives.orgdiagram.ItemConfig;
        d = k = 0;
        for (e = this.options.items.length; d < e; d += 1)
            if (c = this.options.items[d], null != c.id) {
                this._configs.add(c.parent, c.id, c);
                a = new primitives.orgdiagram.OrgItem;
                a.id = c.id;
                f = parseInt(c.id, 10);
                k = Math.max(isNaN(f) ? 0 : f, k);
                a.context = c;
                f = 0;
                for (g = j.length; f < g; f += 1) h = j[f], a[h] = void 0 !== c[h] ? c[h] : i[h];
                this._orgTree.add(c.parent, a.id, a)
            }
        k += 1;
        b = new primitives.orgdiagram.OrgItem;
        b.id = k;
        b.hideParentConnection = !0;
        b.hideChildrenConnection = !0;
        b.title = "internal root";
        b.isVisible = !1;
        this._orgTree.add(null, b.id, b);
        this._orgTree.loopLevels(this, function (a, c, d) {
            if (0 < d) return this._orgTree.BREAK;
            b.id != a && (this._orgTree.adopt(b.id, a), c.itemType = 0)
        });
        this._hideRootConnectors(this._orgTree)
    }
};
primitives.orgdiagram.Controller.prototype._hideRootConnectors = function (a) {
    a.loopLevels(this, function (b, c) {
        var d = !0;
        if (c.isVisible) return a.SKIP;
        a.loopChildren(this, b, function (a, b) {
            if (0 != b.itemType) return d = !1, !0
        });
        if (d) c.hideChildrenConnection = !0, a.loopChildren(this, b, function (a, b) {
            b.hideParentConnection = !0
        });
        else return a.SKIP
    })
};
primitives.orgdiagram.Controller.prototype._defineNavigationParent = function (a, b, c) {
    var d = [];
    c || !a.actualIsActive || 4 == a.visibility ? this._navigationFamily.loopParents(this, a.id, function (a, b) {
        if (b.actualIsActive && 4 != b.visibility) return d.push(a), this._navigationFamily.SKIP
    }) : d.push(a.id);
    null != this._navigationFamily.node(b.id) ? this._navigationFamily.adopt(d, b.id) : this._navigationFamily.add(d, b.id, b)
};
primitives.orgdiagram.Controller.prototype._virtualShowCursorNeighbours = function () {
    if (null !== this._cursorTreeItem) {
        0 === this._cursorTreeItem.visibility && (this._cursorTreeItem.visibility = 1);
        switch (this.options.selectionPathMode) {
        case 1:
            this._navigationFamily.loopParents(this, this._cursorTreeItem.id, function (a, b) {
                0 === b.visibility && (b.visibility = 1)
            })
        }
        this._navigationFamily.loopNeighbours(this, this._cursorTreeItem.id, function (a, b) {
            0 === b.visibility && (b.visibility = 1);
            return !0
        })
    }
};
primitives.orgdiagram.ConnectorPoint = function () {
    this.parent = primitives.common.Point.prototype;
    this.parent.constructor.apply(this, arguments);
    this.hasElbow = !1;
    this.visibility = this.elbowPoint2 = this.elbowPoint1 = null;
    this.isSquared = !0;
    this.highlightPath = 0;
    this.connectorStyleType = 1
};
primitives.orgdiagram.ConnectorPoint.prototype = new primitives.common.Point;
primitives.orgdiagram.LevelVisibility = function (a, b) {
    this.level = a;
    this.currentvisibility = b
};
primitives.orgdiagram.OrgItem = function () {
    this.image = this.description = this.title = this.context = this.id = null;
    this.itemTitleColor = "#4169e1";
    this.groupTitle = null;
    this.groupTitleColor = "#4169e1";
    this.isActive = this.isVisible = !0;
    this.hasVisibleChildren = !1;
    this.childrenPlacementType = this.adviserPlacementType = this.itemType = this.hasButtons = this.hasSelectorCheckbox = 0;
    this.templateName = null;
    this.showCallout = 0;
    this.label = this.calloutTemplateName = null;
    this.showLabel = 0;
    this.labelSize = null;
    this.labelOrientation = 3;
    this.labelPlacement = 0;
    this.level = null;
    this.hideChildrenConnection = this.hideParentConnection = !1;
    this.childIndex = null
};
primitives.orgdiagram.Template = function (a, b) {
    var c;
    this.widgetEventPrefix = "orgdiagram";
    this.templateConfig = a;
    for (c in b) b.hasOwnProperty(c) && (this[c] = a.hasOwnProperty(c) ? a[c] : b[c]);
    this.minimizedItemCornerRadius = null === a.minimizedItemCornerRadius ? this.minimizedItemSize.width / 2 : a.minimizedItemCornerRadius;
    this.itemTemplateHashCode = this.dotHighlightTemplate = this.dotHighlightTemplateHashCode = null;
    this.itemTemplateRenderName = "onItemRender";
    this.highlightTemplateHashCode = null;
    this.highlightTemplateRenderName =
        "onHighlightRender";
    this.cursorTemplateHashCode = null;
    this.cursorTemplateRenderName = "onCursorRender";
    this.boxModel = jQuery.support.boxModel
};
primitives.orgdiagram.Template.prototype.createDefaultTemplates = function () {
    primitives.common.isNullOrEmpty(this.itemTemplate) && (this.itemTemplate = this._getDefaultItemTemplate(), this.itemTemplateRenderName = "onDefaultTemplateRender");
    this.itemTemplateHashCode = primitives.common.hashCode(this.itemTemplate);
    primitives.common.isNullOrEmpty(this.cursorTemplate) && (this.cursorTemplate = this._getDefaultCursorTemplate(), this.cursorTemplateRenderName = null);
    this.cursorTemplateHashCode = primitives.common.hashCode(this.cursorTemplate);
    primitives.common.isNullOrEmpty(this.highlightTemplate) && (this.highlightTemplate = this._getDefaultHighlightTemplate(), this.highlightTemplateRenderName = null);
    this.highlightTemplateHashCode = primitives.common.hashCode(this.highlightTemplate);
    this.dotHighlightTemplate = this._getDotHighlightTemplate();
    this.dotHighlightTemplateHashCode = primitives.common.hashCode(this._getDotHighlightTemplate)
};
primitives.orgdiagram.Template.prototype._getDefaultItemTemplate = function () {
    var a = new primitives.common.Size(this.itemSize),
        b, c, d;
    a.width -= this.boxModel ? 2 * this.itemBorderWidth : 0;
    a.height -= this.boxModel ? 2 * this.itemBorderWidth : 0;
    b = jQuery("<div></div>").css({
        "border-width": this.itemBorderWidth + "px"
    }).addClass("bp-item bp-corner-all bt-item-frame");
    c = jQuery('<div name="titleBackground"></div>').css({
        top: "2px",
        left: "2px",
        width: a.width - 4 + "px",
        height: "18px"
    }).addClass("bp-item bp-corner-all bp-title-frame");
    b.append(c);
    d = jQuery('<div name="title"></div>').css({
        top: "1px",
        left: "4px",
        width: a.width - 4 - 8 + "px",
        height: "16px"
    }).addClass("bp-item bp-title");
    c.append(d);
    c = jQuery("<div></div>").css({
        top: "24px",
        left: "2px",
        width: "50px",
        height: "60px"
    }).addClass("bp-item bp-photo-frame");
    b.append(c);
    d = jQuery('<img name="photo" alt=""></img>').css({
        width: "50px",
        height: "60px"
    });
    c.append(d);
    a = jQuery('<div name="description"></div>').css({
        top: "24px",
        left: "56px",
        width: a.width - 4 - 56 + "px",
        height: "74px"
    }).addClass("bp-item bp-description");
    b.append(a);
    return b.wrap("<div>").parent().html()
};
primitives.orgdiagram.Template.prototype._getDefaultCursorTemplate = function () {
    return jQuery("<div></div>").css({
        width: this.itemSize.width + this.cursorPadding.left + this.cursorPadding.right + "px",
        height: this.itemSize.height + this.cursorPadding.top + this.cursorPadding.bottom + "px",
        "border-width": this.cursorBorderWidth + "px"
    }).addClass("bp-item bp-corner-all bp-cursor-frame").wrap("<div>").parent().html()
};
primitives.orgdiagram.Template.prototype._getDefaultHighlightTemplate = function () {
    return jQuery("<div></div>").css({
        "border-width": this.highlightBorderWidth + "px"
    }).addClass("bp-item bp-corner-all bp-highlight-frame").wrap("<div>").parent().html()
};
primitives.orgdiagram.Template.prototype._getDotHighlightTemplate = function () {
    var a = this.minimizedItemCornerRadius + this.highlightPadding.left;
    return jQuery("<div></div>").css({
        "border-width": this.highlightBorderWidth + "px",
        "-moz-border-radius": a,
        "-webkit-border-radius": a,
        "-khtml-border-radius": a,
        "border-radius": a
    }).addClass("bp-item bp-highlight-dot-frame").wrap("<div>").parent().html()
};
primitives.orgdiagram.TreeItem = function (a) {
    this.orgItem = this.itemConfig = null;
    this.id = a;
    this.visualAggregatorId = null;
    this.visualDepth = 1;
    this.partners = [];
    this.extraPartners = [];
    this.partnerAggregatorId = null;
    this.partnerConnectorOffset = 0;
    this.visibility = 1;
    this.levelPosition = this.level = this.template = null;
    this.rightPadding = this.leftPadding = this.offset = 0;
    this.actualVisibility = 1;
    this.contentPosition = this.actualPosition = this.actualSize = null;
    this.actualHasGroupTitle = this.actualHasButtons = this.actualHasSelectorCheckbox =
        this.actualIsActive = this.isSelected = this.isCursor = !1;
    this.actualItemType = null;
    this.relationDegree = this.partnerHighlightPath = this.highlightPath = this.gravity = this.connectorPlacement = 0
};
primitives.orgdiagram.TreeItem.prototype.setActualSize = function (a, b) {
    var c = primitives.common;
    this.actualVisibility = 0 === this.visibility ? a.currentvisibility : this.visibility;
    switch (this.actualVisibility) {
    case 1:
        this.actualSize = new c.Size(this.template.itemSize);
        this.contentPosition = new c.Rect(0, 0, this.actualSize.width, this.actualSize.height);
        this.isCursor && (this.actualSize.height += this.template.cursorPadding.top + this.template.cursorPadding.bottom, this.actualSize.width += this.template.cursorPadding.left +
            this.template.cursorPadding.right, this.contentPosition.x = this.template.cursorPadding.left, this.contentPosition.y = this.template.cursorPadding.top);
        this.actualHasSelectorCheckbox && (this.actualSize.height += b.checkBoxPanelSize);
        this.actualHasButtons && (this.actualSize.width += b.buttonsPanelSize);
        if (this.actualHasGroupTitle = !c.isNullOrEmpty(this.orgItem.groupTitle)) this.actualSize.width += b.groupTitlePanelSize, this.contentPosition.x += b.groupTitlePanelSize;
        break;
    case 2:
        this.actualSize = new c.Size(this.template.minimizedItemSize);
        break;
    case 3:
    case 4:
        this.actualSize = new c.Size
    }
    switch (b.orientationType) {
    case 2:
    case 3:
        this.actualSize.invert()
    }
};
primitives.orgdiagram.TreeItem.prototype.setActualPosition = function (a, b) {
    var c = 0;
    switch (this.actualVisibility) {
    case 1:
        switch (b.verticalAlignment) {
        case 0:
            c = 0;
            break;
        case 1:
            c = (a.depth - this.actualSize.height) / 2;
            break;
        case 2:
            c = a.depth - this.actualSize.height
        }
        break;
    case 2:
    case 3:
    case 4:
        c = a.horizontalConnectorsDepth - this.actualSize.height / 2
    }
    this.actualPosition = new primitives.common.Rect(this.offset, a.shift + c, this.actualSize.width, this.actualSize.height);
    switch (b.orientationType) {
    case 2:
    case 3:
        this.actualSize.invert()
    }
};
primitives.orgdiagram.TreeItem.prototype.toString = function () {
    return this.id
};
primitives.orgdiagram.TreeLevel = function (a) {
    this.level = a;
    this.actualVisibility = this.currentvisibility = 1;
    this.partnerConnectorOffset = this.levelSpace = this.connectorShift = this.topConnectorShift = this.horizontalConnectorsDepth = this.currentOffset = this.nextLevelShift = this.depth = this.shift = 0;
    this.treeItems = [];
    this.activeTreeItems = [];
    this.labels = [];
    this.labelsRect = null;
    this.showLabels = !0;
    this.hasFixedLabels = !1
};
primitives.orgdiagram.TreeLevel.prototype.setShift = function (a, b, c, d) {
    this.shift = a;
    this.levelSpace = b;
    this.topConnectorShift = -b / 2 - c;
    this.connectorShift = this.depth + d + (this.partnerConnectorOffset + 1) * (b / 2);
    return this.nextLevelShift = c + this.depth + d + b + this.partnerConnectorOffset * b / 2
};
primitives.orgdiagram.TreeLevel.prototype.shiftDown = function (a) {
    this.shift += a
};
primitives.orgdiagram.TreeLevel.prototype.toString = function () {
    return this.level + "." + this.currentvisibility
};
(function (a) {
    a.widget("ui.orgDiagram", jQuery.ui.mouse2, new primitives.orgdiagram.Controller)
})(jQuery);
primitives.shape.Config = function () {
    this.classPrefix = "bpconnector";
    this.graphicsType = 1;
    this.actualGraphicsType = null;
    this.shapeType = this.orientationType = 0;
    this.position = null;
    this.offset = new primitives.common.Thickness(0, 0, 0, 0);
    this.lineWidth = 2;
    this.cornerRadius = "10%";
    this.opacity = 1;
    this.fillColor = this.borderColor = null;
    this.lineType = 0;
    this.label = null;
    this.labelSize = new primitives.common.Size(60, 30);
    this.labelPlacement = 0;
    this.labelOffset = 4
};
primitives.shape.Controller = function () {
    this.widgetEventPrefix = "bpshape";
    this.options = new primitives.shape.Config;
    this._labelTemplateHashCode = this._labelTemplate = this.m_shape = this.m_graphics = this.m_panelSize = this.m_placeholder = null
};
primitives.shape.Controller.prototype._create = function () {
    var a = this;
    this.element.addClass("ui-widget");
    this._createLabelTemplate();
    this._createLayout();
    this.options.onAnnotationLabelTemplateRender = function (b, c) {
        a._onAnnotationLabelTemplateRender(b, c)
    };
    this._redraw()
};
primitives.shape.Controller.prototype.destroy = function () {
    this._cleanLayout();
    this.options.onLabelTemplateRender = null
};
primitives.shape.Controller.prototype._createLayout = function () {
    this.m_panelSize = new primitives.common.Rect(0, 0, this.element.outerWidth(), this.element.outerHeight());
    this.m_placeholder = jQuery("<div></div>");
    this.m_placeholder.css({
        position: "relative",
        overflow: "hidden",
        top: "0px",
        left: "0px",
        padding: "0px",
        margin: "0px"
    });
    this.m_placeholder.css(this.m_panelSize.getCSS());
    this.m_placeholder.addClass("placeholder");
    this.m_placeholder.addClass(this.widgetEventPrefix);
    this.element.append(this.m_placeholder);
    this.m_graphics = primitives.common.createGraphics(this.options.graphicsType, this);
    this.options.actualGraphicsType = this.m_graphics.graphicsType
};
primitives.shape.Controller.prototype._cleanLayout = function () {
    null !== this.m_graphics && this.m_graphics.clean();
    this.m_graphics = null;
    this.element.find("." + this.widgetEventPrefix).remove()
};
primitives.shape.Controller.prototype._updateLayout = function () {
    this.m_panelSize = new primitives.common.Rect(0, 0, this.element.innerWidth(), this.element.innerHeight());
    this.m_placeholder.css(this.m_panelSize.getCSS())
};
primitives.shape.Controller.prototype.update = function (a) {
    a ? (this._cleanLayout(), this._createLayout(), this._redraw()) : (this._updateLayout(), this.m_graphics.resize("placeholder", this.m_panelSize.width, this.m_panelSize.height), this.m_graphics.begin(), this._redraw(), this.m_graphics.end())
};
primitives.shape.Controller.prototype._createLabelTemplate = function () {
    var a = jQuery("<div></div>");
    a.addClass("bp-item bp-corner-all bp-connector-label");
    this._labelTemplate = a.wrap("<div>").parent().html();
    this._labelTemplateHashCode = primitives.common.hashCode(this._labelTemplate)
};
primitives.shape.Controller.prototype._onAnnotationLabelTemplateRender = function (a, b) {
    b.element.html(this.options.label)
};
primitives.shape.Controller.prototype._redraw = function () {
    var a = "orientationType shapeType offset lineWidth borderColor lineType labelSize labelOffset labelPlacement cornerRadius opacity fillColor".split(" "),
        b, c;
    this.m_graphics.activate("placeholder");
    this.m_shape = new primitives.common.Shape(this.m_graphics);
    for (b = 0; b < a.length; b += 1) c = a[b], this.m_shape[c] = this.options[c];
    this.m_shape.hasLabel = !primitives.common.isNullOrEmpty(this.options.label);
    this.m_shape.labelTemplate = this._labelTemplate;
    this.m_shape.labelTemplateHashCode =
        this._labelTemplateHashCode;
    this.m_shape.panelSize = new primitives.common.Size(this.m_panelSize.width, this.m_panelSize.height);
    this.m_shape.draw(this.options.position)
};
primitives.shape.Controller.prototype._setOption = function (a, b) {
    jQuery.Widget.prototype._setOption.apply(this, arguments);
    switch (a) {
    case "disabled":
        var c = jQuery([]);
        b ? (c.filter(".ui-state-focus").blur(), c.removeClass("ui-state-hover"), c.propAttr("disabled", !0), this.element.addClass("ui-disabled")) : (c.propAttr("disabled", !1), this.element.removeClass("ui-disabled"))
    }
};
(function (a) {
    a.widget("ui.bpShape", new primitives.shape.Controller)
})(jQuery);