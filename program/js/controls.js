$(document).ready(function () {
    var options = new primitives.famdiagram.Config();

    options.cursorItem = 0;
    options.linesWidth = 1;
    options.linesColor = "black";
    options.lineItemsInterval = 5;
    options.hasSelectorCheckbox = primitives.common.Enabled.False;
    options.orientationType = primitives.common.OrientationType.Left;
    options.pageFitMode = primitives.common.PageFitMode.None;
    options.templates = [getPERTTemplate()];
    options.onItemRender = onTemplateRender;
    options.defaultTemplateName = "pertTemplate";
    options.arrowsDirection = primitives.common.GroupByType.Children;

    options.highlightLinesColor = primitives.common.Colors.Black;
    options.highlightLinesWidth = 1;
    options.highlightLinesType = primitives.common.LineType.Solid;

    function onTemplateRender(event, data) {
        var itemConfig = data.context;

        if (data.templateName == "pertTemplate") {
            data.element.find("[name=titleBackground]").css({
                "background": itemConfig.itemTitleColor
            });

            var fields = ["title", "name"];
            for (var index = 0; index < fields.length; index++) {
                var field = fields[index];

                var element = data.element.find("[name=" + field + "]");
                if (element.text() != itemConfig[field]) {
                    element.text(itemConfig[field]);
                }
            }
        }
    }

    function getPERTTemplate() {
        var result = new primitives.orgdiagram.TemplateConfig();
        result.name = "pertTemplate";

        result.itemSize = new primitives.common.Size(100, 70);
        result.minimizedItemSize = new primitives.common.Size(100, 70);
        result.highlightPadding = new primitives.common.Thickness(0, 0, 0, 0);

        var itemTemplate = jQuery(
              '<div class="bp-item bp-corner-all bt-item-frame">'	 
            +   '<div name="titleBackground" class="bp-item bp-corner-all bp-title-frame" style="top: 2px; left: 2px; width: 96px; height: 20px;">' 
            +     '<div name="title" class="bp-item bp-title" style="text-align: center; top: 3px; font-size: 12px; left: 6px; width: 88px; height: 18px;">' 
            +     '</div>'
            +   '</div>'
            +   '<div name="name" class="bp-item bp-title" style="font-size: 11px;word-wrap: break-word; line-height: 100%; color: black; text-align: center; top: 23px; left: 6px; width: 88px; height: 50px;">' 
            +   '</div>'
            + '</div>'
        ).css({
            width: result.itemSize.width + "px",
            height: result.itemSize.height + "px"
        }).addClass("bp-item bp-corner-all bt-item-frame");
        result.itemTemplate = itemTemplate.wrap('<div>').parent().html();

        return result;
    }
    
	var curriculum_id = $('input[name="curriculum_id"]').val();    
    $.getJSON("../program/tree_data.php?curriculum_id=" + curriculum_id, function(data) {
        options.items = data;
        $("#diagram").famDiagram(options);
    });
});

$(document).ready(function () {
    $('.delete-curr-subj').on('click', function() {
        var course_id = $(this).data("subjid");
        var curr_id = $(this).data("currid");
        var prog_code = $(this).data("progcode");
        var curr_year = $(this).data("curryear");
        if(confirm("Are you sure you want to delete this subject?")) {
            location.href = "deleteSubject.php?course_id="+course_id+"&curr_id="+curr_id+"&prog_code="+prog_code+"&curr_year="+curr_year;
        }
    });
});


$(document).ready(function () {
    $('#delete-curr').on('click', function() {
        var curr_id = $(this).data("currid");
        if(confirm("Are you sure you want to delete this curriculum?")) {
            location.href = "deleteCurriculum.php?curr_id="+curr_id;
        }
    });
});


$(document).ready(function () {
    $('.delete-course').on('click', function() {
        var course_id = $(this).data("courseid");
        if(confirm("Are you sure you want to delete this course?")) {
            location.href = "deleteCourse.php?course_id="+course_id;
        }
    });
});