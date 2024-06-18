var number = 0;
var elements = [];

//添加评论
function add_message() {
    var username = $("username");
    var message = $("message");
    //date和text内容
    var date = new Date().toString();
    var text = username.value.trim() + ": " + message.value.trim();
    var li = document.createElement("li");
    li.setAttribute("id", "li" + number);
    li.setAttribute("class", "wow fadeInUp");
    var checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", "checkbox-" + number);
    li.appendChild(checkbox);
    var label = document.createElement("label");
    label.setAttribute("for", "checkbox-" + number);
    li.appendChild(label);
    var div = document.createElement("div");
    div.setAttribute("class", "li_text");
    div.append(date);
    var br = document.createElement("br");
    div.appendChild(br);
    div.append(text);
    li.appendChild(div);
    $("list").appendChild(li);
    elements.push(number.toString());
    number++;
    username.value = "";
    message.value = "";
    setCookie();
}

//删除评论
function remove_message() {
    for (var i = 0; i < elements.length; i++) {
        var elem = $("li" + elements[i]);
        if (elem.firstChild.checked === true) {
            elem.remove();
            elements.splice(i, 1);
            i--;
        }
    }
    setCookie();
}

//选择全部
function select_all() {
    for (var i = 0; i < elements.length; i++) {
        $("li" + elements[i]).firstChild.checked = true;
    }
}

//删除全部
function deselect_all() {
    for (var i = 0; i < elements.length; i++) {
        $("li" + elements[i]).firstChild.checked = false;
    }
}

function setCookie() {
    var to_do = "to_do =";
    for (var i = 0; i < elements.length; i++) {
        var text = $("li" + elements[i]).childNodes[2].innerHTML;
        to_do += text + ",";
    }
    if (elements.length !== 0)
        to_do = to_do.slice(0, to_do.length - 1);
    document.cookie = escape(to_do);
}

function getCookie() {
    var to_do = unescape(document.cookie).split(';')[0];
    if (to_do.slice(0, 5) === "to_do" && to_do.length > 6) {
        var temp = to_do.split('=')[1].split(",");
        for (var i = 0; i < temp.length; i++) {
            var message = temp[i].split("<br>");
            var date = message[0];
            var text = message[1];
            var li = document.createElement("li");
            li.setAttribute("id", "li" + number);
            li.setAttribute("class", "wow fadeInUp");
            var checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("id", "checkbox-" + number);
            li.appendChild(checkbox);
            var label = document.createElement("label");
            label.setAttribute("for", "checkbox-" + number);
            li.appendChild(label);
            var div = document.createElement("div");
            div.setAttribute("class", "li_text");
            div.append(date);
            var br = document.createElement("br");
            div.appendChild(br);
            div.append(text);
            li.appendChild(div);
            $("list").appendChild(li);
            elements.push(number.toString());
            number++;
        }
    }
}

//Preloader的动画设置
function handlePreloader() {
    if ($('.preloader').length) {
        $('.preloader').delay(5000).fadeOut(2500);
    }
}

//跳转设置
function headerStyle() {
    if ($('.main-header').length) {
        var windowpos = $(window).scrollTop();
        var siteHeader = $('.main-header');
        var scrollLink = $('.scroll-to-top');
        if (windowpos >= 200) {
            siteHeader.addClass('fixed-header');
            scrollLink.fadeIn(300);
        } else {
            siteHeader.removeClass('fixed-header');
            scrollLink.fadeOut(300);
        }
    }
}

headerStyle();

//网页论坛的部分
function validform() {
    return $('#bbs-form').validate({
        rules: {
            username: {
                required: true,
                maxlength: 20
            },
            message: {
                required: true,
                maxlength: 100
            }
        },
        messages: {
            username: {
                required: "请输入你的名字",
                maxlength: "请输入不超过20个字符"
            },
            message: {
                required: "请输入你的留言",
                maxlength: "请输入不超过100个字符"
            }
        }
    });
}

$(validform());

//事件绑定
$("#addBut").click(function () {
    if (validform().form())
        add_message();
});
$("#removeBut").click(function () {
    remove_message();
});
$("#selectAllBut").click(function () {
    select_all();
});
$("#deselectAllBut").click(function () {
    deselect_all();
});
$("#removeAllBut").click(function () {
    select_all();
    remove_message();
});